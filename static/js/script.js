function setToFocusBc() {
    var bcBox = document.getElementById('branchCode');
    bcBox.focus();
    bcBox.value = '';
}

window.onload = function() {
    setToFocusBc();
}

function isNumberKey(evt) {
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    return (charCode >= 48 && charCode <= 57) || charCode === 8; // Allow numbers and backspace
}

function validateBranchCode() {
    const branchCodeInput = document.getElementById('branchCode');
    const branchCodeValue = branchCodeInput.value;

    // Remove any non-digit characters
    const digitsOnly = branchCodeValue.replace(/\D/g, '');

    // Ensure the branch code is exactly 5 digits
    if (digitsOnly.length > 5) {
        branchCodeInput.value = digitsOnly.substring(0, 5); // Trim to 5 digits
    } else {
        branchCodeInput.value = digitsOnly; // Update to the digits only
    }
}

function validateUsername() {
    const usernameInput = document.getElementById('username');
    const usernameValue = usernameInput.value;

    // Remove whitespace
    const trimmedValue = usernameValue.replace(/\s+/g, '');
    usernameInput.value = trimmedValue;

    // Check length
    if (trimmedValue.length > 15) {
        usernameInput.value = trimmedValue.substring(0, 15); // Trim to 15 characters
    }
}

function validatePassword() {
    const passwordInput = document.getElementById('password');
    const passwordValue = passwordInput.value;

    // Remove any whitespace
    const trimmedPassword = passwordValue.replace(/\s+/g, '');

    // Ensure the password is up to 8 characters
    if (trimmedPassword.length > 8) {
        passwordInput.value = trimmedPassword.substring(0, 8); // Trim to 8 characters
    } else {
        passwordInput.value = trimmedPassword; // Update to the trimmed password
    }
}

let currentField = 'branchCode';
let alertShown = false; // Flag to prevent multiple alerts

// Initially hide the nextToPasswordBtn and username field
document.getElementById('nextToPasswordBtn').style.display = 'none';
document.getElementById('username').style.display = 'none';

// Ensure branch code input is exactly 5 digits
function validateBranchCodeLength(code) {
    const isValid = /^\d{5}$/.test(code); // Regex to check if the input is exactly 5 digits
    return isValid;
}

// Validate the branch code on blur or Enter key press
async function validateBranchCodeOnBlur(code) {
    // Check if the branch code is exactly 5 digits before making the API call
    if (!validateBranchCodeLength(code)) {
        handleInvalidCode("Branch code must be exactly 5 digits.");
        return;
    }

    try {
        const response = await fetch('/branch-codes'); // Fetch branch codes (adjust API accordingly)
        const data = await response.json();

        if (data[code]) {
            // Branch code is valid
            document.getElementById('branchCode').value = `${code} - ${data[code]}`;
            document.getElementById('branchCode').readOnly = true;
            document.getElementById('nextToPasswordBtn').style.display = 'block'; // Show nextToPasswordBtn button
            document.getElementById('username').style.display = 'block'; // Show username field
            alertShown = false; // Reset alert flag
            document.getElementById('username').focus(); // Move focus to username
        } else {
            // Branch code is invalid
            handleInvalidCode("Invalid branch code.");
        }
    } catch (error) {
        console.error('Error fetching branch codes:', error);
        alert('Please try again later.');
    }
}

// Handle invalid branch code
function handleInvalidCode(message) {
    if (!alertShown) {
        // Hide username and nextToPasswordBtn since the code is invalid
        document.getElementById('nextToPasswordBtn').style.display = 'none'; // Hide nextToPasswordBtn button
        document.getElementById('username').style.display = 'none'; // Hide username field

        alert(message); // Show alert with custom message
        alertShown = true; // Set the flag to prevent further alerts
    }
    document.getElementById('branchCode').value = ''; // Clear input
    document.getElementById('branchCode').readOnly = false; // Make input editable again

    setTimeout(() => {
        document.getElementById('branchCode').focus(); // Focus back on the input after the alert closes
    }, 0);
}

// Handle empty input
function handleEmptyInput() {
    if (!alertShown) {
        alert('Branch code cannot be empty');
        alertShown = true; // Set the flag to prevent further alerts
    }
    document.getElementById('branchCode').readOnly = false;

    // Hide the username and nextToPasswordBtn button if branch code is empty
    document.getElementById('nextToPasswordBtn').style.display = 'none'; // Hide nextToPasswordBtn button
    document.getElementById('username').style.display = 'none'; // Hide username field

    setTimeout(() => {
        document.getElementById('branchCode').focus();
    }, 0);
}

// Limit branch code input to numeric and 5 digits
document.getElementById('branchCode').addEventListener('input', function(event) {
    this.value = this.value.replace(/\D/g, '').slice(0, 5); // Remove non-digits and limit to 5 characters
});

// Validate on Enter key press
document.getElementById('branchCode').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission

        const code = this.value.trim();
        if (code !== '') {
            validateBranchCodeOnBlur(code); // Call the validation function
        } else {
            handleEmptyInput(); // Handle empty input if the field is blank
        }
    }
});


//Function to show the username field
//function showUsernameField() {
//    document.getElementById('username').style.display = 'block'; // Show username
//}

// Function to hide the username field
//function hideUsernameField() {
//    document.getElementById('username').style.display = 'none'; // Hide username
//}



document.getElementById('branchCode').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        validateBranchCode(); // Validate branch code
        if (this.value.trim() !== '') {
            toggleBranchCodeField();
            showUsernameField();
        }
    }
});

document.getElementById('username').addEventListener('input', validateUsername);
document.getElementById('username').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        if (this.value.trim() !== '') {
            toggleUsernameField();
            showPasswordField();
            document.getElementById('branchCode').classList.remove('hidden'); // Show branch code field again
        }
    }
});

document.getElementById('password').addEventListener('input', validatePassword);
document.getElementById('password').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        if (this.value.trim() !== '') {
            document.getElementById('submitBtn').click();
        }
    }
});

// Button event listeners
document.getElementById('nextToUsernameBtn').addEventListener('click', function () {
    if (currentField === 'branchCode' && document.getElementById('branchCode').value.trim() !== '') {
        toggleBranchCodeField();
        showUsernameField();
    } else {
        toggleBranchCodeField();
    }
});

document.getElementById('nextToPasswordBtn').addEventListener('click', function () {
    if (currentField === 'username' && document.getElementById('username').value.trim() !== '') {
        toggleUsernameField();
        showPasswordField();
    } else {
        toggleUsernameField();
    }
});

// Show/Hide Fields Functions
function showUsernameField() {
    document.getElementById('username').classList.remove('hidden');
    document.getElementById('nextToPasswordBtn').classList.remove('hidden');
    document.getElementById('branchCode').readOnly = true;
    document.getElementById('branchCode').classList.add('disabled');
    document.getElementById('nextToUsernameBtn').textContent = '←';
    currentField = 'username';
    document.getElementById('username').focus();
}

function showPasswordField() {
    document.getElementById('password').classList.remove('hidden');
    document.getElementById('togglePassword').classList.remove('hidden');
    document.getElementById('submitBtn').classList.remove('hidden');
    document.getElementById('username').readOnly = true;
    document.getElementById('username').classList.add('disabled');
    document.getElementById('nextToPasswordBtn').textContent = '←';
    currentField = 'password';
    document.getElementById('password').focus();
}

function toggleBranchCodeField() {
    const branchCodeInput = document.getElementById('branchCode');
    const nextToUsernameBtn = document.getElementById('nextToUsernameBtn');
    const usernameInput = document.getElementById('username');

    if (branchCodeInput.readOnly) {
        branchCodeInput.readOnly = false;
        branchCodeInput.value = '';
        branchCodeInput.focus();

        // Add event listener for input changes
        branchCodeInput.addEventListener('input', () => {
            if (branchCodeInput.value.trim() !== '') {
                nextToUsernameBtn.textContent = '→';
            }
        });

        // Add event listener for the Enter key
        branchCodeInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                usernameInput.value = '';
                usernameInput.focus();
                usernameInput.readOnly = false
            }
        });

        // Hide other fields
        document.getElementById('username').classList.add('hidden');
        document.getElementById('password').classList.add('hidden');
        document.getElementById('togglePassword').classList.add('hidden');
        document.getElementById('nextToPasswordBtn').classList.add('hidden');
        document.getElementById('submitBtn').classList.add('hidden');
    } else {
        branchCodeInput.readOnly = true;
        nextToUsernameBtn.textContent = '←';
    }
}

function toggleUsernameField() {
    const usernameInput = document.getElementById('username');
    const branchCodeInput = document.getElementById('branchCode');
    const nextToPasswordBtn = document.getElementById('nextToPasswordBtn');

    if (usernameInput.readOnly) {
        usernameInput.readOnly = false;
        usernameInput.value = '';
        usernameInput.focus();

        // Show branch code field again
        branchCodeInput.classList.remove('hidden');
        nextToPasswordBtn.classList.remove('hidden');
        document.getElementById('password').classList.add('hidden');
        document.getElementById('togglePassword').classList.add('hidden');
        document.getElementById('submitBtn').classList.add('hidden');
    } else {
        usernameInput.readOnly = true;
        nextToPasswordBtn.textContent = '←';
    }
}

// Toggle Password Visibility
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.textContent = type === 'password' ? 'Show' : 'Hide';
    document.getElementById('forgotPasswordLink').classList.toggle('hidden', type === 'password' || passwordField.value.trim() === '');
});

// Forgot Password Link
document.getElementById('forgotPasswordLink').addEventListener('click', function() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('resetForm').classList.remove('hidden');
});

