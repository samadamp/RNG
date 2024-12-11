import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

type FavScreenProps = {};

const FavScreen: React.FC<FavScreenProps> = () => {
  // Mockad lista över favoritnamn
  const [favorites, setFavorites] = useState<string[]>([
    'Elanor',
    'Thor',
    'Nova',
  ]);

  const removeFavorite = (name: string) => {
    setFavorites(favorites.filter((item) => item !== name));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favorites</Text>

      {favorites.length === 0 ? (
        <Text style={styles.noFavoritesText}>No favorites added yet!</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.favoriteItem}>
              <Text style={styles.favoriteName}>{item}</Text>
              <Pressable
                style={styles.removeButton}
                onPress={() => removeFavorite(item)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fcff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  noFavoritesText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  favoriteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eef5ff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  favoriteName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  removeButton: {
    backgroundColor: '#e63946',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  removeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});

export default FavScreen;
