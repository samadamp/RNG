import React, { createContext, useState, useContext, ReactNode } from 'react';


type Favorite = {
  name: string;
};


type FavoritesContextType = {
  favorites: Favorite[];
  addFavorite: (name: string) => void;
  removeFavorite: (name: string) => void;
};


const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);


export const FavProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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


export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavProvider');
  }
  return context;
};