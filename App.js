// App.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Game from './Game';

export default function App() {
  return (
    <View style={styles.container}>
      <Game />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});