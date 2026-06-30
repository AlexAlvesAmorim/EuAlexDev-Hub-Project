export function Header() {
    return (
        <header className="w-full bg-background/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">Alex A. Amorim </span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-text">Dev. de Favela Hub</h1>
                            <p className="text-sm text-text/60">Portfolio & Projetos</p>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-6">
                        <a href="#" className="text-text hover:text-primary transition-colors">
                            Projetos
                        </a>

                        <a href="#" className="text-text hover:text-primary transition-colors">
                            Sobre mim
                        </a>

                        <a href="#" className="text-text hover:text-primary transition-colors">
                            Contato
                        </a>
                    </nav>

                    <a href="https://github.com/AlexAlvesAmorim" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors">
                        GitHub
                    </a>
                </div>
            </div>
        </header>
    )
}