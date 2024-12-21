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
//       document.getElementById('adminLoginForm').style.display = 'none';

//     // Display the list of registered users
//     const userList = document.getElementById('userList');
//     userList.style.display = 'block'; 
      
//       userList.innerHTML = '<h2>Registered Users:</h2>';
//       result.users.forEach(user => {
//         userList.innerHTML += `<p>${user.name} - ${user.email} - ${user.phone}</p>`;
//       });
//     }
//   });
document.getElementById('adminLoginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log('Form submitted');

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const adminMessage = document.getElementById('adminMessage');

  const response = await fetch('http://localhost:8000/admin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const result = await response.json();
  adminMessage.textContent = result.message;

  if (result.success) {
    // Hide login form
    document.getElementById('adminLoginForm').style.display = 'none';

    // Display the list of registered users
    const userList = document.getElementById('userList');
    userList.style.display = 'block'; 
    
    // Create the table
    userList.innerHTML = `
      <h2>Registered Users:</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    `;

    const tableBody = document.querySelector('table tbody');

    // Iterate over users and display their details
    result.users.forEach(user => {
      // Check if phone number has 10 digits
      const phone = (user.phone && user.phone.length === 10) ? user.phone : 'Invalid Phone Number';
      
      // Create a table row for each user
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${phone}</td>
      `;
      tableBody.appendChild(row);
    });
  }
});

