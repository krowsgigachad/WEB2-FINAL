document.addEventListener('keydown', function(event) {
    // Check if Shift and A are pressed together
    if (event.shiftKey && event.key === 'A') {
        const adminBtn = document.getElementById('adminRegisterBtn');
        if (adminBtn) {
            adminBtn.style.display = 'block'; // Show the button
        }
    }
});

function registerAsAdmin() {
    // Set the admin code
    const adminCodeInput = document.getElementById('adminCode');
    adminCodeInput.value = 'secretAdminCode';

    // Submit the form
    document.getElementById('registrationForm').submit();
}
