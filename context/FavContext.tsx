import React, { createContext, useState, useContext, ReactNode } from 'react';

// Typ för ett namn
type Favorite = {
  name: string;
};

// Typ för kontextens värden
type FavoritesContextType = {
  favorites: Favorite[];
  addFavorite: (name: string) => void;
  removeFavorite: (name: string) => void;
};

// Skapa kontexten
const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

// Provider-komponenten
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

// Hook för att använda kontexten
export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavProvider');
  }
  return context;
};