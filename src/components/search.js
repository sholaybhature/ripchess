import React from "react";
import { useState, useEffect } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { fetchLichessCom } from "../lichess";
import { fetchChessCom } from "../chesscom";
function Search() {
  const [username, setUsername] = useState("");
  const [dropVal, setDropVal] = useState("Lichess");
  function handleSubmit(e) {
    console.log("key pressed");
    if (e.key === "Enter") {
      e.preventDefault();
      setUsername(e.target.value);
    }
  }
  const handleChange = (e) => {
    setDropVal(e.target.value);
    console.log("val changed");
  };

  useEffect(() => {
    if (username != "") {
      console.log(dropVal);
      let r =
        dropVal == "Lichess"
          ? fetchLichessCom(username)
          : fetchChessCom(username);
      r.then((i) => console.log(i));
    }
  }, [username]);

  // TODO: If enter is pressed twice, it doesn't update. Fix this.
  return (
    <div>
      <form className="search-container">
        <label>
          <BiSearchAlt2></BiSearchAlt2>
          <input onKeyDown={(e) => handleSubmit(e)} type="text" name="search" />
        </label>
        <select
          value={dropVal}
          onChange={handleChange}
          name="fetch-website"
          id="fetch-website"
        >
          <option value="lichess">Lichess</option>
          <option value="chesscom">Chess.com</option>
        </select>
      </form>
    </div>
  );
}

export default Search;
