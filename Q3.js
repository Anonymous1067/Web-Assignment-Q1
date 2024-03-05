document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitButton');
    const viewTableBtn = document.getElementById('viewTableBtn');

    submitButton.addEventListener('click', submitForm);
    viewTableBtn.addEventListener('click', viewApplications);
});

function submitForm() {
    if (validateForm()) {
        const formData = collectFormData();
        console.log('Submitted Data:', formData);
        
        document.getElementById('viewTableBtn').style.display = 'inline-block';

        showToast('Form submitted successfully!');
    }
}

function collectFormData() {
    const form = document.getElementById('jobApplicationForm');
    const formData = {};

    for (const element of form.elements) {
        if (element.name) {
            formData[element.name] = element.value;
        }
    }

    return formData;
}


function validateForm() {
    const form = document.getElementById('jobApplicationForm');

    resetValidationStyles(form);

    let isValid = true;

    const firstName = form.elements['firstName'].value.trim();
    if (firstName === '') {
        isValid = false;
        markInvalidField(form.elements['firstName']);
        console.log('name fail Data:');   
    }

    const email = form.elements['emailAddress'].value.trim();
    if (!isValidEmail(email)) {
        isValid = false;
        markInvalidField(form.elements['emailAddress']);
        console.log('email fail Data:');   

    }

    const phoneNumber = form.elements['phoneNumber'].value.trim();
    if (!isValidPhoneNumber(phoneNumber)) {
        isValid = false;
        markInvalidField(form.elements['phoneNumber']);
        console.log('phone fail Data:');   

    }

    return isValid;
}

function isValidEmail(email) {
    // Check if the email contains a "@" symbol and at least one dot after it
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        return false;
    }

    // Split the email into local part and domain part
    const parts = email.split('@');

    // Ensure there's only one "@" symbol
    if (parts.length !== 2) {
        return false;
    }

    // Check if the local part and domain part are not empty
    if (parts[0].length === 0 || parts[1].length === 0) {
        return false;
    }

    // Check if the domain part contains at least one dot after "@" symbol
    if (parts[1].indexOf('.') === -1) {
        return false;
    }

    // Check if the domain part does not start or end with a dot
    const domainParts = parts[1].split('.');
    if (domainParts.length < 2 || domainParts[0].length === 0 || domainParts[domainParts.length - 1].length === 0) {
        return false;
    }

    // Check if the local part and domain part do not contain invalid characters
    const validChars = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
    if (!validChars.test(parts[0]) || !validChars.test(parts[1])) {
        return false;
    }

    return true;
}


function isValidPhoneNumber(phoneNumber) {
    // Remove all non-digit characters from the input
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
    
    // Check if the cleaned phone number has 10 digits (adjust as needed)
    return cleanedPhoneNumber.length === 11;
}


function markInvalidField(field) {
    field.style.border = '2px solid red';
}

function resetValidationStyles(form) {
    const fields = form.elements;
    for (let i = 0; i < fields.length; i++) {
        if (fields[i].type !== 'checkbox') {
            fields[i].style.border = '';
        }
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}


function viewApplications() {
    const formData = collectFormData();
    const tableBody = document.getElementById('tableBody');

    // Append a new row for each submitted application
    const newRow = tableBody.insertRow();

    for (const key in formData) {
        const cell = newRow.insertCell();
        cell.appendChild(document.createTextNode(formData[key]));
    }

    // Display the table
    const table = document.getElementById('applicationsTable');
    table.style.display = 'table';
}


function clearForm() {
    const form = document.getElementById('jobApplicationForm');
    form.reset();
}