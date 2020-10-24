// Game Parts
const pregame = document.getElementById("pregame")
const game = document.getElementById("game")
const endGame = document.getElementById("end-game")

// User inputs on the first page
const go = document.getElementById("go")
const low = document.getElementById("low")
const high = document.getElementById("high")
const num = document.getElementById("num")

// Second page selectors
const gameIntro = document.getElementById("game-intro")
const yourNumber = document.getElementById("your-number")
const myGuess = document.getElementById("my-guess")
const guessNumberHtml = document.getElementById("guess-number")
const question = document.getElementById("question")
const error = document.getElementById("error")

const lower = document.getElementById("lower")
const correct = document.getElementById("cor")
const higher = document.getElementById("higher")

// Final page
const lastP = document.getElementById("last-p")

// Variables for calculations
var top_, bot, number, guessNumber

// First page functions
go.addEventListener("click", function(){
    // Grab Values
    bot = low.value
    top_ = parseInt(high.value) + 1
    number = num.value
    // Clear form
    low.value = ""
    high.value = ""
    num.value = ""
    // Number of guesses
    guessNumber = 1

    // If the numbers are valid we use binary search to get the first value, display some info and show: their chosen number, our first guess, along with options for us to guess lower, higher or correct.
    if(bot < number && number < top_ && bot < top_) {
        binarySearchReturn = binarySearch(bot, top_)
        gameIntro.innerHTML = "You have chosen " + bot + " to be the lowest possible value and " + (top_ - 1) + " to be the highest possible value.  That includes " + (top_ - bot + 1) + " numbers.  I can find your number in a maximum of " + (Math.trunc(Math.log2(top_ - bot + 1)) + 1) + " guesses."
        yourNumber.innerHTML = "Your number: " + number
        myGuess.innerHTML = "My guess: " + binarySearchReturn[2]
        guessNumberHtml.innerHTML = "Guess Number: " + guessNumber
    }
    // Errors cases: 1. If the number is outside of the search space.
    else if (bot > number || top_ < number){
        gameIntro.innerHTML = "The solution must be in the search space.  Refresh the page to try again."
        yourNumber.innerHTML = ""
        myGuess.innerHTML = ""
        guessNumberHtml.innerHTML = ""
        question.innerHTML = ""
        lower.style.display = "none"
        cor.style.display = "none"
        higher.style.display = "none"
    }
    // 2. If the lower number is greater than the upper bound (search space is negative)
    else if (bot > top || parseInt(bot) === top_){
        gameIntro.innerHTML = "The low bound must be smaller than the high bound.  Refresh the page to try again."
        yourNumber.innerHTML = ""
        myGuess.innerHTML = ""
        guessNumberHtml.innerHTML = ""
        question.innerHTML = ""
        lower.style.display = "none"
        cor.style.display = "none"
        higher.style.display = "none"

    }
    // 3. Some other error (this case should never be reached)
    else {
        gameIntro.innerHTML = "There was a problem.  Refresh the page to try again."
        yourNumber.innerHTML = ""
        myGuess.innerHTML = ""
        guessNumberHtml.innerHTML = ""
        question.innerHTML = ""
        lower.style.display = "none"
        cor.style.display = "none"
        higher.style.display = "none"
    }
    // Move to next screen
    pregame.style.display = "none"
    game.style.display = "inline-block"

    go.preventDefault

})

// If our guess was too high then use the binary search again with the lower bound and the mid point
lower.addEventListener("click", function(){
    if (binarySearchReturn[2] > number) {
        binarySearchReturn = binarySearch(binarySearchReturn[0], binarySearchReturn[2])
        myGuess.innerHTML = "My guess: " + binarySearchReturn[2]
        guessNumber++
        guessNumberHtml.innerHTML = "Guess Number: " + guessNumber
        error.innerHTML = ""
    }
    else {
        error.innerHTML = "I believe you have made a mistake.  Please try again."
    }
  
})
// if our guess was right then end the game and display some ending information
correct.addEventListener("click", function(){
    if (binarySearchReturn[2] === parseInt(number)) {
         game.style.display = "none"
         endGame.style.display = "inline"
         lastP.innerHTML = "Your number was " + binarySearchReturn[2] + ".  I was able to guess it in " + guessNumber + " guess(es).  Thanks for playing.  Refresh the page to play again."
         error.innerHTML = ""
    } else {
        error.innerHTML = "I believe you have made a mistake.  Please try again."
    }
   
})
// If our guess was too low then use the mid point and the upper bound and binary search again
higher.addEventListener("click", function(){
    if (binarySearchReturn[2] < number) {
        binarySearchReturn = binarySearch(binarySearchReturn[2], binarySearchReturn[1])
        myGuess.innerHTML = "My guess: " + binarySearchReturn[2]
        guessNumber++
        guessNumberHtml.innerHTML = "Guess Number: " + guessNumber
        error.innerHTML = ""
    } else {
        error.innerHTML = "I believe you have made a mistake.  Please try again."
    }
})

// Simple binary search algorithm
function binarySearch (lo, hi) {  
    if (lo > hi)
        return false
    let guess = Math.trunc((parseInt(lo) + parseInt(hi)) / 2)
    return ([lo, hi, guess])
}
