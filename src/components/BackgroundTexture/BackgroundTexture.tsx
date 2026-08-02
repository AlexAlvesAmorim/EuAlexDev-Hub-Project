interface BackgroundTextureProps {
    imagePath: string
    opacity?: number
}

export function BackgroundTexture({
    imagePath,
    opacity = 1,
}: BackgroundTextureProps) {
    return (
        <div className="pointer-events-none fixed inset-0 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${imagePath})`,
                opacity,
                zIndex: 0,
            }}
        />
    )
}
