import { useEffect, useState } from "react";

export function useBackgroundImage(imagePath: string) {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = imagePath;

        const handleLoad = () => {
            setImageLoaded(true);
        };

        img.addEventListener("load", handleLoad);
        return () => {
            img.removeEventListener("load", handleLoad);
        };
    }, [imagePath]);

    return imageLoaded;
}