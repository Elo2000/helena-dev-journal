// Exercise 1
// 1. Using a for loop
function getEvenNumbersFor(arr) {
  const result = [];
    for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      result.push(arr[i]);
    }
  }
  return result;
}
// 2. Using .filter()
function getEvenNumbersFilter(arr) {
  return arr.filter(num => num % 2 === 0);
}

//-------------------------------------------
// Exercise 2
// Function to flatten one level using a for loop
function flattenOneLevel(arr) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      for (let j = 0; j < arr[i].length; j++) {
        result.push(arr[i][j]);
      }
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
//-------------------------------------------
// Exercise 3
const data = {
  user: {
    name: 'Helena',
    age: 22,
    skills: ['JS', 'TS']
  }
};
const {
  user: { name, age, skills }
} = data;

console.log("Name:", name);
console.log("Age:", age);
console.log("Skills:", skills);


//-------------------------------------------
// Exercise 4
function getCity(user) {
  return user?.address?.city; 
}

// Example usage with a valid object
const userWithAddress = {
  name: 'Alice',
  address: {
    city: 'New York',
    zipcode: '10001'
  }
};

const userWithoutAddress = {
  name: 'Bob'
};

console.log(`City for Alice: ${getCity(userWithAddress)}`); // Output: City for Alice: New York
console.log(`City for Bob: ${getCity(userWithoutAddress)}`); // Output: City for Bob: undefined (no error thrown)

//-------------------------------------------
// Exercise 5
//1
var add = function(a, b) {
  return a + b;
};

var greet = function(name) {
  return "Hello, " + name + "!";
};

var isEven = function(num) {
  return num % 2 === 0;
};


const add = (a, b) => a + b;

const greet = name => `Hello, ${name}!`;

const isEven = num => num % 2 === 0;


//-------------------------------------------
// Test cases
//1
const numbers = [1, 2, 3, 4, 5, 6];
console.log("Using for loop:", getEvenNumbersFor(numbers)); 
console.log("Using filter:", getEvenNumbersFilter(numbers));


// 2
const nested = [1, [2, 3], 4, [5, 6]];
console.log(flattenOneLevel(nested));
