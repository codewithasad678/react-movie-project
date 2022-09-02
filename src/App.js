import React,{useEffect, useState} from 'react'
import './App.css';
import SearchIcon from "./Search.svg";
import MovieCard from './MovieCard';
const API_URL = 'http://www.omdbapi.com?apikey=337ca40a';
const movie = {
    "Title": "Spider-Man",
    "Year": "2002",
    "imdbID": "tt0145487",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg"
}
const App = () => {
    const [searchItem , setSearchItem] = useState('');
    const [movies , setMovies] = useState([])
    useEffect(()=>{
        SearchMovies('spider');
    },[])
    
    const SearchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }
   
  return (
    <div className='app'>
        <h1>Movies Land</h1>
        <div className='search'>
            <input 
                placeholder='Search for Movies'
                onChange={(e) =>  setSearchItem(e.target.value)}
                value={searchItem}
            />
            <img src={SearchIcon}
            onClick={() => SearchMovies(searchItem)}
            alt='search' />
        </div>
        {
            movies?.length > 0 ? 
            (
                <div className='container'>
                    {
                        movies.map((movie,key ) => (
                            <MovieCard  movie={movie} />
                        ))
                    }
                </div>
            ) : (
                <div className='empty'>
                    <h2>No Movie FOund</h2>
                </div>
            )
        }
    </div>
  )
}

export default App