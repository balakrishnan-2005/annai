// products.js - Handle product filtering
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle (same as main site)
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function () {
            mainNav.classList.toggle('active');
            mobileMenuBtn.innerHTML = mainNav.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });
    }

    // Set current year
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;

    // Sample products data
    const products = {
        spices: [
            { name: 'கொத்தமல்லி பொடி', price: '₹120', weight: '200g', desc: 'பாரம்பரிய முறையில் தயாரிக்கப்பட்ட கொத்தமல்லி பொடி' },
            { name: 'மல்லி பொடி', price: '₹100', weight: '200g', desc: 'தூய்மையான மல்லி பொடி' },
            { name: 'மிளகாய் பொடி', price: '₹150', weight: '200g', desc: 'சூடான மிளகாய் பொடி' },
            { name: 'மஞ்சள் பொடி', price: '₹180', weight: '200g', desc: 'ஆரோக்கிய மஞ்சள் பொடி' },
            { name: 'சீரக பொடி', price: '₹130', weight: '200g', desc: 'சீரக பொடி' },
            { name: 'சோம்பு பொடி', price: '₹110', weight: '200g', desc: 'சோம்பு பொடி' }
        ],
        pickles: [
            { name: 'நெல்லிக்காய் ஊறுகாய்', price: '₹200', weight: '500g', desc: 'பாரம்பரிய நெல்லிக்காய் ஊறுகாய்' },
            { name: 'மாங்காய் ஊறுகாய்', price: '₹180', weight: '500g', desc: 'கொச்சி மாங்காய் ஊறுகாய்' },
            { name: 'இஞ்சி ஊறுகாய்', price: '₹220', weight: '500g', desc: 'இஞ்சி ஊறுகாய்' },
            { name: 'கேரட் ஊறுகாய்', price: '₹190', weight: '500g', desc: 'கேரட் ஊறுகாய்' },
            { name: 'லெமன் ஊறுகாய்', price: '₹210', weight: '500g', desc: 'எலுமிச்சை ஊறுகாய்' }
        ],
        powders: [
            { name: 'துவரம் பருப்பு பொடி', price: '₹140', weight: '500g', desc: 'துவரம் பருப்பு பொடி' },
            { name: 'உளுந்து பொடி', price: '₹160', weight: '500g', desc: 'உளுந்து பொடி' },
            { name: 'கடலைப் பருப்பு பொடி', price: '₹150', weight: '500g', desc: 'கடலைப் பருப்பு பொடி' },
            { name: 'பாசிப்பருப்பு பொடி', price: '₹170', weight: '500g', desc: 'பாசிப்பருப்பு பொடி' },
            { name: 'மொச்சைப் பருப்பு பொடி', price: '₹145', weight: '500g', desc: 'மொச்சைப் பருப்பு பொடி' }
        ],
        flours: [
            { name: 'ராகி மாவு', price: '₹90', weight: '1kg', desc: 'சுத்தமான ராகி மாவு' },
            { name: 'தினை மாவு', price: '₹110', weight: '1kg', desc: 'தினை மாவு' },
            { name: 'கம்பு மாவு', price: '₹95', weight: '1kg', desc: 'கம்பு மாவு' },
            { name: 'சாமை மாவு', price: '₹120', weight: '1kg', desc: 'சாமை மாவு' },
            { name: 'வரகு மாவு', price: '₹100', weight: '1kg', desc: 'வரகு மாவு' }
        ]
    };

    // Category names in Tamil
    const categoryNames = {
        spices: 'மசாலா வகைகள்',
        pickles: 'ஊறுகாய்',
        powders: 'பருப்பு பொடி வகைகள்',
        flours: 'சிறுதானிய சத்துமாவு',
        foods: 'சிறுதானிய உணவு',
        oils: 'மரசக்கு ஆயில்'
    };

    // Get category from URL
    function getCategoryFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('category');
    }

    // Display products
    function displayProducts(category) {
        const container = document.getElementById('products-container');

        if (!category || !products[category]) {
            // Show all categories if no specific category
            container.innerHTML = `
                <div class="all-categories">
                    ${Object.keys(categoryNames).map(cat => `
                        <div class="category-section">
                            <h3 class="tamil">${categoryNames[cat]}</h3>
                            <div class="products-grid">
                                ${products[cat] ? products[cat].slice(0, 3).map(product => `
                                    <div class="product-card">
                                        <div class="product-image">
                                            <i class="fas ${getIconForCategory(cat)}"></i>
                                        </div>
                                        <div class="product-info">
                                            <h4 class="tamil">${product.name}</h4>
                                            <p class="tamil">${product.desc}</p>
                                            <div class="product-meta">
                                                <span class="weight tamil">${product.weight}</span>
                                                <span class="price tamil">${product.price}</span>
                                            </div>
                                            <button class="btn btn-primary tamil order-btn" 
                                                    onclick="orderOnWhatsApp('${product.name}')">
                                                ஆர்டர் செய்ய
                                            </button>
                                        </div>
                                    </div>
                                `).join('') : '<p class="tamil">விரைவில் கிடைக்கும்</p>'}
                            </div>
                            <a href="products.html?category=${cat}" class="view-more tamil">மேலும் பார்க்க →</a>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            // Show specific category
            const categoryProducts = products[category] || [];
            container.innerHTML = `
                <h3 class="category-title tamil">${categoryNames[category]}</h3>
                <div class="products-grid">
                    ${categoryProducts.map(product => `
                        <div class="product-card">
                            <div class="product-image">
                                <i class="fas ${getIconForCategory(category)}"></i>
                            </div>
                            <div class="product-info">
                                <h4 class="tamil">${product.name}</h4>
                                <p class="tamil">${product.desc}</p>
                                <div class="product-meta">
                                    <span class="weight tamil">${product.weight}</span>
                                    <span class="price tamil">${product.price}</span>
                                </div>
                                <button class="btn btn-primary tamil order-btn" 
                                        onclick="orderOnWhatsApp('${product.name}')">
                                    ஆர்டர் செய்ய
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }

    function getIconForCategory(category) {
        const icons = {
            spices: 'fa-pepper-hot',
            pickles: 'fa-jar',
            powders: 'fa-seedling',
            flours: 'fa-wheat-awn',
            foods: 'fa-bowl-food',
            oils: 'fa-oil-can'
        };
        return icons[category] || 'fa-box';
    }

    // Global WhatsApp order function
    window.orderOnWhatsApp = function (productName) {
        const phoneNumber = "9150188404";
        const message = productName ?
            `அன்னை எண்டர்பிரைசஸ் - ${productName} ஆர்டர் செய்ய விரும்புகிறேன்.` :
            `அன்னை எண்டர்பிரைசஸ் பொருட்களை ஆர்டர் செய்ய விரும்புகிறேன்.`;

        window.open(`https://wa.me/91${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    // Initialize
    const category = getCategoryFromURL();
    displayProducts(category);
});