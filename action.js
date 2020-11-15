const core = require("@actions/core");
const fs = require("fs-extra");

async function app() {
  console.log(await fs.readFile(process.env.GITHUB_EVENT_PATH, "utf8"));
}

app();
