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
    document.getElementById('adminLoginForm').style.display = 'none';

    const userList = document.getElementById('userList');
    userList.style.display = 'block'; 
    
    userList.innerHTML = `
      <h2>Registered Users:</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>win</th>
            <th>Attempts</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    `;

    const tableBody = document.querySelector('table tbody');

    result.users.forEach(user => {
      const phone = (user.phone && user.phone.length === 10) ? user.phone : 'Invalid Phone Number';
      
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${phone}</td>
        <td>${user.win}</td>
        <td>${user.attempts}</td>
      `;
      tableBody.appendChild(row);
    });
  }
});

