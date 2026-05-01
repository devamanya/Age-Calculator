// Initialize Luxon and Flatpickr
const DateTime = luxon.DateTime;

// Initialize the Datepicker (Flatpickr)
const fp = flatpickr("#birthdate", {
    maxDate: "today",
    dateFormat: "Y-m-d",
});

const ageForm = document.getElementById('age-form');
const resultContainer = document.getElementById('result-container');
const errorMsg = document.getElementById('error-msg');

ageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const birthdateValue = document.getElementById('birthdate').value;

    if (!birthdateValue) {
        showError();
        return;
    }

    // 1. Convert input to Luxon DateTime
    const birthday = DateTime.fromISO(birthdateValue);
    const now = DateTime.now();

    // 2. Validation: Ensure date is not in the future
    if (birthday > now) {
        showError();
        return;
    }

    // 3. Calculation using Luxon's diff method
    const diff = now.diff(birthday, ['years', 'months', 'days']).toObject();

    // 4. Update UI
    displayResult(diff);
});

function displayResult(data) {
    errorMsg.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    
    document.getElementById('years').textContent = Math.floor(data.years);
    document.getElementById('months').textContent = Math.floor(data.months);
    document.getElementById('days').textContent = Math.floor(data.days);
}

function showError() {
    resultContainer.classList.add('hidden');
    errorMsg.classList.remove('hidden');
}
