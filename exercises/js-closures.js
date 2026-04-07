// 1
function makeCounter() {
  let count = 0;

  return {
    increment: function () {
      count++;
      return count;
    },
    decrement: function () {
      count--;
      return count;
    },
  };
}
const counter = makeCounter();
console.log(counter.increment()); // 1
console.log(counter.decrement()); // 0
// console.log(counter.count);    // undefined because it's Private

//-------------------------------------------

//2
function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}
const initialize = once(() => console.log('System Initialized!'));
initialize(); // System Initialized
initialize(); // Nothing happens

//-------------------------------------------

//3

function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    }
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}
const double = memoize((x) => x * 2);
console.log(double(10));

//-------------------------------------------

//4 + 5

const obj1 = {
  name: 'Helena',
  greet: function () {
    setTimeout(function () {
      console.log(this.name);
    }, 100);
  },
};
obj1.greet();

// the this inside setTimeout is undefined because setTimeout executes its callback in a separate execution context.
// and since the inner function isn't called as a method of obj, it loses the connection to Helena.

//a
// When I write () => { console.log(this.name); },
// the arrow function looks outside at the greet method.
// Inside greet, this is set to obj.
// Arrow function do not have their own this. Instead, they capture the this from the code surrounding them.
const obj2 = {
  name: 'Helena',
  greet: function () {
    setTimeout(() => {
      console.log(this.name);
    }, 100);
  },
};
obj2.greet();

//b
// when i take the function and say .bind(this), this is still obj, the function gets "glued" to Helena.
// Even when setTimeout triggers it later
// .bind() is like a "glue" for function. It creates a new version of the function that is permanently locked to a specific object.
const obj3 = {
  name: 'Helena',
  greet: function () {
    setTimeout(
      function () {
        console.log(this.name);
      }.bind(this),
      100
    );
  },
};
obj3.greet();
