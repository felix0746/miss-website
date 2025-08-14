/* ================================================= */
/* 覓食 MISS 官方網站 - 全域 JavaScript (重構版)   */
/* ================================================= */

// =================================
// 0. 日誌系統初始化
// =================================
// 檢測環境
const isDevelopment = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' ||
                     window.location.hostname.includes('192.168.');

// 創建生產環境安全的日誌器
const logger = {
    log: isDevelopment ? console.log.bind(console) : () => {},
    warn: isDevelopment ? console.warn.bind(console) : () => {},
    error: console.error.bind(console), // 錯誤訊息在生產環境也保留
    info: isDevelopment ? console.info.bind(console) : () => {},
    debug: isDevelopment ? console.debug.bind(console) : () => {},
    
    // 用於生產環境的錯誤報告
    reportError: (error, context = '') => {
        if (!isDevelopment) {
            // 這裡可以集成錯誤監控服務
        }
        console.error(`[${context}]`, error);
    }
};

// =================================
// 1. 全域狀態與設定
// =================================
const firebaseConfig = {
    apiKey: "AIzaSyCtMlFZVNvUHfvt-6Z03ucLVQdJ7E1o6Iw",
    authDomain: "miss-blog-backend-92eb6.firebaseapp.com",
    projectId: "miss-blog-backend-92eb6",
    storageBucket: "miss-blog-backend-92eb6.firebasestorage.app",
    messagingSenderId: "674705041997",
    appId: "1:674705041997:web:43eb49e38e35f2369f4a04",
    measurementId: "G-75MKXQMXYC"
};

let auth, db, storage;
let languageData = null;
let currentLanguage = localStorage.getItem('preferredLanguage') || 'zh-TW';

// 全域的 Firebase Ready Promise
// 這是解決所有 race condition 的關鍵
let resolveFirebaseReady;
const firebaseReady = new Promise(resolve => {
    resolveFirebaseReady = resolve;
});
window.firebaseReady = firebaseReady; // 顯式地將其掛載到 window，以便其他腳本(如 login.js)可以存取

/**
 * 
 * @param {string} unsafe 
 * @returns 
 */
function escapeHTML(unsafe) {
    if (typeof unsafe !== 'string') {
        return '';
    }
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// =================================
// 2. Firebase 初始化
// =================================

async function initializeFirebase() {
    try {
        const path = window.location.pathname;
        const isAdminPage = path.includes('admin.html') || path.includes('login.html');

        logger.log(`開始初始化 Firebase... (後台頁面: ${isAdminPage})`);

        // 1. 等待核心 App 物件載入
        await new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                if (typeof firebase !== 'undefined' && firebase.app) {
                    clearInterval(interval);
                    resolve();
                }
            }, 50);
        });

        // 2. 初始化 App (如果尚未初始化的話)
        if (firebase.apps.length === 0) {
            logger.log('初始化 Firebase App...');
            firebase.initializeApp(firebaseConfig);
        }

        // 3. 根據頁面，等待並設定必要的服務
        db = await waitForService('firestore');
        if (isAdminPage) {
            auth = await waitForService('auth');
            storage = await waitForService('storage');
        }
        
        logger.log('✅ 所有需要的 Firebase 服務都已就緒');
        resolveFirebaseReady(); // 通知所有等待的腳本，Firebase 準備好了
        return true;

    } catch (error) {
        logger.reportError(error, 'Firebase 初始化失敗');
        // 即使失敗也要 resolve，但可以帶一個失敗狀態
        resolveFirebaseReady({ error: error });
        return false;
    }
}

function waitForService(serviceName) {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 200; // 總共等待 10 秒
        const interval = setInterval(() => {
            if (typeof firebase !== 'undefined' && typeof firebase[serviceName] === 'function') {
                clearInterval(interval);
                logger.log(`- ${serviceName} 服務已載入`);
                resolve(firebase[serviceName]());
            } else if (++attempts >= maxAttempts) {
                clearInterval(interval);
                reject(new Error(`Firebase SDK (${serviceName}) 載入超時`));
            }
        }, 50);
    });
}

// =================================
// 3. 語言與翻譯函式
// =================================

async function loadTranslations() {
    try {
        const response = await fetch('languages.json');
        if (!response.ok) throw new Error('無法載入語言檔案');
        languageData = await response.json();
        logger.log('語言檔案載入成功');
    } catch (error) {
        logger.reportError(error, '語言檔案載入');
        languageData = {}; // 確保即使失敗也是一個物件
    }
}

function setLanguage(lang) {
    if (!languageData) {
        logger.warn("語言資料尚未準備好，無法設定語言。");
        return;
    }
    
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    document.documentElement.lang = lang === 'zh-TW' ? 'zh-TW' : 'en';

    const translations = languageData[lang] || {};

    document.querySelectorAll('[data-key], [data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-key') || element.getAttribute('data-lang-key');
        if (translations[key] !== undefined) {
            element.innerHTML = translations[key];
        }
    });

    document.querySelectorAll('[data-key-alt]').forEach(element => {
        const key = element.getAttribute('data-key-alt');
        if (translations[key] !== undefined) {
            element.setAttribute('alt', translations[key]);
        }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // 更新滑動塊的位置
    const switcher = document.querySelector('.language-switcher');
    if (switcher) {
        // 使用一個小延遲確保 class 的更新已經被瀏覽器渲染
        setTimeout(() => updateLangSlider(switcher), 50);
    }
}

function initializeLangSwitcherSlider() {
    const switcher = document.querySelector('.language-switcher');
    if (!switcher || switcher.querySelector('.lang-slider')) return;

    const slider = document.createElement('div');
    slider.className = 'lang-slider';
    switcher.prepend(slider);

    // 初始位置設定
    updateLangSlider(switcher);
}

function updateLangSlider(switcher) {
    const slider = switcher.querySelector('.lang-slider');
    const activeButton = switcher.querySelector('.lang-btn.active');
    if (!slider || !activeButton) return;

    const switcherRect = switcher.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    // 減去 switcher 的 padding (4px)
    const offsetLeft = buttonRect.left - switcherRect.left - 4;

    slider.style.width = `${buttonRect.width}px`;
    slider.style.transform = `translateX(${offsetLeft}px)`;
}

// =================================
// 4. 網站共用元件載入與互動功能初始化
// =================================

// 此函式負責初始化所有互動元素
function initializeSiteScripts() {
    const header = document.getElementById('main-header');
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.main-nav');
    const contactBtn = document.getElementById('contact-toggle-btn');
    const contactInfo = document.getElementById('contact-info-panel');
    const dropdowns = document.querySelectorAll('.main-nav .dropdown');

    // 防止重複綁定
    if (header && header.dataset.initialized) return;
    if(header) header.dataset.initialized = 'true';

    // 手機版導覽列
    navToggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        const isVisible = nav.getAttribute('data-visible') === 'true';
        nav.setAttribute('data-visible', String(!isVisible));
        navToggle.setAttribute('aria-expanded', String(!isVisible));
        document.body.classList.toggle('no-scroll', !isVisible);
    });

    // 下拉選單
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        if (link && dropdown.querySelector('.dropdown-content')) {
            link.addEventListener('click', e => {
                e.preventDefault();
                e.stopPropagation();
                const parent = link.parentElement;
                const isExpanded = parent.getAttribute('aria-expanded') === 'true';
                document.querySelectorAll('.main-nav .dropdown[aria-expanded="true"]').forEach(d => {
                    if (d !== parent) d.setAttribute('aria-expanded', 'false');
                });
                parent.setAttribute('aria-expanded', String(!isExpanded));
            });
        }
    });

    // 點擊頁面其他地方關閉選單
    document.addEventListener('click', () => {
        document.querySelectorAll('.main-nav .dropdown[aria-expanded="true"]').forEach(d => {
            d.setAttribute('aria-expanded', 'false');
        });
        const mainNav = document.querySelector('.main-nav');
        const mobileToggle = document.querySelector('.mobile-nav-toggle');
        if (mainNav?.getAttribute('data-visible') === 'true') {
            mainNav.setAttribute('data-visible', 'false');
            mobileToggle?.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('no-scroll');
        }
    });

    // 頁尾「聯繫我們」按鈕
    if (contactBtn && !contactBtn._contactHandlerBound) {
        contactBtn.addEventListener('click', () => {
            const isExpanded = contactBtn.getAttribute('aria-expanded') === 'true';
            contactBtn.setAttribute('aria-expanded', String(!isExpanded));
            contactInfo?.classList.toggle('visible');
        });
        contactBtn._contactHandlerBound = true;
    }

    // 語言切換按鈕
    document.querySelectorAll('.lang-btn').forEach(button => {
        if (!button._langHandler) {
            button._langHandler = (e) => {
                e.stopPropagation(); 
                setLanguage(e.target.dataset.lang);
            };
            button.addEventListener('click', button._langHandler);
        }
    });

    // 初始化語言切換器的滑動效果
    initializeLangSwitcherSlider();

    // 初始化後，立即套用一次當前語言
    setLanguage(currentLanguage);

    initializeLogoCarousel();

    initializeMilestoneCarousel();

    setupPageTabs();
    
    // 頁籤滾動效果
    initializeStickyTabs();
}

/**
 * 初始化頁籤的 sticky 效果
 * 當用戶滾動時，為頁籤添加陰影效果
 */
function initializeStickyTabs() {
    const pageTabs = document.querySelector('.page-tabs');
    if (!pageTabs) return;
    
    // 防止重複初始化
    if (pageTabs.dataset.stickyInitialized) return;
    pageTabs.dataset.stickyInitialized = 'true';
    
    let scrollTimeout;
    
    const handleScroll = () => {
        clearTimeout(scrollTimeout);
        
        // 根據螢幕尺寸決定header高度
        const isMobile = window.innerWidth <= 768;
        const headerHeight = isMobile ? 70 : 75;
        
        // 立即檢查滾動位置
        const rect = pageTabs.getBoundingClientRect();
        const isSticky = rect.top <= headerHeight;
        
        if (isSticky && !pageTabs.classList.contains('scrolled')) {
            pageTabs.classList.add('scrolled');
        } else if (!isSticky && pageTabs.classList.contains('scrolled')) {
            // 延遲移除 class，避免頻繁切換
            scrollTimeout = setTimeout(() => {
                const currentRect = pageTabs.getBoundingClientRect();
                if (currentRect.top > headerHeight) {
                    pageTabs.classList.remove('scrolled');
                }
            }, 100);
        }
    };
    
    // 使用 throttle 來優化性能
    let isThrottled = false;
    const throttledHandleScroll = () => {
        if (!isThrottled) {
            requestAnimationFrame(() => {
                handleScroll();
                isThrottled = false;
            });
            isThrottled = true;
        }
    };
    
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    // 初始檢查
    handleScroll();
}

/**
 * 初始化 Logo 無限輪播功能
 * - 電腦版: 使用 CSS animation 實現無限輪播。
 * - 手機版: 使用 JS requestAnimationFrame 實現自動輪播，並在使用者觸控時暫停，提供手動滑動功能。
 */
function initializeLogoCarousel() {
    const wrapper = document.querySelector('.logo-carousel-wrapper');
    const logoGrid = document.querySelector('.logo-grid');
    if (!wrapper || !logoGrid || logoGrid.children.length === 0) return;

    // 防止重複初始化
    if (wrapper.dataset.carouselInitialized) return;
    wrapper.dataset.carouselInitialized = 'true';

    // 為無縫循環複製商標 (電腦和手機都需要)
    const originalLogos = Array.from(logoGrid.children);
    originalLogos.forEach(logo => {
        const clone = logo.cloneNode(true);
        clone.classList.add('logo-clone');
        clone.setAttribute('aria-hidden', 'true');
        logoGrid.appendChild(clone);
    });

    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const setupMobileCarousel = () => {
        let isInteracting = false;
        let animationFrameId = null;
        const contentWidth = logoGrid.scrollWidth / 2;

        const scrollStep = () => {
            if (!isInteracting) {
                wrapper.scrollLeft += 0.5;
                if (wrapper.scrollLeft >= contentWidth) {
                    wrapper.scrollLeft -= contentWidth;
                }
            }
            animationFrameId = requestAnimationFrame(scrollStep);
        };

        const startCarousel = () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            // 只有在使用者沒有互動時才開始
            if (!isInteracting) {
                animationFrameId = requestAnimationFrame(scrollStep);
            }
        };

        const stopCarousel = () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };

        let interactionTimeout = null;
        const onStartInteraction = () => {
            isInteracting = true;
            clearTimeout(interactionTimeout);
        };

        const onEndInteraction = () => {
            clearTimeout(interactionTimeout);
            interactionTimeout = setTimeout(() => {
                isInteracting = false;
                startCarousel(); // 手動操作結束後，重新啟動自動輪播
            }, 2000); 
        };

        // 觸控開始時，設定互動旗標
        wrapper.addEventListener('touchstart', onStartInteraction, { passive: true });
        // 觸控結束時，重設旗標並準備重啟輪播
        wrapper.addEventListener('touchend', onEndInteraction);
        wrapper.addEventListener('touchcancel', onEndInteraction);

        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                startCarousel();
            } else {
                stopCarousel();
            }
        }, { threshold: 0.01 });
        observer.observe(wrapper);
    };

    const setupDesktopCarousel = () => {
        const animations = logoGrid.getAnimations();
        const scrollAnimation = animations.find(anim => anim.animationName === 'scroll');

        // 如果找不到動畫或瀏覽器不支援，退回原本的暫停/播放邏輯
        if (!scrollAnimation) {
            logger.warn("Web Animations API not fully supported. Falling back to pause/resume on hover.");
            const pauseAnimation = () => logoGrid.style.animationPlayState = 'paused';
            const resumeAnimation = () => logoGrid.style.animationPlayState = 'running';

            wrapper.addEventListener('mouseenter', pauseAnimation);
            wrapper.addEventListener('mouseleave', resumeAnimation);

            const observer = new IntersectionObserver(entries => {
                entries[0].isIntersecting ? resumeAnimation() : pauseAnimation();
            }, { threshold: 0.01 });
            observer.observe(wrapper);
            return;
        }

        // --- 使用 Web Animations API 控制播放速率 ---

        const slowDownAnimation = () => {
            scrollAnimation.playbackRate = 0.5; // 滑鼠移入時，速度降為 50%
        };
        const resumeNormalSpeed = () => {
            scrollAnimation.playbackRate = 1.0; // 滑鼠移開時，恢復正常速度
        };

        wrapper.addEventListener('mouseenter', slowDownAnimation);
        wrapper.addEventListener('mouseleave', resumeNormalSpeed);

        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                scrollAnimation.play();
            } else {
                scrollAnimation.pause();
            }
        }, { threshold: 0.01 });
        observer.observe(wrapper);
    };

    if (mediaQuery.matches) {
        setupMobileCarousel();
    } else {
        setupDesktopCarousel();
    }
}

/**
 * 初始化覓食大事紀輪播功能
 * - 使用 CSS animation 實現無限輪播。
 * - 使用 Web Animations API 控制滑鼠懸停時的播放速度。
 * - 複製元素以實現無縫循環。
 */
function initializeMilestoneCarousel() {
    const wrapper = document.querySelector('.milestone-carousel-wrapper');
    const track = document.querySelector('.milestone-carousel-track');
    if (!wrapper || !track || !track.children.length) return;
    if (wrapper.dataset.carouselInitialized) return;
    wrapper.dataset.carouselInitialized = 'true';

    const originalCards = Array.from(track.children);
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add('milestone-clone');
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    });
    
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const setupMobileCarousel = () => {
        let isInteracting = false;
        let animationFrameId = null;
        const contentWidth = track.scrollWidth / 2;

        const scrollStep = () => {
            if (!isInteracting) {
                wrapper.scrollLeft += 0.5;
                if (wrapper.scrollLeft >= contentWidth) {
                    wrapper.scrollLeft -= contentWidth;
                }
            }
            animationFrameId = requestAnimationFrame(scrollStep);
        };

        const startCarousel = () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (!isInteracting) {
                animationFrameId = requestAnimationFrame(scrollStep);
            }
        };
        const stopCarousel = () => cancelAnimationFrame(animationFrameId);

        let interactionTimeout = null;
        const onStartInteraction = () => {
            isInteracting = true;
            clearTimeout(interactionTimeout);
        };
        const onEndInteraction = () => {
            clearTimeout(interactionTimeout);
            interactionTimeout = setTimeout(() => {
                isInteracting = false;
                startCarousel();
            }, 2000);
        };

        wrapper.addEventListener('touchstart', onStartInteraction, { passive: true });
        wrapper.addEventListener('touchend', onEndInteraction);
        wrapper.addEventListener('touchcancel', onEndInteraction);

        const observer = new IntersectionObserver(entries => {
            entries[0].isIntersecting ? startCarousel() : stopCarousel();
        }, { threshold: 0.01 });
        observer.observe(wrapper);
    };

    const setupDesktopCarousel = () => {
        const animations = track.getAnimations();
        const scrollAnimation = animations.find(anim => anim.animationName === 'milestone-scroll');

        if (!scrollAnimation) {
            logger.warn("Milestone carousel animation not found. Fallback to CSS hover.");
            wrapper.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
            wrapper.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
            return;
        }

        const slowDownAnimation = () => scrollAnimation.playbackRate = 0.5;
        const resumeNormalSpeed = () => scrollAnimation.playbackRate = 1.0;

        wrapper.addEventListener('mouseenter', slowDownAnimation);
        wrapper.addEventListener('mouseleave', resumeNormalSpeed);

        const observer = new IntersectionObserver(entries => {
            entries[0].isIntersecting ? scrollAnimation.play() : scrollAnimation.pause();
        }, { threshold: 0.01 });
        observer.observe(wrapper);
    };

    if (mediaQuery.matches) {
        setupMobileCarousel();
    } else {
        setupDesktopCarousel();
    }
}

// 此函式負責載入頁首與頁尾
async function loadSharedComponents() {
    const headerPlaceholder = document.getElementById('main-header');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    const promises = [];

    // Only load header if the placeholder exists and is empty
    if (headerPlaceholder && headerPlaceholder.children.length === 0) {
        promises.push(
            fetch('header.html')
                .then(res => res.text())
                .then(html => {
                    if (headerPlaceholder) {
                        // To avoid nesting <header> tags, parse the fetched HTML
                        // and inject only the *content* of the fetched header.
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        const headerContent = doc.querySelector('#main-header')?.innerHTML;
                        if (headerContent) {
                            headerPlaceholder.innerHTML = headerContent;
                        }
                    }
                })
        );
    }

    if (footerPlaceholder) {
        promises.push(
            fetch('footer.html')
                .then(res => res.text())
                .then(html => {
                    // 確保 placeholder 仍然存在
                    const currentPlaceholder = document.getElementById('footer-placeholder');
                    if (currentPlaceholder) {
                        currentPlaceholder.outerHTML = html;
                    }
                })
        );
    }

    await Promise.all(promises);
}

/**
 * 接收原始圖片 URL，返回縮圖 URL。
 * 如果縮圖不存在，則返回原始 URL 作為備用。
 * @param {string} originalUrl - 原始圖片的 Firebase Storage URL
 * @returns {Promise<string>} - 解析為可用的圖片 URL
 */
async function getThumbnailUrl(originalUrl) {
    if (!originalUrl || !originalUrl.includes('firebasestorage.googleapis.com')) {
        return originalUrl; // 如果不是 Storage URL，直接返回
    }

    const thumbUrl = originalUrl.replace(/%2F(?!thumb_)([^?]+)\?/, '%2Fthumb_$1?');

    try {
        const response = await fetch(thumbUrl, { method: 'HEAD' });
        if (response.ok) {
            return thumbUrl; // 縮圖存在，返回縮圖 URL
        }
        return originalUrl; // 縮圖不存在或有問題，返回原始 URL
    } catch (error) {
        logger.warn('檢查縮圖失敗，使用原始圖片:', error);
        return originalUrl; // 網路錯誤等，返回原始 URL
    }
}

// =================================
// 5. 動態內容載入 (Firebase 或 Mock Data)
// =================================

async function loadBlogPosts(containerSelector = '.blog-post-list') {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    if (container.dataset.loaded === 'true') return;

    container.innerHTML = '<p>載入中...</p>';
    
    const parentPane = container.closest('.tab-pane');
    const tabsContainer = parentPane ? parentPane.querySelector('.year-tabs') : null;

    let allPosts = [];
    try {
        if (!db) throw new Error('Firebase DB 未初始化');
        const snapshot = await db.collection('posts').orderBy('date', 'desc').get();
        allPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        logger.reportError(error, "工作日誌載入");
        container.innerHTML = `<p>暫時無法載入工作日誌列表。</p>`;
        return;
    }
    
    // 如果有年份頁籤容器，就建立頁籤
    if (tabsContainer) {
        const years = [...new Set(allPosts.map(post => new Date(post.date).getFullYear()))].sort((a, b) => b - a);
        tabsContainer.innerHTML = '';
        years.forEach(year => {
            const button = document.createElement('a');
            button.href = '#';
            button.className = 'year-tab';
            button.textContent = `${year}`;
            button.dataset.year = year;
            tabsContainer.appendChild(button);
        });

        tabsContainer.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target;
            if (target.classList.contains('year-tab')) {
                tabsContainer.querySelector('.active')?.classList.remove('active');
                target.classList.add('active');
                const year = target.dataset.year;
                const filtered = allPosts.filter(p => new Date(p.date).getFullYear() == year);
                displayPosts(filtered);
            }
        });
        
        // 預設點擊第一個年份
        if (tabsContainer.firstChild) {
            tabsContainer.firstChild.click();
        } else {
            displayPosts(allPosts);
        }
    } else {
        displayPosts(allPosts);
    }
    
    container.dataset.loaded = 'true';

    function displayPosts(posts) {
        if (!posts || posts.length === 0) {
            container.innerHTML = '<p>此分類暫無日誌。</p>';
            return;
        }
        
        container.innerHTML = '';
        posts.forEach(post => {
            let postDate = '日期未知';
            try {
                const dateObj = post.date?.toDate ? post.date.toDate() : new Date(post.date);
                if (!isNaN(dateObj)) {
                   postDate = dateObj.toLocaleDateString();
                }
            } catch (e) { /* 保持未知 */ }

            const excerpt = post.excerpt || (post.content ? post.content.substring(0, 100).replace(/<[^>]+>/g, '') + '...' : '點此閱讀更多內容...');
            
            const postUrl = `/posts/${post.id}.html`; // NEW: Use static-like URL

            const imageBlock = post.imageUrl ? `
                <div class="post-image">
                    <a href="${postUrl}">
                        <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="${escapeHTML(post.imageUrl)}" alt="${escapeHTML(post.title)}" class="lazy-load" loading="lazy">
                    </a>
                </div>
            ` : '';

            const postElement = document.createElement('div');
            postElement.className = 'blog-post-item';
            postElement.innerHTML = `
                ${imageBlock}
                <div class="post-content">
                    <h3 class="post-title">
                        <a href="${postUrl}">${escapeHTML(post.title)}</a>
                    </h3>
                    <div class="post-meta">
                        <span class="post-date">${postDate}</span>
                    </div>
                    <p class="post-excerpt">${escapeHTML(excerpt)}</p>
                    <a href="${postUrl}" class="read-more-link">Read more</a>
                </div>
            `;
            container.appendChild(postElement);
        });

        const lazyImages = container.querySelectorAll('.lazy-load');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(async entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        const thumbnailUrl = await getThumbnailUrl(src);
                        img.src = thumbnailUrl;
                        img.classList.remove('lazy-load');
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => {
            observer.observe(img);
        });
    }
}

async function loadSinglePost() {
    logger.debug('嘗試載入單篇文章...');
    const postContainer = document.getElementById('post-content-container');
    // NEW: Use the globally resolved post ID from post.html's inline script
    const postId = window.postId;

    if (!postContainer) {
        logger.debug('不在文章頁面，跳過載入單篇文章。');
        return;
    }

    if (!postId) {
        postContainer.innerHTML = '<p data-key="post_not_found">找不到指定的文章。</p>';
        setLanguage(currentLanguage); // 更新翻譯
        return;
    }

    try {
        await firebaseReady;
        const docRef = db.collection('posts').doc(postId);
        const docSnap = await docRef.get();

        if (docSnap.exists) {
            const data = docSnap.data();

            document.title = `${data.title} - 覓食 MISS`;

            // --- 新增：動態生成並插入結構化資料 ---
            const scriptTag = document.createElement('script');
            scriptTag.type = 'application/ld+json';
            scriptTag.textContent = JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": data.title,
                "author": {
                    "@type": "Person",
                    "name": data.author || "覓食 MISS"
                },
                "datePublished": dateObject.toISOString(),
                "image": data.imageUrl || "https://miss-blog-backend-92eb6.web.app/images/banner.webp",
                "publisher": {
                    "@type": "Organization",
                    "name": "覓食 MISS",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://miss-blog-backend-92eb6.web.app/images/MISS.png"
                    }
                }
            });
            document.head.appendChild(scriptTag);
            // --- 結束 ---

            const dateObject = (data.date && typeof data.date.toDate === 'function')
                ? data.date.toDate()  // Firestore Timestamp
                : new Date(data.date); // String or other format

            const postDate = dateObject.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            let contentHtml = `
                <h1 class="single-post-title">${escapeHTML(data.title)}</h1>
                <div class="single-post-meta">
                    <span>作者：${escapeHTML(data.author)}</span> | <span>發布於：${postDate}</span>
                </div>
                <div class="post-body">${data.content}</div>
            `;

            postContainer.innerHTML = contentHtml;

            // 重新啟用圖片優化（修正版）- 確保圖片正常顯示
            const images = postContainer.querySelectorAll('.post-body img');
            images.forEach(img => {
                // 等待圖片載入完成再進行優化
                const handleImageOptimization = () => {
                    const originalSrc = img.src || img.getAttribute('src');
                    if (originalSrc && (originalSrc.includes('.png') || originalSrc.includes('.jpg') || originalSrc.includes('.jpeg'))) {
                        // 檢查是否為 Firebase Storage 的圖片
                        if (originalSrc.includes('firebasestorage.googleapis.com') || originalSrc.includes('storage.googleapis.com')) {
                            // Firebase Storage 圖片，嘗試 WebP 優化
                            const webpSrc = originalSrc.replace(/\.(png|jpe?g)$/i, '.webp');
                            
                            // 創建 picture 元素
                            const picture = document.createElement('picture');
                            const source = document.createElement('source');
                            source.srcset = webpSrc;
                            source.type = 'image/webp';
                            
                            // 複製原始圖片及其屬性
                            const newImg = img.cloneNode(true);
                            newImg.src = originalSrc; // 確保 fallback 圖片正確
                            
                            picture.appendChild(source);
                            picture.appendChild(newImg);
                            
                            // 替換原始圖片
                            img.parentNode.replaceChild(picture, img);
                        }
                        // 如果不是 Firebase Storage 圖片，保持原樣
                    }
                };

                // 如果圖片已經載入，立即處理
                if (img.complete) {
                    handleImageOptimization();
                } else {
                    // 否則等待載入完成
                    img.onload = handleImageOptimization;
                    img.onerror = () => {
                        // 載入失敗時確保圖片仍然顯示
                        logger.warn('圖片載入失敗:', img.src);
                    };
                }
            });


        } else {
            logger.warn('找不到該文章!');
            postContainer.innerHTML = '<p data-key="post_not_found">找不到指定的文章。</p>';
        }
        // 執行翻譯
        setLanguage(currentLanguage);

    } catch (error) {
        logger.reportError(error, '單篇文章載入');
        postContainer.innerHTML = '<p data-key="post_load_error">載入文章時發生錯誤，請稍後再試。</p>';
        setLanguage(currentLanguage);
    }
}

function initializeBackToTopButton() {
    // 使用 setTimeout 確保 DOM 完全更新後再初始化
    setTimeout(() => {
        const backToTopButton = document.getElementById('back-to-top');

        if (!backToTopButton) {
            logger.warn('上滑按鈕元素未找到，嘗試延遲初始化...');
            // 如果還是找不到，再嘗試一次
            setTimeout(() => {
                const retryButton = document.getElementById('back-to-top');
                if (retryButton) {
                    setupBackToTopEvents(retryButton);
                } else {
                    logger.error('上滑按鈕元素載入失敗');
                }
            }, 500);
            return;
        }

        setupBackToTopEvents(backToTopButton);
    }, 100);
}

function setupBackToTopEvents(backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    logger.log('✅ 上滑按鈕已成功初始化');
}

async function loadNewsArticles(containerSelector, options = {}) {
    const container = document.querySelector(containerSelector);
    if (!container) { return; }
    if (container.dataset.loaded === 'true' && !options.force) { return; }

    const { limit = null, collection = 'news' } = options;
    container.innerHTML = '<p>載入中...</p>';
    
    const parentPane = container.closest('.tab-pane');
    const tabsContainer = parentPane ? parentPane.querySelector('.year-tabs') : null;

    try {
        if (!db) throw new Error('Firebase DB 未初始化');
        let query = db.collection(collection).orderBy('date', 'desc');
        // We don't limit if we need to create year tabs
        if (limit && !tabsContainer) {
            query = query.limit(limit);
        }
        
        const snapshot = await query.get();
        const allNews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (tabsContainer) {
            const years = [...new Set(allNews.map(item => new Date(item.date).getFullYear()))].sort((a, b) => b - a);
            tabsContainer.innerHTML = '';
            years.forEach(year => {
                const button = document.createElement('a');
                button.href = '#';
                button.className = 'year-tab';
                button.textContent = `${year}`;
                button.dataset.year = year;
                tabsContainer.appendChild(button);
            });

            tabsContainer.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target;
                if (target.classList.contains('year-tab')) {
                    tabsContainer.querySelector('.active')?.classList.remove('active');
                    target.classList.add('active');
                    const year = target.dataset.year;
                    const filtered = allNews.filter(n => new Date(n.date).getFullYear() == year);
                    displayNews(filtered);
                }
            });

            if (tabsContainer.firstChild) {
                tabsContainer.firstChild.click();
            } else {
                displayNews(allNews);
            }
        } else {
            // If no year tabs, just display the (potentially limited) news
            displayNews(limit ? allNews.slice(0, limit) : allNews);
        }

        container.dataset.loaded = 'true';

    } catch (error) {
        logger.reportError(error, `${collection} 資料載入`);
        container.innerHTML = `<p>無法載入內容。</p>`;
    }

    function displayNews(newsItems) {
        if (!newsItems || newsItems.length === 0) {
            container.innerHTML = '<p>此分類暫無消息。</p>';
            return;
        }

        container.innerHTML = ''; // 清空「載入中」提示
        newsItems.forEach(news => {
            const newsEl = document.createElement('div');
            newsEl.className = 'news-item';
            
            const articleLink = news.link;
            const hasArticleLink = articleLink && typeof articleLink === 'string' && articleLink.trim() !== '';

            let imageHtml = '';
            if (news.image) {
                const imageLink = news.youtubeLink || news.link;
                const hasImageLink = imageLink && typeof imageLink === 'string' && imageLink.trim() !== '';
                
                const imageTag = `<img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="${escapeHTML(news.image)}" alt="${escapeHTML(news.title)}" class="lazy-load" loading="lazy">`;
                const imageContainerClass = `news-image ${news.youtubeLink ? 'video-thumbnail' : ''}`;
    
                imageHtml = hasImageLink
                    ? `<a href="${imageLink}" target="_blank" rel="noopener noreferrer" class="${imageContainerClass}">${imageTag}</a>`
                    : `<div class="${imageContainerClass}">${imageTag}</div>`;
            } else {
                // 如果沒有圖片，顯示預設的 placeholder
                imageHtml = `
                    <div class="news-image-placeholder">
                        <img src="images/miss-logo-watermark.png" alt="覓食 MISS LOGO">
                    </div>
                `;
            }
            
            const titleHtml = hasArticleLink
                ? `<h3><a href="${articleLink}" target="_blank" rel="noopener noreferrer">${news.title}</a></h3>`
                : `<h3>${news.title}</h3>`;

            const readMoreHtml = hasArticleLink
                ? `<a href="${articleLink}" target="_blank" rel="noopener noreferrer" class="read-more-link">Read more</a>`
                : '';
            
            newsEl.innerHTML = `
                ${imageHtml}
                <div class="news-content">
                    ${titleHtml}
                    <p class="news-date">${news.date}</p>
                    <p class="news-excerpt">${news.excerpt || ''}</p>
                    ${readMoreHtml}
                </div>
            `;

            container.appendChild(newsEl);
        });

        // --- 補上遺失的 Lazy Load 監聽器 ---
        const lazyImages = container.querySelectorAll('.lazy-load');
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.dataset.src;
                        if (src) {
                            img.src = src;
                            img.classList.remove('lazy-load');
                        }
                        observer.unobserve(img);
                    }
                });
            });
            lazyImages.forEach(img => observer.observe(img));
        } else {
            // Fallback for older browsers
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy-load');
            });
        }
    }
}

// =================================
// 6. 全站初始化
// =================================

async function init() {
    logger.log("DOM 已載入，開始初始化程序...");

    // 1. 載入共用元件 (頁首/頁尾) 和語言檔
    await Promise.all([
        loadSharedComponents(),
        loadTranslations()
    ]);
    logger.log("共用元件與語言檔已載入。");

    // 2. 初始化所有網站層級的互動腳本 (例如導覽列、下拉選單、通用頁籤功能)
    initializeSiteScripts();
    logger.log("網站互動腳本已初始化。");

    // 3. 初始化 Firebase
    await initializeFirebase();
    logger.log("Firebase 初始化流程完成。");

    // 4. 初始化語言切換器滑動效果
    initializeLangSwitcherSlider();

    // 5. 初始化返回頂部按鈕
    initializeBackToTopButton();

    // 6. 根據目前頁面，載入特定的內容
    const path = window.location.pathname;

    if (path.includes('news.html')) {
        logger.log("位於覓食消息頁面，設定內容載入...");
        // 確保預設頁籤正確顯示（不重複調用 setupPageTabs，因為 initializeSiteScripts 已經調用過了）
        const activeTab = document.querySelector('.page-tabs a.active');
        const activePane = document.querySelector('.tab-pane.active');
        logger.debug(`活躍頁籤: ${activeTab?.dataset.tab}, 活躍面板: ${activePane?.id}`);
        
        // 如果預設是覓食大事紀，確保內容可見
        if (activeTab && activeTab.dataset.tab === 'milestones' && activePane && activePane.id === 'milestones') {
            logger.debug("預設顯示覓食大事紀頁籤 - 內容應該可見");
        }

        // 為頁籤設定點擊事件，以載入對應內容
        const newsTabsContainer = document.querySelector('.page-tabs');
        newsTabsContainer?.addEventListener('click', e => {
            const targetLink = e.target.closest('a[data-tab]');
            if (!targetLink) return;
            
            e.preventDefault(); // 防止頁面跳轉
            
            // 頁籤切換的視覺效果由通用的 setupPageTabs 處理，這裡專注於載入資料
            const tab = targetLink.dataset.tab;

            if (tab === 'press') {
                // 媒體報導
                loadNewsArticles('#press .news-list-container', { collection: 'news' });
            } else if (tab === 'blog') {
                // 工作日誌
                loadBlogPosts('#blog .blog-post-list');
            }
            // "milestones" 頁籤不需要任何動作，因為它是靜態的
        });

    } else if (path.includes('post.html')) {
        // 載入單篇文章頁面
        loadSinglePost();
    } else if (document.querySelector('.blog-post-list')) {
        // 這是為了相容舊的 blog 頁面，如果還有的話
        loadBlogPosts();
    } else if (path.includes('index.html') || path.endsWith('/')) {
        // 載入首頁的最新消息 (媒體報導)
        loadNewsArticles('.news-list-container', { limit: 3, collection: 'news' });
    }
    
    logger.log("✅ 初始化程序完成。");
}

/**
 * 處理頁面中的頁籤切換邏輯 (通用版)
 */
function setupPageTabs() {
    // 尋找頁面中所有的頁籤容器
    const tabContainers = document.querySelectorAll('.page-tabs');
    if (tabContainers.length === 0) return;

    tabContainers.forEach(container => {
        // 防止重複初始化
        if (container.dataset.tabsInitialized) return;
        container.dataset.tabsInitialized = 'true';
        
        const tabLinks = container.querySelectorAll('a[data-tab]');
        // 使用 CSS 選擇器找到與導覽列相關的內容面板
        const contentWrapper = container.nextElementSibling;
        if (!contentWrapper || !contentWrapper.classList.contains('tab-content-wrapper')) return;
        
        const tabPanes = contentWrapper.querySelectorAll('.tab-pane');

        container.addEventListener('click', (e) => {
            const targetLink = e.target.closest('a[data-tab]');
            if (!targetLink) return;

            e.preventDefault();

            tabLinks.forEach(link => link.classList.remove('active'));
            targetLink.classList.add('active');

            tabPanes.forEach(pane => pane.classList.remove('active'));

            const targetPane = contentWrapper.querySelector(`#${targetLink.dataset.tab}`);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
        
        logger.debug('頁籤已初始化，保留現有的 active 狀態');
    });
}

// --- 子頁面頁籤切換功能 ---
const handleTabSwitching = (tabsContainerId) => {
    const tabsContainer = document.getElementById(tabsContainerId);
    if (!tabsContainer) return;

    const tabs = tabsContainer.querySelectorAll('a');
    const panes = document.querySelectorAll('.tab-pane');

    const activateTab = (activeTab) => {
        tabs.forEach(tab => {
            const isAriaSelected = tab.getAttribute('aria-selected') === 'true';
            if (tab === activeTab) {
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
            } else {
                tab.classList.remove('active');
                tab.setAttribute('aria-selected', 'false');
            }
        });

        panes.forEach(pane => {
            if (pane.id === activeTab.dataset.tab) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            history.pushState(null, null, e.currentTarget.href); // 更新網址，但不重新載入
            activateTab(tab);
            window.scrollTo(0, tabsContainer.offsetTop - 100); // 捲動到頁籤區塊
        });
    });

    // 檢查載入時的 URL hash，並啟動對應的 tab
    const currentHash = window.location.hash.substring(1);
    if (currentHash) {
        const tabToActivate = [...tabs].find(tab => tab.dataset.tab === currentHash);
        if (tabToActivate) {
            activateTab(tabToActivate);
        }
    }
};

// --- 根據頁面初始化對應的頁籤功能 ---
if (document.getElementById('about-tabs')) {
    handleTabSwitching('about-tabs');
}

if (document.getElementById('service-tabs')) {
    handleTabSwitching('service-tabs');
}

if (document.getElementById('press-tabs')) {
    handleTabSwitching('press-tabs');
}

if (document.getElementById('blog-tabs')) {
    handleTabSwitching('blog-tabs');
}

if (document.getElementById('milestones-tabs')) {
    handleTabSwitching('milestones-tabs');
}

// 當 DOM 載入完成後，啟動所有腳本
document.addEventListener('DOMContentLoaded', init);