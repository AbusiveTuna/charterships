import React, { useRef, useState , useEffect } from 'react';
import { useDrag } from 'react-dnd';
import './css/Ship.css';

function Ship({ length, shipImage, ships }) {

    const [rotation, setRotation] = useState('horizontal');

    const toggleRotation = () => {
        setRotation(rotation === 'horizontal' ? 'vertical' : 'horizontal');
    };

    const ref = useRef(null);
    const [{ isDragging }, drag, preview] = useDrag({
        type: 'ship',
        item: { length, rotation },
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
        <div onClick={toggleRotation}>
            <img 
                src={shipImage} 
                alt="Ship" 
                ref={ref} 
                style={{ width: rotation === 'horizontal' ? `${length * 50}px` : '50px', height: rotation === 'horizontal' ? '50px' : `${length * 50}px`, opacity: isDragging ? 0.5 : 1 }} // Adjust size based on rotation
            />
        </div>
    );
}
export default Ship;
