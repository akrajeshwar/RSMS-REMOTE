// Get the signup form
const signupForm = document.getElementById('signupform');

// Add event listener for form submission
signupForm.addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent default form submission

    // Get form input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('psw').value;
    const phone = document.getElementById('phone').value;

    // Log the user inputs to console
    console.log('=== Signup Form Submitted ===');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Mobile Number:', phone);
    console.log('============================');

    try {
        // Send signup request to backend
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                phone: phone
            })
        });

        const data = await response.json();
        console.log('Response:', data);

        if (data.success) {
            // User created successfully
            alert('Signup successful! Redirecting to login...');
            console.log('Redirecting to login page...');
            window.location.href = '../login.html';
        } else if (data.exists) {
            // User already exists
            alert('User already exists! Redirecting to login...');
            console.log('Redirecting to login page...');
            window.location.href = '../login.html';
        } else {
            // Error creating user
            alert(data.message || 'Error during signup. Please try again.');
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        alert('Error connecting to server. Please try again later.');
    }
});