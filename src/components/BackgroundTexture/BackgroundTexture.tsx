import { useBackgroundImage } from "../../hooks/useBackgroundTexture";

interface BackgroundTextureProps {
    imagePath: string
    opacity?: number
}

export function BackgroundTexture({
    imagePath,
    opacity = 0.08,
}: BackgroundTextureProps) {
    const imageLoaded = useBackgroundImage(imagePath);

    return (
        <div
            className="pointer-events-none fixed inset-0 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${imagePath})`,
                opacity: imageLoaded ? opacity : 0,
                transition: "opacity 0.8s ease",
                zIndex: 0,
            }}
        />
    )
}
