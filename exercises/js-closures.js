// 1
function makeCounter() {
  let count = 0;

  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    }
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

  return function(...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}
const initialize = once(() => console.log("System Initialized!"));
initialize(); // System Initialized
initialize(); // Nothing happens

//-------------------------------------------

//3
function memoize(fn) {
  const cache = {};

  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    }
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

//-------------------------------------------

//4 + 5

const obj = { 
    name: 'Helena', 
    greet: function() {
        setTimeout(function() { 
            console.log(this.name); }, 100); } }
  obj.greet();

// the this inside setTimeout is undefined because setTimeout executes its callback in a separate execution context.
// and since the inner function isn't called as a method of obj, it loses the connection to Helena.

//a
const obj = {
  name: 'Helena',
  greet: function() {
    setTimeout(() => {
      console.log(this.name); 
    }, 100);
  }
};
obj.greet();

//b
const obj = {
  name: 'Helena',
  greet: function() {
    setTimeout(function() {
      console.log(this.name);
    }.bind(this), 100); 
  }
};
obj.greet();
