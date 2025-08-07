/* ================================================= */
/* 性能與錯誤監控系統                                */
/* ================================================= */

class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.errors = [];
        this.isDevelopment = window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1' ||
                           window.location.hostname.includes('192.168.');
        
        this.init();
    }

    init() {
        // 監控頁面載入性能
        this.monitorPageLoad();
        
        // 監控 JavaScript 錯誤
        this.monitorJSErrors();
        
        // 監控資源載入錯誤
        this.monitorResourceErrors();
        
        // 監控長任務
        this.monitorLongTasks();
        
        // 在頁面卸載時發送資料
        this.setupBeaconSending();
    }

    monitorPageLoad() {
        // 等待 DOM 載入完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.collectPageMetrics());
        } else {
            this.collectPageMetrics();
        }

        // 等待頁面完全載入
        window.addEventListener('load', () => {
            setTimeout(() => this.collectPerformanceMetrics(), 1000);
        });
    }

    collectPageMetrics() {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
            this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
            this.metrics.domInteractive = navigation.domInteractive - navigation.navigationStart;
            
            if (this.isDevelopment) {
                console.log('DOM Metrics:', {
                    domContentLoaded: this.metrics.domContentLoaded,
                    domInteractive: this.metrics.domInteractive
                });
            }
        }
    }

    collectPerformanceMetrics() {
        // Web Vitals - Core Web Vitals
        this.measureLCP(); // Largest Contentful Paint
        this.measureFID(); // First Input Delay
        this.measureCLS(); // Cumulative Layout Shift
        
        // 其他重要指標
        this.measureFCP(); // First Contentful Paint
        this.measureTTFB(); // Time to First Byte
    }

    measureLCP() {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.lcp = lastEntry.startTime;
                
                this.logMetric('LCP (Largest Contentful Paint)', this.metrics.lcp, 'ms');
                observer.disconnect();
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            if (this.isDevelopment) console.warn('LCP measurement not supported');
        }
    }

    measureFID() {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    this.metrics.fid = entry.processingStart - entry.startTime;
                    this.logMetric('FID (First Input Delay)', this.metrics.fid, 'ms');
                });
                observer.disconnect();
            });
            observer.observe({ entryTypes: ['first-input'] });
        } catch (e) {
            if (this.isDevelopment) console.warn('FID measurement not supported');
        }
    }

    measureCLS() {
        try {
            let clsValue = 0;
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                this.metrics.cls = clsValue;
                this.logMetric('CLS (Cumulative Layout Shift)', this.metrics.cls);
            });
            observer.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
            if (this.isDevelopment) console.warn('CLS measurement not supported');
        }
    }

    measureFCP() {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    if (entry.name === 'first-contentful-paint') {
                        this.metrics.fcp = entry.startTime;
                        this.logMetric('FCP (First Contentful Paint)', this.metrics.fcp, 'ms');
                    }
                });
                observer.disconnect();
            });
            observer.observe({ entryTypes: ['paint'] });
        } catch (e) {
            if (this.isDevelopment) console.warn('FCP measurement not supported');
        }
    }

    measureTTFB() {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
            this.metrics.ttfb = navigation.responseStart - navigation.requestStart;
            this.logMetric('TTFB (Time to First Byte)', this.metrics.ttfb, 'ms');
        }
    }

    monitorJSErrors() {
        window.addEventListener('error', (event) => {
            const error = {
                type: 'javascript',
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                stack: event.error ? event.error.stack : null,
                timestamp: Date.now(),
                userAgent: navigator.userAgent,
                url: window.location.href
            };
            
            this.errors.push(error);
            this.reportError(error);
        });

        // 監控 Promise 拒絕
        window.addEventListener('unhandledrejection', (event) => {
            const error = {
                type: 'promise_rejection',
                message: event.reason.message || event.reason,
                stack: event.reason.stack,
                timestamp: Date.now(),
                userAgent: navigator.userAgent,
                url: window.location.href
            };
            
            this.errors.push(error);
            this.reportError(error);
        });
    }

    monitorResourceErrors() {
        // 監控資源載入失敗
        window.addEventListener('error', (event) => {
            if (event.target !== window) {
                const error = {
                    type: 'resource',
                    element: event.target.tagName,
                    source: event.target.src || event.target.href,
                    timestamp: Date.now(),
                    url: window.location.href
                };
                
                this.errors.push(error);
                this.reportError(error);
            }
        }, true);
    }

    monitorLongTasks() {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    if (entry.duration > 50) { // 超過 50ms 的任務
                        this.logMetric('Long Task', entry.duration, 'ms');
                        
                        // 如果是很長的任務，記錄為潛在問題
                        if (entry.duration > 100) {
                            this.reportError({
                                type: 'performance',
                                message: `Long task detected: ${entry.duration}ms`,
                                timestamp: Date.now(),
                                url: window.location.href
                            });
                        }
                    }
                });
            });
            observer.observe({ entryTypes: ['longtask'] });
        } catch (e) {
            if (this.isDevelopment) console.warn('Long task monitoring not supported');
        }
    }

    logMetric(name, value, unit = '') {
        if (this.isDevelopment) {
            const status = this.getPerformanceStatus(name, value);
            console.log(`📊 ${name}: ${value.toFixed(2)}${unit} ${status}`);
        }
    }

    getPerformanceStatus(metricName, value) {
        const thresholds = {
            'LCP': { good: 2500, poor: 4000 },
            'FID': { good: 100, poor: 300 },
            'CLS': { good: 0.1, poor: 0.25 },
            'FCP': { good: 1800, poor: 3000 },
            'TTFB': { good: 800, poor: 1800 }
        };

        const threshold = thresholds[metricName.split(' ')[0]];
        if (!threshold) return '';

        if (value <= threshold.good) return '✅';
        if (value <= threshold.poor) return '⚠️';
        return '❌';
    }

    reportError(error) {
        if (this.isDevelopment) {
            console.error('🚨 Error detected:', error);
        } else {
            // 在生產環境中，這裡可以發送到錯誤監控服務
            // 例如：sendToSentry(error) 或 sendToLogService(error)
        }
    }

    setupBeaconSending() {
        // 在頁面卸載時發送性能資料
        window.addEventListener('beforeunload', () => {
            this.sendMetrics();
        });

        // 也在可見性變化時發送（例如切換標籤）
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                this.sendMetrics();
            }
        });
    }

    sendMetrics() {
        if (!this.isDevelopment && navigator.sendBeacon) {
            const data = JSON.stringify({
                metrics: this.metrics,
                errors: this.errors,
                timestamp: Date.now(),
                url: window.location.href,
                userAgent: navigator.userAgent
            });

            // 在實際部署時，替換為您的資料收集端點
            // navigator.sendBeacon('/api/analytics', data);
        }
    }

    // 公開方法：手動記錄自定義指標
    recordCustomMetric(name, value, unit = '') {
        this.metrics[name] = value;
        this.logMetric(name, value, unit);
    }

    // 公開方法：獲取當前指標
    getMetrics() {
        return { ...this.metrics };
    }

    // 公開方法：獲取錯誤列表
    getErrors() {
        return [...this.errors];
    }
}

// 初始化性能監控
const performanceMonitor = new PerformanceMonitor();

// 將監控器掛載到全域，供其他腳本使用
window.performanceMonitor = performanceMonitor;

export default performanceMonitor; 