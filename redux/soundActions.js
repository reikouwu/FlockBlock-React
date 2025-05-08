import { changeSound, addSound } from '../slices/soundSlice';

// define an async action to handle purchasing a new sound
// this can simulate an API call or other asynchronous operation
export const purchaseNewSound = (sound) => async (dispatch) => {
    try {
        // simulate a purchase or API call
        // after a successful purchase, dispatch the addSound action to update the state
        dispatch(addSound(sound));
    } catch (error) {
        // handle any errors that occur during the purchase process
        console.error('Purchase failed', error);
    }
};
export { changeSound, addSound };