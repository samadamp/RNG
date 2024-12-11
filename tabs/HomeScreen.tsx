import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Generator: { category: string };
  Favorites: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Generator'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const categories = ['Fantasy', 'Sci-fi', 'Egyptian', 'Norse'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <View style={styles.grid}>
        {categories.map((category) => (
          <Pressable
            key={category}
            style={({ pressed }) => [
              styles.box,
              pressed && styles.boxPressed,
            ]}
            onPress={() => navigation.navigate('Generator', { category })}
          >
            <Text style={styles.boxText}>{category}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.favoritesButton,
          pressed && styles.favoritesButtonPressed,
        ]}
        onPress={() => navigation.navigate('Favorites')}
      >
        <Text style={styles.favoritesText}>Favs ❤️</Text>
      </Pressable>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 30,
  },
  box: {
    backgroundColor: '#eef5ff',
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  boxPressed: {
    backgroundColor: '#cce7ff',
  },
  boxText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  favoritesButton: {
    backgroundColor: '#eef5ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  favoritesButtonPressed: {
    backgroundColor: '#cce7ff',
  },
  favoritesText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e63946',
  },
});

export default HomeScreen;
