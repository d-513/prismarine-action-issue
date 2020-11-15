const core = require("@actions/core");
const fs = require("fs-extra");
const isValid = require("./is_valid");
const isInValid = require("./is_invalid");
const rechecking = require("./rechecking");

async function app() {
  const event = JSON.parse(
    await fs.readFile(process.env.GITHUB_EVENT_PATH, "utf8")
  );

  if (event.issue.pull_request) return;

  if (event.action === "created") {
    // this means that the event is an issue comment
    if (!event.comment.body.includes("p!recheck")) {
      return;
    } else {
      await rechecking(
        event.repository.owner.login,
        event.repository.name,
        event.issue.number
      );
    }
  }
  const mustInclude = core.getInput("template-include");
  if (event.issue.body.includes(mustInclude)) {
    await isValid(
      event.repository.owner.login,
      event.repository.name,
      event.issue.number
    );
  } else {
    await isInValid(
      event.repository.owner.login,
      event.repository.name,
      event.issue.number
    );
  }
}

app();
