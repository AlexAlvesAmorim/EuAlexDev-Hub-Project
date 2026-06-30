import { useEffect, useState } from "react";

export function useBackgroundImage(imagePath: string) {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();

        const handleLoad = () => {
            setImageLoaded(true);
        };

        img.addEventListener("load", handleLoad);

        // Set src AFTER adding the listener to avoid race condition
        // where cached images fire 'load' before the listener is attached
        img.src = imagePath;

        // Also handle already-cached images
        if (img.complete) {
            setImageLoaded(true);
        }

        return () => {
            img.removeEventListener("load", handleLoad);
        };
    }, [imagePath]);

    return imageLoaded;
}