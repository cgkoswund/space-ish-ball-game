import { Text } from "@react-three/drei";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

const Sphere = ({ speed, size, index, count }: any) => {
  const gap = 3;
  const thisSpherePositionX =
    (-(size + gap) * count) / 2 + index * (size + gap);

  return (
    <group position={[thisSpherePositionX, 0, 0]}>
      <Text
        color={"#0000ff"}
        fontSize={1}
        maxWidth={10}
        lineHeight={1}
        letterSpacing={-0.02}
        textAlign={"center"}
        anchorX="center"
        anchorY="middle"
      >
        Test
      </Text>
      <mesh>
        <sphereBufferGeometry args={[size, , 32, 32]} />
        <meshLambertMaterial wireframe color={"#0000ff"} />
      </mesh>
    </group>
  );
};

export { Sphere };
