import React from "react";
import {  BiSearchAlt2 } from 'react-icons/bi';

function Search() {
  return (
    <div>
      <form className="search-container">
        <label>
          <BiSearchAlt2></BiSearchAlt2>
          <input type="text" name="search" />
        </label>
        <select name="fetch-website" id="fetch-website">
          <option value="lichess">Lichess</option>
          <option value="chesscom">Chess.com</option>
        </select>
      </form>
    </div>
  );
}

export default Search;
