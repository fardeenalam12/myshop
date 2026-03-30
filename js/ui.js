// --- PRESENTATION LAYER ---
// DOM Manipulation
class UIManager {
    constructor(cartService) {
        this.cart = cartService;
        this.cart.subscribe(() => this.renderCart());
    }

    renderProducts(products) {
        const grid = document.getElementById('product-grid');
        grid.innerHTML = '';
        products.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-category">${p.category}</div>
                <div class="product-image-wrapper">
                    <img src="${p.image}" alt="${p.title}">
                </div>
                <h3 class="product-title">${p.title}</h3>
                <div class="product-footer">
                    <span class="product-price">$${p.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" data-id="${p.id}" aria-label="Add to cart">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/>
                        </svg>
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });

        // Add event listeners to new buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = btn.currentTarget.getAttribute('data-id');
                const product = window.appProducts.find(p => p.id === id);
                if (product) {
                    this.cart.addItem(product);
                    this.showToast('Added to Cart', product.title);
                    this.bumpCartIcon();
                }
            });
        });
    }

    renderCart() {
        const container = document.getElementById('cart-items-container');
        const count = this.cart.items.reduce((sum, item) => sum + item.qty, 0);
        document.getElementById('cart-badge').textContent = count;
        
        document.getElementById('cart-total-price').textContent = \`$\${this.cart.getTotal().toFixed(2)}\`;

        if (this.cart.items.length === 0) {
            container.innerHTML = '<div class="empty-cart-msg" style="display:block;">Your cart is empty.</div>';
            return;
        }

        container.innerHTML = '';
        this.cart.items.forEach(item => {
            const el = document.createElement('div');
            el.className = 'cart-item';
            el.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-qty-controls">
                        <button class="qty-btn" onclick="GlobalCart.updateQty('${item.id}', -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="GlobalCart.updateQty('${item.id}', 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="GlobalCart.removeItem('${item.id}')">&times;</button>
            `;
            container.appendChild(el);
        });
    }

    showToast(title, message) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast show';
        toast.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="var(--accent-color)"/>
            </svg>
            <div>
                <strong>${title}</strong>
                <div style="font-size: 0.85rem; color: #a0a0ab;">${message}</div>
            </div>
        `;
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    bumpCartIcon() {
        const badge = document.getElementById('cart-badge');
        badge.classList.add('bump');
        setTimeout(() => badge.classList.remove('bump'), 300);
    }
}
