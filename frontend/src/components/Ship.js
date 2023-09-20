import React, { useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import './css/Ship.css';

function Ship({ length, shipImage, ships, setShips }) {
    const ref = useRef(null);
    const [{ isDragging }, drag, preview] = useDrag({
        type: 'ship',
        item: { length },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    useEffect(() => {
        const img = new Image();
        img.src = shipImage;
        img.onload = () => preview(img);
    }, [shipImage, preview]);

    drag(ref);

    if (ships[length].placed) {
        return null;
    }

    return (
        <img 
            src={shipImage} 
            alt="Ship" 
            ref={ref} 
            style={{ width: `${length * 50}px`, height: '50px', opacity: isDragging ? 0.5 : 1 }} // Adjust size as necessary
        />
    );
}

export default Ship;
