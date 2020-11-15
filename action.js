const core = require("@actions/core");
const fs = require("fs-extra");
const { createActionAuth } = require("@octokit/auth-action");
const { Octokit } = require("@octokit/rest");

async function app() {
  const event = JSON.parse(
    await fs.readFile(process.env.GITHUB_EVENT_PATH, "utf8")
  );
  const octokit = new Octokit({
    authStrategy: createActionAuth,
  });
  if (event.body.includes("--is-template")) {
    octokit.issues.createComment({
      owner: event.repository.owner.login,
      repo: event.repository.name,
      issue_number: event.number,
      body: [
        "*I am a bot*.",
        "Success: The template was filled, issue is valid",
      ].join("\n"),
    });
  } else {
    octokit.issues.createComment({
      owner: event.repository.owner.login,
      repo: event.repository.name,
      issue_number: event.number,
      body: [
        "*I am a bot*.",
        "Invalid issue: Please fill up the template.",
        "If you don't provide enough information, the issue may be closed.",
        "*If you belive this is an error, ignore this message.*",
      ].join("\n"),
    });
  }
}

app();
