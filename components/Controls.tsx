import { useEffect, useRef } from 'react';

const Controls = () => {
    const keys: any = {
        KeyW: 'forward',
        KeyS: 'backward',
        KeyA: 'left',
        KeyD: 'right',
        KeyF: 'feed',
        Space: 'split',
    };

    const movement = useRef<any>({
        forward: false,
        backward: false,
        left: false,
        right: false,
        feed: false,
        split: false,
    });

    const handleKeyDown = (e: KeyboardEvent) => {
        if (keys[e.code]) movement.current[keys[e.code]] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
        if (keys[e.code]) movement.current[keys[e.code]] = false;
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return movement;
};

export default Controls;
