const foodList = ["American", "Barbecue", "Chinese", "French", "Indian", "Italian", "Japanese", "Korean", "Mexican", "Pizza", "Seafood", "Sushi", "Thai"];
const foodResultText = document.getElementById('foodResultText');
const openMapsButton = document.getElementById('openMapsButton');
const openMapsLink = document.getElementById('openMapsLink');
const foodIcon = document.getElementById('foodIcon');
const spinnerContainer = document.getElementById('spinnerContainer');
const spinnerBackground = document.getElementById('spinnerBackground');
const spinButton = document.getElementById('spinButton');
const bottomSheet = document.getElementById('bottomSheet');
var spin;
var result;
var lastResult = result;
var finalSpin = 0;

// Chooses a random cuisine from the list
function chooseRandomFood() {
    spin = Math.floor(Math.random() * foodList.length);
    result = foodList[spin];

    // If the result is the same as last time, keep spinning until it's different
    if (lastResult == result) {
        while (lastResult == result) {
            result = foodList[spin];
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
    bottomSheet.style.display = "inline";
}

function animateSpinWheel() {
    // Reset the wheel
    resetWheel();
    // Disable the spin button
    spinButton.setAttribute("disabled", true);
    var spinnerRevolutions = 0;
    var maxSpinnerRevolutions = 10;

    var loop = setInterval(function () {
        spinnerRevolutions++;
        spin = Math.floor(Math.random() * foodList.length);
        result = chooseRandomFood();
        foodIcon.style.display = "none";
        const icon = document.createElement("img");
        icon.className = "foodIcon";
        icon.setAttribute("src", "./assets/images/" + result + ".svg");
        icon.id = "foodIcon";
        
        if (spinnerRevolutions == maxSpinnerRevolutions) {
            finalSpin = spin;
            clearInterval(loop);
            icon.style.animationName = "moveHalfUp";
            spinnerBackground.appendChild(icon);
            spinEnd(finalSpin);
        }
        else {
            spinnerBackground.appendChild(icon);
            setTimeout(function () {
                spinnerBackground.removeChild(icon);
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
    // Delete icons
    document.getElementById("foodIcon").remove();
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