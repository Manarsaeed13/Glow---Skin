document.addEventListener('DOMContentLoaded', () => {

    const userDisplay = document.getElementById('user-display');
    const userDropdown = document.getElementById('user-dropdown');
    const logoutBtn = document.getElementById('logout-btn');
    const dropdownName = document.getElementById('dropdown-name');

    const cartCountEl = document.getElementById('cart-count');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const reveals = document.querySelectorAll('.reveal');


    function loadUser() {
        const username = localStorage.getItem('currentUser');

        if (userDisplay) {
            userDisplay.textContent = username ? "Hello, " + username : "...";
        }

        if (dropdownName) {
            dropdownName.textContent = username ? "Hello, " + username : "Not signed in";
        }
    }

  
    if (userDisplay && userDropdown) {

        userDisplay.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!userDisplay.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        });
    }

  
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {

            localStorage.removeItem('currentUser');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('cart'); // 👈 مهم لو عايزة تفريغ الكارت عند الخروج

            if (userDropdown) {
                userDropdown.classList.remove('active');
            }

            loadUser();
            updateCartCounter();
        });
    }


    function updateCartCounter() {
        if (cartCountEl) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cartCountEl.textContent = cart.length;
        }
    }

    
    addToCartBtns.forEach(button => {
        button.addEventListener('click', (e) => {

            const card = e.target.closest('.product-card');

            const name = card.querySelector('h3').textContent;
            const priceRaw = card.querySelector('.price').textContent;
            const priceClean = parseFloat(priceRaw.replace('$', ''));

            const image = card.querySelector('img').src;

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            cart.push({
                name: name,
                price: priceClean,
                image: image,
                quantity: 1
            });

            localStorage.setItem('cart', JSON.stringify(cart));

            updateCartCounter();

            button.textContent = "Added ✓";
            button.style.backgroundColor = "#28a745";
            button.style.color = "white";

            setTimeout(() => {
                button.textContent = "Add to Cart";
                button.style.backgroundColor = "";
                button.style.color = "";
            }, 500);
        });
    });

  
    if (reveals.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active');
                }
            });
        }, {
            threshold: 0.15
        });

        reveals.forEach(el => revealObserver.observe(el));
    }

    
    loadUser();
    updateCartCounter();

});
