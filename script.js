$(function () {
    // Initial display of pet info
    updatePetInfoInHtml();

    // Button clicks for actions
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.nap-button').click(clickedNapButton);

    // Hover effect for all buttons (including rename and show-rename buttons)
    // .hover() takes two functions: one for mouseenter, one for mouseleave
    // When hovering, we add the 'hovered' class (visual effect), and remove it when leaving
    $('.button-container button, .rename-button, .show-rename-button').hover(
        function () { $(this).addClass('hovered'); },
        function () { $(this).removeClass('hovered'); }
    );

    // Show rename input and button when "Rename Pet" is clicked
    $('.show-rename-button').click(function() {
        $('.rename-container').slideDown(); // slideDown reveals hidden container
        $(this).hide(); // hide the "Rename Pet" button itself
    });

    // Rename pet on blur of the input field
    // .blur() triggers when the input loses focus (user clicks away or presses tab)
    $('.name-input').blur(function () {
        let newName = $(this).val().trim();
        if (newName !== "") {
            pet_info.name = newName;
            updatePetInfoInHtml();
        }
    });

    // Rename pet on button click
    $('.rename-button').click(function() {
        let newName = $('.name-input').val().trim();
        if (newName !== "") {
            pet_info.name = newName;
            updatePetInfoInHtml();
            $('.name-input').val(''); // clear input

            // Hide rename input after use
            $('.rename-container').slideUp();
            $('.show-rename-button').show();
        }
    });
});

// Pet object with stats
var pet_info = { name: "Perry", weight: 3.7, happiness: 10, energy: 5, maxEnergy: 10 };

// Function to switch pet images depending on action
function changePetImage(action) {
    let imgPath = "images/perry.webp"; // default

    switch(action) {
        case "treat": imgPath = "images/perry_thumbs_up.png"; break;
        case "play": imgPath = "images/perry_play.png"; break;
        case "exercise": imgPath = "images/perry_exercise.png"; break;
        case "nap": imgPath = "images/perry_nap.jpeg"; break;
    }

    $(".pet-image").attr("src", imgPath);

    // Return to default image after 5 second
    setTimeout(() => {
        $(".pet-image").attr("src", "images/perry.webp");
    }, 5000);
}

// Action functions
function clickedTreatButton() {
    pet_info.happiness += 3;
    pet_info.weight += 0.2;
    pet_info.energy += 0.5;
    updatePetState("treat");
}

function clickedPlayButton() {
    pet_info.happiness += 3;
    pet_info.weight -= 0.5;
    pet_info.energy -= 1;
    updatePetState("play");
}

function clickedExerciseButton() {
    pet_info.happiness -= 2;
    pet_info.weight -= 0.8;
    pet_info.energy -= 2;
    updatePetState("exercise");
}

function clickedNapButton() {
    pet_info.happiness += 2;
    pet_info.weight += 0.2;
    pet_info.energy += 3;
    updatePetState("nap");
}

// Update pet state and refresh display
function updatePetState(action) {
    fixLimits();
    updatePetInfoInHtml();
    changePetImage(action);
}

// Prevent negative stats or exceeding maxEnergy
function fixLimits() {
    if (pet_info.weight < 0) pet_info.weight = 0;
    if (pet_info.happiness < 0) pet_info.happiness = 0;
    if (pet_info.energy < 0) pet_info.energy = 0;
    if (pet_info.energy > pet_info.maxEnergy) pet_info.energy = pet_info.maxEnergy;
}

// Update HTML with current stats
function updatePetInfoInHtml() {
    $('.name').text(pet_info.name);
    $('.weight').text(pet_info.weight.toFixed(1));
    $('.happiness').text(pet_info.happiness);
    $('.energy').text(pet_info.energy);

    // Update energy bar
    let energyPercent = (pet_info.energy / pet_info.maxEnergy) * 100;
    $('.energy-bar').css('width', energyPercent + '%');

    // Change bar color based on energy level
    let color = 'green';
    if (energyPercent <= 30) color = 'red';
    else if (energyPercent <= 60) color = 'yellow';
    $('.energy-bar').css('background-color', color);
}
