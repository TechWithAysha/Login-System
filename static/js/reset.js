function togglePasswordVisibility(toggleBtnId, passwordFieldId) {
        const passwordField = document.getElementById(passwordFieldId);
        const toggleBtn = document.getElementById(toggleBtnId);
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        toggleBtn.textContent = type === 'password' ? 'Show' : 'Hide';
    }

    document.getElementById('toggleOldPassword').addEventListener('click', function() {
        togglePasswordVisibility('toggleOldPassword', 'oldPassword');
    });

    document.getElementById('toggleNewPassword').addEventListener('click', function() {
        togglePasswordVisibility('toggleNewPassword', 'newPassword');
    });

    document.getElementById('toggleConfirmPassword').addEventListener('click', function() {
        togglePasswordVisibility('toggleConfirmPassword', 'confirmPassword');
    });

    // Focus and Open Date Picker
    document.getElementById('updateDate').addEventListener('focus', function() {
        this.showPicker(); // This method works in some modern browsers
    });

    // Input Validation and Focus Management
    function setToFocusBc() {
        var bcBox = document.getElementById('resetBranchCode');
        bcBox.focus();
        bcBox.value = '';
    }

    window.onload = function() {
        setToFocusBc();
        generate();
    }

    function isNumberKey(evt) {
        const charCode = (evt.which) ? evt.which : evt.keyCode;
        return (charCode >= 48 && charCode <= 57) || charCode === 8; // Allow numbers and backspace
    }

    function validateBranchCode() {
        const branchCodeInput = document.getElementById('resetBranchCode');
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


let captcha;

// Function to generate a CAPTCHA
function generate() {
    // Clear old input
    document.getElementById("submit").value = "";

    // Access the element to store the generated CAPTCHA
    captcha = document.getElementById("image");
    let uniquechar = "";

    const randomchar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    // Generate CAPTCHA with 5 random characters
    for (let i = 1; i <= 5; i++) {
        uniquechar += randomchar.charAt(Math.floor(Math.random() * randomchar.length));
    }

    // Display the generated CAPTCHA
    captcha.innerHTML = uniquechar;
}

// Function to validate the entered CAPTCHA when "Enter" is pressed
function validateCaptchaOnEnter(event) {
    // Check if the pressed key is "Enter"
    if (event.key === "Enter") {
        const userInput = document.getElementById("submit").value;
        const feedbackElement = document.getElementById("feedback");

        // Check if the input matches the generated CAPTCHA
        if (userInput === captcha.innerHTML) {
            feedbackElement.style.display = 'none'; // Hide feedback if CAPTCHA is correct
            document.getElementById("oldPassword").disabled = false; // Enable old password field
            document.getElementById("resetPasswordBtn").disabled = false; // Enable submit button
            document.getElementById("oldPassword").focus(); // Automatically focus on the old password field
            alert("CAPTCHA correct! You can now proceed.");
            // Optionally hide the CAPTCHA after validation
            document.getElementById("captchaContainer").style.display = 'none';
        } else {
            feedbackElement.textContent = "CAPTCHA does not match. Please try again.";
            feedbackElement.style.display = 'block'; // Show feedback if CAPTCHA is incorrect

             setTimeout(function() {
            generate(); // Call your CAPTCHA generation function
            feedbackElement.style.display = 'none'; // Hide feedback after regeneration
        }, 3000);// Regenerate CAPTCHA
        }
    }
}

// Add event listener for CAPTCHA input to validate on "Enter"
document.getElementById("submit").addEventListener("keydown", validateCaptchaOnEnter);






    function validatePasswordField(passwordFieldId) {
        const passwordField = document.getElementById(passwordFieldId);
        const passwordValue = passwordField.value;

        // Remove any non-whitespace characters
        const trimmedPassword = passwordValue.replace(/\s+/g, '');

        // Ensure the password is up to 8 characters
        if (trimmedPassword.length > 8) {
            passwordField.value = trimmedPassword.substring(0, 8); // Trim to 8 characters
        } else {
            passwordField.value = trimmedPassword; // Update to the trimmed password
        }
    }

    // Event listeners for password fields
    document.getElementById('oldPassword').addEventListener('input', function() {
        validatePasswordField('oldPassword');
    });

    document.getElementById('newPassword').addEventListener('input', function() {
        validatePasswordField('newPassword');
    });

    document.getElementById('confirmPassword').addEventListener('input', function() {
        validatePasswordField('confirmPassword');
    });

    document.getElementById('resetBranchCode').addEventListener('input', validateBranchCode);

    // Handle Enter Key for Moving to Next Field
    document.getElementById('resetBranchCode').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            const nextField = document.getElementById('updateDate');
            nextField.focus();
        }
    });

    document.getElementById('updateDate').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            const nextField = document.getElementById('submit');
            nextField.focus();
        }
    });
// Focusing on the old password field when pressing "Enter" in the CAPTCHA input
document.getElementById('submit').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        const nextField = document.getElementById('oldPassword');
        nextField.focus(); // Move focus to the old password field
    }
});



    document.getElementById('oldPassword').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            const nextField = document.getElementById('newPassword');
            nextField.focus();
        }
    });
// Event listener for focusing on the new password field
document.getElementById('newPassword').addEventListener('focus', function() {
    // Show validation messages when the field is focused
    const validationDiv = document.querySelector('.validation');
    validationDiv.style.display = 'block'; // Show validation messages

    // Reset all validation states
    const lengthValid = document.getElementById('lengthValid');
    const lowerCaseValid = document.getElementById('lowerCaseValid');
    const upperCaseValid = document.getElementById('upperCaseValid');
    const numberOrSymbolValid = document.getElementById('numberOrSymbolValid');

    lengthValid.classList.remove('valid');
    lowerCaseValid.classList.remove('valid');
    upperCaseValid.classList.remove('valid');
    numberOrSymbolValid.classList.remove('valid');
});

// Event listener for keydown on the new password field
document.getElementById('newPassword').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        const nextField = document.getElementById('confirmPassword');

        // Hide validation messages before focusing on the next field
        const validationDiv = document.querySelector('.validation');
        validationDiv.style.display = 'none'; // Hide validation messages

        nextField.focus();
    }

    // Validate the new password on input
    const password = this.value;
    const lengthValid = document.getElementById('lengthValid');
    const lowerCaseValid = document.getElementById('lowerCaseValid');
    const upperCaseValid = document.getElementById('upperCaseValid');
    const numberOrSymbolValid = document.getElementById('numberOrSymbolValid');

    // Reset all validation states
    lengthValid.classList.remove('valid');
    lowerCaseValid.classList.remove('valid');
    upperCaseValid.classList.remove('valid');
    numberOrSymbolValid.classList.remove('valid');

    // Validate conditions
    if (password.length >= 8) {
        lengthValid.classList.add('valid');
    }
    if (/[a-z]/.test(password)) {
        lowerCaseValid.classList.add('valid');
    }
    if (/[A-Z]/.test(password)) {
        upperCaseValid.classList.add('valid');
    }
    if (/[0-9!@#$%^&*()_+<>?]/.test(password)) {
        numberOrSymbolValid.classList.add('valid');
    }
});

// Optional: Hide validation messages when the confirm password field gains focus
document.getElementById('confirmPassword').addEventListener('focus', function() {
    const validationDiv = document.querySelector('.validation');
    validationDiv.style.display = 'none'; // Hide validation messages
});



    document.getElementById('confirmPassword').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            document.getElementById('resetPasswordBtn').click(); // Trigger form submission
        }
    });

  const inputField = document.getElementById('resetBranchCode');

inputField.addEventListener('blur', function handleBlur() {
    const code = inputField.value.trim();

    fetch('/branch-codes')
        .then(res => res.json())
        .then(data => {
            if (data[code]) {
                inputField.value = `${code} - ${data[code]}`;
                inputField.readOnly = true;
            } else {
                alert('Invalid branch code. Please enter a valid code.');
                inputField.value = '';
                inputField.removeEventListener('blur', handleBlur); // Temporarily remove the event listener
                inputField.focus(); // Focus without triggering blur
                inputField.readOnly = false;
                setTimeout(() => inputField.addEventListener('blur', handleBlur), 100); // Re-add the listener after a delay
            }
        })
        .catch(err => {
            console.error('Error fetching branch codes:', err);
            alert('Error fetching branch codes. Please try again later.');
            inputField.readOnly = false;
        });
});


     function containsNumberOrSymbol(str) {
        const numberOrSymbol = /[0-9!@#$%^&*(),.?":{}|<>]/;
        return numberOrSymbol.test(str);
    }

    // Password validation function
    function validatePasswordStrength(password) {
        const lengthValid = password.length >= 8;
        const lowerCaseValid = /[a-z]/.test(password);
        const upperCaseValid = /[A-Z]/.test(password);
        const numberOrSymbolValid = containsNumberOrSymbol(password);

        // Update UI for each condition
        document.getElementById('lengthValid').classList.toggle('valid', lengthValid);
        document.getElementById('lengthValid').classList.toggle('invalid', !lengthValid);

        document.getElementById('lowerCaseValid').classList.toggle('valid', lowerCaseValid);
        document.getElementById('lowerCaseValid').classList.toggle('invalid', !lowerCaseValid);

        document.getElementById('upperCaseValid').classList.toggle('valid', upperCaseValid);
        document.getElementById('upperCaseValid').classList.toggle('invalid', !upperCaseValid);

        document.getElementById('numberOrSymbolValid').classList.toggle('valid', numberOrSymbolValid);
        document.getElementById('numberOrSymbolValid').classList.toggle('invalid', !numberOrSymbolValid);

        return lengthValid && lowerCaseValid && upperCaseValid && numberOrSymbolValid;
    }
//
////     Compare passwords function
//function comparePasswords() {
//    const newPassword = document.getElementById('newPassword').value;
//    const confirmPassword = document.getElementById('confirmPassword').value;
//    const passwordMatchError = document.getElementById('passwordMatchError');
//
//    if (newPassword !== confirmPassword) {
//        passwordMatchError.textContent = "Passwords do not match. Please re-enter.";
//        document.getElementById('confirmPassword').value = '';  // Clear confirm password
//        document.getElementById('confirmPassword').focus();
//        passwordMatchError.style.display = 'block';  // Show error message
//        return false;  // Prevent form submission
//    }
//
//    passwordMatchError.style.display = 'none';  // Hide error message if passwords match
//    return true;
//}


    // Check old password matches login password (you should replace 'exampleLoginPassword' with actual password logic)
    function checkOldPasswordMatches() {
        const oldPassword = document.getElementById('oldPassword').value;
        const loginPassword = 'Password'; // Replace with actual password verification logic
        if (oldPassword !== loginPassword) {
            alert("Old password is incorrect. Please try again.");
            document.getElementById('oldPassword').value = '';
            document.getElementById('oldPassword').focus();
            return false;
        }
        return true;
    }

    // Attach event listeners to password fields for validation
    document.getElementById('newPassword').addEventListener('input', function () {
        validatePasswordStrength(this.value);
    });

    document.getElementById('resetForm').onsubmit = async function(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(this); // Gather form data

        const response = await fetch('/reset-password', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json(); // Get the JSON response

        if (result.status === 'error') {
            // Show alert if passwords don't match
            alert(result.message);
            // Clear the confirm password input
            document.getElementById('confirmPassword').value = '';
            document.getElementById('confirmPassword').focus(); // Focus back on the confirm password input
        } else {
            // Handle success message
            alert(result.message);
            // Optionally redirect or refresh the page
            window.location.href = '/reset'; // Redirect to the reset page
        }
    };

    document.getElementById('confirmPassword').addEventListener('input', comparePasswords);

    // Submit button handler to check all validations before submitting
    document.getElementById('resetPasswordBtn').addEventListener('click', function (event) {
        event.preventDefault(); // Prevent form submission

        const newPasswordValid = validatePasswordStrength(document.getElementById('newPassword').value);
        const passwordsMatch = comparePasswords();
        const oldPasswordMatches = checkOldPasswordMatches();

        if (newPasswordValid && passwordsMatch && oldPasswordMatches) {
            alert("Password successfully reset!");
            // Here you can proceed with the actual form submission or further logic
        }
    });
