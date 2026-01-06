const passwordOutput = document.getElementById('passwordOutput');
const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const copyMessage = document.getElementById('copyMessage');

const checkboxes = {
    upper: document.getElementById('includeUppercase'),
    lower: document.getElementById('includeLowercase'),
    number: document.getElementById('includeNumbers'),
    symbol: document.getElementById('includeSymbols')
};

const CHAR_SETS = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    number: '0123456789',
    symbol: '!@#$%^&*()_+~`|}{[]:;?><,./-='
};

lengthSlider.addEventListener('input', (e) => {
    lengthValue.textContent = e.target.value;
});

generateBtn.addEventListener('click', () => {
    const length = +lengthSlider.value;
    const hasUpper = checkboxes.upper.checked;
    const hasLower = checkboxes.lower.checked;
    const hasNumber = checkboxes.number.checked;
    const hasSymbol = checkboxes.symbol.checked;

    passwordOutput.value = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length);
});

copyBtn.addEventListener('click', () => {
    const password = passwordOutput.value;
    if (!password) return;

    navigator.clipboard.writeText(password).then(() => {
        showCopyMessage();
    });
});

function generatePassword(upper, lower, number, symbol, length) {
    let generatedPassword = '';
    
    const typesCount = upper + lower + number + symbol;
    
    const typesArr = [{upper}, {lower}, {number}, {symbol}].filter(
        item => Object.values(item)[0]
    );
    
    if (typesCount === 0) {
        return 'Select at least one option';
    }

    let charPool = '';
    if (upper) charPool += CHAR_SETS.upper;
    if (lower) charPool += CHAR_SETS.lower;
    if (number) charPool += CHAR_SETS.number;
    if (symbol) charPool += CHAR_SETS.symbol;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        generatedPassword += charPool[randomIndex];
    }

    return generatedPassword;
}

function showCopyMessage() {
    copyMessage.style.opacity = '1';
    setTimeout(() => {
        copyMessage.style.opacity = '0';
    }, 2000);
}