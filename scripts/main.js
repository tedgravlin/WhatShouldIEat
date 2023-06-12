const foodList = ["American", "Chinese", "French", "Indian", "Italian", "Japanese", "Korean", "Mexican", "Pizza", "Seafood", "Sushi", "Thai"];
const foodResultText = document.getElementById('foodResultText');
const openMapsButton = document.getElementById('openMapsButton');
const openMapsLink = document.getElementById('openMapsLink');
const foodIcon = document.getElementById('foodIcon');
const spinnerContainer = document.getElementById('spinnerContainer');
const spinner = document.getElementById('spinner');
const spinButton = document.getElementById('spinButton');
const bottomSheet = document.getElementById('bottomSheet');
var spin;
var result;
var lastResult;
var finalSpin = 0;

// Chooses a random cuisine from the list
function chooseRandomFood() {
    lastResult = result;
    spin = Math.floor(Math.random() * foodList.length);
    result = foodList[spin];

    // If lastResult isn't null and there's more than one item in foodList
    if ((lastResult != null) && (foodList.length > 1)) {
        // If the result is the same as last time, keep spinning until it's different
        while (lastResult.toLowerCase() === result.toLowerCase()) {
            result = foodList[Math.floor(Math.random() * foodList.length)].toLowerCase();
        }
    }

    return result.toLowerCase();
}

// Build and apply the maps link
function applyResults(result) {
    // Set the result text and make it visible
    foodResultText.innerHTML = result;
    foodResultText.style.visibility = "visible";
    // Build maps link
    mapsLink = ("https://www.google.com/maps/search/" + result + "+food+near+me/");
    // Pass maps link to maps button and enable link
    openMapsLink.setAttribute('href', mapsLink);
    openMapsLink.removeAttribute("disabled");
    // Pass text to open maps button
    openMapsButton.setAttribute('value', "Show " + result + " places near me");
    // Make the open maps link visible
    openMapsLink.style.display = "inline";
    // Make the open maps button visible
    openMapsButton.style.visibility = "visible";
    // Make the bottom sheet come up
    bottomSheet.style.animationName = "slideUp";
    bottomSheet.style.display = "block";
}

function animateSpinWheel() {
    // Reset the wheel
    resetWheel();
    // Disable the spin button
    spinButton.setAttribute("disabled", true);
    var spinnerRevolutions = 0;
    var maxSpinnerRevolutions = 10;

    // Interval loop
    var loop = setInterval(function () {
        spinnerRevolutions++;
        spin = Math.floor(Math.random() * foodList.length);
        result = chooseRandomFood();
        foodIcon.style.display = "none";
        const icon = document.createElement("img");
        icon.className = "foodIcon";
        icon.setAttribute("src", "./assets/images/" + result + ".webp");
        icon.id = "foodIcon";

        if (spinnerRevolutions == maxSpinnerRevolutions) {
            finalSpin = spin;
            clearInterval(loop);
            icon.style.animationName = "moveHalfUp";
            spinner.appendChild(icon);
            spinEnd(finalSpin);
        }
        else {
            spinner.appendChild(icon);
            setTimeout(function () {
                spinner.removeChild(icon);
            }, 500);
        }
    }, 500)
}

function spinEnd(spin) {
    setTimeout(function () {
        result = foodList[spin];
        applyResults(result);
        // Enable the spin button
        spinButton.removeAttribute("disabled");
    }, 500)

}

function resetWheel() {
    // Move the current icon up
    document.getElementById("foodIcon").style.animationName = "finishMoveUp";
    // Wait for the animation to finish then delete icon
    setTimeout(function () {
        document.getElementById("foodIcon").remove();
    }, 500);
    // Set the result text and make it hidden
    foodResultText.innerHTML = "Spin the wheel!";
    foodResultText.style.visibility = "hidden";
    // Disable the maps link
    openMapsLink.setAttribute("disabled", true);
    // Make the open maps button hidden
    openMapsButton.style.visibility = "hidden";
    // Make the bottom sheet slide down
    bottomSheet.style.animationName = "slideDown";
}

function openOptions() {
    // Hide the spinner
    document.getElementById("spinnerBorder").style.display = "none";
    // Hide the buttons
    document.getElementById("spinButton").style.display = "none";
    document.getElementById("optionsButton").style.display = "none";
    // Unhide the options menu
    document.getElementById("optionsMenu").style.display = "block";

    // Only generate items on first load
    if (document.getElementById("optionsFoodList").childNodes.length <= 1) {
        // Add all of the food items
        for (var i = 0; i < foodList.length; i++) {
            const foodLabel = document.createElement("p");
            foodLabel.setAttribute("class", "optionsFoodLabel");
            const removeButton = document.createElement("input");
            removeButton.setAttribute("type", "button");
            removeButton.setAttribute("value", "Remove");
            removeButton.setAttribute("class", "removeButton");
            removeButton.setAttribute("id", foodList[i]);
            removeButton.addEventListener('click', function (e) {
                handleRemovalButton(e.target.id);
            }, false);
            foodLabel.innerHTML = foodList[i];
            // Load in the food items
            document.getElementById("optionsFoodList").appendChild(foodLabel);
            document.getElementById("optionsFoodList").appendChild(removeButton);
            document.getElementById("optionsFoodList").appendChild(document.createElement("br"));
        }
    }
}

function exitOptions() {
    // Unhide the spinner
    document.getElementById("spinnerBorder").style.display = "block";
    // Unide the buttons
    document.getElementById("spinButton").style.display = "inline";
    document.getElementById("optionsButton").style.display = "inline";
    // Hide the options menu
    document.getElementById("optionsMenu").style.display = "none";
}

function handleRemovalButton(item) {
    // If the item is in the list, then remove it
    if (foodList.includes(item)) {
        const index = foodList.indexOf(item);
        if (index > -1) {
            foodList.splice(index, 1);
        }
        // Set the value of the button to "Include"
        document.getElementById(item).setAttribute("value", "Include");
    }
    // If the item isn't in the list, add it to the list
    else {
        foodList.push(item);
        // Set the value of the button to "Remove"
        document.getElementById(item).setAttribute("value", "Remove");
    }
}