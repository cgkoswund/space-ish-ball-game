import { useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";
import useCameraData from "../stores/useCameraData.js";
import gsap from "gsap";

const Projectile = () => {
  const { scene, camera } = useThree();
  const [subscribeToKeys, get] = useKeyboardControls();
  useEffect(() => {
    const unsubscribeToKeys = subscribeToKeys((state) => {
      if (state.throw) {
        console.log("note from projectile");

        const { activeCamera } = useCameraData.getState();

        const projectileGeo = new THREE.SphereGeometry(0.35, 8, 8);
        const projectileMat = new THREE.MeshBasicMaterial({
          color: "red",
          side: THREE.DoubleSide,
        });
        const projectileMesh = new THREE.Mesh(projectileGeo, projectileMat);

        const spherePosition = new THREE.Vector3(0, 0, -7.5);
        spherePosition
          .applyQuaternion(activeCamera.current.quaternion)
          .add(activeCamera.current.position);
        const landingPosition = new THREE.Vector3(0, 0, -17.5); //camera is 7.5 from sphere, projectile is 10 from sphere
        landingPosition
          .applyQuaternion(activeCamera.current.quaternion)
          .add(activeCamera.current.position);

        projectileMesh.position.copy(spherePosition);
        gsap.to(projectileMesh.position, {
          x: landingPosition.x,
          y: landingPosition.y,
          z: landingPosition.z,
          duration: 0.2,
        });

        scene.add(projectileMesh);
      }
    });
    return () => unsubscribeToKeys();
  }, []);
  return (
    <>
      <mesh>
        <sphereGeometry args={[0.35, 8, 8]} />
        <meshBasicMaterial color={"red"} />
      </mesh>
    </>
  );
};

export default Projectile;
