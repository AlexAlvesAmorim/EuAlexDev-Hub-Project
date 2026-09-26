import { useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Home } from "./pages/home/home.tsx";
import { CasePage } from "./pages/case/CasePage.tsx";
import { Header } from "./components/Header/Header.tsx";
import { Preloader } from "./components/Preloader/Preloader.tsx";
import { ScrollProgress } from "./components/ScrollProgress/ScrollProgress.tsx";
import { BackToTop } from "./components/BackToTop/BackToTop.tsx";
import { useHashRoute } from "./hooks/useHashRoute.ts";
import { useRouteMeta } from "./hooks/useRouteMeta.ts";

export function App() {
    const [booted, setBooted] = useState(false);
    const { route } = useHashRoute();
    useRouteMeta(route);

    const routeKey = route.name === "project" ? `project:${route.id}` : "home";

    return (
        <>
            <a href="#projetos" className="skip-link">Pular para o conteudo</a>
            <ScrollProgress />
            {!booted && <Preloader onDone={() => setBooted(true)} />}
            <Header />
            <div key={routeKey} className="page-enter relative z-10 min-h-screen text-text">
                {route.name === "project" ? <CasePage key={route.id} id={route.id} /> : <Home />}
            </div>
            <BackToTop />
            <SpeedInsights />
        </>
    )
}