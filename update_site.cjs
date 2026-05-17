const fs = require('fs');
const path = require('path');

const nav_replacement_no_active = `    <div class="nav-links">
      <div class="dropdown">
        <a href="mens.html">Men</a>
        <div class="dropdown-content">
          <a href="mens.html?category=Rings">Rings</a>
          <a href="mens.html?category=Necklaces">Necklaces</a>
          <a href="mens.html?category=Bracelets">Bracelets</a>
          <a href="mens.html?category=Earrings">Earrings</a>
        </div>
      </div>
      <div class="dropdown">
        <a href="womens.html">Women</a>
        <div class="dropdown-content">
          <a href="womens.html?category=Rings">Rings</a>
          <a href="womens.html?category=Necklaces">Necklaces</a>
          <a href="womens.html?category=Bracelets">Bracelets</a>
          <a href="womens.html?category=Earrings">Earrings</a>
        </div>
      </div>
      <a href="about.html">About</a>
    </div>`;

function replaceNav(htmlContent) {
    return htmlContent.replace(/<div class="nav-links">[\s\S]*?<\/div>/, nav_replacement_no_active);
}

const files = ['index.html', 'mens.html', 'womens.html', 'product.html', 'cart.html', 'auth-certificate.html', 'about.html', 'contact.html', 'reviews.html'];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = replaceNav(content);
        fs.writeFileSync(file, content, 'utf8');
    }
});

console.log("Done updating site with category parameters.");
