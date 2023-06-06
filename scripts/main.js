const foodList = ["American", "Barbecue", "Chinese", "French", "Indian", "Italian", "Japanese", "Korean", "Mexican", "Pizza", "Seafood", "Sushi", "Thai"];
const foodResultText = document.getElementById('foodResultText');
const openMapsButton = document.getElementById('openMapsButton');
const openMapsLink = document.getElementById('openMapsLink');
const foodIcon = document.getElementById('foodIcon');
const foodSpinner = document.getElementById('foodSpinner');
const foodIconBackground = document.getElementById('foodIconBackground');
const spinButton = document.getElementById('spinButton');
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
    openMapsButton.setAttribute('value', "Show " + result + " places near me");
    mapsLink = ("https://www.google.com/maps/search/" + result + "+food+near+me/");
    openMapsLink.setAttribute('href', mapsLink);
    openMapsLink.removeAttribute("disabled");

    // Set the result text and make it visible
    foodResultText.innerHTML = result;
    foodResultText.style.visibility = "visible";
    // Make the open maps link visible
    openMapsLink.style.display = "inline";
    // Make the open maps button visible
    openMapsButton.style.visibility = "visible";
}

function animateSpinWheel() {
    // Reset the wheel
    resetWheel();
    // Disable the spin button
    spinButton.setAttribute("disabled", true);
    var count = 0;
    var timesToSpin = 10;

    var loop = setInterval(function () {
        count++;
        spin = Math.floor(Math.random() * foodList.length);
        result = chooseRandomFood();
        foodIcon.style.display = "none";
        const icon = document.createElement("img");
        icon.className = "foodIcon";
        icon.setAttribute("src", "./assets/images/" + result + ".svg");
        icon.id = "foodIcon";
        foodIconBackground.appendChild(icon);
        setTimeout(function () {
            foodIconBackground.removeChild(icon);
        }, 500);
        if (count >= timesToSpin) {
            finalSpin = spin;
            clearInterval(loop);
            spinEnd(finalSpin)
        }
    }, 500)
}

function spinEnd(spin) {
    setTimeout(function () {
        result = foodList[spin];
        const icon = document.createElement("img");
        icon.className = "foodIcon";
        icon.style.animationFillMode = "none";
        icon.setAttribute("src", "./assets/images/" + result.toLowerCase() + ".svg");
        icon.id = "foodIcon";
        foodIconBackground.appendChild(icon);
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
    openMapsLink.att
    // Make the open maps button hidden
    openMapsButton.style.visibility = "hidden";
}