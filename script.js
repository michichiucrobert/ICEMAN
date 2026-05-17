document.addEventListener('DOMContentLoaded', () => {

  // ===== PRODUCT DATABASE =====
  const products = {
    'obsidian-cuban-link': {
      name: 'The Obsidian Cuban Link',
      category: "Men's Collection",
      price: 250,
      image: 'assets/mens_1.jpg',
      description: 'A striking statement piece designed for the modern connoisseur. This 12mm Cuban link chain is forged from premium solid platinum and meticulously hand-set with VVS1 clarity, D-Color moissanite stones that rival natural diamonds in brilliance.',
      sizes: ['20"', '22"', '24"']
    },
    'tennis-bracelet-m': {
      name: 'Iced Out Tennis Bracelet',
      category: "Men's Collection",
      price: 210,
      image: 'assets/mens_2.jpg',
      description: 'The ultimate flex. This men\'s tennis bracelet features a continuous row of VVS1 moissanite stones set in a heavy platinum-plated clasp, dripping with icy brilliance.',
      sizes: ['6.5"', '7"', '7.5"']
    },
    'platinum-signet-ring': {
      name: 'Platinum Signet Ring',
      category: "Men's Collection",
      price: 240,
      image: 'assets/mens_3.jpg',
      description: 'Power in every detail. This bold signet ring is set with a princess-cut D-Color moissanite center stone surrounded by a micro-pavé halo of VVS1 stones.',
      sizes: ['8', '9', '10', '11']
    },
    'moissanite-studs': {
      name: 'VVS1 Moissanite Studs',
      category: "Men's Collection",
      price: 220,
      image: 'assets/mens_4.jpg',
      description: 'Clean, icy, and undeniable. These round-cut VVS1 moissanite stud earrings sit in a bezel setting for a modern, secure look that shines from every angle.',
      sizes: ['4mm', '6mm', '8mm']
    },
    'cuban-bracelet': {
      name: 'Heavy Cuban Bracelet',
      category: "Men's Collection",
      price: 260,
      image: 'assets/mens_5.jpg',
      description: 'Maximum ice, maximum presence. This heavy-gauge Cuban link bracelet is fully iced out with D-Color VVS1 moissanite stones across every link.',
      sizes: ['7"', '8"', '9"']
    },
    'pinky-ring': {
      name: 'Iced Out Pinky Ring',
      category: "Men's Collection",
      price: 290,
      image: 'assets/mens_6.jpg',
      description: 'A statement on its own. This fully iced out pinky ring features a pave-set cluster of brilliant moissanite stones in a solid platinum band.',
      sizes: ['6', '7', '8']
    },
    'glacier-ring': {
      name: 'The Glacier Engagement Ring',
      category: "Women's Collection",
      price: 280,
      image: 'assets/womens_1.jpg',
      description: 'She deserves forever. This stunning solitaire engagement ring features a brilliant round-cut D-Color VVS1 moissanite set in a delicate platinum band with micro-pavé accents.',
      sizes: ['5', '6', '7', '8']
    },
    'signature-pendant': {
      name: 'ICEMAN Signature Pendant',
      category: "Women's Collection",
      price: 295,
      image: 'assets/womens_2.jpg',
      description: 'The iconic ICEMAN pendant. A halo of D-Color moissanite surrounds a brilliant center stone, suspended on a fine platinum chain. Timeless, elegant, unmistakable.',
      sizes: ['16"', '18"', '20"']
    },
    'eternity-band': {
      name: 'Eternity Moissanite Band',
      category: "Women's Collection",
      price: 230,
      image: 'assets/womens_3.jpg',
      description: 'Love without end. This eternity band features a continuous row of matching round-cut VVS1 moissanite stones set in a thin platinum band. The perfect gift.',
      sizes: ['5', '6', '7', '8']
    },
    'tennis-bracelet-w': {
      name: 'Moissanite Tennis Bracelet',
      category: "Women's Collection",
      price: 299,
      image: 'assets/womens_4.jpg',
      description: 'Effortlessly elegant. This classic women\'s tennis bracelet features a single row of matched round-cut VVS1 moissanite stones in a four-prong platinum setting.',
      sizes: ['6"', '6.5"', '7"']
    },
    'halo-earrings': {
      name: 'Halo Drop Earrings',
      category: "Women's Collection",
      price: 215,
      image: 'assets/womens_5.jpg',
      description: 'Drama and elegance combined. These luxurious drop earrings feature a pear-shaped D-Color moissanite surrounded by a halo of VVS1 stones, suspended in a platinum setting.',
      sizes: ['One Size']
    },
    'solitaire-necklace': {
      name: 'Solitaire Moissanite Necklace',
      category: "Women's Collection",
      price: 245,
      image: 'assets/womens_6.jpg',
      description: 'Pure minimalist luxury. A single brilliant round-cut VVS1 moissanite bezel-set in platinum, suspended on a fine chain. The perfect everyday luxury piece.',
      sizes: ['16"', '18"', '20"']
    }
  };

  // ===== DYNAMIC PRODUCT PAGE LOADER =====
  const productPageTitle = document.querySelector('h1.product-title-dynamic');
  if (document.getElementById('add-to-cart-btn') || productPageTitle) {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const p = products[productId];

    if (p) {
      // Update all product info on the page
      const h1 = document.querySelector('.product-info-detail h1');
      const catEl = document.querySelector('.product-info-detail .product-category');
      const priceEl = document.querySelector('.price-large');
      const descEl = document.querySelector('.description');
      const mainImg = document.querySelector('.main-image');
      const thumbs = document.querySelectorAll('.thumbnail-row img');
      const dimSelector = document.getElementById('dimension-selector');

      if (h1) h1.textContent = p.name;
      if (catEl) catEl.textContent = p.category;
      if (priceEl) priceEl.textContent = `€${p.price.toFixed(2)}`;
      if (descEl) descEl.textContent = p.description;
      if (mainImg) { mainImg.src = p.image; mainImg.alt = p.name; }
      if (thumbs.length > 0) thumbs.forEach(t => { t.src = p.image; t.alt = p.name; });
      document.title = `${p.name} | ICEMAN`;

      // Update dimension buttons
      if (dimSelector) {
        dimSelector.innerHTML = p.sizes.map((s, i) =>
          `<div class="dim-btn${i===0?' active':''}" style="padding: 0.8rem 1.5rem; border: 1px solid ${i===0?'var(--color-accent-icy)':'var(--glass-border)'}; cursor: pointer;" data-size="${s}">${s}</div>`
        ).join('');
      }
    }
  }

  // Sticky Navbar
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Reveal Animations on Scroll
  const fadeElements = document.querySelectorAll('.fade-in');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    fadeElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 50) {
        el.style.opacity = '1';
        el.style.animationPlayState = 'running';
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger on load

  // Category Filtering
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFilter = urlParams.get('category');
  
  if (categoryFilter) {
    // Update page title if it exists
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle && pageTitle.textContent.includes('Collection')) {
      pageTitle.textContent = `${pageTitle.textContent.split(' ')[0]} ${categoryFilter}`;
    }

    // Filter products
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      const catElement = card.querySelector('.product-category');
      if (catElement && catElement.textContent.trim().toLowerCase() !== categoryFilter.toLowerCase()) {
        card.style.display = 'none';
      }
    });

    // Update count display
    const countDisplay = document.querySelector('.section > div > div:first-child');
    if (countDisplay && countDisplay.textContent.includes('Showing')) {
      const visibleCount = Array.from(productCards).filter(c => c.style.display !== 'none').length;
      countDisplay.textContent = `Showing ${visibleCount} Product(s)`;
    }
  }

  // Product Page Interactivity
  // 1. Dimension Buttons
  const dimButtons = document.querySelectorAll('.dim-btn');
  dimButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      dimButtons.forEach(b => {
        b.classList.remove('active');
        b.style.borderColor = 'var(--glass-border)';
      });
      e.target.classList.add('active');
      e.target.style.borderColor = 'var(--color-accent-icy)';
    });
  });

  // 2. Accordions
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector('span:last-child');
      
      if (content.style.display === 'block') {
        content.style.display = 'none';
        icon.textContent = '+';
      } else {
        content.style.display = 'block';
        icon.textContent = '-';
      }
    });
  });

  // Cart Functionality
  // Initialize cart from localStorage
  let cart = JSON.parse(localStorage.getItem('iceman_cart')) || [];

  // Add to cart
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      // Find selected dimension
      const activeDim = document.querySelector('.dim-btn.active');
      const size = activeDim ? activeDim.getAttribute('data-size') : 'One Size';
      
      const product = {
        id: Date.now().toString(),
        name: document.querySelector('h1').textContent,
        price: parseFloat(document.querySelector('.price-large').textContent.replace('€', '')),
        size: size,
        image: document.querySelector('.main-image').src
      };

      cart.push(product);
      localStorage.setItem('iceman_cart', JSON.stringify(cart));
      
      // Visual feedback
      addToCartBtn.textContent = 'Added to Cart!';
      addToCartBtn.style.background = 'var(--color-accent-icy)';
      addToCartBtn.style.color = '#000';
      setTimeout(() => {
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.style.background = 'transparent';
        addToCartBtn.style.color = 'var(--color-platinum)';
      }, 2000);
    });
  }

  // Render Cart Page
  const cartContainer = document.getElementById('cart-items-container');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartTotalEl = document.getElementById('cart-total');

  if (cartContainer) {
    const renderCart = () => {
      cartContainer.innerHTML = '';
      let subtotal = 0;

      if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="color: var(--color-text-muted);">Your luxury cart is currently empty.</p>';
        if (cartSubtotalEl) cartSubtotalEl.textContent = '€0.00';
        if (cartTotalEl) cartTotalEl.textContent = '€0.00';
        return;
      }

      cart.forEach((item, index) => {
        subtotal += item.price;
        const itemHtml = `
          <div class="cart-item" data-index="${index}">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
              <div class="cart-item-title">${item.name}</div>
              <div style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 0.5rem;">Size: ${item.size}" | Platinum</div>
              <div style="color: var(--color-accent-icy);">€${item.price.toFixed(2)}</div>
            </div>
            <div>
              <a href="#" class="remove-item" data-index="${index}" style="color: var(--color-text-muted); font-size: 0.9rem; text-decoration: underline;">Remove</a>
            </div>
          </div>
        `;
        cartContainer.innerHTML += itemHtml;
      });

      if (cartSubtotalEl) cartSubtotalEl.textContent = `€${subtotal.toFixed(2)}`;
      if (cartTotalEl) cartTotalEl.textContent = `€${subtotal.toFixed(2)}`;

      // Attach remove events
      document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const removeIndex = e.target.getAttribute('data-index');
          cart.splice(removeIndex, 1);
          localStorage.setItem('iceman_cart', JSON.stringify(cart));
          renderCart(); // Re-render
        });
      });
    };

    renderCart();
  }

  // ===== DYNAMIC AUTH LOGIN/REGISTER SYSTEM =====
  const injectAuthModal = () => {
    if (document.getElementById('auth-modal-overlay')) return;

    const modalHtml = `
      <div class="auth-modal-overlay" id="auth-modal-overlay">
        <div class="auth-modal">
          <span class="auth-close" id="auth-close">&times;</span>
          <div class="auth-tabs">
            <div class="auth-tab active" id="tab-login">Login</div>
            <div class="auth-tab" id="tab-register">Register</div>
          </div>
          <div class="auth-form-container">
            <!-- Login Form -->
            <form id="form-login" class="auth-form active">
              <div class="auth-group">
                <label for="login-email">Email Address</label>
                <input type="email" id="login-email" required placeholder="Enter your email">
              </div>
              <div class="auth-group">
                <label for="login-password">Password</label>
                <input type="password" id="login-password" required placeholder="Enter your password">
              </div>
              <button type="submit" class="auth-submit-btn">Login</button>
            </form>

            <!-- Register Form -->
            <form id="form-register" class="auth-form">
              <div class="auth-group">
                <label for="register-name">Full Name</label>
                <input type="text" id="register-name" required placeholder="Enter your full name">
              </div>
              <div class="auth-group">
                <label for="register-email">Email Address</label>
                <input type="email" id="register-email" required placeholder="Enter your email">
              </div>
              <div class="auth-group">
                <label for="register-password">Password</label>
                <input type="password" id="register-password" required placeholder="Create a strong password">
              </div>
              <button type="submit" class="auth-submit-btn">Register</button>
            </form>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Setup interactive events
    const overlay = document.getElementById('auth-modal-overlay');
    const closeBtn = document.getElementById('auth-close');
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');

    // Close on click close button or overlay outside the modal
    closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('active');
    });

    // Tab Switching
    const switchTab = (tab) => {
      if (tab === 'login') {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        formLogin.classList.add('active');
        formRegister.classList.remove('active');
      } else {
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        formRegister.classList.add('active');
        formLogin.classList.remove('active');
      }
    };

    tabLogin.addEventListener('click', () => switchTab('login'));
    tabRegister.addEventListener('click', () => switchTab('register'));

    // Handle Submissions
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const username = email.split('@')[0];
      
      // Save simulated session
      localStorage.setItem('iceman_user', JSON.stringify({ name: username, email: email }));
      showUserSession(username);
      overlay.classList.remove('active');
      alert(`Welcome back to ICEMAN, ${username}!`);
    });

    formRegister.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;

      // Save simulated session
      localStorage.setItem('iceman_user', JSON.stringify({ name: name, email: email }));
      showUserSession(name);
      overlay.classList.remove('active');
      alert(`Account created successfully! Welcome to ICEMAN, ${name}!`);
    });
  };

  const showUserSession = (name) => {
    // Visually update Account Button to show a small premium personalized welcome or active state
    const accountIcon = document.querySelector('.nav-icons svg:nth-of-type(2)');
    if (accountIcon) {
      accountIcon.style.fill = 'var(--color-accent-icy)';
      accountIcon.style.filter = 'drop-shadow(0 0 5px var(--color-accent-glow))';
      accountIcon.title = `Logged in as ${name}`;
    }
  };

  // Attach Open Trigger to Navbar Account Icon
  const accountBtn = document.querySelector('.nav-icons svg:nth-of-type(2)');
  if (accountBtn) {
    // Change cursor style to indicate it's clickable
    accountBtn.style.cursor = 'pointer';
    accountBtn.addEventListener('click', (e) => {
      e.preventDefault();
      injectAuthModal();
      
      const overlay = document.getElementById('auth-modal-overlay');
      if (overlay) {
        overlay.classList.add('active');
      }
    });
  }

  // Load existing session on startup
  const activeUser = JSON.parse(localStorage.getItem('iceman_user'));
  if (activeUser && activeUser.name) {
    showUserSession(activeUser.name);
  }
});
