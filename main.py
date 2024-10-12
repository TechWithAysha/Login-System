from flask import Flask, render_template, request, jsonify, redirect, url_for, flash

app = Flask(__name__)

branch_codes = {
    "00111": "Beach Road",
    "00112": "St Road",
    "00113": "RK Road",
    "00114": "Main Street",
    "00115": "Second Avenue",
    "00116": "Third Boulevard",
    "00117": "Pine Street",
    "00118": "Maple Avenue",
    "00119": "Elm Street",
    "00120": "Oak Drive"
}

app.secret_key = 'your_unique_secret_key'


@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        branch_code = request.form['branchCode']
        username = request.form['username']
        password = request.form['password']
        return "Logged in successfully!"  # Placeholder response
    return render_template('login.html')


@app.route('/reset', methods=['GET'])
def reset():
    return render_template('reset.html')


@app.route('/reset-password', methods=['POST'])
def reset_password():
    reset_branch_code = request.form['resetBranchCode']
    old_password = request.form['oldPassword']
    new_password = request.form['newPassword']
    confirm_password = request.form['confirmPassword']
    update_date = request.form['updateDate']

    # Password comparison logic
    if new_password != confirm_password:
        return jsonify({'status': 'error', 'message': 'Passwords do not match.'})

    return jsonify({'status': 'success', 'message': f'Password has been successfully reset on {update_date}.'})


@app.route('/branch-codes', methods=['GET'])

def get_branch_codes():
    return jsonify(branch_codes)


if __name__ == '__main__':
    app.run(debug=True)
