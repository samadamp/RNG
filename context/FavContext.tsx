import React, { createContext, useState, ReactNode } from 'react';

type Favorite = {
  name: string;
};

type FavoritesContextType = {
  favorites: Favorite[];
  addFavorite: (name: string) => void;
  removeFavorite: (name: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const addFavorite = (name: string) => {
    if (!favorites.some((favorite) => favorite.name === name)) {
      setFavorites((prev) => [...prev, { name }]);
    }
  };

  const removeFavorite = (name: string) => {
    setFavorites((prev) => prev.filter((favorite) => favorite.name !== name));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
