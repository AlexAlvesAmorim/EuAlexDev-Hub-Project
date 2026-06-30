import { Home } from "./pages/home/home.tsx";

import { BackgroundTexture } from "./components/BackgroundTexture/BackgroundTexture.tsx";


export function App() {
    return (

        <>
            <BackgroundTexture imagePath="/texture.jpg" opacity={1} />
            <div className="relative z-1 min-h-screen text-text">
                <Home />
            </div >
        </>
    )



}