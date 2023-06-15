import React from 'react';
import { useLocation } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import MealInProgress from './MealInProgress';
import DrinkInProgress from './DrinkInProgress';

function RecipeInProgress() {
  // const { id } = useParams();
  const location = useLocation();
  const { pathname } = location;

  return (
    <div>
      {pathname.includes('/meals/') && <MealInProgress id="52771" />}
      {pathname.includes('/drinks/') && <DrinkInProgress id="178319" />}
    </div>
  );
}

export default RecipeInProgress;
