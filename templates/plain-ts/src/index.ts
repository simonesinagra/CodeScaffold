import { generateGreeting } from "./greeting";

function greet(name: string) {
  const greeting = generateGreeting(name);

  console.log(greeting);
}

greet("TypeScript");