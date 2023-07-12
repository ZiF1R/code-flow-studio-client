import React, {FC} from 'react';
import SearchIcon from "modules/Dashboard/components/Header/Icons/SearchIcon";

const Search: FC = () => {
  return (
    <label className="search-input__container">
      <SearchIcon />
      <input type="text" placeholder="Search"/>
    </label>
  );
}

export default Search;
