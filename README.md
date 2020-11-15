# prismarine-action-issue

Issue action for prismarine.  
First, add two labels to your repo: `valid` and `invalid`

Then create a .github/workflows/issue.yml

```yaml
name: Prismarine issue

on:
  issues:
    types: [opened]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - name: Prismarine-Issue
        id: issues
        uses: dada513/prismarine-action-issue@main
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
