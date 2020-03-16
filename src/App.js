import React, {useEffect, useState} from 'react';
import axios from 'axios';



import './App.css';



function App() {

const [ comic, setComic ] = useState(null);
const [ loading, setLoading ] = useState(true);
const [ comicNum, setComicNum ] = useState(null);
const [ error, setError ] = useState(null);
const [ latest, setLatest ] = useState(null);

const fetchComic = (number) => {
  setLoading(true)
  axios.get(`https://cors-anywhere.herokuapp.com/http://xkcd.com/${number}/info.0.json`)
  .then(res => setComic(res.data))
  .catch(err=>setError('error', err))
  .finally(()=> setLoading(false))
};

const randomComicNum = () => {
  const num = Math.floor(Math.random() * (latest -1) + 1);
  return num;
}

const fetchLatestComic = () => {
  setLoading(true);
    axios.get('https://cors-anywhere.herokuapp.com/http://xkcd.com/info.0.json')
    .then(res => {
      setComic(res.data)
      setLatest(res.data.num)
      setLoading(false)
    }) 
    .catch(err => {
      setError(err)
      setLoading(false)
    })
}

  useEffect(() => {
    if(comicNum === null) {
      fetchLatestComic()
    } else {
      fetchComic(comicNum);
    }
  }, [comicNum]);

  

  if(loading) {
    return <div>
      Loading...
    </div>
  };

  if(error || !comic) {
    return <div>
      ERROR
    </div>
  };
  
  return (
    <div className="App">
      <button
        disabled={comic.num === 1}
        onClick={()=> setComicNum(1)}
      >
        First
      </button>
      <button 
        disabled={comic.num <= 1}
        onClick={()=> setComicNum(comic.num - 1)}
      >
        Previous
      </button>
      <button 
      onClick={()=> setComicNum(randomComicNum())}>
        Random
      </button>
      <button
        disabled={comic.num === latest } 
        onClick={()=> setComicNum(comic.num + 1)}
      >
        Next
      </button>
      <button
        disabled={comic.num === latest }
        onClick={()=> setComicNum(null)}
      >
        Latest
      </button>
      <div>{comic.title}
      <img src={comic.img} alt="comic-img" />
      </div>
      
      
    </div>
  );
}

export default App;




