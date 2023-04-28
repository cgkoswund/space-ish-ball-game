import { Canvas } from "@react-three/fiber";
import { Stats, Box } from "@react-three/drei";
import { BufferGeometry } from "three";
import { useRef } from "react";

import Player from "./Player";
import Controls from "./Controls";
import Food from "./Food";
import { useState, useEffect } from "react";
import { KeyboardControls } from "@react-three/drei";
import Projectile from "./Projectile";

export const Scene = () => {
  const movement = Controls();
  const geometry = useRef(new BufferGeometry());

  return (
    <KeyboardControls
      map={[
        { name: "split", keys: ["Space"] },
        { name: "throw", keys: ["KeyF"] },
      ]}
    >
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          background: "black",
        }}
      >
        <hemisphereLight
          color={0xffff80}
          groundColor={0x4040ff}
          intensity={1}
        />
        <Projectile />
        <Player movement={movement} />
        <Food seed={1} geometry={geometry.current} />
        <Stats showPanel={0} />
      </Canvas>
    </KeyboardControls>
  );
};
