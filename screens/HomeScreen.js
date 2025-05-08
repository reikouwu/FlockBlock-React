import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import { Audio } from 'expo-av';
import { getAnimalPhoto } from '../services/pixabay';

// define the HomeScreen component
// displays the current animal, plays its sound, and fetches a new photo on tap
export default function HomeScreen() {
  // get the current animal from the Redux store
  const currentAnimal = useSelector((state) => state.sound.currentAnimal);

  // define state variables for sound, animation scale, and photo source
  const [sound, setSound]         = useState(null);
  const [scale]                   = useState(new Animated.Value(1));
  const [photoSrc, setPhotoSrc]   = useState(currentAnimal.image);

  // reset the photo source to the bundled asset whenever the current animal changes
  useEffect(() => {
    setPhotoSrc(currentAnimal.image);
  }, [currentAnimal]);

  // clean up the sound resource when the component unmounts
  useEffect(() => {
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [sound]);

  // function to play the sound and fetch a new photo
  async function playSound() {
    if (!currentAnimal?.sound) return;

    // trigger a simple scale animation for visual feedback
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1,   duration: 100, useNativeDriver: true })
    ]).start();

    try {
      // unload the previous sound if it exists
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      // load and play the new sound
      const { sound: newSound } = await Audio.Sound.createAsync(currentAnimal.sound);
      setSound(newSound);
      await newSound.playAsync();

      // fetch a new photo from Pixabay for the current animal
      const remoteUrl = await getAnimalPhoto(currentAnimal.id);
      if (remoteUrl) setPhotoSrc({ uri: remoteUrl });
    } catch (err) {
      console.log('Error playing sound:', err);
    }
  }

  // render the UI for the HomeScreen
  // includes the animal name, image, and a tap prompt
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentAnimal.name}</Text>

      <TouchableOpacity
        onPress={playSound}
        activeOpacity={0.7}
        accessibilityLabel={`Play sound for ${currentAnimal.name}`}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <Image source={photoSrc} style={styles.image} />
          <Text style={styles.tapPrompt}>Tap to play sound!</Text>
          {photoSrc?.uri && <Text style={styles.credit}>Photo: Pixabay</Text>}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#101820',
  },
  image: {
    width: 260,
    height: 260,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4DD0E1',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  tapPrompt: {
    textAlign: 'center',
    color: '#B0BEC5',
    fontSize: 16,
    marginBottom: 6,
  },
  credit: {
    textAlign: 'center',
    color: '#607D8B',
    fontSize: 12,
    marginTop: -2,
  },
});