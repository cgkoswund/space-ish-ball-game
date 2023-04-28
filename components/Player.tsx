import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

import { Vector3 } from "three";

import Camera from "./Camera";
import { Sphere } from "./Sphere";
import { useKeyboardControls } from "@react-three/drei";
import useCameraData from "../stores/useCameraData.js";

const MAX_WIDTH = 250;
const CUBE_SIZE = 25;
const CUBE_FOOD = 50;
const N = MAX_WIDTH / CUBE_SIZE;

const min = new Vector3(-MAX_WIDTH, -MAX_WIDTH, 0);
const max = new Vector3(MAX_WIDTH, MAX_WIDTH, MAX_WIDTH);

enum Controls {
  keyF = "throw",
  space = "split",
}

export default function Player({ movement }: any) {
  const sphere = useRef<any>();
  const camera = useRef<any>();
  useCameraData.setState({ activeCamera: camera });
  const spheres = [
    { size: 1, speed: 1 },
    { size: 2, speed: 1 / 2 },
    { size: 3, speed: 1 / 3 },
  ];

  const [velocity, setVelocity] = useState<Vector3>(new Vector3(1, 1, 2));
  const [subscribe, get] = useKeyboardControls<Controls>();
  useEffect(() => {
    const unsubscribeToKeys = subscribe((state) => {
      /*if (state.throw) {
        console.log("player is throwing");
      } else*/ if (state.split) {
        console.log("player is splitting");
      }
    });

    return () => {
      //say component died
    };
  }, []);
  useFrame((state, dt) => {
    const { forward, backward, left, right, feed, split } = movement.current;

    if (feed) {
      console.log("feed");
      // TODO: feed
    }

    if (split) {
      console.log("split");
      // TODO: split
    }

    if (forward) {
      sphere.current.rotateX(-velocity.x * dt);
    } else if (backward) {
      sphere.current.rotateX(velocity.x * dt);
    }

    if (left) {
      sphere.current.rotateY(velocity.y * dt);
    } else if (right) {
      sphere.current.rotateY(-velocity.y * dt);
    }

    const direction = new Vector3(0, 0, -1);
    direction.applyQuaternion(sphere.current.quaternion);

    sphere.current.position.addScaledVector(direction, velocity.z * dt);
    sphere.current.position.clamp(min, max);
  });

  const sphereCount = spheres.length;
  return (
    <>
      <Camera camera={camera} sphere={sphere} />
      <group ref={sphere} position={[50, 50, 50]}>
        {spheres.map((item, index) => {
          return (
            <Sphere
              key={index}
              index={index}
              sphere={sphere}
              speed={item.speed}
              size={item.size}
              count={sphereCount}
            />
          );
        })}
      </group>
    </>
  );
}
