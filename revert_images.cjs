const fs = require('fs');

function revertImages(filename, prefix, origImages) {
    if (!fs.existsSync(filename)) return;
    let content = fs.readFileSync(filename, 'utf8');
    
    let count = 1;
    content = content.replace(/<div class="product-img-wrapper">\s*<img src="assets\/[^"]+\.jpg" alt="([^"]+)">/g, (match, altText) => {
        const img = origImages[(count - 1) % origImages.length];
        const replacement = `<div class="product-img-wrapper">\n          <img src="${img}" alt="${altText}">`;
        count++;
        return replacement;
    });
    
    fs.writeFileSync(filename, content, 'utf8');
    console.log(`Reverted ${filename}`);
}

// Restore original images for men's page
// Products: Necklace, Bracelet, Ring, Earring, Bracelet, Ring
revertImages('mens.html', 'mens', [
    'assets/mens_chain.png',   // Necklace
    'assets/mens_chain.png',   // Bracelet  
    'assets/hero_bg.png',      // Ring
    'assets/mens_chain.png',   // Earring
    'assets/mens_chain.png',   // Bracelet
    'assets/hero_bg.png'       // Ring
]);

// Restore original images for women's page
// Products: Ring, Necklace, Ring, Bracelet, Earring, Necklace
revertImages('womens.html', 'womens', [
    'assets/womens_ring.png',  // Ring
    'assets/hero_bg.png',      // Necklace
    'assets/womens_ring.png',  // Ring
    'assets/womens_ring.png',  // Bracelet
    'assets/hero_bg.png',      // Earring
    'assets/hero_bg.png'       // Necklace
]);

console.log("Done reverting images.");
