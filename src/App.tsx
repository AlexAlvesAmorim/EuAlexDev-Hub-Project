import { Home } from "./pages/home/home.tsx";

import { BackgroundTexture } from "./components/BackgroundTexture/BackgroundTexture.tsx";


export function App() {
    return (

        <>
            <BackgroundTexture imagePath="/texture.jpg" opacity={0.06} />
            <div className="min-h-screen bg-background text-text">
                <Home />
            </div >
        </>
    )



}