// --- APP INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
    const ui = new UIManager(GlobalCart);
    
    // Initial UI render
    ui.renderCart();

    // Fetch and Store Products Globally for easy access
    window.appProducts = await fetchProducts();
    ui.renderProducts(window.appProducts);

    // Filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // UI active class
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // Logic
            const cat = e.target.getAttribute('data-filter');
            if (cat === 'all') {
                ui.renderProducts(window.appProducts);
            } else {
                ui.renderProducts(window.appProducts.filter(p => p.category === cat));
            }
        });
    });

    // Cart Sidebar Toggle
    const cartBtn = document.getElementById('cart-toggle-btn');
    const closeBtn = document.getElementById('close-cart-btn');
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    function toggleCart() {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('show');
    }

    cartBtn.addEventListener('click', toggleCart);
    closeBtn.addEventListener('click', toggleCart);
    overlay.addEventListener('click', toggleCart);

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(10, 10, 12, 0.9)';
            nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
        } else {
            nav.style.background = 'var(--glass-bg)';
            nav.style.boxShadow = 'none';
        }
    });

    // Checkout
    document.getElementById('checkout-btn').addEventListener('click', async () => {
        if (GlobalCart.items.length === 0) {
            ui.showToast('Error', 'Your cart is empty');
            return;
        }
        
        const btn = document.getElementById('checkout-btn');
        btn.textContent = 'Processing...';
        btn.style.pointerEvents = 'none';
        
        // Simulate network checkout
        await new Promise(r => setTimeout(r, 1500));
        
        btn.textContent = 'Proceed to Checkout';
        btn.style.pointerEvents = 'all';
        GlobalCart.clear();
        toggleCart();
        ui.showToast('Success', 'Order placed successfully! (Simulation)');
    });
});
