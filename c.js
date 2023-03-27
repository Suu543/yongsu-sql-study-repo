function getUser(id, callback) {
  setTimeout(() => {
    console.log("사용자를 식별하고있습니다...");
    callback({ id: id, gitHubUsername: "su" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("깃허브API 호출하고 있습니다...");
    console.log("사용자이름은: ", username, " 입니다.");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    console.log(repo, " 에 커밋을 하고 있습니다...");
    callback(["commit"]);
  }, 2000);
}

console.log("Before");

getUser(1, (user) => {
  getRepositories(user.gitHubUsername, (repos) => {
    getCommits(repos[0], (commits) => {
      console.log(commits);
    });
  });
});

console.log("After");
