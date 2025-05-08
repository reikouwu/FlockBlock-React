import React from 'react';
import { View, FlatList, TouchableOpacity, Image, Text, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { purchaseAnimal } from '../redux/soundSlice';

// define the PurchaseScreen component
// displays a list of animals available for purchase and handles the purchase process
const PurchaseScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // get the list of all animals and purchased animals from the Redux store
  const animalsAvailable = useSelector(state => state.sound.animalsAvailable);
  const purchasedAnimals = useSelector(state => state.sound.purchasedAnimals);

  // filter the list of animals to show only those that haven't been purchased yet
  const availableAnimals = animalsAvailable.filter(
    animal => !purchasedAnimals.includes(animal.id)
  );

  // function to handle the purchase of an animal
  // shows a confirmation alert and dispatches the purchase action if confirmed
  const handlePurchase = (animal) => {
    Alert.alert(
      'Confirm Purchase',
      `Would you like to purchase ${animal.name} for $${animal.price}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Buy',
          onPress: () => {
            dispatch(purchaseAnimal(animal.id));
            Alert.alert('Success!', `You now own ${animal.name}!`, [
              { text: 'OK', onPress: () => navigation.navigate('Home') }
            ]);
          },
        },
      ]
    );
  };

  // if all animals have been purchased, display a message to the user
  if (availableAnimals.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noAnimalsText}>You own all available animals!</Text>
      </View>
    );
  }

  // render the list of available animals
  // each animal is displayed with its image, name, and price
  return (
    <View style={styles.container}>
      <FlatList
        data={availableAnimals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePurchase(item)} style={styles.item}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PurchaseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101820',
    padding: 18,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    padding: 16,
    marginBottom: 12,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 12,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4DD0E1',
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    color: '#80CBC4',
    fontWeight: '700',
  },
  noAnimalsText: {
    fontSize: 18,
    color: '#B0BEC5',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});