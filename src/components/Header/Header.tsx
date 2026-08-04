import { useEffect, useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        if (!menuOpen) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setMenuOpen(false);
        };

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [menuOpen]);

    return (
        <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-white/10 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <a href="#projetos" className="flex items-center gap-3" onClick={closeMenu}>
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shrink-0">
                            <span className="text-white font-bold text-lg">A</span>
                        </div>
                        <div>
                            <h1 className="text-lg sm:text-xl font-bold text-text-h leading-tight">
                                Dev. de Favela Hub
                            </h1>
                            <p className="text-xs sm:text-sm text-text/60">Portfólio & Projetos</p>
                        </div>
                    </a>

                    <nav className="hidden md:flex items-center gap-6" aria-label="Navegação principal">
                        <a href="#projetos" className="text-text hover:text-primary transition-colors">
                            Projetos
                        </a>
                        <a href="#sobre" className="text-text hover:text-primary transition-colors">
                            Sobre mim
                        </a>
                        <a href="#contato" className="text-text hover:text-primary transition-colors">
                            Contato
                        </a>
                    </nav>

                    <div className="flex items-center gap-3">
                        <a
                            href="https://github.com/AlexAlvesAmorim"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
                        >
                            GitHub
                        </a>

                        <button
                            className="md:hidden text-2xl text-text-h hover:text-primary transition-colors"
                            onClick={() => setMenuOpen((prev) => !prev)}
                            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                            aria-expanded={menuOpen}
                        >
                            {menuOpen ? <FaXmark /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </div>

            {menuOpen && (
                <nav
                    className="md:hidden bg-background/95 backdrop-blur-md border-t border-white/10 px-4 py-4 flex flex-col gap-4"
                    aria-label="Menu móvel"
                >
                    <a href="#projetos" className="text-text hover:text-primary transition-colors" onClick={closeMenu}>
                        Projetos
                    </a>
                    <a href="#sobre" className="text-text hover:text-primary transition-colors" onClick={closeMenu}>
                        Sobre mim
                    </a>
                    <a href="#contato" className="text-text hover:text-primary transition-colors" onClick={closeMenu}>
                        Contato
                    </a>
                    <a
                        href="https://github.com/AlexAlvesAmorim"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text hover:text-primary transition-colors"
                    >
                        GitHub
                    </a>
                </nav>
            )}
        </header>
    )
}
