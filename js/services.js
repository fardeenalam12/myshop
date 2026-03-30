// --- SERVICE LAYER ---
// Business logic and state management
class CartService {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
        this.listeners = [];
    }

    subscribe(listener) {
        this.listeners.push(listener);
    }

    notify() {
        localStorage.setItem('cartItems', JSON.stringify(this.items));
        this.listeners.forEach(listener => listener(this.items));
    }

    addItem(product) {
        const existing = this.items.find(i => i.id === product.id);
        if (existing) {
            existing.qty += 1;
        } else {
            this.items.push({ ...product, qty: 1 });
        }
        this.notify();
    }

    removeItem(productId) {
        this.items = this.items.filter(i => i.id !== productId);
        this.notify();
    }

    updateQty(productId, delta) {
        const item = this.items.find(i => i.id === productId);
        if (item) {
            item.qty += delta;
            if (item.qty <= 0) {
                this.removeItem(productId);
            } else {
                this.notify();
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.qty), 0);
    }

    clear() {
        this.items = [];
        this.notify();
    }
}

const GlobalCart = new CartService();
