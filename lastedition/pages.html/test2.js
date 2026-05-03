
let users = JSON.parse(localStorage.getItem('registeredUsers')) || [
    { fullname: "Admin", email: "test@gmail.com", password: "123" }
];

 const userDisplay = document.getElementById('user-display');
    const userDropdown = document.getElementById('user-dropdown');
    const addAccountBtn = document.getElementById('add-account-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const cartCountEl = document.getElementById('cart-count');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const reveals = document.querySelectorAll('.reveal');

   
    function updateUserData() {
        const username = localStorage.getItem('username');
        if (userDisplay) {
            userDisplay.textContent = username ? 'Hello, ' + username : '···';
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

    if (addAccountBtn) {
        addAccountBtn.addEventListener('click', () => {
            const nameInput = prompt('Enter your name:');
            if (nameInput && nameInput.trim() !== '') {
                localStorage.setItem('username', nameInput.trim());
                updateUserData();
                userDropdown.classList.remove('active');
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('username');
            updateUserData();
            userDropdown.classList.remove('active');
            window.location.reload();
        });
    }

let isLoginMode = true;

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function toggleMode() {
    isLoginMode = !isLoginMode;

    const title = document.getElementById('authTitle');
    const desc = document.getElementById('authDesc');
    const toggleText = document.getElementById('toggleAuth');
    const btn = document.getElementById('mainBtn');

    const nameField = document.getElementById('nameField');
    const confirmField = document.getElementById('confirmField');

    if (isLoginMode) {
        title.innerText = "Welcome Back";
        desc.innerText = "Please enter your details to access the world of GlowSkin.";
        toggleText.innerText = "Don't have an account? Sign up now";
        btn.innerText = "Login";

        nameField.style.display = "none";
        confirmField.style.display = "none";

    } else {
        title.innerText = "Create New Account";
        desc.innerText = "Join us and start your beauty journey.";
        toggleText.innerText = "Already have an account? Login";
        btn.innerText = "Sign Up";

        nameField.style.display = "block";
        confirmField.style.display = "block";
    }
}

function handleAuth() {
    const fullName = document.getElementById('fullname')?.value.trim();
    const emailVal = document.getElementById('email').value.trim();
    const passVal = document.getElementById('password').value.trim();
    const confirmPass = document.getElementById('confirmPassword')?.value.trim();

    if (isLoginMode) {
        if (!emailVal || !passVal) {
            alert("⚠️ Please fill all fields!");
            return;
        }

        const matchedUser = users.find(u => 
            u.email === emailVal && u.password === passVal
        );

        if (matchedUser) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', matchedUser.fullname);

            window.location.href = "home.html";
        } else {
            alert("🚫 Invalid credentials!");
        }

    } else {
        if (!fullName || !emailVal || !passVal || !confirmPass) {
            alert("⚠️ Please fill all fields!");
            return;
        }

        if (!validateEmail(emailVal)) {
            alert("❌ Invalid email format!");
            return;
        }

        if (passVal !== confirmPass) {
            alert("❌ Passwords do not match!");
            return;
        }

        if (users.some(u => u.email === emailVal)) {
            alert("📧 Email already exists!");
            return;
        }

        users.push({ fullname: fullName, email: emailVal, password: passVal });
        localStorage.setItem('registeredUsers', JSON.stringify(users));

        alert(`🎉 Account created for ${fullName}`);
        toggleMode();
    }
   
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = "index.html"; 
}