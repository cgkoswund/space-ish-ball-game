import React, { useEffect } from 'react';
import { BufferAttribute, TextureLoader, PointsMaterial, Color } from 'three';
import { create } from 'random-seed';

const MAX_WIDTH = 250;
const CUBE_SIZE = 25;
const CUBE_FOOD = 50;

const W = MAX_WIDTH / CUBE_SIZE;
const N_POINTS = W * W * W * CUBE_FOOD;

interface FoodProps {
    seed: number;
    geometry: any;
}

interface Food {
    x: number;
    y: number;
    z: number;
    color: number;
    size: number;
    lastUpdate: number;
}

/*
 * Get position according to xmin, ymin, zmin
 */
const newPos = (gen: any, xmin: number, ymin: number, zmin: number): any => {
    const xmax = xmin + CUBE_SIZE - 1;
    const ymax = ymin + CUBE_SIZE - 1;
    const zmax = zmin + CUBE_SIZE - 1;

    const pos = {
        x: gen.intBetween(xmin, xmax),
        y: gen.intBetween(ymin, ymax),
        z: gen.intBetween(zmin, zmax),
    };

    return pos;
};

/*
 * Create new food from a position into the right cube
 */
const newFood = (gen: any, position: any): any => {
    // find cube according to position
    const x = Math.floor(position.x / CUBE_SIZE);
    const y = Math.floor(position.y / CUBE_SIZE);
    const z = Math.floor(position.z / CUBE_SIZE);

    // find the new position
    const pos = newPos(gen, x * CUBE_SIZE, y * CUBE_SIZE, z * CUBE_SIZE);
    return pos;
};

/*
 * Generate food in the map according to xmin, ymin, zmin
 */
const generateFood = (gen: any, xmin: number, ymin: number, zmin: number): Food => {
    const food: Food = {
        ...newPos(gen, xmin, ymin, zmin),
        color: gen.floatBetween(0, 1),
        size: gen.floatBetween(0.1, 0.5),
        lastUpdate: Date.now(),
    };

    return food;
};

/*
 * Create a single cube according CUBE_SIZE and CUBE_FOOD
 */
const cube = (gen: any, xmin: number, ymin: number, zmin: number): Food[] => {
    const foodArray: Food[] = [];

    for (let i = 0; i < CUBE_FOOD; i++) {
        const food = generateFood(gen, xmin, ymin, zmin);
        foodArray.push(food);
    }

    return foodArray;
};

const cubeRow = (gen: any, xmin: number, ymin: number, zmin: number): Food[] => {
    const cubes: any = [];
    for (let i = 0; i < MAX_WIDTH / CUBE_SIZE; i++) {
        const c = cube(gen, xmin + i * CUBE_SIZE, ymin, zmin);
        cubes.push(c);
    }

    return cubes.flat();
};

const cubeGrid = (gen: any, xmin: number, ymin: number, zmin: number): Food[] => {
    const cubes: any = [];
    for (let i = 0; i < MAX_WIDTH / CUBE_SIZE; i++) {
        const c = cubeRow(gen, xmin, ymin + i * CUBE_SIZE, zmin);
        cubes.push(c);
    }

    return cubes.flat();
};

const cubeMatrix = (gen: any): Food[] => {
    const cubes: any = [];
    for (let i = 0; i < MAX_WIDTH; i += CUBE_SIZE) {
        const c = cubeGrid(gen, 0, 0, i);
        cubes.push(c);
    }

    return cubes.flat();
};

const Food = ({ seed, geometry }: FoodProps) => {
    const material = new PointsMaterial({ vertexColors: true, alphaTest: 0.5 });

    useEffect(() => {
        const texture = new TextureLoader().load('/ball.png', (t) => {
            t.center.setScalar(0.5);
            t.rotation = -Math.PI / 2;
        });
        material.map = texture;

        const gen = create(seed.toString());

        const positions = new Float32Array(N_POINTS * 3);
        const colors = new Float32Array(N_POINTS * 3);
        const sizes = new Float32Array(N_POINTS);

        const food_matrix = cubeMatrix(gen);

        for (let i = 0; i < N_POINTS; i++) {
            const f = food_matrix[i];

            positions[i * 3] = f.x;
            positions[i * 3 + 1] = f.y;
            positions[i * 3 + 2] = f.z;

            const color = new Color(f.color * 0xffffff);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            sizes[i] = f.size;
        }

        geometry.setAttribute('position', new BufferAttribute(positions, 3));
        geometry.setAttribute('color', new BufferAttribute(colors, 3));
        geometry.setAttribute('size', new BufferAttribute(sizes, 1));
    }, []);

    return <points geometry={geometry} material={material}></points>;
};

export default Food;
