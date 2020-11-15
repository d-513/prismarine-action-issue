const pkgJson = require("./package.json");
const { createActionAuth } = require("@octokit/auth-action");
const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
  authStrategy: createActionAuth,
});

module.exports = (owner, repo, number) => {
  octokit.issues.createComment({
    owner,
    repo,
    issue_number: number,
    body: [
      `*bot* - [prismarine-action-issue](https://github.com/dada513/prismarine-action-issue) - v${pkgJson.version}`,
      "",
      "Error: You did not fill up the issue template.",

      "You should be able to choose one when creating your issue. See image below.",
      "If you edited your issue to the correct template, recheck the issue status by commenting `p!recheck`.",
      "![Choosing the template - Example](https://i.imgur.com/z4pqWWZ.png)",
      "*If you belive this is an error, please reopen this issue.*",
    ].join("\n"),
  });
  octokit.issues.addLabels({
    owner,
    repo,
    issue_number: number,
    labels: ["invalid"],
  });

  octokit.issues.update({
    owner,
    repo,
    issue_number: number,
    state: "closed",
  });
};
