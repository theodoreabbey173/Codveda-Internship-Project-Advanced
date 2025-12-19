// Performance Optimization Script

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializePerformanceMetrics();
    initializeOptimizationsList();
    initializeGallery();
});

// Initialize Performance Metrics
function initializePerformanceMetrics() {
    if (!window.performance) return;

    const perfData = window.performance.timing;
    
    // Calculate metrics
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    const domContentLoadedTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
    const resourcesCount = window.performance.getEntriesByType('resource').length;

    // Update UI with metrics
    updateMetric('loadTime', `Load: ${Math.round(pageLoadTime)}ms`);
    updateMetric('domTime', `DOM: ${Math.round(domContentLoadedTime)}ms`);
    updateMetric('pageLoadTime', `${Math.round(pageLoadTime)}ms`);
    updateMetric('domContentTime', `${Math.round(domContentLoadedTime)}ms`);
    updateMetric('resourcesCount', resourcesCount);

    // Log additional performance info to console
    console.log('Performance Metrics:', {
        pageLoadTime: `${Math.round(pageLoadTime)}ms`,
        domContentLoaded: `${Math.round(domContentLoadedTime)}ms`,
        resources: resourcesCount
    });
}

// Update metric in DOM
function updateMetric(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

// Initialize Optimizations List with Animation
function initializeOptimizationsList() {
    const optimizations = [
        'Lazy Loading Images',
        'Code Splitting with Dynamic Imports',
        'Minified CSS & JS',
        'Optimized Image Formats',
        'Caching Strategy',
        'Reduced Render Blocking'
    ];

    const optimizationsList = document.getElementById('optimizationsList');
    
    optimizations.forEach((optimization, index) => {
        setTimeout(() => {
            const item = createOptimizationItem(optimization);
            optimizationsList.appendChild(item);
        }, index * 500);
    });
}

// Create optimization list item
function createOptimizationItem(text) {
    const item = document.createElement('div');
    item.className = 'optimization-item';
    
    const dot = document.createElement('div');
    dot.className = 'optimization-dot';
    
    const textNode = document.createElement('span');
    textNode.textContent = text;
    
    item.appendChild(dot);
    item.appendChild(textNode);
    
    return item;
}

// Initialize Image Gallery
function initializeGallery() {
    const toggleButton = document.getElementById('toggleGallery');
    const gallery = document.getElementById('imageGallery');
    const imagesGrid = document.getElementById('imagesGrid');
    const galleryLoader = document.getElementById('galleryLoader');
    
    let galleryLoaded = false;

    toggleButton.addEventListener('click', () => {
        const isHidden = gallery.classList.contains('hidden');
        
        if (isHidden) {
            gallery.classList.remove('hidden');
            toggleButton.textContent = 'Hide Gallery';
            
            if (!galleryLoaded) {
                loadGalleryImages();
                galleryLoaded = true;
            }
        } else {
            gallery.classList.add('hidden');
            toggleButton.textContent = 'Show Gallery';
        }
    });

    function loadGalleryImages() {
        // Image URLs - using Unsplash for demo
        const imageUrls = [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
            'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800&q=80',
            'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
            'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
            'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
            'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80'
        ];

        // Show loader initially
        galleryLoader.style.display = 'flex';
        
        // Simulate loading delay for demonstration
        setTimeout(() => {
            galleryLoader.style.display = 'none';
            
            imageUrls.forEach((url, index) => {
                const imageContainer = createImageContainer(url, index);
                imagesGrid.appendChild(imageContainer);
            });
        }, 800);
    }

    function createImageContainer(url, index) {
        const container = document.createElement('div');
        container.className = 'image-container';

        // Create loader
        const loader = document.createElement('div');
        loader.className = 'image-loader';
        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        loader.appendChild(spinner);
        container.appendChild(loader);

        // Create image with lazy loading
        const img = document.createElement('img');
        img.src = url;
        img.alt = `Nature ${index + 1}`;
        img.loading = 'lazy'; // Native lazy loading
        img.className = 'loading';

        // Handle image load
        img.addEventListener('load', () => {
            img.classList.remove('loading');
            img.classList.add('loaded');
            loader.style.display = 'none';
        });

        // Handle image error
        img.addEventListener('error', () => {
            loader.innerHTML = '<p style="color: #ef4444;">Failed to load</p>';
        });

        container.appendChild(img);
        return container;
    }
}

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events with debouncing
window.addEventListener('scroll', debounce(() => {
    // Add any scroll-based optimizations here
    console.log('Scroll event (debounced)');
}, 100));

// Monitor performance continuously
if (window.PerformanceObserver) {
    // Observe long tasks
    try {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('Long Task detected:', entry);
            }
        });
        observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
        console.log('Long task observer not supported');
    }

    // Observe resource timing
    try {
        const resourceObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.duration > 1000) {
                    console.warn('Slow resource detected:', entry.name, `${Math.round(entry.duration)}ms`);
                }
            }
        });
        resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (e) {
        console.log('Resource observer not supported');
    }
}

// Service Worker registration for caching (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to register service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}

console.log('Performance Optimization script loaded successfully!');