#!/usr/bin/env python3
"""
Gera o PDF "Melhorias & Auditoria" do EuAlexDev Hub Project.
Audita o estado atual do código contra o documento de referência
(mudancas-pendentes-e-melhorias.pdf, de 03/07/2026) e propõe novas
melhorias com título, descrição e "como melhorar".
"""

import fitz  # PyMuPDF
import os
from datetime import datetime

OUTPUT_FILE = os.path.join(r"E:\PROJETOS", "melhorias-eualexdev-hub-2026-08-02.pdf")

# ── Fontes & Cores ─────────────────────────────────────────────────────────
FONT = "helv"        # Helvetica
FONT_BOLD = "hebo"   # Helvetica Bold
FONT_CODE = "cour"   # Courier

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
CYAN = (0.4, 0.835, 0.992)             # destaque "Como melhorar"

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
        self.page.draw_rect(fitz.Rect(0, 0, PAGE_W, PAGE_H), color=None, fill=BG_DARK)
        self.y = MARGIN_TOP
        self._draw_footer()
        return self.page

    def _draw_footer(self):
        footer_y = PAGE_H - 25
        self.page.insert_text(
            fitz.Point(MARGIN_L, footer_y),
            f"Melhorias & Auditoria — EuAlexDev Hub — {datetime.now().strftime('%d/%m/%Y')}",
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

    def label(self, text, color=CYAN):
        """Pequeno rótulo em destaque (ex.: 'Descrição', 'Como melhorar')."""
        self.check_space(16)
        self.y += 3
        self.page.insert_text(
            fitz.Point(MARGIN_L + 4, self.y),
            text, fontname=FONT_BOLD, fontsize=8, color=color
        )
        self.y += 12

    def text(self, content, fontsize=9, color=MID_GRAY, indent=0, bold=False):
        self.check_space(fontsize + 8)
        fn = FONT_BOLD if bold else FONT
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
        if x is None:
            x = MARGIN_L
        if status == "aplicado":
            bg = (0.15, 0.35, 0.18)
            text_c = GREEN
            label = "APLICADO"
            symbol = "\u2713"
        elif status == "parcial":
            bg = (0.35, 0.30, 0.10)
            text_c = YELLOW
            label = "PARCIAL"
            symbol = "~"
        else:
            bg = (0.35, 0.15, 0.15)
            text_c = RED
            label = "NAO APLICADO"
            symbol = "\u2717"
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
            elif ln.startswith('#'):
                color = PURPLE
            if len(ln) > 90:
                ln = ln[:87] + "..."
            self.page.insert_text(
                fitz.Point(MARGIN_L + 16, self.y + 8 + i * line_h),
                ln, fontname=FONT_CODE, fontsize=fontsize, color=color
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
        num_w = fitz.get_text_length(str(number), fontname=FONT_BOLD, fontsize=28)
        self.page.insert_text(
            fitz.Point(x + (w - num_w) / 2, y + 35),
            str(number), fontname=FONT_BOLD, fontsize=28, color=color
        )
        lbl_w = fitz.get_text_length(label, fontname=FONT, fontsize=8)
        self.page.insert_text(
            fitz.Point(x + (w - lbl_w) / 2, y + 52),
            label, fontname=FONT, fontsize=8, color=MID_GRAY
        )

    def save(self):
        self.doc.save(OUTPUT_FILE)
        self.doc.close()
        print(f"PDF salvo em: {OUTPUT_FILE}")


def render_improvement(pdf, num, item):
    """Renderiza uma melhoria: título + dificuldade + descrição + como melhorar."""
    pdf.check_space(130)
    pdf.heading3(f"{num}. {item['title']}")
    pdf.difficulty_badge(item["diff"], x=MARGIN_L + 4)
    pdf.y += 8
    pdf.label("Descrição")
    pdf.text(item["desc"], indent=8)
    pdf.y += 2
    pdf.label("Como melhorar")
    pdf.text(item["how"], indent=8)
    if item.get("code"):
        pdf.code_block(item["code"])
    pdf.y += 5
    pdf.separator()


def build_pdf():
    pdf = PDFBuilder()

    # ════════════════════════════════════════════════════════════════════════
    # CAPA
    # ════════════════════════════════════════════════════════════════════════
    pdf.new_page()
    pdf.y = 80

    pdf.page.draw_line(
        fitz.Point(MARGIN_L, pdf.y), fitz.Point(MARGIN_L + 60, pdf.y),
        color=PURPLE, width=3
    )
    pdf.y += 20

    pdf.title("Melhorias & Auditoria", fontsize=28, color=WHITE)
    pdf.title("EuAlexDev Hub Project", fontsize=20, color=PURPLE)
    pdf.y += 5
    pdf.text(f"Gerado em {datetime.now().strftime('%d/%m/%Y às %H:%M')}", fontsize=9, color=MID_GRAY)
    pdf.text("Auditoria completa + plano de melhorias com 'como melhorar'", fontsize=9, color=MID_GRAY)

    pdf.y += 20

    box_w = 110
    box_h = 65
    gap = 15
    start_x = MARGIN_L + 10
    stats = [
        (4, "Aplicados", GREEN),
        (4, "Parciais", YELLOW),
        (13, "Nao Aplicados", RED),
        (22, "Novas Melhorias", PURPLE),
    ]
    for i, (num, label, color) in enumerate(stats):
        pdf.stat_box(start_x + i * (box_w + gap), pdf.y, box_w, box_h, num, label, color)
    pdf.y += box_h + 30

    pdf.separator()

    pdf.subtitle("Resumo Executivo")
    pdf.text(
        "Este relatório audita o projeto EuAlexDev Hub comparando o estado atual do código "
        "com o documento de referência 'mudancas-pendentes-e-melhorias.pdf' (03/07/2026), que "
        "traz 7 correções pendentes e 14 sugestões de visual profissional. Além do status de "
        "cada item, o documento levanta 22 novas melhorias encontradas na análise do código, "
        "cada uma com título, descrição e passo a passo de 'como melhorar'.",
        color=LIGHT_GRAY
    )
    pdf.y += 5
    pdf.text(
        "Estrutura: Parte 1 — Status das correções anteriores. Parte 2 — Status das sugestões "
        "anteriores. Parte 3 — Novas melhorias. Parte 4 — Ordem recomendada. Parte 5 — Arquivos.",
        color=MID_GRAY
    )

    # ════════════════════════════════════════════════════════════════════════
    # PARTE 1 — STATUS DAS CORREÇÕES ANTERIORES
    # ════════════════════════════════════════════════════════════════════════
    pdf.new_page()
    pdf.title("Parte 1 — Status das Correções Anteriores", fontsize=16, color=PURPLE)
    pdf.y += 5

    fixes = [
        {
            "title": "BackgroundTexture.tsx — opacity padrão",
            "status": "nao_aplicado",
            "proof": (
                "Esperado: opacity = 0.08  |  Atual: opacity = 1 (linha 8). "
                "A textura de fundo (texture.jpg) ainda é aplicada com 100% de opacidade, "
                "escurecendo todo o fundo e competindo com o conteúdo. A correção NÃO foi aplicada."
            ),
            "code": [
                "// src/components/BackgroundTexture/BackgroundTexture.tsx:8",
                "- opacity = 1,        // estado atual",
                "+ opacity = 0.08,     // correção pendente",
            ]
        },
        {
            "title": "ProjectSlider.tsx — CSS variable '--equality'",
            "status": "nao_aplicado",
            "proof": (
                "Esperado: '--quantity'  |  Atual: '--equality' (linha 17). O TSX e o CSS "
                "(index.css L138) usam a mesma variável, então o carrossel funciona, mas o nome "
                "semântico incorreto persiste nos dois arquivos. A renomeação NÃO foi feita."
            ),
            "code": [
                "// ProjectSlider.tsx:17 e index.css:138",
                "- '--equality': projects.length,",
                "+ '--quantity': projects.length,",
                "- ... calc((var(--position) - 1) * (360 / var(--equality)) * 1deg)",
                "+ ... calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)",
            ]
        },
        {
            "title": "index.css — Slider dimensions",
            "status": "aplicado",
            "proof": (
                "Esperado: width 180px / height 240px  |  Atual: correto. "
                "index.css L96-97 usa width: 180px e height: 240px. Correção FOI aplicada."
            ),
            "code": [
                "// index.css:96-97 — OK",
                "  width: 180px;",
                "  height: 240px;",
            ]
        },
        {
            "title": "index.css — Slider transform",
            "status": "aplicado",
            "proof": (
                "Esperado: transform: perspective(1000px)  |  Atual: correto. "
                "index.css L103 usa perspective(1000px), posicionamento via margin-top/-left. FOI aplicada."
            ),
            "code": [
                "// index.css:103 — OK",
                "  transform: perspective(1000px);",
            ]
        },
        {
            "title": "index.css — translateZ e autoRun",
            "status": "parcial",
            "proof": (
                "translateZ: 450px (esperado 550px) — NÃO aplicado. "
                "autoRun (L109-117): rotateX(-14deg) consistente no from/to — aplicado. "
                "Resultado: PARCIAL."
            ),
            "code": [
                "// index.css:138 — pendente",
                "- rotateY(...) translateZ(450px);   // deveria ser 550px",
                "+ rotateY(...) translateZ(550px);",
                "",
                "// index.css:109-117 — OK",
                "  from { transform: perspective(1000px) rotateX(-14deg) rotateY(0deg); }",
            ]
        },
        {
            "title": "index.css — center-model hover shadow",
            "status": "aplicado",
            "proof": (
                "Esperado: 3 camadas de sombra no hover  |  Atual: correto. "
                "index.css L189-191 usa as 3 camadas (60px/0.35, 120px/0.15, inset 30px/0.4). FOI aplicada."
            ),
            "code": [
                "// index.css:189-191 — OK",
                "  box-shadow: 0 0 60px rgba(192,132,252,0.35),",
                "    0 0 120px rgba(192,132,252,0.15), inset 0 0 30px rgba(0,0,0,0.4);",
            ]
        },
        {
            "title": "index.css — Erros de sintaxe CSS",
            "status": "parcial",
            "proof": (
                "Os 5 erros de sintaxe (espaços em translate/calc/var, 'box shadow', '0.03s') "
                "foram corrigidos. Porém a variável '--equality' persiste no CSS (ver item 2). "
                "Resultado: PARCIAL."
            ),
            "code": [
                "// Corrigidos:",
                "  translate(-50%, -50%)   calc((var(--position) - 1) * ...)",
                "  box-shadow 0.3s ease    transition: transform 0.3s ease",
                "",
                "// Pendente:",
                "  var(--equality) -> var(--quantity)",
            ]
        },
    ]

    for f in fixes:
        pdf.check_space(70)
        pdf.heading3(f"Correção {fixes.index(f) + 1}. {f['title']}")
        pdf.status_badge(f["status"])
        pdf.y += 6
        pdf.text(f["proof"], indent=4)
        pdf.code_block(f["code"])
        pdf.separator()

    # ════════════════════════════════════════════════════════════════════════
    # PARTE 2 — STATUS DAS SUGESTÕES ANTERIORES
    # ════════════════════════════════════════════════════════════════════════
    pdf.new_page()
    pdf.title("Parte 2 — Status das Sugestões Anteriores", fontsize=16, color=PURPLE)
    pdf.y += 5

    suggestions = [
        ("1", "Partículas animadas no fundo", "aplicado",
         "FloatingParticles.tsx criado (100 partículas, useMemo) + @keyframes floatUp em index.css. TOTALMENTE implementado."),
        ("2", "Scroll suave com parallax", "nao_aplicado",
         "Nenhum efeito parallax. Nenhum hook de scroll aplicado às transformações do banner."),
        ("3", "Gradiente animado no fundo", "parcial",
         "O .banner tem radial-gradient (L51-52), mas é estático — não há @keyframes animando a posição."),
        ("4", "Header funcional com navegação", "nao_aplicado",
         "Header.tsx existe (links Projetos/Sobre mim/Contato/GitHub), mas NÃO é importado no App.tsx. Links usam href='#'."),
        ("5", "Header com blur no scroll", "parcial",
         "backdrop-blur-md aplicado sempre (estático). Não há lógica JS para alternar ao scroll."),
        ("6", "Abrir projeto ao clicar no card", "nao_aplicado",
         "useProjectSlider.ts existe mas não é usado. ProjectCard.tsx não tem onClick. Nenhum modal."),
        ("7", "Imagens reais dos projetos", "nao_aplicado",
         "project.ts usa picsum.photos (placeholder) em todos os 4 projetos."),
        ("8", "Versão mobile do carrossel", "nao_aplicado",
         "Nenhuma media query para o carrossel em index.css. Em telas <768px o carrossel 3D quebra."),
        ("9", "Loading skeleton", "nao_aplicado",
         "ProjectCard.tsx renderiza <img> direto, sem estado de loading ou shimmer."),
        ("10", "Transição de página com Framer Motion", "nao_aplicado",
         "framer-motion não está instalado e react-router-dom não está configurado."),
        ("11", "Cursor customizado", "nao_aplicado",
         "Nenhum cursor circular/glow implementado."),
        ("12", "Tema claro/escuro toggle", "nao_aplicado",
         "CSS define apenas color-scheme: dark. Sem toggle e sem variáveis de tema claro."),
        ("13", "SEO & Meta tags", "nao_aplicado",
         "index.html tem apenas charset, viewport, favicon e title genérico. lang='en'."),
        ("14", "Badges clicáveis com link", "nao_aplicado",
         "Tech-stack renderizado como <span> sem <a>. Não clicáveis."),
    ]

    for num, title, status, proof in suggestions:
        pdf.check_space(70)
        pdf.heading3(f"Sugestão {num}. {title}")
        pdf.status_badge(status)
        pdf.y += 6
        pdf.text(proof, indent=4)
        pdf.separator()

    # ════════════════════════════════════════════════════════════════════════
    # PARTE 3 — NOVAS MELHORIAS
    # ════════════════════════════════════════════════════════════════════════
    pdf.new_page()
    pdf.title("Parte 3 — Novas Melhorias", fontsize=16, color=PURPLE)
    pdf.y += 3
    pdf.text(
        "Cada melhoria traz título, dificuldade, descrição do problema e 'como melhorar' "
        "(passo a passo + código). Identificadas na análise do código atual.",
        color=MID_GRAY
    )
    pdf.y += 8

    categories = [
        ("Bugs e Erros", [
            {
                "title": "Tailwind v4 — classes de tema não geradas",
                "diff": "Difícil",
                "desc": (
                    "App.tsx e Header.tsx usam classes como text-text, bg-primary, bg-background "
                    "e text-primary, mas o CSS compilado NÃO contém essas classes (verificado no "
                    "dist). O motivo: o index.css não define um bloco @theme com as variáveis "
                    "--color-text, --color-primary e --color-background. Resultado: o Header "
                    "renderiza sem estilo, texto com cor padrão e fundo transparente."
                ),
                "how": (
                    "Adicionar o bloco @theme no index.css declarando as cores usadas pelas "
                    "classes. Depois rebuild e confira no dist se as classes aparecem."
                ),
                "code": [
                    "// src/index.css — logo após @import \"tailwindcss\"",
                    "@theme {",
                    "  --color-bg: #16171d;",
                    "  --color-surface: #1f2028;",
                    "  --color-text: #9ca3af;",
                    "  --color-text-h: #f3f4f6;",
                    "  --color-primary: #c084fc;",
                    "  --color-border: #2e303a;",
                    "}",
                ]
            },
            {
                "title": "Variável --sans indefinida no :root",
                "diff": "Fácil",
                "desc": (
                    "index.css :root usa 'font: 18px/145% var(--sans)', mas a variável --sans "
                    "nunca é declarada. A propriedade font torna-se inválida e o navegador aplica "
                    "um fallback não intencional."
                ),
                "how": (
                    "Definir --sans no :root, de preferência apontando para a fonte Inter já "
                    "importada (e com fallbacks system-ui)."
                ),
                "code": [
                    "// index.css :root",
                    "+ --sans: 'Inter', system-ui, -apple-system, sans-serif;",
                ]
            },
            {
                "title": "Fonte Poppins usada mas nunca importada",
                "diff": "Fácil",
                "desc": (
                    "O CSS do .author usa 'font-family: Poppins', mas os @import carregam apenas "
                    "ICA Rubrik e Inter. O navegador cai no fallback sans-serif padrão."
                ),
                "how": (
                    "Adicionar Poppins aos @import do Google Fonts, ou padronizar a família para "
                    "Inter (já carregada) removendo a referência a Poppins."
                ),
                "code": [
                    '// index.css — adicionar Poppins ao import',
                    '@import url(\'https://fonts.googleapis.com/css2?family=Inter:...&family=Poppins:wght@500;600;700&display=swap\');',
                ]
            },
            {
                "title": "Caminho frágil do Hero.png no CSS",
                "diff": "Fácil",
                "desc": (
                    "index.css L173 usa url('../public/Hero.png'). O Vite resolve e copia o asset, "
                    "mas a intenção correta é referenciar o arquivo servido na raiz (/Hero.png), "
                    "pois tudo dentro de public/ é servido na raiz do site."
                ),
                "how": (
                    "Usar caminho absoluto do public ou mover a imagem para src/assets e importá-la "
                    "como módulo."
                ),
                "code": [
                    "// index.css — center-model",
                    "- background-image: url('../public/Hero.png');",
                    "+ background-image: url('/Hero.png');",
                ]
            },
        ]),
        ("Código Morto e Limpeza", [
            {
                "title": "Hook useBackgroundTexture.ts sem uso",
                "diff": "Fácil",
                "desc": (
                    "useBackgroundTexture.ts (fade-in da textura) não é importado por nenhum "
                    "componente. É código morto que deveria ser usado ou removido."
                ),
                "how": (
                    "Integrá-lo ao BackgroundTexture.tsx para aplicar um fade-in suave quando a "
                    "imagem da textura terminar de carregar — ou deletar o arquivo."
                ),
                "code": [
                    "// BackgroundTexture.tsx",
                    "const loaded = useBackgroundImage(imagePath)",
                    "style={{ opacity: loaded ? opacity : 0, transition: 'opacity .6s' }}",
                ]
            },
            {
                "title": "Hook useProjectSlider.ts definido mas não usado",
                "diff": "Médio",
                "desc": (
                    "useProjectSlider controla selectedIndex e autoRotate (pausa no hover), mas "
                    "nada o consome. O carrossel é 100% CSS e não há interação."
                ),
                "how": (
                    "Consumir o hook no ProjectSlider.tsx, conectando handleMouseEnter/Leave à "
                    "animação (via animation-play-state ou classe) e preparando a abertura de "
                    "detalhes no clique."
                ),
                "code": [
                    "// ProjectSlider.tsx",
                    "const { handleMouseEnter, handleMouseLeave, selectedIndex } =",
                    "      useProjectSlider(projects.length)",
                    "<div className=\"slider z-2\" onMouseEnter={handleMouseEnter}",
                    "     onMouseLeave={handleMouseLeave}>",
                ]
            },
            {
                "title": "App.css órfão — 187 linhas de template Vite",
                "diff": "Fácil",
                "desc": (
                    "App.css contém estilos do template Vite (.counter, .hero, #center, "
                    "#next-steps, #docs, #spacer, .ticks) e NUNCA é importado. Puro lixo de código."
                ),
                "how": "Deletar src/App.css (nenhum componente o usa).",
                "code": [
                    "# src/App.css não é importado em lugar nenhum — remover com segurança",
                ]
            },
            {
                "title": "Arquivos e pastas vazios",
                "diff": "Fácil",
                "desc": (
                    "projectslider.ts (0 bytes), pages/home/index.ts (0 bytes) e a pasta "
                    "ProjectDetails/ estão vazios e sem propósito."
                ),
                "how": "Remover os arquivos vazios e a pasta sem conteúdo.",
                "code": [
                    "# Remover:",
                    "# src/components/ProjectSlider/projectslider.ts (0 bytes)",
                    "# src/pages/home/index.ts (0 bytes)",
                    "# src/pages/ProjectDetails/ (vazia)",
                ]
            },
            {
                "title": "Assets não utilizados e duplicados",
                "diff": "Fácil",
                "desc": (
                    "public/TypescriptIcon.png (361KB), reacticon.svg, electronicon.svg, icons.svg "
                    "não são referenciados. src/assets/hero.png (13KB) duplica public/Hero.png."
                ),
                "how": (
                    "Grep por cada asset; remover os não usados e manter uma única fonte de verdade "
                    "para a foto (preferir src/assets + import)."
                ),
                "code": [
                    "// Verificar uso antes de remover:",
                    "rg -n 'TypescriptIcon|reacticon|electronicon|icons.svg' src public --glob '!*.svg'",
                ]
            },
            {
                "title": "react-router-dom instalado mas sem rotas",
                "diff": "Médio",
                "desc": (
                    "react-router-dom está no package.json (v7.18) mas App.tsx não define Router "
                    "nem Routes. É dependência morta no momento."
                ),
                "how": (
                    "Ou configurar o roteador (Home, Sobre, Contato, Detalhes do projeto) ou "
                    "remover a dependência até precisar."
                ),
                "code": [
                    "// main.tsx — quando rotear, envolver <App />:",
                    "import { BrowserRouter } from 'react-router-dom'",
                    "<BrowserRouter><App /></BrowserRouter>",
                ]
            },
        ]),
        ("Performance", [
            {
                "title": "texture.jpg com 2.2 MB",
                "diff": "Fácil",
                "desc": (
                    "A textura de fundo pesa 2.2 MB para ser exibida com opacity quase invisível. "
                    "Impacto direto no tempo de carregamento (LCP) do primeiro paint."
                ),
                "how": (
                    "Converter para WebP/AVIF com qualidade baixa (60) — textura não precisa de "
                    "nitidez. Ou usar um noise pattern 100% CSS."
                ),
                "code": [
                    "# npx sharp-cli texture.jpg -o texture.webp --webp --quality 60",
                    "# Resultado esperado: ~150-250 KB (era 2.2 MB)",
                ]
            },
            {
                "title": "Hero.png (652 KB) sem preload",
                "diff": "Fácil",
                "desc": (
                    "A foto central é o elemento mais pesado do LCP e é carregada como "
                    "background-image no CSS, sem preload."
                ),
                "how": (
                    "Adicionar <link rel=preload> no index.html para o navegador baixar antes "
                    "de descobrir o CSS."
                ),
                "code": [
                    "<!-- index.html -->",
                    '<link rel="preload" href="/Hero.png" as="image" />',
                ]
            },
            {
                "title": "100 partículas DOM em mobile",
                "diff": "Médio",
                "desc": (
                    "FloatingParticles renderiza 100 <span> animados com CSS. Em dispositivos "
                    "móveis causa jank de composição."
                ),
                "how": (
                    "Detectar tela via matchMedia e reduzir o count (ou trocar por Canvas para "
                    "muitas partículas)."
                ),
                "code": [
                    "// FloatingParticles.tsx",
                    "const isMobile = window.matchMedia('(max-width: 768px)').matches",
                    "<FloatingParticles count={isMobile ? 25 : 80} />",
                ]
            },
            {
                "title": "Imagens dos projetos sem lazy loading",
                "diff": "Fácil",
                "desc": (
                    "As <img> do carrossel (picsum.photos) carregam todas imediatamente e dependem "
                    "de rede externa. Sem loading=lazy nem fallback offline."
                ),
                "how": (
                    "Adicionar loading='lazy' e decoding='async'. Ideal: hospedar screenshots "
                    "localmente em src/assets (ver sugestão 7 da Parte 2)."
                ),
                "code": [
                    "// ProjectCard.tsx",
                    '<img src={project.image} alt={project.title}',
                    '     loading="lazy" decoding="async" />',
                ]
            },
        ]),
        ("Acessibilidade & SEO", [
            {
                "title": "prefers-reduced-motion não respeitado",
                "diff": "Fácil",
                "desc": (
                    "Carrossel giratório, partículas e textPulse não podem ser desativados por "
                    "usuários com sensibilidade a movimento."
                ),
                "how": "Adicionar media query desligando animações quando o usuário pedir redução.",
                "code": [
                    "@media (prefers-reduced-motion: reduce) {",
                    "  .banner .slider, .particle,",
                    "  .background-text { animation: none; }",
                    "}",
                ]
            },
            {
                "title": "Carrossel sem atributos ARIA",
                "diff": "Fácil",
                "desc": (
                    "O banner não expõe role/aria-label para leitores de tela; as imagens têm alt "
                    "(bom), mas a região do carrossel não é identificável."
                ),
                "how": (
                    "Marcar o <section className='banner'> como região de carrossel acessível."
                ),
                "code": [
                    '<section className="banner" role="region"',
                    '  aria-label="Carrossel de projetos"',
                    '  aria-roledescription="carousel">',
                ]
            },
            {
                "title": "SEO — meta tags, Open Graph e lang",
                "diff": "Fácil",
                "desc": (
                    "index.html usa lang='en', title genérico 'eualexdev-hub-project' e não tem "
                    "description, keywords, OG nem Twitter Card."
                ),
                "how": "Completar o head com SEO básico e idioma pt-BR.",
                "code": [
                    '<html lang="pt-BR">',
                    '<title>EuAlexDev — Desenvolvedor Front-End</title>',
                    '<meta name="description" content="Portfólio de Alex Alves Amorim, Dev de Favela." />',
                    '<meta property="og:title" content="EuAlexDev Hub" />',
                    '<meta property="og:type" content="website" />',
                    '<meta property="og:image" content="/Hero.png" />',
                ]
            },
        ]),
        ("Responsividade", [
            {
                "title": "center-model com 400px fixos",
                "diff": "Médio",
                "desc": (
                    "A foto central tem width/height de 400px fixos (L171-172). Em telas <500px "
                    "transborda e quebra o layout."
                ),
                "how": "Usar clamp() para escalar com a viewport.",
                "code": [
                    ".banner .center-model {",
                    "  width: clamp(200px, 50vw, 400px);",
                    "  height: clamp(200px, 50vw, 400px);",
                    "}",
                ]
            },
            {
                "title": "Seção .author sobrepõe em telas baixas",
                "diff": "Médio",
                "desc": (
                    ".author usa bottom: 12% + margin-bottom: 150px. Em telas <700px de altura, a "
                    "legenda sobrepõe o carrossel."
                ),
                "how": "Ajustar espaçamento com media query para alturas pequenas.",
                "code": [
                    "@media (max-width: 768px) {",
                    "  .banner .author { bottom: 5%; margin-bottom: 40px; }",
                    "  .banner .author h2 { font-size: 1em; }",
                    "}",
                ]
            },
        ]),
        ("UX & Polish", [
            {
                "title": "Pausar carrossel no hover",
                "diff": "Fácil",
                "desc": (
                    "O slider gira 25s em loop sem pausa. Impossível ler os cards ou clicar."
                ),
                "how": "Pausar a animação no hover via CSS (e conectar o useProjectSlider).",
                "code": [
                    ".banner .slider:hover {",
                    "  animation-play-state: paused;",
                    "}",
                ]
            },
            {
                "title": "Fade-in staggered na entrada",
                "diff": "Fácil",
                "desc": (
                    "A página aparece de forma abrupta; não há micro-animação de entrada para "
                    "título, foto e badges."
                ),
                "how": "Animar os blocos do banner com fadeInUp em cascata.",
                "code": [
                    "@keyframes fadeInUp {",
                    "  from { opacity: 0; transform: translateY(20px); }",
                    "  to   { opacity: 1; transform: translateY(0); }",
                    "}",
                    ".author { animation: fadeInUp .6s ease .3s both; }",
                    ".center-model { animation: fadeInUp .8s ease .1s both; }",
                ]
            },
            {
                "title": "Header: integrar no App e menu mobile",
                "diff": "Médio",
                "desc": (
                    "Header.tsx existe mas não é renderizado. Além disso, a navegação some em "
                    "mobile (hidden md:flex) sem hambúrguer, e os links usam href='#'."
                ),
                "how": (
                    "Importar <Header /> no App.tsx, trocar href='#' por âncoras com scrollIntoView "
                    "(ou rotas) e adicionar um menu hambúrguer para telas pequenas."
                ),
                "code": [
                    "// App.tsx",
                    "import { Header } from './components/Header'",
                    "<><BackgroundTexture imagePath=\"/texture.jpg\" />",
                    "  <Header />",
                    "  <div className=\"min-h-screen\"><Home /></div></>",
                ]
            },
        ]),
    ]

    idx = 0
    for cat_name, items in categories:
        pdf.subtitle(f"▸ {cat_name}")
        for item in items:
            idx += 1
            render_improvement(pdf, idx, item)

    # ════════════════════════════════════════════════════════════════════════
    # PARTE 4 — ORDEM RECOMENDADA
    # ════════════════════════════════════════════════════════════════════════
    pdf.new_page()
    pdf.title("Parte 4 — Ordem Recomendada de Implementação", fontsize=16, color=PURPLE)
    pdf.y += 10

    order = [
        ("1", "Corrigir --equality → --quantity (TSX + CSS)", "Crítico", "Nome semântico incorreto; alinhar variável nos 2 arquivos."),
        ("2", "Mudar opacity da textura para 0.08", "Crítico", "Textura 100% escurece todo o fundo."),
        ("3", "Corrigir Tailwind: adicionar @theme", "Crítico", "Header/App ficam sem estilo sem isso."),
        ("4", "Corrigir --sans e fonte Poppins", "Alto", "Tipografia correta da página."),
        ("5", "Corrigir caminho do Hero.png", "Alto", "Imagem central pode quebrar em deploy."),
        ("6", "Integrar Header no App.tsx + menu mobile", "Alto", "Navegação principal do site."),
        ("7", "Ajustar translateZ de 450px para 550px", "Alto", "Melhor espaçamento dos cards."),
        ("8", "Limpar código morto (App.css, hooks, arquivos vazios)", "Alto", "Reduz confusão e bundle."),
        ("9", "Comprimir texture.jpg (2.2MB → WebP)", "Alto", "Maior ganho de performance de carga."),
        ("10", "Adicionar SEO & Meta tags + lang pt-BR", "Médio", "Visibilidade e compartilhamento."),
        ("11", "Adicionar prefers-reduced-motion + ARIA", "Médio", "Acessibilidade básica."),
        ("12", "Responsividade: center-model e .author", "Médio", "Evitar overflow em telas pequenas."),
        ("13", "Pausar carrossel no hover", "Médio", "UX: permitir examinar cada card."),
        ("14", "Reduzir partículas em mobile", "Médio", "Performance em dispositivos móveis."),
        ("15", "Imagens locais + lazy loading", "Médio", "Menos dependência de rede externa."),
        ("16", "Preload do Hero.png + fade-in staggered", "Baixo", "Polish de carregamento."),
        ("17", "Conectar useProjectSlider (abrir detalhes)", "Baixo", "Feature nova de interação."),
    ]

    p_colors = {"Crítico": RED, "Alto": YELLOW, "Médio": PURPLE, "Baixo": MID_GRAY}

    for num, title, priority, desc in order:
        pdf.check_space(50)
        p_color = p_colors.get(priority, MID_GRAY)
        pdf.text(f"{num}. {title}", fontsize=10, color=LIGHT_GRAY, bold=True, indent=4)
        badge_w = fitz.get_text_length(f" {priority} ", fontname=FONT_BOLD, fontsize=7) + 8
        badge_rect = fitz.Rect(MARGIN_L + 12, pdf.y - 4, MARGIN_L + 12 + badge_w, pdf.y + 6)
        pdf.page.draw_rect(badge_rect, color=None, fill=(p_color[0]*0.3, p_color[1]*0.3, p_color[2]*0.3), radius=0.3)
        pdf.page.insert_text(
            fitz.Point(MARGIN_L + 16, pdf.y + 4),
            priority, fontname=FONT_BOLD, fontsize=7, color=p_color
        )
        pdf.y += 10
        pdf.text(desc, fontsize=8, indent=16, color=MID_GRAY)
        pdf.y += 2

    # ════════════════════════════════════════════════════════════════════════
    # PARTE 5 — ARQUIVOS
    # ════════════════════════════════════════════════════════════════════════
    pdf.new_page()
    pdf.title("Parte 5 — Arquivos que Precisam de Edição", fontsize=16, color=PURPLE)
    pdf.y += 10

    files_to_edit = [
        ("src/components/BackgroundTexture/BackgroundTexture.tsx", "opacity padrão → 0.08, fade-in com useBackgroundImage"),
        ("src/components/ProjectSlider/ProjectSlider.tsx", "--equality → --quantity, conectar useProjectSlider, ARIA"),
        ("src/components/ProjectSlider/ProjectCard.tsx", "loading lazy, onClick para detalhes"),
        ("src/components/BackgroundTexture/FloatingParticles.tsx", "reduzir count em mobile"),
        ("src/index.css", "@theme, --sans, Poppins, Hero.png path, translateZ 550px, prefers-reduced-motion, responsivo, fade-in"),
        ("src/App.tsx", "integrar Header, z-1 → z-[1]"),
        ("src/components/Header/Header.tsx", "âncoras com scrollIntoView, menu mobile hambúrguer"),
        ("src/data/project.ts", "imagens locais reais, links github/demo"),
        ("index.html", "lang pt-BR, meta description, OG/Twitter, preload Hero.png"),
        ("public/texture.jpg", "comprimir para WebP (~200KB)"),
    ]

    files_to_remove = [
        ("src/App.css", "187 linhas de CSS não utilizadas (template Vite)"),
        ("src/components/ProjectSlider/projectslider.ts", "arquivo vazio (0 bytes)"),
        ("src/pages/home/index.ts", "arquivo vazio (0 bytes)"),
        ("src/pages/ProjectDetails/", "pasta vazia"),
        ("src/hooks/useBackgroundTexture.ts", "hook sem uso (ou integrar)"),
        ("public/TypescriptIcon.png", "361KB não referenciado"),
        ("public/reacticon.svg, electronicon.svg, icons.svg", "não referenciados"),
        ("src/assets/hero.png", "duplicata de public/Hero.png"),
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
        ("Correções do documento de referência:", "3 aplicadas, 2 parciais, 2 pendentes"),
        ("Sugestões do documento de referência:", "1 aplicada, 2 parciais, 11 pendentes"),
        ("Novas melhorias levantadas:", "22 (4 bugs, 6 limpeza, 4 performance, 3 acessibilidade/SEO, 2 responsividade, 3 UX)"),
        ("Prioridade crítica:", "3 itens (variável CSS, opacity, @theme do Tailwind)"),
    ]
    for label, value in summary_data:
        pdf.text(f"  {label} {value}", fontsize=9, color=LIGHT_GRAY, indent=4)

    pdf.y += 15
    pdf.text(
        "Documento gerado automaticamente com base no código atual e no PDF de referência "
        "mudancas-pendentes-e-melhorias.pdf. Nenhuma alteração foi feita no código durante esta "
        "auditoria — apenas análise. O item 'Math.random em render' (FloatingParticles) já foi "
        "corrigido com um PRNG determinístico (mulberry32).",
        fontsize=8, color=MID_GRAY
    )

    pdf.save()


if __name__ == "__main__":
    build_pdf()
