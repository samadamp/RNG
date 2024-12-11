import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';

type Props = {
  route: { params: { category: string } };
};

const GeneratorScreen: React.FC<Props> = ({ route }) => {
  const { category } = route.params;

  const [names, setNames] = useState<{ name: string; isFavorite: boolean }[]>([]);
  const [allNames] = useState<Record<string, string[]>>({
    Fantasy: ['Findolin Magthar', 'Soraka Lightbane', 'Tauriel Urd-ál', 'Elandir Frostbane'],
    'Sci-fi': ['Xerion Pulse', 'Nova Striker', 'Orion Zeta', 'Lyra Stardust'],
    Egyptian: ['Nefertari', 'Anubis Rex', 'Osiris Khufu', 'Ramses the Brave'],
    Norse: ['Thorvald Bjornson', 'Freya Skald', 'Loki Windrider', 'Odin the Wise'],
  });

  const generateRandomName = () => {
    const availableNames = allNames[category] || ['Unnamed'];
    const randomName = availableNames[Math.floor(Math.random() * availableNames.length)];

    // Lägg bara till namnet om det inte redan finns i listan
    if (!names.some((n) => n.name === randomName)) {
      setNames((prev) => [...prev, { name: randomName, isFavorite: false }]);
    }
  };

  const toggleFavorite = (name: string) => {
    setNames((prev) =>
      prev.map((n) =>
        n.name === name ? { ...n, isFavorite: !n.isFavorite } : n
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category}</Text>

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
                <Text style={[styles.heartText, item.isFavorite && styles.filledHeart]}>
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
