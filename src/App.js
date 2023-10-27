import ChevronRightIcon from '@mui/icons-material/ChevronRight';import Calendar from './Calendar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const { Octokit } = require("@octokit/core");
const { DateTime } = require("luxon");

const octokit = new Octokit({
  auth: "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"
})

const owner = "facebook";
const repo = "react-native";

function App({ date }) {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false)
    fetchCommits(date).then(value => {
      setData(value);
      setLoaded(true)
    });
  }, [date]);

  return (
    <div className="App">
      <header className="header">
        <Link className="link" to={"/" + date.minus({ months: 1 }).toFormat("yyyy-MM")}><ChevronLeftIcon/></Link>
        <h2 className="month">{date.toFormat("yyyy MMMM")}</h2>
        <Link className="link" to={"/" + date.plus({ months: 1 }).toFormat("yyyy-MM")}><ChevronRightIcon/></Link>
      </header>
      <main className="main">
        {
          loaded ? (<Calendar date={date} data={data}></Calendar>) :
          (<h3>Loading...</h3>)
        }
      </main>
    </div>
  );
}

export default App;

async function fetchCommits(date) {
  let since = date.set({ day: 1 }).set({ hour: 0, minute: 0, second: 0});
  let until = date.set({ day: 1}).plus({ months: 1}).minus({ day: 1}).set({ hour: 23, minute: 59, second: 59});
  try {
    let page = 1;
    var commits = [];
    while(true) {
      let response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
        owner: owner,
        repo: repo,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28" 
        },
        per_page: 100,
        since: since.toISO(),
        until: until.toISO(),
        page: page
      });

      if(response.data.length === 0) {
        break;
      }

      commits = commits.concat(response.data);
      page++;
    }

    commits = commits.filter((com) => {
      let comitDate = DateTime.fromISO(com.commit.author.date);
      if(comitDate.year === date.year && comitDate.month === date.month) {
        return true;
      }
      return false;
    });

    commits.sort((a,b) => DateTime.fromISO(a.commit.author.date) - DateTime.fromISO(b.commit.author.date));

    return commits;
  } catch (error) {
    console.error('Error fetching commits:', error);
    return null;
  }
}