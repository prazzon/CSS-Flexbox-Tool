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
const optionContainer = document.getElementById("option");
const selectMultipleCheckbox = document.getElementById('select-multiple-checkbox');
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

// Create an array to store the selected playground item index
let selectedPlaygroundItems = [];

// Create 3 playground items on page load
for (let i = 0; i < 3; i++) {
    // Add playground item after .5 second of each item
    setTimeout(() => {
        createPlaygroundItem(i);
    }, 500 * i);
}

// Add click event to each flex container style elements
addClickEvent(displayToggle, 'display', 'playground-flex');
addClickEvent(flexDirectionBtns, 'flexDirection', 'playground-btn');
addClickEvent(flexWrapBtns, 'flexWrap', 'playground-btn');
addClickEvent(justifyContentBtns, 'justifyContent', 'playground-btn');
addClickEvent(alignItemsBtns, 'alignItems', 'playground-btn');
addClickEvent(alignContentBtns, 'alignContent', 'playground-btn');

// Add event listeners to each flex item style elements
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

// Event listener for the add item button
addItemBtn.addEventListener('click', () => {
    // Get the last playground item index
    const lastPlaygroundItem = playground.children.length;

    // Create a new playground item
    createPlaygroundItem(lastPlaygroundItem);
});

// Event listener to close flex item container when playground is clicked
playground.addEventListener('click', (e) => {
    if (e.target.classList.contains("playground")) {
        closeFlexItemContainer();
    }
});

// Event listener for the close button
closeFlexItemBtn.addEventListener('click', closeFlexItemContainer);

// Event listener for the delete playground item button
deleteItemBtn.addEventListener('click', () => {
    // Remove active class on the flex item container
    flexItemContainer.classList.remove("active");

    // Sort the selected playground item array in descending order to prevent index error
    selectedPlaygroundItems.sort((a, b) => b - a);
    
    // Remove all playground item in the selected playground item array
    selectedPlaygroundItems.forEach((item) => {
        // Trigger remove animation
        playground.children[item].classList.remove("active");
        playground.children[item].classList.add("remove");

        // Remove playground item after 390ms
        setTimeout(() => {
            playground.children[item].remove();
        }, 390);
    });
        // Clear the selected playground item array
        selectedPlaygroundItems = [];
});

// Event listener for the select multiple checkbox
selectMultipleCheckbox.addEventListener('change', (e) => {
    // Check if the select multiple checkbox is checked
    if (e.target.checked) {
        // Add active class to the option container
        optionContainer.classList.add("active");
    } else {
        // Remove active class to the option container
        optionContainer.classList.remove("active");
    }
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

    // Update the css code element with the code that are not the default value
    cssCode.innerHTML = `.flexbox-container {<br>
        <span class='tab'></span>display: <span class='highlight'>${display}</span>;<br>
        ${flexDirection !== 'row' ? `<span class='tab'></span>flex-direction: <span class='highlight'>${flexDirection}</span>;<br>` : ''}
        ${flexWrap !== 'nowrap' ? `<span class='tab'></span>flex-wrap: <span class='highlight'>${flexWrap}</span>;<br>` : ''}
        ${justifyContent !== 'flex-start' ? `<span class='tab'></span>justify-content: <span class='highlight'>${justifyContent}</span>;<br>` : ''}
        ${alignItems !== 'stretch' ? `<span class='tab'></span>align-items: <span class='highlight'>${alignItems}</span>;<br>` : ''}
        ${alignContent !== 'stretch' ? `<span class='tab'></span>align-content: <span class='highlight'>${alignContent}</span>;<br>` : ''}
    }
    `;

    // Loop through each playground item and add the code that are not the default value
    playgroundItems.forEach((item, index) => {
        const order = playgroundItemsStyle[index].getPropertyValue('order');
        const flex = playgroundItemsStyle[index].getPropertyValue('flex');
        const alignSelf = playgroundItemsStyle[index].getPropertyValue('align-self');
        const fontSize = playground.children[index].style.fontSize;
        const minWidth = playground.children[index].style.minWidth;
        const minHeight = playground.children[index].style.minHeight;

        // Check if all the values are not the default value
        if (order !== '0' || flex !== '0 1 auto' || alignSelf !== 'auto' || fontSize || minWidth || minHeight) {
            cssCode.innerHTML += `<br><br>.flexbox-container > div:nth-child(${index + 1}) {<br>
                ${order !== '0' ? `<span class='tab'></span>order: <span class='highlight'>${order}</span>;<br>` : ''}
                ${flex !== '0 1 auto' ? `<span class='tab'></span>flex: <span class='highlight'>${flex}</span>;<br>` : ''}
                ${alignSelf !== 'auto' ? `<span class='tab'></span>align-self: <span class='highlight'>${alignSelf}</span>;<br>` : ''}
                ${fontSize ? `<span class='tab'></span>font-size: <span class='highlight'>${fontSize}</span>;<br>` : ''}
                ${minWidth ? `<span class='tab'></span>min-width: <span class='highlight'>${minWidth}</span>;<br>` : ''}
                ${minHeight ? `<span class='tab'></span>min-height: <span class='highlight'>${minHeight}</span>;<br>` : ''}
            }
            `;
        }
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
    const playgroundItemText = document.createElement('div');
    playgroundItem.classList.add('playground-item');
    playgroundItem.classList.add('show');
    playgroundItemText.classList.add('playground-item-text');
    playgroundItemText.textContent = index + 1;
    playgroundItem.appendChild(playgroundItemText);

    // Remove the show class after 1 second to prevent animation when element selection is changed
    setTimeout(() => {
        playgroundItem.classList.remove('show');
    }, 1000);

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
        // Get the clicked element's index
        let currentPlaygroundItem = Array.from(playground.children).indexOf(e.target);

        // Fix the currentPlaygroundItem variable if the clicked element is the playground item's text
        if (currentPlaygroundItem === -1) {
            currentPlaygroundItem = Array.from(playground.children).indexOf(e.target.parentElement);
        }

        // Add the current element index to the selected playground item if it doesn't exist in the array
        if (!selectedPlaygroundItems.includes(currentPlaygroundItem)) {
            // Check if the selectMultipleCheckbox is not checked
            if (!selectMultipleCheckbox.checked) {
                // Remove the active class from all playground items
                const playgroundItems = document.querySelectorAll('.playground-item');
                playgroundItems.forEach((item) => {
                    item.classList.remove("active");
                    item.firstElementChild.classList.remove("active");
                });

                // Empty the selected playground items array
                selectedPlaygroundItems = [];
            }
            
            selectedPlaygroundItems.push(currentPlaygroundItem);
        } else {
            // Remove the current element index from the selected playground item if it exists in the array
            selectedPlaygroundItems = selectedPlaygroundItems.filter((item) => item !== currentPlaygroundItem);
        }

        // Toggle the active class on the playground item
        playground.children[currentPlaygroundItem].classList.toggle("active");
        playground.children[currentPlaygroundItem].firstElementChild.classList.toggle("active");

        // Add active class to flex-item-container if there is at least one selected playground item
        if (selectedPlaygroundItems.length > 0) {
            flexItemContainer.classList.add("active");
        } else {
            flexItemContainer.classList.remove("active");
        }

        // Change flex-item-container's container title text if there is more than one selected playground item
        const flexItemContainerTitle = document.querySelector('.flex-item-container > .container-title');
        if (selectedPlaygroundItems.length > 1) {
            flexItemContainerTitle.textContent = 'Flex Item(' + selectedPlaygroundItems.length + ')';
        } else {
            flexItemContainerTitle.textContent = 'Flex Item';
        }

        // Get the last element from the selected playground items array and update the input values
        if (selectedPlaygroundItems.length > 0) {
            const lastSelectedItem = selectedPlaygroundItems[selectedPlaygroundItems.length - 1];
            orderInput.value = playground.children[lastSelectedItem].style.order;
            flexGrowInput.value = playground.children[lastSelectedItem].style.flexGrow;
            flexShrinkInput.value = playground.children[lastSelectedItem].style.flexShrink;
            flexBasisInput.value = playground.children[lastSelectedItem].style.flexBasis;
            itemTextInput.value = playground.children[lastSelectedItem].textContent;
            fontSizeInput.value = playground.children[lastSelectedItem].dataset.fontSize;
            ItemWidthInput.value = playground.children[lastSelectedItem].dataset.minWidth;
            ItemHeightInput.value = playground.children[lastSelectedItem].dataset.minHeight;
            centerTextCheckbox.checked = playground.children[lastSelectedItem].dataset.centerText === 'true' ? true : false;
            
            // Add active class to the current element align-self property
            for (btnEl of alignSelfBtns.children) {
                if (
                    btnEl.textContent.toLowerCase() ===
                    playground.children[currentPlaygroundItem].style.alignSelf
                ) {
                    btnEl.classList.add("active");
                } else {
                    btnEl.classList.remove("active");
                }
            }
        }

        // If playground item text is clicked, set the itemTextInput to focus state
        if (e.target.classList.contains('playground-item-text')) {
            // Check if flex item container is active
            if (flexItemContainer.classList.contains('active')) {
                // Set the itemTextInput to focus state and select the text
                itemTextInput.focus({ preventScroll: true });
                itemTextInput.select();
            }
        }
    });
    
    // Append the new playground item to the playground
    playground.appendChild(playgroundItem);
}

// Function to close flex item container
function closeFlexItemContainer() {
    flexItemContainer.classList.remove("active");

    // Remove all active class on the playground item
    const playgroundItems = document.querySelectorAll(".playground-item");
    playgroundItems.forEach((item) => {
        item.firstElementChild.classList.remove("active");
        item.classList.remove("active");
    });        

    // Clear the selected playground item array
    selectedPlaygroundItems = [];
}

// Function to add click events to buttons
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

                // Remove inline and active classes if flex
                if (e.target.textContent.toLowerCase() === "flex") {
                    playground.classList.remove("inline");
                    parentEl.classList.remove("active");
                }
            } else {
                // Change style property of each element in the selected playground items array
                selectedPlaygroundItems.forEach(element => {
                    playground.children[element].style[styleProp] = e.target.textContent.toLowerCase();
                });
            }
        });
    }
}

// Function to add input event to flex-item inputs
function addInputEvent(inputEl, styleProp, type) {
    inputEl.addEventListener('input', (e) => {
        // Change style properties of each element in the selected playground items array
        selectedPlaygroundItems.forEach(element => {
            // Change the element text content to the clicked element's value
            if (styleProp === 'textContent') {
                playground.children[element].firstElementChild.textContent = e.target.value;
            } else if (styleProp === 'fontSize' || styleProp === 'minWidth' || styleProp === 'minHeight') {
                // Change the element font size to the clicked element's value
                playground.children[element].style[styleProp] = e.target.value + 'px';
                playground.children[element].dataset[styleProp] = e.target.value;
            } else {
                // Change the element style property to the clicked element's value
                playground.children[element].style[styleProp] = e.target.value;
            }
        });
    })
}

// Function to add checkbox event to flex-item checkbox
function addCheckboxEvent(checkboxEl, toggleClass) {
    checkboxEl.addEventListener('change', (e) => {
        // Toggle checked class and update centerText data attribute of each element in the selected playground items array
        selectedPlaygroundItems.forEach(element => {
            if (checkboxEl.checked) {
                playground.children[element].firstElementChild.classList.add(toggleClass);
            } else {
                playground.children[element].firstElementChild.classList.remove(toggleClass);
            }
            playground.children[element].dataset.centerText = e.target.checked;
        });
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