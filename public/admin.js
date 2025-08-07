/* ============================ */
/* 覓食 MISS - 後台管理 JavaScript */
/* ============================ */

// 全域裁切器實例變數
let postCropper = null;
let newsCropper = null;

// 等待 script.js 中的 Firebase 初始化完成
firebaseReady.then(result => {
    if (result && result.error) {
        logger.reportError(result.error, "Firebase 初始化失敗");
        document.body.innerHTML = '<div class="error-overlay"><h1>系統初始化失敗</h1><p>無法連接至後台服務，請檢查您的網路連線並刷新頁面。</p></div>';
        return;
    }
    console.log("Firebase 已就緒，後台管理頁面功能已啟動。");
    
    auth.onAuthStateChanged(user => {
        const adminContainer = document.querySelector('.admin-container');
        if (user) {
            console.log("Admin user is logged in.", user.email);
            adminContainer.style.display = 'flex';
            
            initializeAdminFunctionalities();

        } else {
            console.log("Admin user is not logged in. Redirecting to login page.");
            // 除了 login.html 外都導向登入頁
            if (!window.location.pathname.endsWith('login.html')) {
                window.location.href = 'login.html';
            }
        }
    });
});

function initializeAdminFunctionalities() {
    logger.log('🚀 Admin functionalities initialization started...');

    const navLinks = document.querySelectorAll('.nav-link');
    
    // 內容區塊
    const postsListContainer = document.getElementById('posts-list');
    const newsListContainer = document.getElementById('news-list');

    // 彈出視窗 (Modal)
    const postModal = document.getElementById('post-modal');
    const newsModal = document.getElementById('news-modal');
    
    // 表單 (Form)
    const postForm = document.getElementById('post-form');
    const newsForm = document.getElementById('news-form');
    
    // 表單標題
    const postModalTitle = document.getElementById('post-modal-title');
    const newsModalTitle = document.getElementById('news-modal-title');
    
    let isPostsLoaded = false;
    let isNewsLoaded = false;
    let lastVisiblePost = null;
    let lastVisibleNews = null;
    const pageSize = 10; // 每次載入10筆

    // =======================
    // 0. TinyMCE 初始化
    // =======================
    function initTinyMCE() {
        if (document.querySelector('textarea#post-content') && !tinymce.get('post-content')) {
            tinymce.init({
                selector: 'textarea#post-content',
                readonly: false,
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount powerpaste',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                height: 400,
                language: 'zh_TW',
                image_class_list: [
                    { title: '無', value: '' },
                    { title: '靠左對齊', value: 'img-float-left' },
                    { title: '靠右對齊', value: 'img-float-right' },
                    { title: '置中', value: 'img-center' }
                ],
                paste_data_images: true,
                file_picker_types: 'image',
                file_picker_callback: (cb) => {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    input.addEventListener('change', (e) => {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.addEventListener('load', () => {
                            const id = 'blobid' + (new Date()).getTime();
                            const blobCache = tinymce.activeEditor.editorUpload.blobCache;
                            const base64 = reader.result.split(',')[1];
                            const blobInfo = blobCache.create(id, file, base64);
                            blobCache.add(blobInfo);
                            cb(blobInfo.blobUri(), { title: file.name });
                        });
                        reader.readAsDataURL(file);
                    });
                    input.click();
                },
                automatic_uploads: true,
                images_upload_handler: async (blobInfo) => {
                    try {
                        const file = blobInfo.blob();
                        const folder = 'post_content_images';
                        const fileName = `${Date.now()}-${blobInfo.filename()}`;
                        const filePath = `${folder}/${fileName}`;
                        const fileRef = storage.ref(filePath);
                        await fileRef.put(file);
                        return await fileRef.getDownloadURL();
                    } catch (error) {
                        throw new Error('圖片上傳處理出錯: ' + error.message);
                    }
                },
                content_style: `
                    body { font-family: 'Noto Sans TC', sans-serif; line-height: 1.8; color: #333; }
                    /* 移除 img 全域樣式，以尊重編輯器中的尺寸設定 */
                    .img-float-left { float: left; margin: 0.5em 1.5em 0.5em 0; max-width: 50%; height: auto; }
                    .img-float-right { float: right; margin: 0.5em 0 0.5em 1.5em; max-width: 50%; height: auto; }
                    .img-center { display: block; margin-left: auto; margin-right: auto; max-width: 100%; height: auto; }
                `
            });
        }
    }

    // =======================
    // 1. 通用核心功能
    // =======================

    function setupImageCropper(fileInputId, imageCropId, aspectRatio) {
        const fileInput = document.getElementById(fileInputId);
        const imageToCrop = document.getElementById(imageCropId);
        
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const isPost = fileInputId.includes('post');
            
            if (isPost) {
                if (postCropper) postCropper.destroy();
            } else {
                if (newsCropper) newsCropper.destroy();
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                imageToCrop.src = event.target.result;
                imageToCrop.style.display = 'block';
                
                const cropperInstance = new Cropper(imageToCrop, {
                    aspectRatio,
                    viewMode: 1,
                    background: false,
                    autoCropArea: 0.8,
                });

                if (isPost) {
                    postCropper = cropperInstance;
                } else {
                    newsCropper = cropperInstance;
                }
            };
            reader.readAsDataURL(file);
        });
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
    
        // 銷毀 Cropper 實例
        if (modal.id === 'post-modal' && postCropper) {
            postCropper.destroy();
            postCropper = null;
        }
        if (modal.id === 'news-modal' && newsCropper) {
            newsCropper.destroy();
            newsCropper = null;
        }
    
        // 重設圖片裁切區域的圖片
        const imageToCropEl = modal.querySelector('.cropper-wrapper img'); // 使用 class 尋找
        if (imageToCropEl) {
            imageToCropEl.src = '';
            imageToCropEl.style.display = 'none';
        }
    
        // 重設圖片預覽區域的圖片
        const imagePreviewEl = modal.querySelector('.image-preview-container img'); // 使用 class 尋找
        if (imagePreviewEl) {
            imagePreviewEl.src = '';
            imagePreviewEl.style.display = 'none';
        }

        // 重設檔案輸入欄位的值
        const fileInput = modal.querySelector('input[type="file"]');
        if (fileInput) {
            fileInput.value = '';
        }
    }
    
    function handleHashChange() {
        const hash = window.location.hash || '#dashboard-section';
        
        // 更新導覽列的 'active' 狀態
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === hash);
        });

        // 顯示對應的內容區塊
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = section.id === hash.substring(1) ? 'block' : 'none';
        });

        // 根據 hash 載入需要的資料 (如果尚未載入過)
        switch (hash) {
            case '#posts-section':
                if (!isPostsLoaded) loadBlogPosts();
                break;
            case '#news-section':
                if (!isNewsLoaded) loadNewsArticles();
                break;
        }
    }
    
    function escapeHTML(str) {
        if (!str) return '';
        return str.replace(/[&<>"']/g, match => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[match]);
    }

    function showSkeletonLoader(container, count = 3) {
        container.innerHTML = ''; // 清空現有內容
        for (let i = 0; i < count; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'skeleton-item';
            skeleton.innerHTML = `
                <div class="skeleton-text item-title"></div>
                <div class="skeleton-text item-author"></div>
                <div class="skeleton-text item-date"></div>
            `;
            container.appendChild(skeleton);
        }
    }

    // =======================
    // 2. CRUD - 工作日誌 (Posts)
    // =======================

    async function loadBlogPosts(loadMore = false) {
        if (!loadMore) {
            isPostsLoaded = true;
            lastVisiblePost = null;
            postsListContainer.innerHTML = ''; // 清空
            showSkeletonLoader(postsListContainer, 5);
        }

        const loadMoreBtn = document.getElementById('load-more-posts');
        loadMoreBtn.disabled = true;
        
        try {
            let query = db.collection('posts').orderBy('date', 'desc').limit(pageSize);
            if (loadMore && lastVisiblePost) {
                query = query.startAfter(lastVisiblePost);
            }
            
            const snapshot = await query.get();
            
            if (!loadMore) {
                postsListContainer.innerHTML = '';
            }

            if (snapshot.empty && !loadMore) {
                postsListContainer.innerHTML = '<p>目前沒有任何文章。</p>';
                loadMoreBtn.style.display = 'none';
                return;
            }

            snapshot.forEach(doc => {
                const post = { id: doc.id, ...doc.data() };
                const itemDiv = document.createElement('div');
                itemDiv.className = 'list-item';
                itemDiv.innerHTML = `
                    <span class="item-title">${escapeHTML(post.title)}</span>
                    <span class="item-author">${escapeHTML(post.author)}</span>
                    <span class="item-date">${escapeHTML(post.date)}</span>
                    <div class="item-actions">
                        <button class="edit-btn" data-id="${post.id}" data-type="post">編輯</button>
                        <button class="delete-btn" data-id="${post.id}" data-collection="posts">刪除</button>
                    </div>
                `;
                postsListContainer.appendChild(itemDiv);
            });
            
            lastVisiblePost = snapshot.docs[snapshot.docs.length - 1];

            if (snapshot.docs.length < pageSize) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'block';
            }

        } catch (error) {
            logger.reportError(error, "載入文章失敗");
            postsListContainer.innerHTML = '<p class="error-message">載入文章時發生錯誤。</p>';
        } finally {
            loadMoreBtn.disabled = false;
        }
    }

    function openPostModal(id = null, post = null) {
        closeModal(postModal); // 先徹底清空
        
        if (id && post) { // 編輯模式
            postModalTitle.textContent = '編輯文章';
            document.getElementById('post-id').value = id;
            document.getElementById('post-title').value = post.title;
            document.getElementById('post-date').value = post.date;
            document.getElementById('post-author').value = post.author;
            document.getElementById('post-excerpt').value = post.excerpt;
            tinymce.get('post-content').setContent(post.content || '');
            document.getElementById('post-original-image-url').value = post.imageUrl || '';
            
            const preview = document.getElementById('post-image-preview');
            if (post.imageUrl) {
                preview.src = post.imageUrl;
                preview.style.display = 'block';
            }
        } else { // 新增模式
            postModalTitle.textContent = '新增文章';
        }
        postModal.style.display = 'block';
    }

    async function handlePostFormSubmit(event) {
        event.preventDefault();
        const submitBtn = postForm.querySelector('button[type="submit"]');
        submitBtn.classList.add('btn-loading');
        submitBtn.disabled = true;

        const id = document.getElementById('post-id').value;
        const originalImageUrl = document.getElementById('post-original-image-url').value;
        
        try {
            let imageUrl = originalImageUrl;
            if (postCropper) {
                 const canvas = postCropper.getCroppedCanvas({ width: 800, height: 600, imageSmoothingQuality: 'high' });
                 const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.9));
                 const storageRef = storage.ref(`posts/cropped_${Date.now()}.jpg`);
                 await storageRef.put(blob);
                 imageUrl = await storageRef.getDownloadURL();
            }

            const postData = {
                title: document.getElementById('post-title').value,
                date: document.getElementById('post-date').value,
                author: document.getElementById('post-author').value,
                excerpt: document.getElementById('post-excerpt').value,
                content: tinymce.get('post-content').getContent(),
                imageUrl,
                updatedAt: new Date()
            };

            if (id) {
                await db.collection('posts').doc(id).update(postData);
            } else {
                postData.createdAt = new Date();
                await db.collection('posts').add(postData);
            }
            closeModal(postModal);
            loadBlogPosts();
        } catch (error) {
            logger.reportError(error, "儲存文章失敗");
            alert(`儲存文章失敗: ${error.message}`);
        } finally {
            submitBtn.classList.remove('btn-loading');
            submitBtn.disabled = false;
        }
    }

    // =======================
    // 3. CRUD - 覓食消息 (News)
    // =======================

    async function loadNewsArticles(loadMore = false) {
        if (!loadMore) {
            isNewsLoaded = true;
            lastVisibleNews = null;
            newsListContainer.innerHTML = ''; // 清空
            showSkeletonLoader(newsListContainer, 5);
        }

        const loadMoreBtn = document.getElementById('load-more-news');
        loadMoreBtn.disabled = true;
        
        try {
            let query = db.collection('news').orderBy('date', 'desc').limit(pageSize);
            if (loadMore && lastVisibleNews) {
                query = query.startAfter(lastVisibleNews);
            }
            
            const snapshot = await query.get();

            if (!loadMore) {
                newsListContainer.innerHTML = '';
            }

            if (snapshot.empty && !loadMore) {
                newsListContainer.innerHTML = '<p>目前沒有任何消息。</p>';
                loadMoreBtn.style.display = 'none';
                return;
            }
            
            snapshot.forEach(doc => {
                const news = { id: doc.id, ...doc.data() };
                const itemDiv = document.createElement('div');
                itemDiv.className = 'list-item';
                itemDiv.innerHTML = `
                    <span class="item-title">${escapeHTML(news.title)}</span>
                    <span class="item-date">${escapeHTML(news.date)}</span>
                    <div class="item-actions">
                        <a href="${news.link}" target="_blank" rel="noopener noreferrer" class="view-link-btn">查看</a>
                        <button class="edit-btn" data-id="${news.id}" data-type="news">編輯</button>
                        <button class="delete-btn" data-id="${news.id}" data-collection="news">刪除</button>
                    </div>
                `;
                newsListContainer.appendChild(itemDiv);
            });

            lastVisibleNews = snapshot.docs[snapshot.docs.length - 1];

            if (snapshot.docs.length < pageSize) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'block';
            }
            
        } catch (error) {
            logger.reportError(error, "載入消息失敗");
            newsListContainer.innerHTML = '<p class="error-message">載入消息時發生錯誤。</p>';
        } finally {
            loadMoreBtn.disabled = false;
        }
    }

    function openNewsModal(id = null, news = null) {
        closeModal(newsModal); // 先徹底清空

        if (id && news) { // 編輯模式
            newsModalTitle.textContent = '編輯消息';
            document.getElementById('news-id').value = id;
            document.getElementById('news-title').value = news.title;
            document.getElementById('news-date').value = news.date;
            document.getElementById('news-link').value = news.link;
            document.getElementById('news-youtubeLink').value = news.youtubeLink || '';
            document.getElementById('news-excerpt').value = news.excerpt;
            document.getElementById('news-original-image-url').value = news.imageUrl || '';
            
            const preview = document.getElementById('news-image-preview');
            if (news.imageUrl) {
                preview.src = news.imageUrl;
                preview.style.display = 'block';
            }
        } else { // 新增模式
            newsModalTitle.textContent = '新增消息';
        }
        newsModal.style.display = 'block';
    }

    async function handleNewsFormSubmit(event) {
        event.preventDefault();
        const submitBtn = newsForm.querySelector('button[type="submit"]');
        submitBtn.classList.add('btn-loading');
        submitBtn.disabled = true;

        const id = document.getElementById('news-id').value;
        const originalImageUrl = document.getElementById('news-original-image-url').value;

        try {
            let imageUrl = originalImageUrl;
            if (newsCropper) {
                const canvas = newsCropper.getCroppedCanvas({ width: 550, height: 400, imageSmoothingQuality: 'high' });
                const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.9));
                const storageRef = storage.ref(`news/cropped_${Date.now()}.jpg`);
                await storageRef.put(blob);
                imageUrl = await storageRef.getDownloadURL();
            }

            const newsData = {
                title: document.getElementById('news-title').value,
                date: document.getElementById('news-date').value,
                link: document.getElementById('news-link').value,
                youtubeLink: document.getElementById('news-youtubeLink').value,
                excerpt: document.getElementById('news-excerpt').value,
                imageUrl,
                updatedAt: new Date()
            };

            if (id) {
                await db.collection('news').doc(id).update(newsData);
            } else {
                newsData.createdAt = new Date();
                await db.collection('news').add(newsData);
            }
            closeModal(newsModal);
            loadNewsArticles();
        } catch (error) {
            console.error("儲存消息失敗:", error);
            alert(`儲存消息失敗: ${error.message}`);
        } finally {
            submitBtn.classList.remove('btn-loading');
            submitBtn.disabled = false;
        }
    }

    // =======================
    // 4. 通用刪除功能
    // =======================

    async function deleteItem(collection, id) {
        if (confirm(`確定要刪除這筆【${collection}】資料嗎？此操作無法復原。`)) {
            try {
                await db.collection(collection).doc(id).delete();
                console.log(`成功刪除 ${collection} 中的文件 ${id}`);
                
                // 重新加載對應的列表
                if (collection === 'posts') loadBlogPosts();
                else if (collection === 'news') loadNewsArticles();

            } catch (error) {
                console.error(`刪除 ${collection} 文件 ${id} 失敗:`, error);
                alert(`刪除失敗: ${error.message}`);
            }
        }
    }

    // =======================
    // 5. 事件委派 (統一處理點擊)
    // =======================

    document.addEventListener('click', async (e) => {
        const target = e.target;

        // 新增按鈕
        if (target.id === 'add-post-btn') openPostModal();
        if (target.id === 'add-news-btn') openNewsModal();

        // 載入更多按鈕
        if (target.id === 'load-more-posts') loadBlogPosts(true);
        if (target.id === 'load-more-news') loadNewsArticles(true);

        // 預覽裁切按鈕
        if (target.id === 'post-preview-crop-btn') {
            if (postCropper) {
                const canvas = postCropper.getCroppedCanvas({ width: 220, height: 165 });
                document.getElementById('post-image-preview').src = canvas.toDataURL();
                document.getElementById('post-image-preview').style.display = 'block';
            }
        }
        if (target.id === 'news-preview-crop-btn') {
            if (newsCropper) {
                const canvas = newsCropper.getCroppedCanvas({ width: 220, height: 160 });
                document.getElementById('news-image-preview').src = canvas.toDataURL();
                document.getElementById('news-image-preview').style.display = 'block';
            }
        }

        // 編輯按鈕
        if (target.classList.contains('edit-btn')) {
            const id = target.dataset.id;
            const type = target.dataset.type;
            const docRef = db.collection(type === 'post' ? 'posts' : 'news').doc(id);
            const doc = await docRef.get();
            if (doc.exists) {
                if (type === 'post') openPostModal(id, doc.data());
                else openNewsModal(id, doc.data());
            }
        }
        
        // 刪除按鈕
        if (target.classList.contains('delete-btn')) {
            const id = target.dataset.id;
            const collection = target.dataset.collection;
            await deleteItem(collection, id);
        }

        // 關閉 Modal 按鈕
        if (target.classList.contains('close-btn')) {
            closeModal(target.closest('.modal'));
        }
    });
    
    // =======================
    // 6. 認證與初始化
    // =======================

    initTinyMCE();
    setupImageCropper('post-image-file', 'post-image-to-crop', 4 / 3);
    setupImageCropper('news-image-file', 'news-image-to-crop', 11 / 8);

    document.getElementById('logout-btn')?.addEventListener('click', () => auth.signOut());
    
    postForm.addEventListener('submit', handlePostFormSubmit);
    newsForm.addEventListener('submit', handleNewsFormSubmit);
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.hash = e.currentTarget.getAttribute('href');
        });
    });

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // 頁面載入時根據 hash 顯示對應內容

    console.log("All admin functionalities initialized.");
} 