// Function to reformat date from dd/mm/yyyy to dd-mm-yyyy for internal use
function formatDateForOutput(inputDate) {
    const dateParts = inputDate.split('/'); // Split the date into parts
    if (dateParts.length === 3) {
        const day = dateParts[0];
        const month = dateParts[1];
        const year = dateParts[2];
        return `${year}-${month}-${day}`; // Reformat to yyyy-mm-dd for internal use
    }
    return inputDate; // Return the original date if formatting fails
}

// New function to format date as dd/mm/yyyy
function formatDate(inputDate) {
    const [year, month, day] = inputDate.split('-');
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
}

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('images');

dropZone.addEventListener('click', () => {
    fileInput.click();
});

// Script to handle form submission and generate output dynamically
document.getElementById('reportForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from resetting

    // Collect form data
    const formData = {
        programName: document.getElementById('programName').value,
        date: formatDate(document.getElementById('date').value), // Format the date as dd/mm/yyyy
        time: document.getElementById('time').value,
        location: document.getElementById('location').value,
        targetAudience: document.getElementById('targetAudience').value,
        objectives: document.getElementById('objectives').value,
        activities: document.getElementById('activities').value,
        strengths: document.getElementById('strengths').value,
        weaknesses: document.getElementById('weaknesses').value,
        preparedBy: document.getElementById('preparedBy').value,
        position: document.getElementById('position').value
    };

    // Handle image uploads
    const imageFiles = Array.from(document.getElementById('images').files);
    const imagePreviews = imageFiles.slice(0, 4).map(file => {
        const reader = new FileReader();
        return new Promise((resolve) => {
            reader.onload = function (e) {
                resolve(`<img src="${e.target.result}" alt="${file.name}">`);
            };
            reader.readAsDataURL(file);
        });
    });

    // Further code for handling the form submission and generating the output...
});
