import React, { useState,useEffect } from "react";
import {useParams,useNavigate} from "react-router-dom";
// import "./SearchBar.css";
// import SearchIcon from "@material-ui/icons/Search";
// import CloseIcon from "@material-ui/icons/Close";

function SearchBar({ placeholder, data, input }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");



  const Serch=async(e)=> {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
        const moviesarray=data
        let searching =searchWord.toLowerCase() 
        const newFilter=moviesarray.map((name) => name.title.toLowerCase()).filter(name => name.includes(searching))
        var numberarr1 = newFilter.map( function(value) { 
            return `${value}`
        } );
    if (searchWord === "") {
        setFilteredData([]);
      } else {
        setFilteredData(numberarr1);
      }
    };
    function Continue(e) {
    const found = data.find(({ original_title }) => original_title.toLowerCase()  == e.toLowerCase());
    setWordEntered(e)
    setFilteredData([])
    setWordEntered("")
    input(found)
     }
     function Clear() {
       setWordEntered("")
       setFilteredData([]);
     }
     function display_all_movie() {
       if (wordEntered=='') {
        const names =[]
        data.forEach(({title}) => {names.push(title)
          });
          setFilteredData(names);
       }
     }

  return (
    <div className="search1">
      <div className="searchInputs1">
        <input

          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onClick={display_all_movie}
          onChange={Serch}
        /> <i onClick={Clear} className="clearable__clear">&times;</i>
        <br></br>
        <br></br>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 10).map((value, key) => {

                  return    <div className="dataItem" onClick={()=>Continue(value)} target="_blank">
                  <p>{value}</p> 
                </div>;
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;