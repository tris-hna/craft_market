// Function to register a user
function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;

    if (!username || !password || !email || !name) {
        alert('Please fill all fields.');
        return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.username === username)) {
        alert('Username already exists.');
        return;
    }

    // Store user
    users.push({ username, password, email });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! Please log in.');
    window.location.href = 'login.html';
}

// Function to log in
function loginUser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', username);
        window.location.href = 'profile.html';
    } else {
        alert('Invalid username or password.');
    }
}

// Function to add a craft (on profile page)
function addCraft(event) {
    event.preventDefault();

    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert("Login first");
        return;
    }

    const name = document.getElementById("craftName").value;
    const description = document.getElementById("craftDescription").value;
    const price = document.getElementById("craftPrice").value;
    const imageFile = document.getElementById("craftImage").files[0];

    if (!name || !description || !price || !imageFile) {
        alert("Sab fields bharo + image select karo");
        return;
    }

    const reader = new FileReader();

    reader.onload = function () {
        const crafts = JSON.parse(localStorage.getItem("crafts")) || {};
        if (!crafts[currentUser]) crafts[currentUser] = [];

        crafts[currentUser].push({
            name: name,
            description: description,
            price: price,
            image: reader.result   // ⭐IMAGE SAVE
        });

        localStorage.setItem("crafts", JSON.stringify(crafts));
        alert("Craft added!");
        displayCrafts();
    };

    reader.readAsDataURL(imageFile);
}

// Function to display crafts on profile
function displayCrafts() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;

    const crafts = JSON.parse(localStorage.getItem('crafts')) || {};
    const userCrafts = crafts[currentUser] || [];
    const list = document.getElementById('craftList');
    list.innerHTML = '';

    userCrafts.forEach(craft => {
        const card = document.createElement('div');
        card.className = 'craft-card';
       card.innerHTML = `
    <img src="${craft.image}" width="150">
    <h3>${craft.name}</h3>
    <p>${craft.description}</p>
    <p>Price: ₹${craft.price}</p>
`;

        list.appendChild(card);
    });
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Check if logged in on profile page
function checkLogin() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert('Please log in first.');
        window.location.href = 'login.html';
    } else {
        document.getElementById('welcome').textContent = `Welcome, ${currentUser}!`;
        displayCrafts();
    }
}