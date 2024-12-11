import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Generator: { category: string };
  Favorites: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Generator'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>

      <View style={styles.categoriesContainer}>
        <Pressable
          style={styles.categoryButton}
          onPress={() => navigation.navigate('Generator', { category: 'Fantasy' })}
        >
          <Text style={styles.categoryText}>Fantasy</Text>
        </Pressable>

        <Pressable
          style={styles.categoryButton}
          onPress={() => navigation.navigate('Generator', { category: 'Sci-fi' })}
        >
          <Text style={styles.categoryText}>Sci-fi</Text>
        </Pressable>

        <Pressable
          style={styles.categoryButton}
          onPress={() => navigation.navigate('Generator', { category: 'Egyptian' })}
        >
          <Text style={styles.categoryText}>Egyptian</Text>
        </Pressable>

        <Pressable
          style={styles.categoryButton}
          onPress={() => navigation.navigate('Generator', { category: 'Norse' })}
        >
          <Text style={styles.categoryText}>Norse</Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.favoritesButton}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#eef5ff',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    margin: 10,
    alignItems: 'center',
    width: 120,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  favoritesButton: {
    backgroundColor: '#eef5ff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  favoritesText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e63946',
  },
});

export default HomeScreen;
