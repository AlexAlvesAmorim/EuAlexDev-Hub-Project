import { useState } from "react";
import { Home } from "./pages/home/home.tsx";
import { Header } from "./components/Header/Header.tsx";
import { Preloader } from "./components/Preloader/Preloader.tsx";
import { ScrollProgress } from "./components/ScrollProgress/ScrollProgress.tsx";
import { BackToTop } from "./components/BackToTop/BackToTop.tsx";

export function App() {
    const [booted, setBooted] = useState(false);

    return (
        <>
            <a href="#projetos" className="skip-link">Pular para o conteudo</a>
            <ScrollProgress />
            {!booted && <Preloader onDone={() => setBooted(true)} />}
            <Header />
            <div className="relative z-10 min-h-screen text-text">
                <Home />
            </div>
            <BackToTop />
        </>
    )
}