const foodList = ["American", "Barbecue", "Chinese", "French", "Indian", "Italian", "Japanese", "Korean", "Mexican", "Pizza", "Seafood", "Sushi", "Thai"];
const foodResultText = document.getElementById('foodResultText');
const openMapsButton = document.getElementById('openMapsButton');
const openMapsLink = document.getElementById('openMapsLink');
const foodIcon = document.getElementById('foodIcon');
const foodSpinner = document.getElementById('foodSpinner');
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
    return result;
}

// Build and apply the maps link
function applyResults(result) {
    openMapsButton.setAttribute('value', "Show " + result + " places near me");
    mapsLink = ("https://www.google.com/maps/search/" + result + "+food+near+me/");
    openMapsLink.setAttribute('href', mapsLink);

    // Set the result text and make it visible
    foodResultText.innerHTML = result;
    foodResultText.style.visibility = "visible";
    // Make the open maps link visible
    openMapsLink.style.display = "inline";
    // Make the open maps button visible
    openMapsButton.style.visibility = "visible";
}

function animateSpinWheel() {
    var animationDuration = 200;
    var count = 0;
    var timesToSpin = Math.floor((Math.random() * 20) + 10);

    var loop = setInterval(function () {
        count++;
        spin = Math.floor(Math.random() * foodList.length);
        result = chooseRandomFood();
        foodIcon.style.display = "none";
        const icon = document.createElement("img");
        icon.className = "foodIcon";
        icon.setAttribute("src", "./assets/images/" + result + ".svg");
        icon.id = "foodIcon";
        foodSpinner.appendChild(icon);
        var animationDuration = 200;
        setTimeout(function () {
            foodSpinner.removeChild(icon);
        }, animationDuration);
        if (count >= timesToSpin) {
            finalSpin = spin;
            clearInterval(loop);
            spinEnd(finalSpin)
        }
    }, animationDuration)

    if (count >= timesToSpin) {
        alert("FINAL SPIN");
    }
}

function spinEnd(spin) {
    setTimeout(function () {
        result = foodList[spin];
        const icon = document.createElement("img");
        icon.className = "foodIcon";
        icon.style.animationFillMode = "none";
        icon.setAttribute("src", "./assets/images/" + result + ".svg");
        icon.id = "foodIcon";
        foodSpinner.appendChild(icon);
        applyResults(result);
    }, 200)

}