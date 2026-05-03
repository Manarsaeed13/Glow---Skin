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

            if (userDropdown) {
                userDropdown.classList.remove('active');
            }

            loadUser();
        });
    }

   
    function updateCartCounter() {
        if (cartCountEl) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cartCountEl.textContent = cart.length;
        }
    }

    
    loadUser();
    updateCartCounter();

});
