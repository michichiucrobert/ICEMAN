import os
import re

css_addition = """
/* Dropdown Styles */
.dropdown {
  position: relative;
  display: inline-block;
  padding-bottom: 10px; /* Bridge gap for hover */
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: var(--color-surface);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.5);
  z-index: 1;
  border: 1px solid var(--glass-border);
  top: 100%;
  left: 0;
}

.dropdown-content a {
  color: var(--color-text);
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-size: 0.8rem;
  text-transform: none;
  letter-spacing: 1px;
}

.dropdown-content a::after {
  display: none !important;
}

.dropdown-content a:hover {
  background-color: var(--color-surface-light);
  color: var(--color-accent-icy);
}

.dropdown:hover .dropdown-content {
  display: block;
  animation: fadeInUp 0.3s ease forwards;
}
"""

with open("style.css", "a") as f:
    f.write(css_addition)

nav_replacement_no_active = """    <div class="nav-links">
      <div class="dropdown">
        <a href="mens.html">Men</a>
        <div class="dropdown-content">
          <a href="mens.html">Rings</a>
          <a href="mens.html">Necklaces</a>
          <a href="mens.html">Bracelets</a>
          <a href="mens.html">Earrings</a>
        </div>
      </div>
      <div class="dropdown">
        <a href="womens.html">Women</a>
        <div class="dropdown-content">
          <a href="womens.html">Rings</a>
          <a href="womens.html">Necklaces</a>
          <a href="womens.html">Bracelets</a>
          <a href="womens.html">Earrings</a>
        </div>
      </div>
      <a href="about.html">About</a>
    </div>"""

def replace_nav(html_content):
    # Find the nav-links div
    nav_pattern = re.compile(r'<div class="nav-links">.*?</div>', re.DOTALL)
    
    # We want to replace it entirely. But wait, what if it has active styling?
    # We will just replace it entirely with a generic one without active styling for simplicity,
    # or keep it simple.
    return nav_pattern.sub(nav_replacement_no_active, html_content)

def replace_prices(html_content):
    # $1,450 -> €250
    html_content = html_content.replace("$1,450", "€250")
    html_content = html_content.replace("$1,450.00", "€250.00")
    # $2,200 -> €280
    html_content = html_content.replace("$2,200", "€280")
    html_content = html_content.replace("$2,200.00", "€280.00")
    # $1,850 -> €295
    html_content = html_content.replace("$1,850", "€295")
    html_content = html_content.replace("$1,850.00", "€295.00")
    # $950 -> €210
    html_content = html_content.replace("$950", "€210")
    html_content = html_content.replace("$950.00", "€210.00")
    # $1,200 -> €240
    html_content = html_content.replace("$1,200", "€240")
    html_content = html_content.replace("$1,200.00", "€240.00")
    # $1,100 -> €230
    html_content = html_content.replace("$1,100", "€230")
    html_content = html_content.replace("$1,100.00", "€230.00")
    return html_content

# Process HTML files
files = ["index.html", "mens.html", "womens.html", "product.html", "cart.html", "auth-certificate.html"]
for file in files:
    if os.path.exists(file):
        with open(file, "r", encoding="utf-8") as f:
            content = f.read()
        
        content = replace_nav(content)
        content = replace_prices(content)
        
        with open(file, "w", encoding="utf-8") as f:
            f.write(content)

print("Done updating site.")
