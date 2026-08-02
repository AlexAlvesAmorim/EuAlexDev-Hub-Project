import { useEffect, useState } from "react";

export function useBackgroundImage(imagePath: string) {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();

        const handleLoad = () => {
            setImageLoaded(true);
        };

        img.addEventListener("load", handleLoad);
        img.src = imagePath;

        return () => {
            img.removeEventListener("load", handleLoad);
        };
    }, [imagePath]);

    return imageLoaded;
}