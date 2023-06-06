import generateGreeting from './greeting.js';

function greet(name) {
  const greeting = generateGreeting(name);
  console.log(greeting);
}

greet("JavaScript");