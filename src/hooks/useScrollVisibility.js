import { useState, useEffect } from 'react';

/**
 * A custom hook that returns true if the user has scrolled past a given threshold.
 * @param {number} threshold - The scroll distance in pixels to trigger visibility. Defaults to 300.
 * @returns {boolean} - Whether the component should be visible.
 */
export const useScrollVisibility = (threshold = 300) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > threshold) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Add the scroll event listener when the component mounts
        window.addEventListener('scroll', toggleVisibility);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, [threshold]); // Only re-run the effect if the threshold changes

    return isVisible;
};