import { useEffect, useRef, useState } from "react";
import { FaFilePdf, FaChevronDown, FaRegFileLines } from "react-icons/fa6";

type Option = {
    label: string;
    subtitle: string;
    href: string;
    pages: string;
};

const OPTIONS: Option[] = [
    { label: "Minimal", subtitle: "Enxuto • 1 página", href: "/curriculo-minimal.pdf", pages: "1 pág." },
    { label: "Completo", subtitle: "Detalhado • 2 páginas", href: "/curriculo-completo.pdf", pages: "2 págs." },
];

export function CurriculumDropdown({ variant = "header", onClose }: { variant?: "header" | "header-mobile" | "contact"; onClose?: () => void }) {
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const onClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("mousedown", onClickOutside);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [open]);

    if (variant === "header-mobile") {
        return (
            <div className="flex flex-col">
                <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    className="flex items-center gap-3 text-text-h/80 hover:text-primary hover:bg-primary/5 rounded-lg px-4 py-3 transition-all duration-200 w-full text-left"
                    aria-expanded={expanded}
                >
                    <FaFilePdf /> Currículo
                    <FaChevronDown className={`ml-auto text-xs transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
                </button>
                {expanded && (
                    <div className="ml-4 pl-4 border-l border-white/10 flex flex-col gap-1 mt-1">
                        {OPTIONS.map((opt) => (
                            <a
                                key={opt.label}
                                href={opt.href}
                                download
                                onClick={() => { setExpanded(false); onClose?.(); }}
                                className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm hover:bg-primary/10 hover:text-primary transition-colors group"
                            >
                                <FaRegFileLines className="text-primary/70 group-hover:text-primary" />
                                <span className="flex flex-col leading-tight">
                                    <span className="font-semibold text-text-h text-sm">{opt.label}</span>
                                    <span className="text-xs text-text/60">{opt.subtitle}</span>
                                </span>
                                <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">{opt.pages}</span>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    if (variant === "contact") {
        return (
            <div className="contact-curriculum-group w-full max-w-[420px] mx-auto">
                <p className="text-xs font-semibold tracking-widest uppercase text-text/50 mb-3 text-center">Currículo para download</p>
                <div className="grid grid-cols-2 gap-3">
                    {OPTIONS.map((opt) => (
                        <a
                            key={opt.label}
                            href={opt.href}
                            download
                            className="group relative flex flex-col items-center gap-1.5 px-4 py-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-primary/40 hover:bg-primary/[0.06] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10 text-center"
                        >
                            <span className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <FaFilePdf className="text-lg" />
                            </span>
                            <span className="font-bold text-text-h text-sm leading-none mt-1">{opt.label}</span>
                            <span className="text-xs text-text/60 leading-tight">{opt.subtitle}</span>
                            <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 mt-1">{opt.pages} • PDF</span>
                        </a>
                    ))}
                </div>
            </div>
        );
    }

    // header desktop
    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={open}
                className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg border border-white/10 text-text-h/80 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
            >
                <FaFilePdf className="text-xs" /> Currículo
                <FaChevronDown className={`text-[10px] ml-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <div
                    role="menu"
                    className="absolute right-0 top-[calc(100%+10px)] w-64 rounded-xl bg-[#1f2028] border border-white/10 shadow-xl shadow-black/30 overflow-hidden animate-fadeIn z-50"
                >
                    <div className="px-3 pt-3 pb-1">
                        <p className="text-[11px] font-bold tracking-widest uppercase text-text/40">Selecione o formato</p>
                    </div>
                    {OPTIONS.map((opt) => (
                        <a
                            key={opt.label}
                            href={opt.href}
                            download
                            role="menuitem"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 px-3 py-3 mx-2 mb-2 rounded-lg hover:bg-primary/10 transition-colors group"
                        >
                            <span className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                                <FaRegFileLines className="text-sm" />
                            </span>
                            <span className="flex flex-col leading-tight text-left">
                                <span className="text-sm font-semibold text-text-h group-hover:text-primary transition-colors">{opt.label}</span>
                                <span className="text-xs text-text/60">{opt.subtitle}</span>
                            </span>
                            <span className="ml-auto text-[11px] font-bold px-2 py-1 rounded-full bg-white/5 border border-white/10 text-text/60 group-hover:bg-primary/15 group-hover:text-primary group-hover:border-primary/20 transition-colors">
                                {opt.pages}
                            </span>
                        </a>
                    ))}
                    <div className="px-3 py-2 bg-white/[0.02] border-t border-white/5 text-center">
                        <span className="text-[11px] text-text/40">PDF • download direto</span>
                    </div>
                </div>
            )}
        </div>
    );
}
