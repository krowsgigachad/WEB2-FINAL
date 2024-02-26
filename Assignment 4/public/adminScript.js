document.addEventListener('DOMContentLoaded', function() {
    const addItemForm = document.getElementById('addItemForm');
    const itemList = document.getElementById('itemList');

    // Function to handle form submission
    addItemForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(addItemForm);
        formData.set('names', JSON.stringify({
            en: document.getElementById('nameEn').value,
            anotherLanguage: document.getElementById('nameOther').value
        }));
        formData.set('descriptions', JSON.stringify({
            en: document.getElementById('descriptionEn').value,
            anotherLanguage: document.getElementById('descriptionOther').value
        }));

        // Send the POST request to the server
        fetch('/api/item', {
            method: 'POST',
            body: formData // Sending as FormData for file upload
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            addItemForm.reset(); // Reset form after successful submission
            loadItems(); // Reload the list of items
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

    // Function to load and display items
    function loadItems() {
        fetch('/api/item')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(items => {
            itemList.innerHTML = ''; // Clear current list
            items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.names.en + ' - ' + item.descriptions.en;
                itemList.appendChild(li);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    // Initial load of items
    loadItems();
});
