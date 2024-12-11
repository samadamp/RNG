import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useFavorites } from '../context/FavContext';

type FavScreenProps = {};

const FavScreen: React.FC<FavScreenProps> = () => {
  const { favorites, removeFavorite } = useFavorites(); // Använd global Context

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favs ❤️</Text>

      {favorites.length === 0 ? (
        <Text style={styles.noFavoritesText}>No favorites added yet!</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.favoriteItem}>
              <Text style={styles.favoriteName}>{item.name}</Text>
              <Pressable
                style={styles.removeButton}
                onPress={() => removeFavorite(item.name)}
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
    color: '#e63946',
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
