import { useContext } from 'react';
import FavoritesContext from '../context/FavContext';

const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavProvider');
  }
  return context;
};

export default useFavorites;