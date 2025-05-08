import { createSlice } from '@reduxjs/toolkit';

// define the initial state for the sound slice
// includes the current animal, purchased animals, and all available animals
const initialState = {
  currentAnimal: {
    id: 'pigeon',
    name: 'Angry Pigeon',
    image: require('../assets/pigeon.jpeg'),
    sound: require('../assets/pigeon-sound.mp3'),
    price: 0,
  },
  // list of purchased animals, starting with the default pigeon
  purchasedAnimals: ['pigeon'],
  // list of all animals available for purchase, including their details
  animalsAvailable: [
    { 
      id: 'pigeon', 
      name: 'Angry Pigeon', 
      image: require('../assets/pigeon.jpeg'),
      sound: require('../assets/pigeon-sound.mp3'),
      price: 0
    },
    { 
      id: 'cat', 
      name: 'Fierce Cat', 
      image: require('../assets/cat.jpg'),
      sound: require('../assets/cat-sound.mp3'),
      price: 99
    },
    { 
      id: 'dog', 
      name: 'Guard Dog', 
      image: require('../assets/dog.jpg'),
      sound: require('../assets/dog-sound.mp3'),
      price: 199
    },
  ],
};

// create a slice for sound-related state and actions
// includes reducers for changing the current animal and purchasing a new animal
const soundSlice = createSlice({
  name: 'sound',
  initialState,
  reducers: {
    // reducer to change the current animal
    // only allows switching to animals that have been purchased
    changeAnimal(state, action) {
      if (state.purchasedAnimals.includes(action.payload.id)) {
        state.currentAnimal = action.payload;
      }
    },
    // reducer to handle purchasing a new animal
    // adds the animal to the purchasedAnimals list if not already purchased
    purchaseAnimal(state, action) {
      const animalId = action.payload;
      if (!state.purchasedAnimals.includes(animalId)) {
        state.purchasedAnimals.push(animalId);
      }
    },
  },
});

export const { changeAnimal, purchaseAnimal } = soundSlice.actions;
export default soundSlice.reducer;