// src/components/Header/Header.jsx

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import iconProfile from '../../images/iconProfile.png';
import iconSeach from '../../images/iconSearch.png';
import SearchBar from '../SearchBar/SearchBar';
import './Header.css';

function Header() {
  const location = useLocation();
  const [searchVisible, setSearchVisible] = useState(false);

  const getPageTitle = () => {
    switch (location.pathname) {
    case '/meals':
      return 'Meals';
    case '/drinks':
      return 'Drinks';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default:
      return '';
    }
  };

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
  };

  const renderContent = () => {
    if (searchVisible) {
      return (
        <div className="SearchBar">
          <SearchBar
            type="text"
            placeholder="Buscar"
            data-testid="search-input"
            style={ { color: '#7F00FF', textAlign: 'center' } }
          />
        </div>
      );
    }

    return <h1 data-testid="page-title">{getPageTitle()}</h1>;
  };

  return (
    <header>
      <Link to="/profile">
        <img src={ iconProfile } alt="Profile" data-testid="profile-top-btn" />
      </Link>
      <div className="search-container">
        <img
          src={ iconSeach }
          alt="icon-pesquisa"
          data-testid="search-top-btn"
          type="button"
          onClick={ handleSearchClick }
        />
        {renderContent()}
      </div>
    </header>
  );
}

export default Header;
