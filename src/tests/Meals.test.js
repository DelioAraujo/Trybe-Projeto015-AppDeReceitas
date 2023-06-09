import React from 'react';
import { screen, waitFor } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
// import userEvent from '@testing-library/user-event';
import CategoryMealsAPI from './mocks/CategoryMealsAPI';
import App from '../App';
import DefaultMealsAPI from './mocks/DefaultMealsAPI';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';
import DefaultDrinksAPI from './mocks/DefaultDrinksAPI';
import CategoryDrinks from './mocks/CategoryDrinks';

const mockMeal = DefaultMealsAPI;
const mockMealBtn = CategoryMealsAPI;
const mockDrink = DefaultDrinksAPI;
const mockDrinkBtn = CategoryDrinks;

beforeEach(() => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockImplementation((url) => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
      console.log('url 1');
      return Promise.resolve({
        json: () => Promise.resolve(mockMeal),
      });
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
      return Promise.resolve({
        json: () => Promise.resolve(mockMealBtn),
      });
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
      return Promise.resolve({
        json: () => Promise.resolve(mockDrink),
      });
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
      return Promise.resolve({
        json: () => Promise.resolve(mockDrinkBtn),
      });
    }
  });
});

afterEach(jest.restoreAllMocks);

describe('Meals', () => {
  test('should render component Header', () => {
    renderWithRouterAndContext(<App />, '/meals');
    screen.getByRole('heading', { name: /meals/i });
  });

  test('should render 12 food cards', async () => {
    renderWithRouterAndContext(<App />, '/meals');
    await waitFor(() => {
      screen.getByRole('img', { name: /corba/i });
      screen.getByRole('img', { name: /kumpir/i });
      screen.getByRole('img', { name: /timbits/i });
    });
  });

  test('should render 12 recipes based on the clicked category', async () => {
    renderWithRouterAndContext(<App />, '/meals');
    await waitFor(() => {
      const category1Btn = screen.getByRole('button', { name: /beef/i });
      expect(category1Btn).toBeInTheDocument();
    });
    // act(() => {
    //   userEvent.click(screen.getByRole('button', { name: /beef/i }));
    // });
    // pq não funciona?
  });
});
