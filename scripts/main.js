const foodList = ["American", "Chinese", "French", "Indian", "Italian", "Japanese", "Korean", "Mexican", "Pizza", "Seafood", "Sushi", "Thai"];
const foodResultText = document.getElementById('foodResultText');
const openMapsButton = document.getElementById('openMapsButton');
const openMapsLink = document.getElementById('openMapsLink');
const foodIcon = document.getElementById('foodIcon');
const spinner = document.getElementById('spinner');
const spinButton = document.getElementById('spinButton');
const bottomSheet = document.getElementById('bottomSheet');
const optionsButton = document.getElementById('optionsButton');

// Chooses a random cuisine from the list and returns it
function chooseRandomFood(currentResult) {
    var result;
    var spin = Math.floor(Math.random() * foodList.length);
    var lastResult = currentResult;
    result = foodList[spin];

    // If lastResult isn't null and there's more than one item in foodList
    if ((lastResult != null) && (foodList.length > 1)) {
        // If the result is the same as last time, keep spinning until it's different
        while (lastResult.toLowerCase() === result.toLowerCase()) {
            result = foodList[Math.floor(Math.random() * foodList.length)];
        }
    }

    return result;
}

// Applies results of the spin to the page
function applyResults(result) {
    // Set the result text and make it visible
    foodResultText.innerHTML = result;
    foodResultText.style.display = "block";
    foodResultText.style.animationName = "bounceIn";
    // Build maps link
    mapsLink = ("https://www.google.com/maps/search/" + result + "+food+near+me/");
    // Pass maps link to maps button and enable link
    openMapsLink.setAttribute('href', mapsLink);
    openMapsLink.removeAttribute("disabled");
    // Pass text to open maps button
    openMapsButton.setAttribute('value', "Show " + result + " places near me");
    // Make the bottom sheet come up
    bottomSheet.style.animationName = "slideUp";
    bottomSheet.style.display = "block";
}

// The spinner
function animateSpinWheel() {
    var spinnerRevolutions = 0;
    var maxSpinnerRevolutions = 10;
    var result;

    navigator.vibrate(200);

    // Reset the wheel
    resetWheel();
    // Disable the spin button
    spinButton.setAttribute("disabled", true);
    // Disable the options button
    optionsButton.setAttribute("disabled", true);

    // Loop every 0.5 seconds
    var loop = setInterval(function () {
        // Increment counter
        spinnerRevolutions++;
        // Get result
        result = chooseRandomFood(result);
        // Spin icons
        foodIcon.style.display = "none";
        const icon = document.createElement("img");
        icon.className = "foodIcon";
        icon.setAttribute("src", "./assets/images/" + result.toLowerCase() + ".webp");
        icon.id = "foodIcon";

        // If the max number of revolutions is reached, then stop and apply results
        if (spinnerRevolutions == maxSpinnerRevolutions) {
            finalResult = result;
            clearInterval(loop);
            icon.style.animationName = "moveHalfUp";
            spinner.appendChild(icon);
            spinEnd(finalResult);
        }
        else {
            spinner.appendChild(icon);
            setTimeout(function () {
                spinner.removeChild(icon);
            }, 500);
        }
    }, 500)
}

// The final spin
function spinEnd(finalResult) {
    setTimeout(function () {
        applyResults(finalResult);
        // Enable the spin button
        spinButton.removeAttribute("disabled");
        // Enable the options button
        optionsButton.removeAttribute("disabled");
    }, 500)

}

// Resets the wheel
function resetWheel() {
    // Move the current icon up
    document.getElementById("foodIcon").style.animationName = "finishMoveUp";
    document.getElementById("foodResultText").style.animationName = "out";
    // Wait for the animation to finish then delete icon
    setTimeout(function () {
        document.getElementById("foodIcon").remove();
    }, 500);
    // Set the result text and make it hidden
    foodResultText.innerHTML = "Spin the wheel!";
    foodResultText.style.display = "none";
    // Disable the maps link
    openMapsLink.setAttribute("disabled", true);
    // Make the bottom sheet slide down
    bottomSheet.style.animationName = "slideDown";
    setTimeout(function() {
        bottomSheet.style.display = "none";
    }, 500);
}

// Opens the option menu
function openOptions() {
    // Hide the spinner
    document.getElementById("spinnerBorder").style.display = "none";
    // Hide the buttons
    document.getElementById("spinnerButtons").style.display = "none";
    // Unhide the options menu
    document.getElementById("optionsMenu").style.display = "block";

    // Only generate items on first load
    if (document.getElementById("optionsFoodList").childNodes.length <= 1) {
        // Add all of the food items
        for (var i = 0; i < foodList.length; i++) {
            const foodDiv = document.createElement("div");
            document.getElementById("optionsFoodList").appendChild(foodDiv);
            const foodLabel = document.createElement("label");
            foodLabel.setAttribute("class", "optionsFoodLabel");
            foodLabel.setAttribute("for", "removeButton");
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
            foodDiv.appendChild(foodLabel);
            foodDiv.appendChild(removeButton);
        }
    }
}

// Closes the options menu
function exitOptions() {
    // Unhide the spinner
    document.getElementById("spinnerBorder").style.display = "block";
    // Unide the buttons
    document.getElementById("spinnerButtons").style.display = "inline";
    // Hide the options menu
    document.getElementById("optionsMenu").style.display = "none";
}

// Handles removal of items from the list
function handleRemovalButton(item) {
    const button = document.getElementById(item);
    // If the item is in the list, then remove it
    if (foodList.includes(item)) {
        const index = foodList.indexOf(item);
        if (index > -1) {
            foodList.splice(index, 1);
        }
        // Set the value of the button to "Include"
        button.setAttribute("value", "Include");
        // Change the color of the button to green
        button.style.backgroundColor = "green";
    }
    // If the item isn't in the list, add it to the list
    else {
        foodList.push(item);
        // Set the value of the button to "Remove"
        button.setAttribute("value", "Remove");
        // Change the color of the button to red
        button.style.backgroundColor = "red";
    }
}

function share() {
    document.getElementById('shareButton').addEventListener("click", async () => {
        try {
          await navigator.share({
            text: "Thank for using What Should I Eat!"
          });
        } catch (err) {
        }
    });
}