const core = require("@actions/core");

async function app() {
  const gh_token = await core.getInput("github_token");
  console.log(process.env);
}

app();
