function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("사용자를 식별하고있습니다...");
      resolve({ id: id, gitHubUsername: "su" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("깃허브API 호출하고 있습니다...");
      console.log("사용자이름은: ", username, " 입니다.");
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(repo, " 에 커밋을 하고 있습니다...");
      resolve(["commit"]);
    }, 2000);
  });
}

console.log("Before");

// Callback Hell
getUser(1, (user) => {
  getRepositories(user.gitHubUsername, (repos) => {
    getCommits(repos[0], (commits) => {
      console.log(commits);
    });
  });
});

// Promise
getUser(1)
  .then((user) => getRepositories(user.gitHubUsername))
  .then((repos) => getCommits(repos[0]))
  .then((commits) => console.log(commits[0]))
  .catch((err) => console.log(err));

// Async/Await ==> Asynchonize: 비동기화
async function displayCommit() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);

    console.log(commits[0]);
  } catch (err) {
    console.log("Error: ", err);
  }
}

displayCommit();

console.log("After");

new Error("hello");
