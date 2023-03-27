console.log("Before");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from a database...");
      console.log("id is", id);

      if (!id) reject("id가 존재하지 않습니다");
      else resolve({ id: id, gitHubUsername: "su" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API...");
      console.log("username is ", username);
      if (!username) reject("username이 존재하지 않습니다");
      else resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Get Commits...");
      console.log("repo is ", repo);

      if (!repo) reject("repo가 존재하지 않습니다.");
      else resolve(["commit"]);
    }, 2000);
  });
}

getUser(1)
  .then((user) => getRepositories(user.gitHubUsername))
  .then((repos) => getCommits(repos[0]))
  .then((commits) => console.log(commits))
  .catch((error) => console.log(new Error(error)));

console.log("After");
