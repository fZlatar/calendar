# calendar
Calendar made for task by b2match.

React aplication for display of commits in calendar.

Plesae when testing the app use your own personal token for API access as mine is no longer valid.
The like for generating new token: https://github.com/settings/tokens
You can change personal token in src/App.js under octokit -> auth.

const octokit = new Octokit({
  auth: "{your GitHub personal token}"
})

Also feel free to change const owner and const repo variables to fetch commits from other repositories.

const owner = "{owner}";
const repo = "{repository}";

You get the {owner} and {repository} from the link of that repository.

Example: https://github.com/{owner}/{repository}/

In this repository (https://github.com/fZlatar/calendar/) it would be:
  {owner} = fZlatar
  {repository} = calendar
