import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { prompt } = require('inquirer')
import chalk from 'chalk'

let randomNum = 0
let min = 0
let max = 0

async function guessTheNumber() {
  // 1. Create a random number between min and max
  if (randomNum === 0) {
    randomNum = getRandomIntInclusive(min, max)
  }

  const { guess } = await prompt([
    { type: 'input', name: 'guess', message: 'Guess The Number!' },
  ])

  const guessNum = parseFloat(guess)

  // 2. Game runs until user guesses correct number
  if (guessNum === randomNum) {
    console.log(chalk.bgGreen('You guessed the correct number!'))
    return
  }

  // 3. Let the user know if the guess is NAN
  if (isNaN(guessNum)) {
    console.log(chalk.bgRed('Please only enter numbers!'))
    guessTheNumber()
    return
  }

  // 4. prevent user from entering negative numbers
  if (guessNum < 0) {
    console.log(chalk.bgRed('Negative numbers not allowed'))
    guessTheNumber()
    return
  }

  // 6. Warn the user if a decimal number is used
  if (!Number.isInteger(guessNum)) {
    console.log(chalk.bgRed('Dont use decimals'))
    guessTheNumber()
    return
  }

  // 5. Let the user know if the guess is less than, greater than, or === generated value
  if (guessNum < randomNum) {
    console.log(chalk.bgBlue('Higher!'))
    guessTheNumber()
    return
  }

  if (guessNum > randomNum) {
    console.log(chalk.bgBlue('Lower'))
    guessTheNumber()
    return
  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)

  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1) + min)
}

async function setupGame() {
  // 7. let the user choose the min and max values before starting to guess the number
  const { inputMin, inputMax } = await prompt([
    { type: 'input', name: 'inputMin', message: 'Enter min number' },
    { type: 'input', name: 'inputMax', message: 'Enter max number' },
  ])

  if (isNaN(inputMin) || isNaN(inputMax)) {
    console.log(chalk.bgRed('Please only enter numbers!'))
    return false
  }

  if (max <= min) {
    console.log(chalk.bgRed('max must be greater than min'))
    return false
  }

  //store the min and max values
  min = parseInt(inputMin)
  max = parseInt(inputMax)

  return true
}

async function start() {
  const setupSuccessfully = await setupGame()

  if (setupSuccessfully) {
    guessTheNumber()
  } else {
    start()
  }
}

start()
