//1 Write a function using setTimeout that logs messages in a specific order prove you predicted the order correctly before running.

function logInOrder() {
  console.log("Start");

  setTimeout(() => {
    console.log("First (1000 ms)");
  }, 1000);

  setTimeout(() => {
    console.log("Second (0 ms)");
  }, 0);

  setTimeout(() => {
    console.log("Third (500 ms)");
  }, 500);

  console.log("End");
}

logInOrder();

//2 Create a function fetchUser(id) that returns a Promise resolving to a fake user object after 500ms using setTimeout.

function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = {
        id: id,
        name: `User ${id}`
      };
      resolve(user);
    }, 500);
  });
}

fetchUser(1).then(user => {
  console.log(user);
});

//3 Chain 3 Promises: fetch a user -> fetch their posts -> fetch comments on the first post (use fake data / setTimeout to simulate).

function fetchUsers(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User ${id}` });
    }, 500);
  });
}

function fetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 101, userId, title: "Post 1" }
      ]);
    }, 500);
  });
}

function fetchComments(postId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1001, postId, text: "Nice post!" }
      ]);
    }, 500);
  });
}

fetchUsers(1)
  .then(user => {
    console.log("User:", user);
    return fetchPosts(user.id);
  })
  .then(posts => {
    console.log("Posts:", posts);
    return fetchComments(posts[0].id);
  })
  .then(comments => {
    console.log("Comments:", comments);
  })
  .catch(err => {
    console.error("Error:", err);
  });

//4 Rewrite exercise 3 entirely using async/await with full error handling.

function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!id) {
        reject("Invalid user ID");
      } else {
        resolve({ id, name: `User ${id}` });
      }
    }, 500);
  });
}

function fetchPost(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userId) {
        reject("Invalid user ID for posts");
      } else {
        resolve([
          { id: 101, userId, title: "Post 1" }
        ]);
      }
    }, 500);
  });
}

function fetchComment(postId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!postId) {
        reject("Invalid post ID for comments");
      } else {
        resolve([
          { id: 1001, postId, text: "Nice post!" }
        ]);
      }
    }, 500);
  });
}

async function run() {
  try {
    const user = await fetchUser(1);
    console.log("User:", user);

    const posts = await fetchPost(user.id);
    console.log("Post:", posts);

    if (!posts.length) {
      throw new Error("No posts found");
    }

    const comment = await fetchComment(posts[0].id);
    console.log("Comment:", comment);

  } catch (error) {
    console.error("Something went wrong:", error);
  } finally {
    console.log("Finished execution");
  }
}

run();

//5 Write a function that runs 3 Promises in parallel using Promise.all() and logs all results
function promise1() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Result 1"), 1000);
  });
}

function promise2() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Result 2"), 500);
  });
}

function promise3() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Result 3"), 800);
  });
}

async function runParallel() {
  try {
    const results = await Promise.all([
      promise1(),
      promise2(),
      promise3()
    ]);

    console.log(results);
  } catch (error) {
    console.error("Error:", error);
  }
}

runParallel();




/* 
When this code runs, JavaScript first executes all synchronous statements in the call stack, so it logs 'A' and then 'D' immediately. 
The setTimeout with 0 ms does not run right away; instead, its callback is sent to the callback queue.
At the same time, the Promise.resolve().then(...) schedules its callback in the microtask queue, which has higher priority.
Once the call stack becomes empty, the event loop processes all microtasks before moving to macrotasks,
so 'C' is logged next. Only after all microtasks are completed does the event loop handle the macrotask queue,
where the setTimeout callback runs and logs 'B'. 

This is why the final output order is A, D, C, B.
 */
