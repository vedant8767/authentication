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