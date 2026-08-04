import { Home } from "./pages/home/home.tsx";
import { Header } from "./components/Header/Header.tsx";

export function App() {
    return (
        <>
            <Header />
            <div className="relative z-10 min-h-screen text-text">
                <Home />
            </div>
        </>
    )
}
