import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import "./Dictionary.css";
import Photos from "./Photos.js";

export default function Dictionary(props) {
  let [keyword, setKeyword] = useState(props.defaultKeyword);
  let [results, setResults] = useState(null);
  let [loaded, setloaded] = useState(false);
  let [photos, setPhotos] = useState(null);


  function handleDictionaryResponse(response) {
    setResults(response.data[0]);
  }

function handlePexelsResponse(response){
  setPhotos(response.data.photos);
}

function search(){
   // documentation: https://dictionaryapi.dev/e
   let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`;
   axios.get(apiUrl).then(handleDictionaryResponse);

   let pexelsApiKey ="563492ad6f9170000100000180edf57983d34664b96bf2a7ba5dbad4";
  let pexelsApiUrl =`https://api.pexels.com/v1/search?query=${keyword}&per_page=9`;
  let headers = {Authorization: `Bearer ${pexelsApiKey}`};
  axios.get(pexelsApiUrl, {headers: headers}).then(handlePexelsResponse);
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
    <Photos photos={photos}/>
    </div>
  );
   } else{
    load();
    return "loading..."
  }
}