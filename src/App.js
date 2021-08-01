import './App.scss';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import Repo from './components/Repo';

function App() {
  // data retrieved from the api as array to use map function
  const [data, setData] = useState([]);

  // page number for pagination
  const [page, setPage] = useState(1);

  // for when data is being fetched
  const [loading, setLoading] = useState(true);

  // pagination on scrolling
  // to get refernce to the last repo in page and update the elements when it is in the viewport
  const observer = useRef();
  const lastBookRef = useCallback(node =>{
    if(loading) return
    // disconnecting from previous last repo and connecting to the new one
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries =>{
      if(entries[0].isIntersecting){
        setPage(prev => prev+1);
      }
    })
    if(node) observer.current.observe(node)
    
  });

  // async function to get the repos
  async function fetchData(){
    setLoading(true);
    const data = await axios.get(`https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${page}`);
    setData((prev) => [...prev, ...data.data.items]);
    setLoading(false);
  }
  
  // initializing data from api before rendering
  useEffect(()=>{
    fetchData();
  },[page]);

  
  return (
    <div className="App">
      {data.map((repo,index) => {
      if(data.length === index+1) {return <div ref={lastBookRef} key={index}><Repo repo_data={repo}/></div>}
      else{ return <Repo repo_data={repo} key={index} />}
      })}
    </div>
  );
}

export default App;
