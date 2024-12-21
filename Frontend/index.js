const baseURL = 'http://localhost:8000/api';

// Handle Registration
// document.getElementById('registerForm').addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const username = document.getElementById('registerUsername').value;
//   const password = document.getElementById('registerPassword').value;

//   try {
//     const response = await fetch(`${baseURL}/register`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, password })
//     });

//     const data = await response.json();
//     document.getElementById('registerMessage').textContent = data.message || data.error;
//   } catch (error) {
//     console.error('Error registering user:', error);
//   }
// });



// // Fetch All Users
// document.getElementById('fetchUsers').addEventListener('click', async () => {
//   try {
//     const response = await fetch(`${baseURL}/users`);
//     const users = await response.json();

//     const userList = document.getElementById('userList');
//     userList.innerHTML = ''; // Clear existing list
//     users.forEach((user) => {
//       const li = document.createElement('li');
//       li.textContent = user.username;
//       userList.appendChild(li);
//     });
//   } catch (error) {
//     console.error('Error fetching users:', error);
//   }
// });
// User Registration Form Submission
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message');
  
    // Basic Validations
    if (!/^\d{10}$/.test(phone)) {  // Ensure phone number is exactly 10 digits
      message.textContent = 'Phone number must be exactly 10 digits!';
      return;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      message.textContent = 'Invalid email format!';
      return;
    }
  
    // Backend Request
    const response = await fetch('http://localhost:8000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email }),
    });
  
    const result = await response.json();
    message.textContent = result.message;
    if (result) {
      document.getElementById('registerForm').reset();
    }
  });
  
  // Admin Login Form Submission
// document.getElementById('adminLoginForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     console.log('Form submitted');
  
//     const username = document.getElementById('username').value.trim();
//     const password = document.getElementById('password').value.trim();
//     const adminMessage = document.getElementById('adminMessage');
  
//     const response = await fetch('http://localhost:8000/admin', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, password }),
//     });
  
//     const result = await response.json();
//     adminMessage.textContent = result.message;
  
//     if (result.success) {
//       // Display Registered Users
//       const userList = document.getElementById('userList');
//       userList.innerHTML = '<h2>Registered Users:</h2>';
//       result.users.forEach(user => {
//         userList.innerHTML += `<p>${user.name} - ${user.email}</p>`;
//       });
//     }
//   });
  