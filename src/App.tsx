import { Home } from "./pages/home/home.tsx";
import { Header } from "./components/Header/Header.tsx";
import { BackgroundTexture } from "./components/BackgroundTexture/BackgroundTexture.tsx";

export function App() {
    return (
        <>
            <BackgroundTexture imagePath="/texture.svg" />
            <Header />
            <div className="relative z-10 min-h-screen text-text">
                <Home />
            </div>
        </>
    )
}
