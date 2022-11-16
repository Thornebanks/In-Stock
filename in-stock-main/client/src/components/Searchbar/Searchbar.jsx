import './Searchbar.scss';
import SearchIcon from '../../assets/Icons/search-24px.svg';
import React, { createRef } from 'react';

class Searchbar extends React.Component {
  searchBar = createRef();

  componentDidMount() {
    this.searchBar.current.addEventListener("keyup", e => {

      Array.from(this.props.table.current.tableList.current.children).forEach((item) => {
        Array.from(item.children).forEach((child) => {
          const wantedChild = child.querySelector(".table__list-item");
          if(wantedChild.dataset.searchable === "true") {
            if(wantedChild.innerText.toLowerCase().includes(e.target.value.toLowerCase())) {
              item.style.display = "flex";
            } else {
              item.style.display = "none";
            }
          }
        })
      });
    });
  }

  render () {
    return (
      <form className="searchbar">
        <input
          ref={this.searchBar}
          className="searchbar__input"
          type="text"
          placeholder={this.props.placeholder}
        />
        <img 
          src={SearchIcon} 
          alt="search-icon"
          className="searchbar__img" />
      </form>
    )
  }
}

export default Searchbar;