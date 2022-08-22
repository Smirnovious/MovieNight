import React, { useState } from "react";
import { ResultCard } from "./ResultCard";

export const Add = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const onChange = async (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=d3af3ba4f67429dfada1230e490ec2d5&language=en-US&page=1&include_adult=false&query=${e.target.value}`)
        if(response.ok){
            const data = await response.json();
            setResults(data.results);
        }
    } catch(error){
        console.log(error);
    }
  };

  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <h1>Movies:</h1>
            <input
              type="text"
              placeholder="Search for a movie"
              value={query}
              onChange={onChange}
            />
          </div>
          
          {results.length > 0 && (
            <ul className="results">
              {results.map((movie) => (
                <li key={movie.id}>
                  <ResultCard movie={movie} />
                </li>
              ))}
            </ul>
          )}
          
        </div>
      </div>
    </div>
  );
};