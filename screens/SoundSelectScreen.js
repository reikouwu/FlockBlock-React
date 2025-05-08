import React from 'react';
import { View, FlatList, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeAnimal } from '../redux/soundSlice';

// define the SoundSelectScreen component
// displays a list of purchased animals and allows the user to select one
export default function SoundSelectScreen({ navigation }) {
  const dispatch = useDispatch();

  // get the list of all animals and purchased animals from the Redux store
  const animalsAvailable = useSelector(state => state.sound.animalsAvailable);
  const purchasedAnimals = useSelector(state => state.sound.purchasedAnimals);

  // filter the list of animals to show only those that have been purchased
  const purchasedAnimalsList = animalsAvailable.filter(animal =>
    purchasedAnimals.includes(animal.id)
  );

  // function to handle selecting an animal
  // dispatches the changeAnimal action and navigates back to the Home screen
  const selectAnimal = (animal) => {
    dispatch(changeAnimal(animal));
    navigation.navigate('Home');
  };

  // render the list of purchased animals
  // each animal is displayed with its image and name
  return (
    <View style={styles.container}>
      <FlatList
        data={purchasedAnimalsList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selectAnimal(item)} style={styles.item}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101820',
    padding: 15,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    padding: 18,
    marginBottom: 12,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 14,
    marginRight: 15,
  },
  text: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4DD0E1',
  },
});