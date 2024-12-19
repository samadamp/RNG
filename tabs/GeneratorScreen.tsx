// mina imports
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import useFavorites from '../hooks/useFavorites';
import namesData from '../data/names.json';


// min navegering
type RootStackParamList = {
  Generator: { category: string };
  Favorites: undefined;
};

type GeneratorScreenRouteProp = RouteProp<RootStackParamList, 'Generator'>;
type GeneratorScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Generator'
>;

type Props = {
  route: GeneratorScreenRouteProp;
  navigation: GeneratorScreenNavigationProp;
};

const GeneratorScreen: React.FC<Props> = ({ route, navigation }) => {
  const { category } = route.params;

  const { addFavorite, removeFavorite, favorites } = useFavorites();

// mina states
  const [names, setNames] = useState<{ name: string; isFavorite: boolean }[]>([]);
  const [allNames, setAllNames] = useState<
    Record<string, Record<string, Record<string, string[]>>>
  >({});

  
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [race, setRace] = useState<
    'Human' | 'Elf' | 'Dwarf' | 'Cyborg' | 'Alien' | 'Nubian' | 'Sobek' | 'Trolls' | 'Jotnar'
  >('Human');

  const [generatedNames, setGeneratedNames] = useState<Set<string>>(new Set());


  // min useEffect
  useEffect(() => {
    setAllNames(namesData);
  }, []);


  // generate functionen
  const generateRandomName = () => {
    const availableNames = allNames[category]?.[race]?.[gender] || [];
    const remainingNames = availableNames.filter((name) => !generatedNames.has(name));

    if (remainingNames.length === 0) {
      console.warn('All names have been generated for this combination.');
      return;
    }

    const randomName =
      remainingNames[Math.floor(Math.random() * remainingNames.length)];

   
    setGeneratedNames((prev) => new Set(prev).add(randomName));

   
    setNames((prev) => {
      if (prev.length >= 6) {
        return [...prev.slice(1), { name: randomName, isFavorite: false }];
      }
      return [...prev, { name: randomName, isFavorite: false }];
    });
  };

  
//favorites funktionen
  const toggleFavorite = (name: string) => {
    const isCurrentlyFavorite = favorites.some((fav) => fav.name === name);

    if (isCurrentlyFavorite) {
      removeFavorite(name);
    } else {
      addFavorite(name);
    }

    setNames((prev) =>
      prev.map((n) =>
        n.name === name ? { ...n, isFavorite: !n.isFavorite } : n
      )
    );
  };


  //rendering
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category}</Text>

      
      <View style={styles.genderSelector}>
        <Pressable
          style={[
            styles.genderButton,
            gender === 'Male' && styles.selectedGenderButton,
          ]}
          onPress={() => setGender('Male')}
        >
          <Text
            style={[
              styles.genderText,
              gender === 'Male' && styles.selectedGenderText,
            ]}
          >
            Male
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.genderButton,
            gender === 'Female' && styles.selectedGenderButton,
          ]}
          onPress={() => setGender('Female')}
        >
          <Text
            style={[
              styles.genderText,
              gender === 'Female' && styles.selectedGenderText,
            ]}
          >
            Female
          </Text>
        </Pressable>
      </View>

     
      <View style={styles.raceSelector}>
        {[
          'Human',
          ...(category === 'Fantasy' ? ['Elf', 'Dwarf'] :
            category === 'Sci-fi' ? ['Cyborg', 'Alien'] :
            category === 'Egyptian' ? ['Nubian', 'Sobek'] :
            category === 'Norse' ? ['Trolls', 'Jotnar'] : []),
        ].map((r) => (
          <Pressable
            key={r}
            style={[
              styles.raceButton,
              race === r && styles.selectedRaceButton,
            ]}
            onPress={() => setRace(r as typeof race)}
          >
            <Text
              style={[
                styles.raceText,
                race === r && styles.selectedRaceText,
              ]}
            >
              {r}
            </Text>
          </Pressable>
        ))}
      </View>

     
      <View style={styles.nameListContainer}>
        <FlatList
          data={names}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.nameItem}>
              <Text style={styles.nameText}>{item.name}</Text>
              <Pressable
                onPress={() => toggleFavorite(item.name)}
                style={({ pressed }) => [
                  styles.heartButton,
                  pressed && { opacity: 0.5 },
                ]}
              >
                <Text
                  style={[
                    styles.heartText,
                    item.isFavorite && styles.filledHeart,
                  ]}
                >
                  {item.isFavorite ? '❤️' : '🤍'}
                </Text>
              </Pressable>
            </View>
          )}
        />
      </View>

      <Pressable style={styles.generateButton} onPress={generateRandomName}>
        <Text style={styles.buttonText}>Generate</Text>
      </Pressable>
    </View>
  );
};


//styling 
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
  genderSelector: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  genderButton: {
    backgroundColor: '#eef5ff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  selectedGenderButton: {
    backgroundColor: '#cce7ff',
  },
  genderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  selectedGenderText: {
    color: '#0056b3',
    fontWeight: '700',
  },
  raceSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },
  raceButton: {
    backgroundColor: '#eef5ff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  selectedRaceButton: {
    backgroundColor: '#cce7ff',
  },
  raceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  selectedRaceText: {
    color: '#0056b3',
    fontWeight: '700',
  },
  nameListContainer: {
    backgroundColor: '#eef5ff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxHeight: '50%',
    marginBottom: 20,
  },
  nameItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  heartButton: {
    paddingHorizontal: 10,
  },
  heartText: {
    fontSize: 20,
    color: '#999',
  },
  filledHeart: {
    color: '#e63946',
  },
  generateButton: {
    backgroundColor: '#eef5ff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default GeneratorScreen;
