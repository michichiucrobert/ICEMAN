const fs = require('fs');

const correctNav = `    <div class="nav-links">
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

const files = ['index.html', 'mens.html', 'womens.html', 'product.html', 'cart.html', 'auth-certificate.html', 'about.html', 'contact.html', 'reviews.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // Remove everything between <nav ...> logo </a> and <div class="nav-icons">
    // Replace the entire block of nav-links (however many there are) with a single clean one
    content = content.replace(/(class="logo"[^<]*<\/a>)[\s\S]*?(<div class="nav-icons">)/,
        `$1\n${correctNav}\n    $2`);

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed nav in ${file}`);
});

console.log("Done fixing navigation.");
