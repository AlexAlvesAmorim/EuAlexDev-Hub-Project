import { useState } from "react";
import { Home } from "./pages/home/home.tsx";
import { Header } from "./components/Header/Header.tsx";
import { Preloader } from "./components/Preloader/Preloader.tsx";

export function App() {
    const [booted, setBooted] = useState(false);

    return (
        <>
            <a href="#projetos" className="skip-link">Pular para o conteudo</a>
            {!booted && <Preloader onDone={() => setBooted(true)} />}
            <Header />
            <div className="relative z-10 min-h-screen text-text">
                <Home />
            </div>
        </>
    )
}