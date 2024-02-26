document.addEventListener('DOMContentLoaded', function() {
    fetchItems().then(initiateBlockCarousel);
});

async function fetchItems() {
    const itemsContainer = document.getElementById('itemsContainer');
    try {
        const response = await fetch('/api/item');
        const items = await response.json();
        items.forEach((item, index) => {
            const block = document.createElement('div');
            block.className = `item-block${index === 0 ? ' active' : ''}`; // Mark the first block as active
            block.style.display = index === 0 ? 'block' : 'none'; // Show only the first block initially

            const imgUrl = item.pictures[0] ? (item.pictures[0].startsWith('uploads/') ? item.pictures[0] : `/${item.pictures[0]}`) : '';
            const carouselInnerHtml = imgUrl ? `<img src="${imgUrl}" alt="Item Picture">` : '';

            block.innerHTML = `
                <div class="carousel-container">
                    ${carouselInnerHtml}
                </div>
                <h3>${item.names.en}</h3>
                <p>${item.descriptions.en}</p>
            `;
            itemsContainer.appendChild(block);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

function initiateBlockCarousel() {
    let currentBlockIndex = 0;
    const blocks = document.querySelectorAll('.item-block');
    if (blocks.length <= 1) return; // No need for carousel if only one or no blocks

    // Create carousel controls
    const itemsContainer = document.getElementById('itemsContainer');
    const prevBtn = document.createElement('a');
    const nextBtn = document.createElement('a');
    prevBtn.innerHTML = '&#10094;';
    nextBtn.innerHTML = '&#10095;';
    prevBtn.className = 'prev';
    nextBtn.className = 'next';
    itemsContainer.parentNode.insertBefore(prevBtn, itemsContainer.nextSibling);
    itemsContainer.parentNode.insertBefore(nextBtn, itemsContainer.nextSibling);

    function updateBlocks(index) {
        blocks.forEach(block => block.style.display = 'none');
        blocks[index].style.display = 'block';
    }

    prevBtn.addEventListener('click', () => {
        currentBlockIndex = (currentBlockIndex - 1 + blocks.length) % blocks.length;
        updateBlocks(currentBlockIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentBlockIndex = (currentBlockIndex + 1) % blocks.length;
        updateBlocks(currentBlockIndex);
    });

    // Optionally, you could implement an auto-cycle feature with setInterval here
}
