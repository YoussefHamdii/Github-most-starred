import './App.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Repo from './components/Repo';

function App() {
  // data retrieved from the api as array to use map function
  const [data, setData] = useState([]);

  // page number for pagination
  const [page, setPage] = useState(1);

  // async function to get the repos
  async function fetchData(){
    const data = await axios.get(`https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${page}`);
    setData(data.data.items);
  }
  
  // initializing data from api before rendering
  useEffect(()=>fetchData(),[]);

  console.log(data);
  return (
    <div className="App">
      {data.map(repo => <Repo repo_data={repo} />)}
    </div>
  );
}

export default App;
