import { useBackgroundImage } from "../../hooks/useBackgroundTexture"

interface BackgroundTextureProps {
    imagePath: string
    opacity?: number
}

export function BackgroundTexture({
    imagePath,
    opacity = 0.08,
}: BackgroundTextureProps) {

    const imageLoaded = useBackgroundImage(imagePath);

    console.log('imageLoaded:', imageLoaded);


    if (!imageLoaded) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 pointer-events-none -z-10"
            style={{
                backgroundImage: `url(${imagePath})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity,
            }}
        />
    )
}