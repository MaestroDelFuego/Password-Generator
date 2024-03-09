document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('generate-btn').addEventListener('click', generatePassword);
});

function generatePassword() {
    const length = document.getElementById('length').value;
    const uppercase = document.getElementById('uppercase').checked;
    const lowercase = document.getElementById('lowercase').checked;
    const numbers = document.getElementById('numbers').checked;
    const symbols = document.getElementById('symbols').checked;

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_-+=<>?/';

    let chars = '';
    if (uppercase) chars += uppercaseChars;
    if (lowercase) chars += lowercaseChars;
    if (numbers) chars += numberChars;
    if (symbols) chars += symbolChars;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars.charAt(randomIndex);
    }

    document.getElementById('password').value = password;

    // Estimate password strength based on length and character set
    const passwordLength = length;
    const characterSetSize = (uppercase ? uppercaseChars.length : 0) +
                             (lowercase ? lowercaseChars.length : 0) +
                             (numbers ? numberChars.length : 0) +
                             (symbols ? symbolChars.length : 0);

    const possibleCombinations = Math.pow(characterSetSize, passwordLength);

    // Simple estimation based on attempts per second
    const attemptsPerSecond = 1000000000; // 1 billion attempts per second
    const crackTimeSeconds = possibleCombinations / attemptsPerSecond;

    displayStrength(crackTimeSeconds);
}

function displayStrength(crackTimeSeconds) {
    const strengthIndicator = document.getElementById('strength-indicator');
    const crackTimeDisplay = document.getElementById('crack-time');

    if (crackTimeSeconds < 1e3) {
        strengthIndicator.textContent = 'Weak';
        crackTimeDisplay.textContent = 'Instant';
    } else if (crackTimeSeconds < 1e6) {
        strengthIndicator.textContent = 'Moderate';
        const minutes = Math.ceil(crackTimeSeconds / 60);
        crackTimeDisplay.textContent = `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
        strengthIndicator.textContent = 'Strong';
        const hours = Math.ceil(crackTimeSeconds / 3600);
        crackTimeDisplay.textContent = `${hours} hour${hours > 1 ? 's' : ''}`;
    }
}
