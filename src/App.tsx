import { useEffect, useState } from "react";
import { Home } from "./pages/home/home.tsx";
import { CasePage } from "./pages/case/CasePage.tsx";
import { Header } from "./components/Header/Header.tsx";
import { Preloader } from "./components/Preloader/Preloader.tsx";
import { ScrollProgress } from "./components/ScrollProgress/ScrollProgress.tsx";
import { BackToTop } from "./components/BackToTop/BackToTop.tsx";
import { useHashRoute } from "./hooks/useHashRoute.ts";
import { siteConfig } from "./config/site.ts";
import { projectsContent } from "./content/loader.ts";

export function App() {
    const [booted, setBooted] = useState(false);
    const { route } = useHashRoute();

    useEffect(() => {
        if (route.name === "project") {
            const project = projectsContent.find((p) => p.id === route.id);
            document.title = project
                ? `${project.title} — Alex Alves Amorim | Dev. de Favela Hub`
                : `Projeto não encontrado — Alex Alves Amorim | Dev. de Favela Hub`;
        } else {
            document.title = siteConfig.seo.title;
        }
    }, [route]);

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
        </>
    )
}