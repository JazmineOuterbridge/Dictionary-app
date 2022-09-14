import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import "./Dictionary.css";

export default function Dictionary(props) {
  let [keyword, setKeyword] = useState(props.defaultKeyword);
  let [results, setResults] = useState(null);
  let [loaded, setloaded] = useState(false);

  function handleResponse(response) {
    setResults(response.data[0]);
  }

function search(){
   // documentation: https://dictionaryapi.dev/e
   let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`;
   axios.get(apiUrl).then(handleResponse);
}

  function handelSubmit(event) {
    event.preventDefault();
    search();

  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
    
  }
function load(){
  setloaded(true);
  search();
}

if (loaded){
  return (
    <div className="Dictionary">
      <section>
      <form onSubmit={handelSubmit}>
        <input type="search" placeholder="Search for a word..." onChange={handleKeywordChange} />
      </form>
    </section>
    <Results results={results} />
    </div>
  );
   } else{
    load();
    return "loading..."
  }
}