// Price Calculator
const priceData = {
    'premium': {
        '3x2': 48000,
        '3.5x2': 52000,
        '4x2': 56000,
        '4x2.5': 58000
    },
    'standard': {
        '3x2': 37000,
        '3.5x2': 40000,
        '4x2': 43000,
        '4x2.5': 46000
    },
    'german_steel': {
        '3x2': 53000,
        '3.5x2': 57000,
        '4x2': 62000
    }
};

function updateProjectionOptions() {
    const productType = document.getElementById('product-type').value;
    const projectionSelect = document.getElementById('projection');
    
    // Clear existing options
    projectionSelect.innerHTML = '<option value="">اختر الخروج</option>';
    
    if (productType === 'german_steel') {
        // German steel only has 2m projection option
        projectionSelect.innerHTML += '<option value="2">2 متر</option>';
    } else {
        // Other products have both options
        projectionSelect.innerHTML += '<option value="2">2 متر</option>';
        projectionSelect.innerHTML += '<option value="2.5">2.5 متر</option>';
    }
    
    // Reset price display
    document.getElementById('price-amount').textContent = 'اختر المواصفات لعرض السعر';
}

function calculatePrice() {
    const productType = document.getElementById('product-type').value;
    const width = document.getElementById('width').value;
    const projection = document.getElementById('projection').value;
    
    if (!productType || !width || !projection) {
        document.getElementById('price-amount').textContent = 'يرجى اختيار جميع الخيارات';
        return;
    }
    
    const key = width + 'x' + projection;
    const price = priceData[productType][key];
    
    if (price) {
        document.getElementById('price-amount').textContent = price.toLocaleString() + ' دج';
    } else {
        document.getElementById('price-amount').textContent = 'المقاس غير متوفر';
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const productTypeSelect = document.getElementById('product-type');
    const widthSelect = document.getElementById('width');
    const projectionSelect = document.getElementById('projection');
    const calculateBtn = document.getElementById('calculate-btn');
    
    if (productTypeSelect) {
        productTypeSelect.addEventListener('change', updateProjectionOptions);
    }
    
    if (widthSelect) {
        widthSelect.addEventListener('change', calculatePrice);
    }
    
    if (projectionSelect) {
        projectionSelect.addEventListener('change', calculatePrice);
    }
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculatePrice);
    }
    
    // Initial setup
    updateProjectionOptions();
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.product-card, .gallery-item, .feature');
    animatedElements.forEach(el => observer.observe(el));
});

// Enhanced mobile touch feedback
document.addEventListener('DOMContentLoaded', function() {
    const touchElements = document.querySelectorAll('button, .btn, .whatsapp-btn, .product-card');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 150);
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}

