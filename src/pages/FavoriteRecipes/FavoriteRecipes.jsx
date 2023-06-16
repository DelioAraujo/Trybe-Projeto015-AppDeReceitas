// src/pages/FavoriteRecipes/FavoriteRecipes.jsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import shareIcon from '../../images/shareIcon.svg';
import unFav from '../../images/blackHeartIcon.svg';

// useEffect(() => {
//     localStorage.setItem("stateString", JSON.stringify(notes));
// }, [notes]);

function FavoriteRecipes() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || []; // vem do requisito 34 // retorna valor nulo caso não tenha recipes favoritados
  const [currFilterFav, setFilterFav] = useState(favoriteRecipes);
  const location = useLocation();

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      Swal.fire('Link copied!');
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const clickToUnfavorite = (id) => {
    // Filtra as receitas favoritas, removendo aquela que possui o ID correspondente ao recebido como argumento
    const updatedRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
    // Atualiza o valor das receitas favoritas no armazenamento local, convertendo o array atualizado em uma string
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedRecipes));
    // Atualiza o estado de currFilterFav com as receitas favoritas atualizadas
    setFilterFav(updatedRecipes);
  };

  // tive que tirar de dentro do clickToUnfavorite pois estava dando erro de loop infinito
  const handleUnfavorite = (id) => {
    clickToUnfavorite(id);
  };

  return (
    <div>
      <Header />
      <button
        data-testid="filter-by-all-btn"
        // eslint
        onClick={ () => setFilterFav(currFilterFav) }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => setFilterFav(
          currFilterFav
          // eslint
            .filter(({ type }) => type === 'meal'),
        ) }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilterFav(
          currFilterFav
          // eslint
            .filter(({ type }) => type === 'drink'),
        ) }
      >
        Drinks
      </button>
      {currFilterFav && currFilterFav.length > 0 ? (
        // Verifica se currFilterFav existe e tem um comprimento maior que zero
        currFilterFav.map(
          ({ id, type, nationality, category, alcoholicOrNot, name, image }, index) => (
            <section key={ index }>
              <Link to={ `/${type}s/${id}` }>
                <img
                  src={ image }
                  alt={ name }
                  // eslint
                  data-testid={ `${index}-horizontal-image` }
                />
                <span data-testid={ `${index}-horizontal-name` }>{name}</span>
              </Link>
              {type === 'meal' ? (
                <p>{`${nationality} - ${category}`}</p>
              ) : (
                <p>{alcoholicOrNot}</p>
              )}
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => copyToClipboard(location.pathname) }
              >
                <img src={ shareIcon } alt="Share button" />
              </button>
              <button
                data-testid={ `${index}-horizontal-favorite-btn` }
                onClick={ () => handleUnfavorite(id) }
              >
                <img src={ unFav } alt="unfavorite" />
              </button>
            </section>
          ),
        )
      ) : (
        // Caso currFilterFav seja nulo ou vazio, exibe uma mensagem indicando que nenhuma receita favorita foi encontrada
        <p>No favorite recipes found.</p>
      )}
    </div>
  );
}

export default FavoriteRecipes;

// [{
//   id: id - da - receita,
//   type: meal - ou - drink,
//   nationality: nacionalidade - da - receita - ou - texto - vazio,
//   category: categoria - da - receita - ou - texto - vazio,
//   alcoholicOrNot: alcoholic - ou - non - alcoholic - ou - texto - vazio,
//   name: nome - da - receita,
//   image: imagem - da - receita
// }]
