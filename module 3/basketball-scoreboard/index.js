// Get the elements that we will be interacting
let homeEl = document.getElementById("home-score")
let guestEl = document.getElementById("guest-score")


// Create the counters
let homeScore = 0
let guestScore = 0


// Create function to update scores
function updateScores() {
    homeEl.textContent = homeScore
    guestEl.textContent = guestScore

    // Add verification (via style.color) to see who is winning
    if (homeScore > guestScore) {
        homeEl.style.color = 'gold'
        guestEl.style.color = ''
    } else if (homeScore < guestScore){
        guestEl.style.color = 'gold'
        homeEl.style.color = ''
    } else {
        homeEl.style.color = ''
        guestEl.style.color = ''
    }
}

// Create the functions to update the global scores
function addOneToHome() {
    homeScore += 1
    updateScores()
}

function addTwoToHome() {
    homeScore += 2
    updateScores()
}

function addThreeToHome() {
    homeScore += 3
    updateScores()
}

function addOneToGuest() {
    guestScore += 1
    updateScores()
}

function addTwoToGuest() {
    guestScore += 2
    updateScores()
}

function addThreeToGuest() {
    guestScore += 3
    updateScores()
}


// Create function to start a New Game
function newGame() {
    homeScore = 0
    guestScore = 0
    updateScores()
}