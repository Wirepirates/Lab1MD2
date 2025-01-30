import React, { useEffect, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import { createWalls, Physics, BOX_SIZE, BLUE_SQUARE_SIZE } from './physics'; // Import updated size from physics.js

const { width, height } = Dimensions.get('window');

const Wall = ({ size, body, color }) => {
    const x = body.position.x - size[0] / 2;
    const y = body.position.y - size[1] / 2;
    return <View style={{ position: 'absolute', left: x, top: y, width: size[0], height: size[1], backgroundColor: color }} />;
};

const Box = ({ size, body, color }) => {
    const x = body.position.x - size[0] / 2;
    const y = body.position.y - size[1] / 2;
    return <View style={{ position: 'absolute', left: x, top: y, width: size[0], height: size[1], backgroundColor: color }} />;
};

export default function App() {
    const engine = useRef(Matter.Engine.create());
    const world = engine.current.world;

    useEffect(() => {
        return () => {
            Matter.Engine.clear(engine.current);
        };
    }, []);

    const walls = createWalls(world);
    Matter.World.add(world, [
        walls.top, walls.bottom, walls.left, walls.right, walls.blueSquare, walls.redSquare // Add both squares
    ]);

    return (
        <GameEngine
            systems={[Physics]}
            entities={{
                physics: { engine: engine.current, world },
                topWall: { body: walls.top, size: [width, 10], color: 'green', renderer: Wall },
                bottomWall: { body: walls.bottom, size: [width, 10], color: 'red', renderer: Wall },
                leftWall: { body: walls.left, size: [10, height], color: 'blue', renderer: Wall },
                rightWall: { body: walls.right, size: [10, height], color: 'blue', renderer: Wall },
                blueSquare: { body: walls.blueSquare, size: [BLUE_SQUARE_SIZE, BLUE_SQUARE_SIZE], color: 'blue', renderer: Box }, // Render bigger blue square
                redSquare: { body: walls.redSquare, size: [BOX_SIZE, BOX_SIZE], color: 'red', renderer: Box }, // Static red square
            }}
            style={{ flex: 1, backgroundColor: 'white' }}
        />
    );
}
