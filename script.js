const playground = document.getElementById('playground');
const addItemBtn = document.getElementById('add-item-btn');
const displayToggle = document.getElementById('display-toggle');
const flexDirectionBtns = document.getElementById('flex-direction-btns');
const flexWrapBtns = document.getElementById('flex-wrap-btns');
const justifyContentBtns = document.getElementById('justify-content-btns');
const alignItemsBtns = document.getElementById('align-items-btns');
const alignContentBtns = document.getElementById("align-content-btns");

const flexItemContainer = document.getElementById('flex-item-container');
const closeFlexItemBtn = document.getElementById('close-flex-item-btn');
const orderInput = document.getElementById("order-input");
const flexGrowInput = document.getElementById("flex-grow-input");
const flexShrinkInput = document.getElementById("flex-shrink-input");
const flexBasisInput = document.getElementById("flex-basis-input");
const alignSelfBtns = document.getElementById("align-self-btns");
const itemTextInput = document.getElementById("item-text-input");
const fontSizeInput = document.getElementById("font-size-input");
const ItemWidthInput = document.getElementById("item-width-input");
const ItemHeightInput = document.getElementById("item-height-input");
const centerTextCheckbox = document.getElementById("center-text-checkbox");
const deleteItemBtn = document.getElementById("delete-item-btn");

const getCodeBtn = document.getElementById("get-code-btn");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const modalCloseBtn = document.getElementById("modal-close-btn");
const cssCode = document.getElementById("css-code");
const copyCodeBtn = document.getElementById("copy-code-btn");
const alert = document.getElementById("alert");


// Create a variable to store the current playground item index
let currentPlaygroundItem;

// Create 3 playground items on page load
for (let i = 0; i < 3; i++) {
    // createPlaygroundItem(i);

    // Add playground item after .5 second of each item
    setTimeout(() => {
        createPlaygroundItem(i);
    }, 500 * i);
}

// Add click event to add item button
addItemBtn.addEventListener('click', () => {
    // Get the last playground item index
    const lastPlaygroundItem = playground.children.length - 1;

    // Create a new playground item
    createPlaygroundItem(lastPlaygroundItem + 1);
});

// Add click event to display toggle buttons and all flex container style buttons
addClickEvent(displayToggle, 'display', 'playground-flex');
addClickEvent(flexDirectionBtns, 'flexDirection', 'playground-btn');
addClickEvent(flexWrapBtns, 'flexWrap', 'playground-btn');
addClickEvent(justifyContentBtns, 'justifyContent', 'playground-btn');
addClickEvent(alignItemsBtns, 'alignItems', 'playground-btn');
addClickEvent(alignContentBtns, 'alignContent', 'playground-btn');

// Add event listeners to each flex item elements
addInputEvent(orderInput, 'order');
addInputEvent(flexGrowInput, 'flexGrow');
addInputEvent(flexShrinkInput, 'flexShrink');
addInputEvent(flexBasisInput, 'flexBasis');
addClickEvent(alignSelfBtns, 'alignSelf');
addInputEvent(itemTextInput, 'textContent');
addInputEvent(fontSizeInput, 'fontSize');
addInputEvent(ItemWidthInput, 'minWidth');
addInputEvent(ItemHeightInput, 'minHeight');
addCheckboxEvent(centerTextCheckbox, 'checked');

// Event listener to close flex item container
closeFlexItemBtn.addEventListener('click', () => {
    flexItemContainer.classList.remove("active");

    // Remove all active class on the playground item
    const playgroundItems = document.querySelectorAll(".playground-item");
    playgroundItems.forEach((item) => {
        item.firstElementChild.classList.remove("active"); 
        item.classList.remove("active");
    });
});

// Event listener to delete the current playground item
deleteItemBtn.addEventListener('click', () => {
    // Remove the current playground item
    flexItemContainer.classList.remove("active");
    playground.children[currentPlaygroundItem].classList.remove("active")
    playground.children[currentPlaygroundItem].classList.add('remove');
    // playground.children[currentPlaygroundItem].remove();
    setTimeout(() => {
        playground.children[currentPlaygroundItem].remove();
    }, 390);
});

// Event listener to open and close the modal
getCodeBtn.addEventListener('click', openModal);
modalCloseBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Event listener to get the code
getCodeBtn.addEventListener('click', () => {
    // Toggle the code container
    getCodeBtn.classList.toggle("active");
    
    // Get the playground element's style properties
    const playgroundStyle = window.getComputedStyle(playground);
    const display = playgroundStyle.getPropertyValue('display');
    const flexDirection = playgroundStyle.getPropertyValue('flex-direction');
    const flexWrap = playgroundStyle.getPropertyValue('flex-wrap');
    const justifyContent = playgroundStyle.getPropertyValue('justify-content');
    const alignItems = playgroundStyle.getPropertyValue('align-items');
    const alignContent = playgroundStyle.getPropertyValue('align-content');

    // Get the playground item elements' style properties
    const playgroundItems = document.querySelectorAll('.playground-item');
    const playgroundItemsStyle = [];
    playgroundItems.forEach((item) => {
        const playgroundItemStyle = window.getComputedStyle(item);
        playgroundItemsStyle.push(playgroundItemStyle);
    });

    // Get the playground item elements' data properties
    const playgroundItemsData = [];
    playgroundItems.forEach((item) => {
        playgroundItemsData.push(item.dataset);
    });

    // Update the css code element with the code
    cssCode.innerHTML = `.flexbox-container {<br>
        <span class='tab'></span>display: <span class='highlight'>${display}</span>;<br>
        <span class='tab'></span>flex-direction: <span class='highlight'>${flexDirection}</span>;<br>
        <span class='tab'></span>flex-wrap: <span class='highlight'>${flexWrap}</span>;<br>
        <span class='tab'></span>justify-content: <span class='highlight'>${justifyContent}</span>;<br>
        <span class='tab'></span>align-items: <span class='highlight'>${alignItems}</span>;<br>
        <span class='tab'></span>align-content: <span class='highlight'>${alignContent}</span>;<br>
    }
    `;

    // Loop through each playground item and add the code
    playgroundItems.forEach((item, index) => {
        cssCode.innerHTML += `<br><br>.flexbox-container > div:nth-child(${index + 1}) {<br>
            <span class='tab'></span>order: <span class='highlight'>${playgroundItemsStyle[index].getPropertyValue('order')}</span>;<br>
            <span class='tab'></span>flex: <span class='highlight'>${playgroundItemsStyle[index].getPropertyValue('flex')}</span>;<br>
            <span class='tab'></span>align-self: <span class='highlight'>${playgroundItemsStyle[index].getPropertyValue('align-self')}</span>;<br>
            ${playground.children[index].style.fontSize ? `<span class='tab'></span>font-size: <span class='highlight'>${playground.children[index].style.fontSize}</span>;<br>` : ''}
            ${playground.children[index].style.minWidth ? `<span class='tab'></span>min-width: <span class='highlight'>${playground.children[index].style.minWidth}</span>;<br>` : ''}
            ${playground.children[index].style.minHeight ? `<span class='tab'></span>min-height: <span class='highlight'>${playground.children[index].style.minHeight}</span>;<br>` : ''}
        }
        `;
    });
})

// Event listener to copy the code to the clipboard
copyCodeBtn.addEventListener('click', () => {
    // Get the code
    const code = cssCode.textContent;

    // Copy the code to the clipboard
    navigator.clipboard.writeText(code).then(() => {
        // Add show class to the alert class
        alert.classList.add("show");

        // Remove the show class after 2 seconds
        setTimeout(() => {
            alert.classList.remove("show");
        }, 2000);
    });
});

// Function to create a new playground item
function createPlaygroundItem(index) {
    // Create a new playground item
    const playgroundItem = document.createElement('div');
    playgroundItem.classList.add('playground-item');
    playgroundItem.classList.add('show');
    setTimeout(() => {
        playgroundItem.classList.remove('show');
    }, 1000);
    const playgroundItemText = document.createElement('div');
    playgroundItemText.classList.add('playground-item-text');
    playgroundItemText.textContent = index + 1;
    playgroundItem.appendChild(playgroundItemText);
    // playgroundItem.textContent = 'Item ' + (index + 1);
    
    // Set default style properties for the new playground item
    playgroundItem.style.order = 0;
    playgroundItem.style.flexGrow = 0;
    playgroundItem.style.flexShrink = 1;
    playgroundItem.style.flexBasis = 'auto';
    playgroundItem.style.alignSelf = 'auto';
    playgroundItem.dataset.fontSize = 25;
    playgroundItem.dataset.minWidth = 150;
    playgroundItem.dataset.minHeight = 150;
    playgroundItem.dataset.centerText = false;
    
    // Add click event to playground item
    playgroundItem.addEventListener('click', (e) => {
        // Add active class to flex-item-container
        flexItemContainer.classList.add("active");

        // Remove all active class on the playground item
        const playgroundItems = document.querySelectorAll('.playground-item');
        playgroundItems.forEach((item) => {
            item.classList.remove("active");
            item.firstElementChild.classList.remove("active");
        })
        
        // Get the clicked element's index and update the currentPlaygroundItem variable
        currentPlaygroundItem = Array.from(playground.children).indexOf(e.target);

        // Fix the currentPlaygroundItem variable if the clicked element is the playground item's text
        if (currentPlaygroundItem === -1) {
            currentPlaygroundItem = Array.from(playground.children).indexOf(e.target.parentElement);
        }

        // Add active class to the current playground element
        playground.children[currentPlaygroundItem].firstElementChild.classList.add("active");
        playground.children[currentPlaygroundItem].classList.add("active");

        // Get the clicked element's style properties and update the input values
        orderInput.value = playground.children[currentPlaygroundItem].style.order;
        flexGrowInput.value = playground.children[currentPlaygroundItem].style.flexGrow;
        flexShrinkInput.value = playground.children[currentPlaygroundItem].style.flexShrink;
        flexBasisInput.value = playground.children[currentPlaygroundItem].style.flexBasis;
        itemTextInput.value = playground.children[currentPlaygroundItem].textContent;
        fontSizeInput.value = playground.children[currentPlaygroundItem].dataset.fontSize;
        ItemWidthInput.value = playground.children[currentPlaygroundItem].dataset.minWidth;
        ItemHeightInput.value = playground.children[currentPlaygroundItem].dataset.minHeight;
        centerTextCheckbox.checked = playground.children[currentPlaygroundItem].dataset.centerText === 'true' ? true : false;

        // Add active class to the current element align-self property
        for (btnEl of alignSelfBtns.children) {
            if (btnEl.textContent.toLowerCase() === playground.children[currentPlaygroundItem].style.alignSelf) {
                btnEl.classList.add("active");
            } else {
                btnEl.classList.remove("active");
            }
        }
    })

    // Append the new playground item to the playground
    playground.appendChild(playgroundItem);
}

// Function to add click events to all flex container style buttons
function addClickEvent(parentEl, styleProp, type) {
    for ( el of parentEl.children ) {
        el.addEventListener('click', (e) => {
            // Remove all active classes
            for ( el of parentEl.children ) {
                el.classList.remove('active');
            }

            // Add active class to clicked element
            e.target.classList.add('active');

            if (type === 'playground-btn') {
                // Change playground style property to clicked element's text content
                playground.style[styleProp] = e.target.textContent.toLowerCase();
            } else if (type === 'playground-flex') {
                // Change style and toggle inline class
                playground.style[styleProp] = e.target.textContent.toLowerCase();

                // Add inline and active classes if inline-flex
                if (el.textContent.toLowerCase() === "inline-flex") {
                    playground.classList.add("inline");
                    parentEl.classList.add("active");
                }

                // Remove inline and active classes if inline-flex
                if (e.target.textContent.toLowerCase() === "flex") {
                    playground.classList.remove("inline");
                    parentEl.classList.remove("active");
                }
            } else {
                // Change style property of current element
                playground.children[currentPlaygroundItem].style.alignSelf =
                    e.target.textContent.toLowerCase();
            }
        })
    }
}

// Function to add input event to flex-item input element
function addInputEvent(inputEl, styleProp, type) {
    inputEl.addEventListener('input', (e) => {
        // Change the clicked element's text content to the clicked element's value
        if (styleProp === 'textContent') {
            playground.children[currentPlaygroundItem].firstElementChild.textContent = e.target.value;
        } else if (styleProp === 'fontSize' || styleProp === 'minWidth' || styleProp === 'minHeight') {
            // Change the clicked element's font size to the clicked element's value
            playground.children[currentPlaygroundItem].style[styleProp] = e.target.value + 'px';
            playground.children[currentPlaygroundItem].dataset[styleProp] = e.target.value;
        } else {
            // Change the clicked element's style property to the clicked element's value
            playground.children[currentPlaygroundItem].style[styleProp] = e.target.value;
        }
    })
}

// Function to add checkbox event to flex-item checkbox element
function addCheckboxEvent(checkboxEl, toggleClass) {
    checkboxEl.addEventListener('change', (e) => {
        // Toggle checked class
        playground.children[currentPlaygroundItem].firstElementChild.classList.toggle(toggleClass);

        // Update centerText data attribute
        playground.children[currentPlaygroundItem].dataset.centerText = e.target.checked;
    })
}

// Open modal function
function openModal() {
    modal.classList.add('fade-in');
    overlay.classList.remove('hidden');
}

// Close modal function
function closeModal() {
    modal.classList.remove('fade-in');
    overlay.classList.add('hidden');
}