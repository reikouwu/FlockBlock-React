import { configureStore } from '@reduxjs/toolkit';
import soundReducer from './soundSlice';

// create and configure the Redux store
// the store uses the soundReducer to handle the 'sound' slice of the state
const store = configureStore({
  reducer: {
    sound: soundReducer,
  },
});
export default store;