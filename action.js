const core = require("@actions/core");
const fs = require("fs-extra");
const isValid = require("./is_valid");
const isInValid = require("./is_invalid");

async function app() {
  const event = JSON.parse(
    await fs.readFile(process.env.GITHUB_EVENT_PATH, "utf8")
  );
  const mustInclude = core.getInput("template_include");

  if (event.issue.body.includes(mustInclude)) {
    isValid(
      event.repository.owner.login,
      event.repository.name,
      event.issue.number
    );
  } else {
    isInValid(
      event.repository.owner.login,
      event.repository.name,
      event.issue.number
    );
  }
}

app();
