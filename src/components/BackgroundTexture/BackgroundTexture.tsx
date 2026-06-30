interface BackgroundTextureProps {
    imagePath: string
    opacity?: number
}

export function BackgroundTexture({
    imagePath,
    opacity = 1,
}: BackgroundTextureProps) {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundImage: `url(${imagePath})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity,
                zIndex: 0,
                pointerEvents: 'none',
                opacity: 0.1,
            }}
        />
    )
}
