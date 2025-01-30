import Matter from 'matter-js';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const BOX_SIZE = 25;
const BLUE_SQUARE_SIZE = 50;  // Increase the size of the blue square

const createWalls = (world) => {
    return {
        top: Matter.Bodies.rectangle(width / 2, 5, width, 10, { isStatic: true }),
        bottom: Matter.Bodies.rectangle(width / 2, height - 5, width, 10, { isStatic: true }),
        left: Matter.Bodies.rectangle(5, height / 2, 10, height, { isStatic: true }),
        right: Matter.Bodies.rectangle(width - 5, height / 2, 10, height, { isStatic: true }),
        blueSquare: Matter.Bodies.rectangle(25, 25, BLUE_SQUARE_SIZE, BLUE_SQUARE_SIZE, { // Updated size for blue square
            render: { fillStyle: 'blue' }
        }),
        redSquare: Matter.Bodies.rectangle(width / 2, height / 2, BOX_SIZE, BOX_SIZE, { // Static red square
            isStatic: true,
            render: { fillStyle: 'red' }
        })
    };
};

const Physics = (entities, { time }) => {
    let engine = entities.physics.engine;
    Matter.Engine.update(engine, time.delta);
    return entities;
};

export { createWalls, Physics, BOX_SIZE, BLUE_SQUARE_SIZE };
