// Game.js
import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { GameEngine } from 'react-native-game-engine';

const Square = ({ position }) => {
  return (
    <View style={[styles.square, { left: position.x, top: position.y }]} />
  );
};

const CenterSquare = () => {
  return <View style={styles.centerSquare} />;
};

const Game = () => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [direction, setDirection] = React.useState('down');
  const [isMoving, setIsMoving] = React.useState(false); // New state to control movement
  const speed = 5; // Speed of the square

  // Define border dimensions
  const borderWidth = 350; // Match the border style width
  const borderHeight = 740; // Match the border style height

  useEffect(() => {
    const update = () => {
      setPosition((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        // Move based on the current direction
        switch (direction) {
          case 'down':
            newY += speed;
            if (newY >= borderHeight - 50) { // 50 is the height of the square
              newY = borderHeight - 50; // Clamp to the bottom edge
              setDirection('right'); // Change direction to right
            }
            break;
          case 'right':
            newX += speed;
            if (newX >= borderWidth - 50) { // 50 is the width of the square
              newX = borderWidth - 50; // Clamp to the right edge
              setDirection('up'); // Change direction to up
            }
            break;
          case 'up':
            newY -= speed;
            if (newY <= 0) {
              newY = 0; // Clamp to the top edge
              setDirection('left'); // Change direction to left
            }
            break;
          case 'left':
            newX -= speed;
            if (newX <= 0) {
              newX = 0; // Clamp to the left edge
              setDirection('down'); // Change direction to down
            }
            break;
          default:
            break;
        }

        // Check if the square has returned to the original position
        if (newX === 0 && newY === 0) {
          setIsMoving(false); // Stop moving when it returns to the original position
        }

        return { x: newX, y: newY };
      });
    };

    const interval = isMoving ? setInterval(update, 16) : null; // Only update if moving
    return () => clearInterval(interval);
  }, [direction, isMoving]);

  const handlePress = () => {
    if (!isMoving) {
      setIsMoving(true); // Start moving when the screen is pressed
      setDirection('down'); // Reset direction to start moving down
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.border}>
          <GameEngine style={styles.gameContainer}>
            <Square position={position} />
            <CenterSquare /> 
          </GameEngine>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    width: 350, // Match the game container width
    height: 740, // Match the game container height
    borderColor: 'black',
    borderWidth: 2,
    position: 'relative',
    overflow: 'hidden', // Prevent the square from being visible outside the border
  },
  gameContainer: {
    width: 350, // Match the border style width
    height: 740, // Match the border style height
    position: 'absolute',
  },
  square: {
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    position: 'absolute',
  },
  centerSquare: {
    width: 20, // Width of the center square
    height: 20, // Height of the center square
    backgroundColor: 'red',
    position: 'absolute',
    left: (350 - 20) / 2, // Center horizontally
    top: (740 - 20) / 2, // Center vertically
  },
});

export default Game;
``