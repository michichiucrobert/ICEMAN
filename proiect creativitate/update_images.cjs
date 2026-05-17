const fs = require('fs');

function updateImages(filename, prefix) {
    if (!fs.existsSync(filename)) return;
    let content = fs.readFileSync(filename, 'utf8');
    
    let count = 1;
    // Replace all <img src="..."> inside .product-img-wrapper
    content = content.replace(/<div class="product-img-wrapper">\s*<img src="[^"]+" alt="([^"]+)">/g, (match, altText) => {
        const replacement = `<div class="product-img-wrapper">\n          <img src="assets/${prefix}_${count}.jpg" alt="${altText}">`;
        count++;
        return replacement;
    });
    
    fs.writeFileSync(filename, content, 'utf8');
    console.log(`Updated ${filename}`);
}

updateImages('mens.html', 'mens');
updateImages('womens.html', 'womens');
