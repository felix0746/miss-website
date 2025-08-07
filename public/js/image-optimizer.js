/* ================================================= */
/* 圖片優化系統 - Lazy Loading & Responsive Images */
/* ================================================= */

class ImageOptimizer {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        // 等待 DOM 載入完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupLazyLoading());
        } else {
            this.setupLazyLoading();
        }
    }

    setupLazyLoading() {
        // 檢查瀏覽器支援 Intersection Observer
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        this.observer.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '50px 0px', // 提前 50px 開始載入
                threshold: 0.01
            });

            // 找到所有需要懶載入的圖片
            this.setupLazyImages();
        } else {
            // 回退方案：直接載入所有圖片
            this.loadAllImages();
        }
    }

    setupLazyImages() {
        // 只處理明確標記為懶載入的圖片
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        lazyImages.forEach(img => {
            this.observer.observe(img);
        });

        // 處理 picture 元素中的 source
        const sources = document.querySelectorAll('source[srcset]');
        sources.forEach(source => {
            if (!source.dataset.srcset) {
                source.dataset.srcset = source.srcset;
                source.removeAttribute('srcset');
            }
        });
    }

    loadImage(img) {
        // 載入圖片
        const src = img.dataset.src;
        if (!src) return;

        // 處理 picture 元素
        const picture = img.closest('picture');
        if (picture) {
            const sources = picture.querySelectorAll('source[data-srcset]');
            sources.forEach(source => {
                source.srcset = source.dataset.srcset;
                source.removeAttribute('data-srcset');
            });
        }

        // 創建新圖片預載入
        const imageLoader = new Image();
        imageLoader.onload = () => {
            img.src = src;
            img.classList.add('loaded');
            
            // 效能監控
            if (window.performanceMonitor) {
                window.performanceMonitor.recordCustomMetric('images_loaded', 1, 'count');
            }
        };
        
        imageLoader.onerror = () => {
            img.classList.add('error');
            logger.warn('圖片載入失敗:', src);
        };
        
        imageLoader.src = src;
        img.removeAttribute('data-src');
    }

    loadAllImages() {
        // 回退方案：載入所有圖片
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => this.loadImage(img));
    }

    generatePlaceholder(img) {
        // 生成輕量級 placeholder
        const width = img.getAttribute('width') || 200;
        const height = img.getAttribute('height') || 150;
        
        // 創建簡單的 SVG placeholder
        const svg = `
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
                <rect width="100%" height="100%" fill="#f0f0f0"/>
                <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999" font-family="Arial, sans-serif" font-size="14">載入中...</text>
            </svg>
        `;
        
        return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
    }

    // 公開方法：手動觸發圖片載入
    loadImageNow(selector) {
        const img = document.querySelector(selector);
        if (img && img.dataset.src) {
            this.loadImage(img);
        }
    }

    // 公開方法：重新掃描新增的圖片
    scanNewImages() {
        this.setupLazyImages();
    }
}

// 創建全域實例
const imageOptimizer = new ImageOptimizer();

// 將優化器掛載到全域
window.imageOptimizer = imageOptimizer;

export default imageOptimizer; 