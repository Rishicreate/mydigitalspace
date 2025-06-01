document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password-input');
    const checkStrengthBtn = document.getElementById('check-strength-btn');
    const strengthResultDiv = document.getElementById('strength-result');
    const suggestPasswordBtn = document.getElementById('suggest-password-btn');
    const suggestionResultDiv = document.getElementById('suggestion-result');
  
    checkStrengthBtn.addEventListener('click', async () => {
      const password = passwordInput.value;
      if (password) {
        try {
          const response = await fetch('/api/password/strength', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
          });
          const data = await response.json();
          strengthResultDiv.textContent = `Strength: ${data.score}/4 (${data.feedback.warning || 'Strong'})`;
        } catch (error) {
          console.error('Error checking password strength:', error);
          strengthResultDiv.textContent = 'Error checking password strength.';
        }
      } else {
        strengthResultDiv.textContent = 'Please enter a password.';
      }
    });
  
    suggestPasswordBtn.addEventListener('click', async () => {
      try {
        const response = await fetch('/api/password/suggest');
        const data = await response.json();
        suggestionResultDiv.textContent = `Suggested Password: ${data.suggestion}`;
      } catch (error) {
        console.error('Error getting password suggestion:', error);
        suggestionResultDiv.textContent = 'Error getting password suggestion.';
      }
    });
  });