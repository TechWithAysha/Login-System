Login and Password Reset System Overview

This system enables users to log in securely and reset their passwords when necessary. 

Frontend

HTML: The login page features a form for username and password input, along with a link for password reset. The password reset page includes a form to submit an email address for reset requests.

CSS: Styles are applied to enhance the visual appeal of the forms, making them user-friendly and ensuring a consistent look across the application.

JavaScript : Client-side validation is implemented to check that all fields are filled before submission, improving user experience by providing immediate feedback.

 Backend Using (Flask)

User Authentication : The Flask backend processes login requests, verifies user credentials against a database, and manages user sessions. If login is successful, users are redirected to a secure area of the application.

Password Reset : When a user requests a password reset, the backend verifies the email, generates a secure reset token, and sends it to the user via email, guiding them through the process of setting a new password.

Security Considerations

- Passwords are securely hashed before storage.
- Session management is implemented to maintain user authentication state.
- Both client-side and server-side validation are enforced to protect against malicious inputs.
- This system is designed to provide a secure and user-friendly experience for managing user authentication and password recovery.
