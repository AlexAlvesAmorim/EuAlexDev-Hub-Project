import { useEffect, useState } from "react";
import { FaBars, FaXmark, FaFolderOpen, FaUser, FaEnvelope, FaGithub, FaChartSimple, FaTimeline, FaCode, FaAward } from "react-icons/fa6";
import { CurriculumDropdown } from "../CurriculumMenu/CurriculumDropdown.tsx";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle.tsx";
import { siteConfig } from "../../config/site";

const navIcons = {
    projects: FaFolderOpen,
    about: FaUser,
    metrics: FaChartSimple,
    journey: FaTimeline,
    stack: FaCode,
    certs: FaAward,
    contact: FaEnvelope,
} as const;

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!menuOpen) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setMenuOpen(false);
        };

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [menuOpen]);

    const navLinkClasses = "relative inline-flex items-center gap-1.5 text-sm font-medium text-text-h/80 hover:text-primary transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full";

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? "bg-background/70 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-black/[0.08] dark:border-white/[0.06]"
                    : "bg-transparent border-b border-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex justify-between items-center transition-all duration-500 ${scrolled ? "py-2.5" : "py-4"}`}>
                    <a href="#projetos" className="flex items-center gap-3 group" onClick={closeMenu}>
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-primary/25 transition-all duration-300 group-hover:shadow-primary/40 group-hover:scale-105">
                            <span className="text-white dark:text-[#131511] font-bold text-lg">A</span>
                        </div>
                        <div>
                            <h1 className="text-lg sm:text-xl font-bold text-text-h leading-tight transition-colors duration-300 group-hover:text-primary">
                                {siteConfig.name}
                            </h1>
                            <p className="text-xs sm:text-sm text-text/70">{siteConfig.tagline}</p>
                        </div>
                    </a>

                    <nav className="hidden md:flex items-center gap-6" aria-label="Navegação principal">
                        {siteConfig.nav.map((item) => {
                            const Icon = navIcons[item.icon];
                            return (
                                <a key={item.href} href={item.href} className={navLinkClasses}>
                                    <Icon className="text-xs" /> {item.label}
                                </a>
                            );
                        })}
                        <CurriculumDropdown variant="header" />
                    </nav>

                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <a
                            href={siteConfig.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white dark:text-[#131511] rounded-lg font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300"
                        >
                            <FaGithub className="text-lg" /> GitHub
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
                    className="md:hidden bg-background/95 backdrop-blur-xl border-t border-black/[0.08] dark:border-white/[0.06] px-4 py-6 flex flex-col gap-1 animate-fadeIn"
                    aria-label="Menu móvel"
                >
                    {siteConfig.nav.map((item) => {
                        const Icon = navIcons[item.icon];
                        return (
                            <a key={item.href} href={item.href} className="flex items-center gap-3 text-text-h/80 hover:text-primary hover:bg-primary/5 rounded-lg px-4 py-3 transition-all duration-200" onClick={closeMenu}>
                                <Icon /> {item.label}
                            </a>
                        );
                    })}
                    <CurriculumDropdown variant="header-mobile" onClose={closeMenu} />
                    <a
                        href={siteConfig.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-text-h/80 hover:text-primary hover:bg-primary/5 rounded-lg px-4 py-3 transition-all duration-200"
                    >
                        <FaGithub /> GitHub
                    </a>
                </nav>
            )}
        </header>
    )
}
