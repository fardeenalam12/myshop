// --- DATA LAYER ---
// Simulates a backend database
const productDatabase = [
    {
        id: "p1",
        title: "Aura Noise-Canceling Headphones",
        price: 349.99,
        category: "audio",
        image: "assets/headphones.png",
        description: "Experience the next level of sound with futuristic neon-lit wireless headphones."
    },
    {
        id: "p2",
        title: "Quantum OLED Smartwatch",
        price: 299.50,
        category: "wearables",
        image: "assets/smartwatch.png",
        description: "Stay connected with a brilliant OLED display and premium leather/metal finish."
    },
    {
        id: "p3",
        title: "Cyber Kinetics Sneakers",
        price: 189.00,
        category: "footwear",
        image: "assets/sneakers.png",
        description: "Step into tomorrow with performance athletic wear featuring glowing neon soles."
    }
];

// Async function to simulate API fetch
async function fetchProducts() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(productDatabase);
        }, 500); // 500ms network delay
    });
}
