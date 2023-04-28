import { useRef } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Vector3, Quaternion } from 'three';

export default function Camera({ camera, sphere }: any) {
    const currentPosition = useRef<Vector3>(new Vector3(0, 0, 0));

    const CalculateIdealOffset = () => {
        let idealOffset = new Vector3(0, 0, 7.5);
        idealOffset.applyQuaternion(sphere.current.quaternion);
        idealOffset.add(sphere.current.position);
        return idealOffset;
    };

    const CalculateIdealQuaternion = () => {
        const idealQuaternion = new Quaternion();
        idealQuaternion.copy(sphere.current.quaternion);
        return idealQuaternion;
    };

    useFrame((state, dt) => {
        const idealOffset = CalculateIdealOffset();
        const idealQuaternion = CalculateIdealQuaternion();

        const t = 1.0 - Math.pow(0.001, dt);

        currentPosition.current.lerp(idealOffset, t);

        camera.current.position.copy(currentPosition.current);
        camera.current.quaternion.copy(idealQuaternion);
    });

    return <PerspectiveCamera makeDefault={true} fov={75} near={0.1} far={500} ref={camera} />;
}
