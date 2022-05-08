import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { prompt } = require('inquirer')

// import chalk from 'chalk';

// console.log(chalk.bgGreen('Hello world!'));

// let number = max(1, 2)
// console.log(number)

// function max(a, b) {
//   return a > b ? a : b
// }

async function guessTheNumber() {
  const { guess } = await prompt([
    { type: 'input', name: 'guess', message: 'Guess The Number!' },
  ])
  console.log(guess)
  //1. Let the user know if the value is NAN
  //2. Let the user know if the value less then greater than or === generated value
  //3. Create a random number between 1-100
}

guessTheNumber()
