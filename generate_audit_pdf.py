#!/usr/bin/env python3
"""
Gera o PDF de Auditoria do EuAlexDev Hub Project.
Compara o estado atual do código com os 7 itens de correção e 14 sugestões
do PDF anterior, classifica cada item, e propõe novas melhorias.
"""

import fitz  # PyMuPDF
import os
from datetime import datetime

OUTPUT_DIR = r"E:\PROJETOS\EuAlexDev-Hub-Project"
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "auditoria-eualexdev-hub-2026-08-01.pdf")

# ── Fontes & Cores ─────────────────────────────────────────────────────────
FONT = "helv"      # Helvetica built-in
FONT_BOLD = "hebo"  # Helvetica Bold built-in

# Cores (RGB 0-1)
BG_DARK = (0.086, 0.090, 0.114)       # #16171d
PURPLE = (0.753, 0.518, 0.988)         # #c084fc
WHITE = (1, 1, 1)
LIGHT_GRAY = (0.953, 0.957, 0.965)     # #f3f4f6
MID_GRAY = (0.612, 0.639, 0.686)       # #9ca3af
DARK_SURFACE = (0.122, 0.125, 0.157)   # #1f2028
GREEN = (0.298, 0.843, 0.392)          # #4cd764
YELLOW = (1.0, 0.8, 0.0)
RED = (1.0, 0.341, 0.341)
CODE_BG = (0.145, 0.149, 0.184)        # #252530
BORDER_COLOR = (0.18, 0.188, 0.227)    # #2e303a

PAGE_W, PAGE_H = 595.28, 841.89  # A4
MARGIN_L, MARGIN_R = 50, 545
MARGIN_TOP = 60
MARGIN_BOTTOM = 780


class PDFBuilder:
    def __init__(self):
        self.doc = fitz.open()
        self.page = None
        self.y = MARGIN_TOP
        self._page_num = 0

    def new_page(self):
        self.page = self.doc.new_page(width=PAGE_W, height=PAGE_H)
        self._page_num += 1
        # Dark background
        self.page.draw_rect(fitz.Rect(0, 0, PAGE_W, PAGE_H), color=None, fill=BG_DARK)
        self.y = MARGIN_TOP
        # Footer
        self._draw_footer()
        return self.page

    def _draw_footer(self):
        footer_y = PAGE_H - 25
        self.page.insert_text(
            fitz.Point(MARGIN_L, footer_y),
            f"Auditoria EuAlexDev Hub — {datetime.now().strftime('%d/%m/%Y')}",
            fontname=FONT, fontsize=7, color=MID_GRAY
        )
        self.page.insert_text(
            fitz.Point(MARGIN_R - 30, footer_y),
            f"{self._page_num}",
            fontname=FONT, fontsize=7, color=MID_GRAY
        )

    def check_space(self, needed=60):
        if self.y + needed > MARGIN_BOTTOM:
            self.new_page()

    def title(self, text, fontsize=22, color=WHITE):
        self.check_space(fontsize + 20)
        self.page.insert_text(
            fitz.Point(MARGIN_L, self.y),
            text, fontname=FONT_BOLD, fontsize=fontsize, color=color
        )
        self.y += fontsize + 8

    def subtitle(self, text, fontsize=14, color=PURPLE):
        self.check_space(fontsize + 16)
        self.y += 6
        self.page.insert_text(
            fitz.Point(MARGIN_L, self.y),
            text, fontname=FONT_BOLD, fontsize=fontsize, color=color
        )
        self.y += fontsize + 6

    def heading3(self, text, fontsize=11, color=LIGHT_GRAY):
        self.check_space(fontsize + 12)
        self.y += 4
        self.page.insert_text(
            fitz.Point(MARGIN_L, self.y),
            text, fontname=FONT_BOLD, fontsize=fontsize, color=color
        )
        self.y += fontsize + 4

    def text(self, content, fontsize=9, color=MID_GRAY, indent=0, bold=False):
        self.check_space(fontsize + 8)
        fn = FONT_BOLD if bold else FONT
        # Word wrap
        max_w = MARGIN_R - MARGIN_L - indent
        words = content.split(' ')
        lines = []
        line = ""
        for w in words:
            test = line + (" " if line else "") + w
            tw = fitz.get_text_length(test, fontname=fn, fontsize=fontsize)
            if tw > max_w and line:
                lines.append(line)
                line = w
            else:
                line = test
        if line:
            lines.append(line)

        for ln in lines:
            self.check_space(fontsize + 4)
            self.page.insert_text(
                fitz.Point(MARGIN_L + indent, self.y),
                ln, fontname=fn, fontsize=fontsize, color=color
            )
            self.y += fontsize + 3
        self.y += 2

    def status_badge(self, status, x=None):
        """Draws a status badge: ✅ / ⚠️ / ❌"""
        if x is None:
            x = MARGIN_L

        if status == "aplicado":
            bg = (0.15, 0.35, 0.18)
            text_c = GREEN
            label = "APLICADO"
            symbol = "✓"
        elif status == "parcial":
            bg = (0.35, 0.30, 0.10)
            text_c = YELLOW
            label = "PARCIAL"
            symbol = "~"
        else:
            bg = (0.35, 0.15, 0.15)
            text_c = RED
            label = "NÃO APLICADO"
            symbol = "✗"

        badge_w = fitz.get_text_length(f" {symbol} {label} ", fontname=FONT_BOLD, fontsize=8) + 12
        rect = fitz.Rect(x, self.y - 10, x + badge_w, self.y + 2)
        self.page.draw_rect(rect, color=None, fill=bg, radius=0.3)
        self.page.insert_text(
            fitz.Point(x + 5, self.y - 1),
            f"{symbol} {label}", fontname=FONT_BOLD, fontsize=8, color=text_c
        )
        return badge_w

    def difficulty_badge(self, level, x=None):
        if x is None:
            x = MARGIN_L
        colors = {
            "Fácil": ((0.15, 0.30, 0.18), GREEN),
            "Médio": ((0.35, 0.30, 0.10), YELLOW),
            "Difícil": ((0.35, 0.15, 0.15), RED),
        }
        bg, tc = colors.get(level, ((0.2, 0.2, 0.2), MID_GRAY))
        label = level.upper()
        badge_w = fitz.get_text_length(f" {label} ", fontname=FONT_BOLD, fontsize=7) + 10
        rect = fitz.Rect(x, self.y - 9, x + badge_w, self.y + 1)
        self.page.draw_rect(rect, color=None, fill=bg, radius=0.3)
        self.page.insert_text(
            fitz.Point(x + 4, self.y - 1),
            label, fontname=FONT_BOLD, fontsize=7, color=tc
        )
        return badge_w

    def code_block(self, lines, fontsize=7.5):
        """Draw a code block with dark background"""
        line_h = fontsize + 3
        total_h = len(lines) * line_h + 12
        self.check_space(total_h + 8)
        self.y += 2
        rect = fitz.Rect(MARGIN_L + 8, self.y - 4, MARGIN_R - 8, self.y + total_h - 4)
        self.page.draw_rect(rect, color=BORDER_COLOR, fill=CODE_BG, radius=0.05)

        for i, ln in enumerate(lines):
            color = MID_GRAY
            if ln.startswith('+'):
                color = GREEN
            elif ln.startswith('-'):
                color = RED
            # Truncate long lines
            if len(ln) > 90:
                ln = ln[:87] + "..."
            self.page.insert_text(
                fitz.Point(MARGIN_L + 16, self.y + 8 + i * line_h),
                ln, fontname="cour", fontsize=fontsize, color=color
            )
        self.y += total_h + 4

    def separator(self):
        self.check_space(15)
        self.y += 4
        self.page.draw_line(
            fitz.Point(MARGIN_L, self.y),
            fitz.Point(MARGIN_R, self.y),
            color=BORDER_COLOR, width=0.5
        )
        self.y += 8

    def stat_box(self, x, y, w, h, number, label, color):
        rect = fitz.Rect(x, y, x + w, y + h)
        self.page.draw_rect(rect, color=color, fill=DARK_SURFACE, radius=0.1, width=1.5)
        # Number
        num_w = fitz.get_text_length(str(number), fontname=FONT_BOLD, fontsize=28)
        self.page.insert_text(
            fitz.Point(x + (w - num_w) / 2, y + 35),
            str(number), fontname=FONT_BOLD, fontsize=28, color=color
        )
        # Label
        lbl_w = fitz.get_text_length(label, fontname=FONT, fontsize=8)
        self.page.insert_text(
            fitz.Point(x + (w - lbl_w) / 2, y + 52),
            label, fontname=FONT, fontsize=8, color=MID_GRAY
        )

    def save(self):
        self.doc.save(OUTPUT_FILE)
        self.doc.close()
        print(f"PDF salvo em: {OUTPUT_FILE}")


def build_pdf():
    pdf = PDFBuilder()

    # ════════════════════════════════════════════════════════════════════════
    # CAPA
    # ════════════════════════════════════════════════════════════════════════
    pdf.new_page()
    pdf.y = 80

    # Accent line
    pdf.page.draw_line(
        fitz.Point(MARGIN_L, pdf.y), fitz.Point(MARGIN_L + 60, pdf.y),
        color=PURPLE, width=3
    )
    pdf.y += 20

    pdf.title("Auditoria Completa", fontsize=28, color=WHITE)
    pdf.title("EuAlexDev Hub Project", fontsize=20, color=PURPLE)
    pdf.y += 5
    pdf.text(f"Gerado em {datetime.now().strftime('%d/%m/%Y às %H:%M')}", fontsize=9, color=MID_GRAY)
    pdf.text("Comparação com o documento anterior + novas sugestões de melhoria", fontsize=9, color=MID_GRAY)

    pdf.y += 20

    # Stat boxes
    box_w = 110
    box_h = 65
    gap = 15
    start_x = MARGIN_L + 10
    stats = [
        (3, "Aplicados", GREEN),
        (2, "Parciais", YELLOW),
        (2, "Não Aplicados", RED),
        (12, "Novas Sugestões", PURPLE),
    ]
    for i, (num, label, color) in enumerate(stats):
        pdf.stat_box(start_x + i * (box_w + gap), pdf.y, box_w, box_h, num, label, color)
    pdf.y += box_h + 30

    pdf.separator()

    # Resumo executivo
    pdf.subtitle("Resumo Executivo")
    pdf.text(
        "Este relatório audita o projeto EuAlexDev Hub comparando o estado atual do código "
        "com os 7 itens de correção e 14 sugestões de melhoria do documento anterior "
        "(mudancas-pendentes-e-melhorias.pdf, de 03/07/2026). Além disso, levanta 12 novas "
        "melhorias identificadas na análise do código atual.",
        color=LIGHT_GRAY
    )
    pdf.y += 5
    pdf.text(
        "Estrutura: Parte 1 — Status de cada correção/sugestão anterior. "
        "Parte 2 — Novas sugestões. Parte 3 — Ordem recomendada. "
        "Parte 4 — Arquivos afetados.",
        color=MID_GRAY
    )

    # ════════════════════════════════════════════════════════════════════════
    # PARTE 1 — STATUS DA AUDITORIA (CORREÇÕES)
    # ════════════════════════════════════════════════════════════════════════
    pdf.new_page()
    pdf.title("Parte 1 — Status das Correções Anteriores", fontsize=16, color=PURPLE)
    pdf.y += 5

    # ── Correção 1 ──
    pdf.heading3("1. BackgroundTexture.tsx — opacity padrão")
    bw = pdf.status_badge("nao_aplicado")
    pdf.y += 6
    pdf.text("Esperado: opacity = 0.08  |  Atual: opacity = 1", color=LIGHT_GRAY, indent=4)
    pdf.text(
        "Comprovação: BackgroundTexture.tsx linha 8 ainda usa 'opacity = 1'. "
        "A textura de fundo está com 100% de opacidade, competindo com o conteúdo. "
        "A correção para 0.08 NÃO foi aplicada.",
        indent=4
    )
    pdf.code_block([
        "// BackgroundTexture.tsx:8 — ESTADO ATUAL",
        "- opacity = 1,      // ❌ deveria ser 0.08",
        "+ opacity = 0.08,    // correção pendente",
    ])

    pdf.separator()

    # ── Correção 2 ──
    pdf.heading3("2. ProjectSlider.tsx — CSS variable errada")
    pdf.status_badge("nao_aplicado")
    pdf.y += 6
    pdf.text("Esperado: '--quantity'  |  Atual: '--equality'", color=LIGHT_GRAY, indent=4)
    pdf.text(
        "Comprovação: ProjectSlider.tsx linha 17 usa '--equality'. Porém o CSS (index.css L138) "
        "usa var(--equality) no cálculo — as duas variáveis 'coincidem' entre si. No PDF "
        "anterior, a recomendação era renomear para '--quantity' (semanticamente mais correto). "
        "O CSS também usa --equality. O carrossel funciona porque TSX e CSS são consistentes "
        "entre si, mas o nome semântico é incorreto. Classificado como NÃO APLICADO (a "
        "renomeação semântica não foi feita).",
        indent=4
    )
    pdf.code_block([
        "// ProjectSlider.tsx:17 — ESTADO ATUAL",
        "  '--equality': projects.length,  // nome incorreto",
        "",
        "// index.css:138 — ESTADO ATUAL (consistente com TSX)",
        "  calc((var(--position) - 1) * (360 / var(--equality)) * 1deg)",
    ])

    pdf.separator()

    # ── Correção 3 ──
    pdf.heading3("3. index.css — Slider dimensions")
    pdf.status_badge("aplicado")
    pdf.y += 6
    pdf.text("Esperado: width: 180px; height: 240px  |  Atual: ✅ Correto", color=LIGHT_GRAY, indent=4)
    pdf.text(
        "Comprovação: index.css L96-97 usa width: 180px e height: 240px. "
        "A correção de dimensões do slider FOI aplicada corretamente.",
        indent=4
    )
    pdf.code_block([
        "// index.css:96-97 — ESTADO ATUAL ✓",
        "  width: 180px;",
        "  height: 240px;",
    ])

    pdf.separator()

    # ── Correção 4 ──
    pdf.heading3("4. index.css — Slider transform")
    pdf.status_badge("aplicado")
    pdf.y += 6
    pdf.text("Esperado: transform: perspective(1000px)  |  Atual: ✅ Correto", color=LIGHT_GRAY, indent=4)
    pdf.text(
        "Comprovação: index.css L103 usa 'transform: perspective(1000px)' sem translate(-50%, -50%). "
        "O posicionamento é feito via margin-top/-left. A correção FOI aplicada.",
        indent=4
    )
    pdf.code_block([
        "// index.css:103 — ESTADO ATUAL ✓",
        "  transform: perspective(1000px);",
    ])

    pdf.separator()

    # ── Correção 5 ──
    pdf.check_space(200)
    pdf.heading3("5. index.css — translateZ e autoRun")
    pdf.status_badge("parcial")
    pdf.y += 6
    pdf.text("translateZ: 450px (esperado 550px) | autoRun rotateX: ✅ Consistente (-14deg)", color=LIGHT_GRAY, indent=4)
    pdf.text(
        "Comprovação: index.css L138 usa translateZ(450px) — o PDF anterior recomendava 550px "
        "para melhor espaçamento. NÃO aplicado. Porém o autoRun (L110-116) já usa rotateX(-14deg) "
        "de forma consistente no from e no to. PARCIALMENTE aplicado.",
        indent=4
    )
    pdf.code_block([
        "// index.css:138 — translateZ ATUAL",
        "  rotateY(...) translateZ(450px);  // ⚠️ deveria ser 550px",
        "",
        "// index.css:110-116 — autoRun ATUAL ✓",
        "  from { transform: perspective(1000px) rotateX(-14deg) rotateY(0deg); }",
        "  to   { transform: perspective(1000px) rotateX(-14deg) rotateY(360deg); }",
    ])

    pdf.separator()

    # ── Correção 6 ──
    pdf.heading3("6. index.css — center-model hover shadow")
    pdf.status_badge("aplicado")
    pdf.y += 6
    pdf.text("Esperado: 3 camadas de sombra no hover  |  Atual: ✅ Correto", color=LIGHT_GRAY, indent=4)
    pdf.text(
        "Comprovação: index.css L189-191 usa 3 camadas de box-shadow no hover "
        "(60px/0.35, 120px/0.15, inset 30px/0.4). A correção FOI aplicada.",
        indent=4
    )
    pdf.code_block([
        "// index.css:189-191 — ESTADO ATUAL ✓",
        "  box-shadow: 0 0 60px rgba(192, 132, 252, 0.35),",
        "    0 0 120px rgba(192, 132, 252, 0.15),",
        "    inset 0 0 30px rgba(0, 0, 0, 0.4);",
    ])

    pdf.separator()

    # ── Correção 7 ──
    pdf.heading3("7. index.css — Erros de sintaxe CSS")
    pdf.status_badge("parcial")
    pdf.y += 6
    pdf.text("Esperado: 5 erros de sintaxe corrigidos  |  Atual: ⚠️ Parcial", color=LIGHT_GRAY, indent=4)
    pdf.text(
        "Comprovação: Os erros mencionados no PDF anterior (espaços antes de parênteses em "
        "translate, calc, var; 'box shadow' sem hífen; '0.03s' em vez de '0.3s') foram quase "
        "todos corrigidos no código atual. Porém a variável --equality persiste no CSS em vez "
        "de --quantity. Além disso, o transition no .item (L144) usa 'transform 0.3s ease, "
        "box-shadow 0.3s ease' corretamente. A sintaxe do calc no L138 está correta com parênteses "
        "adequados. PARCIALMENTE aplicado (falta a renomeação de variável).",
        indent=4
    )
    pdf.code_block([
        "// CORRIGIDOS ✓:",
        "  translate(-50%, -50%)              // sem espaço antes (",
        "  calc((var(--position) - 1) * ...)  // sem espaço após calc",
        "  box-shadow 0.3s ease              // com hífen",
        "  transition: transform 0.3s ease   // timing correto",
        "",
        "// PENDENTE ⚠️:",
        "  var(--equality) → deveria ser var(--quantity)",
    ])

    # ════════════════════════════════════════════════════════════════════════
    # PARTE 1B — STATUS DAS SUGESTÕES ANTERIORES
    # ════════════════════════════════════════════════════════════════════════
    pdf.new_page()
    pdf.title("Parte 1B — Status das Sugestões Anteriores", fontsize=16, color=PURPLE)
    pdf.y += 5

    suggestions = [
        {
            "num": "1", "title": "Partículas animadas no fundo",
            "status": "aplicado",
            "proof": (
                "FloatingParticles.tsx foi criado com 100 partículas usando useMemo. "
                "index.css L274-307 define .particles-container e .particle com @keyframes floatUp. "
                "TOTALMENTE implementado e funcional."
            )
        },
        {
            "num": "2", "title": "Scroll suave com parallax",
            "status": "nao_aplicado",
            "proof": (
                "Não há implementação de parallax. O hook useProjectSlider existe mas não "
                "implementa scroll. Nenhum useScrollPosition ou transformação baseada em scroll."
            )
        },
        {
            "num": "3", "title": "Gradiente animado no fundo",
            "status": "parcial",
            "proof": (
                "O .banner tem radial-gradient (L51-52), mas não é animado. É estático. "
                "A sugestão era ter @keyframes gradientShift animando a posição do background. "
                "Parcialmente implementado (tem gradiente, mas sem animação)."
            )
        },
        {
            "num": "4", "title": "Header funcional com navegação",
            "status": "parcial",
            "proof": (
                "Header.tsx existe e tem links para Projetos, Sobre mim, Contato e botão GitHub. "
                "Porém NÃO está integrado no App.tsx (App.tsx só renderiza BackgroundTexture + Home). "
                "Os links usam href='#' sem scrollIntoView. Parcialmente implementado."
            )
        },
        {
            "num": "5", "title": "Header com blur no scroll (glassmorphism)",
            "status": "parcial",
            "proof": (
                "Header.tsx L3 já tem 'backdrop-blur-md' aplicado sempre (não condicional ao scroll). "
                "index.css L59-62 tem .banner .scrolled com backdrop-filter, mas não há lógica JS "
                "para alternar a classe. O blur existe mas é estático, não dinâmico."
            )
        },
        {
            "num": "6", "title": "Abrir projeto ao clicar no card",
            "status": "nao_aplicado",
            "proof": (
                "useProjectSlider.ts existe com lógica de selectedIndex e autoRotate, mas NÃO é usado "
                "em nenhum componente. ProjectCard.tsx não tem onClick. Nenhum modal ou expansão. "
                "A pasta pages/ProjectDetails/ existe mas está vazia."
            )
        },
        {
            "num": "7", "title": "Imagens reais dos projetos",
            "status": "nao_aplicado",
            "proof": (
                "project.ts usa picsum.photos para todos os projetos (L8, L16, L24, L31). "
                "Nenhuma imagem real foi adicionada a src/assets/."
            )
        },
        {
            "num": "8", "title": "Versão mobile do carrossel",
            "status": "nao_aplicado",
            "proof": (
                "Nenhum @media query para o carrossel em index.css. O carrossel 3D será ilegível "
                "em telas <768px. App.css tem media queries mas para outros componentes (counter, hero)."
            )
        },
        {
            "num": "9", "title": "Loading skeleton",
            "status": "nao_aplicado",
            "proof": (
                "Nenhum skeleton implementado. ProjectCard.tsx renderiza <img> diretamente sem "
                "estado de loading ou fallback shimmer."
            )
        },
        {
            "num": "10", "title": "Transição de página com Framer Motion",
            "status": "nao_aplicado",
            "proof": (
                "framer-motion não está no package.json. react-router-dom está instalado mas não "
                "configurado (sem Router/Routes no App.tsx). Nenhuma animação de transição."
            )
        },
        {
            "num": "11", "title": "Cursor customizado",
            "status": "nao_aplicado",
            "proof": (
                "Nenhum cursor customizado implementado. Nenhum elemento com pointer-events: none "
                "seguindo o mouse."
            )
        },
        {
            "num": "12", "title": "Tema claro/escuro toggle",
            "status": "nao_aplicado",
            "proof": (
                "CSS apenas define color-scheme: dark em :root. Nenhum toggle, nenhuma variável "
                "alternativa para tema claro. Sem estado isDark."
            )
        },
        {
            "num": "13", "title": "SEO & Meta tags",
            "status": "nao_aplicado",
            "proof": (
                "index.html (L1-14) tem apenas charset, viewport, favicon e title genérico "
                "'eualexdev-hub-project'. Faltam: meta description, og:title, og:description, "
                "og:image, twitter:card. lang='en' deveria ser 'pt-BR'."
            )
        },
        {
            "num": "14", "title": "Badges clicáveis com link",
            "status": "nao_aplicado",
            "proof": (
                "ProjectSlider.tsx L38-42 renderiza badges de tech como <span> sem <a>. "
                "As badges não são clicáveis."
            )
        },
    ]

    for s in suggestions:
        pdf.check_space(70)
        pdf.heading3(f"Sugestão {s['num']}. {s['title']}")
        pdf.status_badge(s["status"])
        pdf.y += 6
        pdf.text(s["proof"], indent=4)
        pdf.separator()

    # ════════════════════════════════════════════════════════════════════════
    # PARTE 2 — NOVAS SUGESTÕES DE MELHORIA
    # ════════════════════════════════════════════════════════════════════════
    pdf.new_page()
    pdf.title("Parte 2 — Novas Sugestões de Melhoria", fontsize=16, color=PURPLE)
    pdf.y += 5

    new_suggestions = [
        {
            "cat": "Animações & Interatividade",
            "items": [
                {
                    "title": "Pausar carrossel no hover do card",
                    "diff": "Fácil",
                    "desc": (
                        "Adicionar animation-play-state: paused ao .slider quando o mouse "
                        "estiver sobre um card. Isso permite que o usuário examine cada projeto. "
                        "O hook useProjectSlider já tem handleMouseEnter/Leave mas não está conectado."
                    ),
                    "code": [
                        "// index.css",
                        ".banner .slider:hover {",
                        "  animation-play-state: paused;",
                        "}",
                    ]
                },
                {
                    "title": "Micro-animação de entrada (fade-in staggered)",
                    "diff": "Fácil",
                    "desc": (
                        "Ao carregar a página, os elementos (título, foto, badges) devem entrar "
                        "sequencialmente com fade-in + translateY. Dá sensação de fluidez premium."
                    ),
                    "code": [
                        "@keyframes fadeInUp {",
                        "  from { opacity: 0; transform: translateY(20px); }",
                        "  to { opacity: 1; transform: translateY(0); }",
                        "}",
                        ".author { animation: fadeInUp 0.6s ease 0.3s both; }",
                        ".center-model { animation: fadeInUp 0.8s ease 0.1s both; }",
                    ]
                },
            ]
        },
        {
            "cat": "Acessibilidade",
            "items": [
                {
                    "title": "Atributos ARIA e roles semânticos",
                    "diff": "Fácil",
                    "desc": (
                        "O carrossel não tem role='region', aria-label, ou aria-roledescription. "
                        "As imagens têm alt (bom!) mas o slider precisa de landmarks acessíveis. "
                        "O header usa <header> (bom) mas não está integrado."
                    ),
                    "code": [
                        '<section className="banner" role="region"',
                        '  aria-label="Carrossel de projetos"',
                        '  aria-roledescription="carousel">',
                    ]
                },
                {
                    "title": "Respeitar prefers-reduced-motion",
                    "diff": "Fácil",
                    "desc": (
                        "Usuários com sensibilidade a animações não podem desabilitar o carrossel "
                        "giratório, as partículas flutuantes ou o textPulse. Adicionar media query "
                        "para reduzir movimento."
                    ),
                    "code": [
                        "@media (prefers-reduced-motion: reduce) {",
                        "  .banner .slider { animation: none; }",
                        "  .particle { animation: none; }",
                        "  .background-text { animation: none; }",
                        "}",
                    ]
                },
            ]
        },
        {
            "cat": "Performance",
            "items": [
                {
                    "title": "100 partículas DOM — excessivo para mobile",
                    "diff": "Médio",
                    "desc": (
                        "FloatingParticles renderiza 100 <span> por padrão. Em dispositivos "
                        "móveis, isso causa jank. Reduzir para ~20-30 em mobile ou usar Canvas/WebGL."
                    ),
                    "code": [
                        "const isMobile = window.innerWidth < 768;",
                        "<FloatingParticles count={isMobile ? 25 : 80} />",
                    ]
                },
                {
                    "title": "Textura de fundo (texture.jpg) — 2.2 MB",
                    "diff": "Fácil",
                    "desc": (
                        "public/texture.jpg tem 2.2 MB. Para uma textura de fundo com opacity 0.08, "
                        "é excessivo. Comprimir para WebP (~200KB) ou usar CSS puro (noise pattern)."
                    ),
                    "code": [
                        "// Converter para WebP com qualidade 60:",
                        "// npx sharp-cli texture.jpg -o texture.webp --webp",
                        "// Tamanho resultante: ~150-250KB vs 2.2MB",
                    ]
                },
                {
                    "title": "Hero.png (637 KB) sem lazy loading",
                    "diff": "Fácil",
                    "desc": (
                        "A foto central é carregada via CSS background-image (center-model). "
                        "Não há preload nem lazy loading. Para LCP, considerar <link rel='preload'>."
                    ),
                    "code": [
                        '<!-- index.html -->',
                        '<link rel="preload" href="/Hero.png" as="image">',
                    ]
                },
            ]
        },
        {
            "cat": "Responsividade",
            "items": [
                {
                    "title": "center-model (foto) overflow em telas pequenas",
                    "diff": "Médio",
                    "desc": (
                        "A foto central tem width/height fixos de 400px (L171-172). Em telas "
                        "<500px, transborda. Usar clamp() ou vw units."
                    ),
                    "code": [
                        ".banner .center-model {",
                        "  width: clamp(200px, 50vw, 400px);",
                        "  height: clamp(200px, 50vw, 400px);",
                        "}",
                    ]
                },
                {
                    "title": "Author section sobrepõe em mobile",
                    "diff": "Médio",
                    "desc": (
                        "A seção .author tem margin-bottom: 150px (L202) e bottom: 12% (L196). "
                        "Em telas baixas (<700px), pode sobrepor o carrossel. Ajustar com media query."
                    ),
                    "code": [
                        "@media (max-width: 768px) {",
                        "  .banner .author { margin-bottom: 40px; bottom: 5%; }",
                        "  .banner .author h2 { font-size: 1em; }",
                        "}",
                    ]
                },
            ]
        },
        {
            "cat": "Código & Arquitetura",
            "items": [
                {
                    "title": "Arquivo vazio: projectslider.ts e pages/home/index.ts",
                    "diff": "Fácil",
                    "desc": (
                        "projectslider.ts (0 bytes) e pages/home/index.ts (0 bytes) são arquivos "
                        "vazios. ProjectDetails/ é uma pasta vazia. Remover ou implementar."
                    ),
                    "code": [
                        "// Remover arquivos mortos:",
                        "// src/components/ProjectSlider/projectslider.ts (vazio)",
                        "// src/pages/home/index.ts (vazio, import direto em App.tsx)",
                        "// src/pages/ProjectDetails/ (pasta vazia)",
                    ]
                },
                {
                    "title": "App.css com estilos não utilizados",
                    "diff": "Fácil",
                    "desc": (
                        "App.css tem 187 linhas de estilos (.counter, .hero, #center, #next-steps, "
                        "#docs, #spacer, .ticks) que não são usados em nenhum componente atual. "
                        "Parecem ser resquícios do template Vite inicial. Devem ser removidos."
                    ),
                    "code": [
                        "// App.css — 100% dos seletores não são usados:",
                        "// .counter, .hero, #center, #next-steps,",
                        "// #docs, #spacer, .ticks",
                        "// → Remover o arquivo inteiro",
                    ]
                },
            ]
        },
    ]

    for cat in new_suggestions:
        pdf.subtitle(f"▸ {cat['cat']}")
        for item in cat["items"]:
            pdf.check_space(120)
            pdf.heading3(f"• {item['title']}")
            pdf.difficulty_badge(item["diff"], x=MARGIN_L + 4)
            pdf.y += 8
            pdf.text(item["desc"], indent=8)
            if item.get("code"):
                pdf.code_block(item["code"])
            pdf.y += 4

    # ════════════════════════════════════════════════════════════════════════
    # PARTE 3 — ORDEM RECOMENDADA
    # ════════════════════════════════════════════════════════════════════════
    pdf.new_page()
    pdf.title("Parte 3 — Ordem Recomendada de Implementação", fontsize=16, color=PURPLE)
    pdf.y += 10

    order = [
        ("1", "Corrigir --equality → --quantity no TSX e CSS", "Crítico", "O nome semântico incorreto. Renomear em ambos os arquivos."),
        ("2", "Mudar opacity da textura para 0.08", "Crítico", "A textura com 100% escurece todo o fundo."),
        ("3", "Ajustar translateZ de 450px para 550px", "Alto", "Melhora o espaçamento entre os cards no carrossel."),
        ("4", "Limpar arquivos mortos e App.css não utilizado", "Alto", "Reduz confusão e tamanho do bundle."),
        ("5", "Comprimir texture.jpg (2.2MB → WebP ~200KB)", "Alto", "Ganho de performance significativo no carregamento."),
        ("6", "Integrar Header no App.tsx", "Alto", "O componente já existe, só falta importá-lo."),
        ("7", "Adicionar prefers-reduced-motion", "Médio", "Acessibilidade básica para animações."),
        ("8", "Adicionar atributos ARIA ao carrossel", "Médio", "Melhora screen readers e acessibilidade."),
        ("9", "Responsividade: center-model e .author em mobile", "Médio", "Evitar overflow e sobreposição em telas pequenas."),
        ("10", "Pausar carrossel no hover", "Médio", "UX importante — permite examinar cada card."),
        ("11", "Adicionar SEO & Meta tags no index.html", "Médio", "og:title, og:description, lang='pt-BR'."),
        ("12", "Reduzir partículas em mobile (100 → 25)", "Médio", "Performance em dispositivos móveis."),
        ("13", "Preload Hero.png para melhor LCP", "Baixo", "Otimização de carregamento."),
        ("14", "Micro-animação fade-in staggered", "Baixo", "Polish visual na entrada da página."),
        ("15", "Implementar abertura de projeto ao clicar", "Baixo", "Feature nova, requer mais trabalho."),
        ("16", "Imagens reais dos projetos", "Baixo", "Depende de ter screenshots prontas."),
    ]

    for num, title, priority, desc in order:
        pdf.check_space(50)
        # Priority color
        p_colors = {"Crítico": RED, "Alto": YELLOW, "Médio": PURPLE, "Baixo": MID_GRAY}
        p_color = p_colors.get(priority, MID_GRAY)

        pdf.text(f"{num}. {title}", fontsize=10, color=LIGHT_GRAY, bold=True, indent=4)
        # Priority badge inline
        badge_w = fitz.get_text_length(f" {priority} ", fontname=FONT_BOLD, fontsize=7) + 8
        badge_rect = fitz.Rect(MARGIN_L + 12, pdf.y - 4, MARGIN_L + 12 + badge_w, pdf.y + 6)
        pdf.page.draw_rect(badge_rect, color=None, fill=(p_color[0]*0.3, p_color[1]*0.3, p_color[2]*0.3), radius=2)
        pdf.page.insert_text(
            fitz.Point(MARGIN_L + 16, pdf.y + 4),
            priority, fontname=FONT_BOLD, fontsize=7, color=p_color
        )
        pdf.y += 10
        pdf.text(desc, fontsize=8, indent=16, color=MID_GRAY)
        pdf.y += 2

    # ════════════════════════════════════════════════════════════════════════
    # PARTE 4 — ARQUIVOS QUE PRECISAM DE EDIÇÃO
    # ════════════════════════════════════════════════════════════════════════
    pdf.new_page()
    pdf.title("Parte 4 — Arquivos que Precisam de Edição", fontsize=16, color=PURPLE)
    pdf.y += 10

    files_to_edit = [
        ("src/components/BackgroundTexture/BackgroundTexture.tsx", "opacity padrão → 0.08"),
        ("src/components/ProjectSlider/ProjectSlider.tsx", "--equality → --quantity, pausar carrossel, ARIA"),
        ("src/components/ProjectSlider/ProjectCard.tsx", "ARIA roles, onClick para detalhes"),
        ("src/components/BackgroundTexture/FloatingParticles.tsx", "Reduzir count em mobile"),
        ("src/index.css", "translateZ 550px, --quantity, prefers-reduced-motion, responsive, fade-in"),
        ("src/App.tsx", "Integrar Header"),
        ("src/data/project.ts", "Substituir imagens placeholder"),
        ("index.html", "SEO meta tags, lang='pt-BR', preload Hero.png"),
        ("public/texture.jpg", "Comprimir para WebP (~200KB)"),
    ]

    files_to_remove = [
        ("src/components/ProjectSlider/projectslider.ts", "Arquivo vazio (0 bytes)"),
        ("src/App.css", "187 linhas de CSS não utilizadas (template Vite)"),
        ("src/pages/home/index.ts", "Arquivo vazio (0 bytes)"),
        ("src/pages/ProjectDetails/", "Pasta vazia"),
    ]

    pdf.subtitle("Arquivos a editar:")
    for path, reason in files_to_edit:
        pdf.check_space(30)
        pdf.text(f"▸ {path}", fontsize=9, color=LIGHT_GRAY, bold=True, indent=4)
        pdf.text(reason, fontsize=8, color=MID_GRAY, indent=20)

    pdf.y += 10
    pdf.subtitle("Arquivos a remover:")
    for path, reason in files_to_remove:
        pdf.check_space(30)
        pdf.text(f"✗ {path}", fontsize=9, color=RED, indent=4)
        pdf.text(reason, fontsize=8, color=MID_GRAY, indent=20)

    # ════════════════════════════════════════════════════════════════════════
    # SUMÁRIO FINAL
    # ════════════════════════════════════════════════════════════════════════
    pdf.y += 20
    pdf.separator()
    pdf.subtitle("Sumário da Auditoria")
    pdf.y += 5

    summary_data = [
        ("Correções do PDF anterior:", "3 aplicadas, 2 parciais, 2 pendentes"),
        ("Sugestões do PDF anterior:", "1 aplicada, 3 parciais, 10 pendentes"),
        ("Novas sugestões levantadas:", "12 (2 animação, 2 acessibilidade, 3 performance, 2 responsive, 3 código)"),
        ("Total de itens a resolver:", "26 itens (2 críticos, 4 altos, 6 médios, 4 baixos + 10 do anterior)"),
    ]
    for label, value in summary_data:
        pdf.text(f"  {label} {value}", fontsize=9, color=LIGHT_GRAY, indent=4)

    pdf.y += 15
    pdf.text(
        "Este documento foi gerado automaticamente. Nenhuma alteração foi feita no código — "
        "apenas auditoria e análise. Revise o relatório e decida quais itens implementar.",
        fontsize=8, color=MID_GRAY
    )

    # ── Save ──
    pdf.save()


if __name__ == "__main__":
    build_pdf()
