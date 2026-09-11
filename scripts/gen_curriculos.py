#!/usr/bin/env python3
# Gera os dois PDFs de currículo (completo e minimal) com layout fiel aos originais
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether
from reportlab.lib import colors

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public")
OUT_DIR = os.path.abspath(OUT_DIR)

# Cores
NAVY = HexColor("#0f2a5a")
BLUE = HexColor("#1a3a8a")
BLUE_TITLE = HexColor("#0a1f8f")
BLUE_SECTION = HexColor("#0f3ab8")
PURPLE = HexColor("#5b1fb8")
PURPLE_DARK = HexColor("#3d0f8a")
GRAY = HexColor("#333333")
LIGHT_GRAY = HexColor("#f5f5f7")
BORDER = HexColor("#d1d5db")

W, H = A4

def header_footer_completo(canvas, doc):
    canvas.saveState()
    canvas.restoreState()

def header_footer_minimal(canvas, doc):
    canvas.saveState()
    canvas.restoreState()

# ---------- Helpers ----------
def hr(color=NAVY, thickness=1.2):
    return HRFlowable(width="100%", thickness=thickness, color=color, spaceAfter=6, spaceBefore=2, hAlign='CENTER')

def bullet(text, style):
    return Paragraph(f'<font color="#333">•</font> {text}', style)

# ---------- COMPLETO ----------
def build_completo(path):
    styles = getSampleStyleSheet()
    s_title = ParagraphStyle('TitleComp', parent=styles['Title'], fontName='Helvetica-Bold', fontSize=22, textColor=BLUE_TITLE, alignment=TA_CENTER, spaceAfter=2, leading=24)
    s_sub = ParagraphStyle('SubComp', parent=styles['Normal'], fontName='Helvetica', fontSize=9, textColor=BLUE, alignment=TA_CENTER, leading=11, spaceAfter=1)
    s_sub2 = ParagraphStyle('Sub2Comp', parent=styles['Normal'], fontName='Helvetica-Oblique', fontSize=7.5, textColor=GRAY, alignment=TA_CENTER, leading=10)
    s_contact = ParagraphStyle('ContactComp', parent=styles['Normal'], fontName='Helvetica', fontSize=7, textColor=GRAY, alignment=TA_CENTER, leading=9)
    s_section = ParagraphStyle('SectionComp', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=8.5, textColor=BLUE_SECTION, leading=11, spaceBefore=8, spaceAfter=2)
    s_body = ParagraphStyle('BodyComp', parent=styles['Normal'], fontName='Helvetica', fontSize=7, textColor=HexColor("#222"), leading=9, alignment=TA_JUSTIFY, spaceAfter=2)
    s_body2 = ParagraphStyle('Body2Comp', parent=s_body, alignment=TA_LEFT, leftIndent=10, spaceAfter=1.5)
    s_project = ParagraphStyle('ProjectComp', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=7.2, textColor=black, leading=9, spaceAfter=1)
    s_project_sub = ParagraphStyle('ProjectSubComp', parent=styles['Normal'], fontName='Helvetica-Oblique', fontSize=6.5, textColor=HexColor("#555"), leading=8)
    s_small = ParagraphStyle('SmallComp', parent=styles['Normal'], fontName='Helvetica', fontSize=6.5, textColor=GRAY, leading=8)
    s_link = ParagraphStyle('LinkComp', parent=styles['Normal'], fontName='Helvetica', fontSize=6.5, textColor=BLUE_SECTION, leading=8)

    story = []

    # Header
    story.append(Paragraph("ALEX ALVES AMORIM", s_title))
    story.append(Paragraph("Desenvolvedor Full-Stack React | TypeScript | Node.js", ParagraphStyle('subB', parent=s_sub, fontName='Helvetica', textColor=BLUE_SECTION, fontSize=9)))
    story.append(Paragraph("Em transição para primeira oportunidade CLT / PJ como Desenvolvedor Full-Stack", ParagraphStyle('subB2', parent=s_sub2, fontName='Helvetica-Oblique', fontSize=7.5)))
    story.append(Paragraph('Jacarepaguá, Rio de Janeiro - RJ &nbsp;|&nbsp; alex.a.amorim@outlook.com &nbsp;|&nbsp; (21) 97680-7111', s_contact))
    story.append(Paragraph('github.com/AlexAlvesAmorim &nbsp;|&nbsp; linkedin.com/in/alex-a-amorim', ParagraphStyle('c2', parent=s_contact, textColor=BLUE_SECTION)))
    story.append(Paragraph('Portfólio + releases + demos | https://eu-alex-dev-hub-project.vercel.app/', ParagraphStyle('c3', parent=s_contact, textColor=BLUE_SECTION)))
    story.append(Spacer(1, 4))

    # RESUMO
    story.append(Paragraph("RESUMO PROFISSIONAL", s_section))
    story.append(hr(NAVY, 1.2))
    story.append(Paragraph(
        "Desenvolvedor Full-Stack com certificação CS50x - Harvard University (2026) e base sólida de 15 anos em suporte técnico N3, o que fortaleceu troubleshooting avançado, foco em performance e visão centrada no usuário. Desde 2023 atua como Freelancer (ALVS - Soluções Tecnológicas) construindo produtos reais com React 18/19, TypeScript, Electron, Node.js, Vite e Tailwind, aplicando Clean Code, componentização, testes e arquitetura modular — em paralelo ao vínculo atual como Técnico N3 na InfoMorais.com (2022-Atual). Portfólio autoral com 5 produtos distribuíveis — de leitor PDF desktop para Windows com instalador e auto-update a dashboards analíticos e e-commerce vendido em negociação B2B. Busca transição definitiva para CLT/PJ como Dev Full-Stack, com disponibilidade para presencial/híbrido no RJ e remoto.",
        s_body))
    # Projetos
    story.append(Paragraph("PROJETOS EM DESTAQUE — PRODUTOS REAIS COM CÓDIGO E RELEASE", s_section))
    story.append(hr(NAVY, 1.2))

    def proj(title, stack, link, bullets):
        # title row
        t = Table([
            [Paragraph(f'<b>{title}</b> <font color="#0f3ab8">{stack}</font>', s_project),
             Paragraph(f'<font color="#0f3ab8">{link}</font>', ParagraphStyle('linkr', parent=s_link, alignment=2))]
        ], colWidths=[380, 130])
        t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
        story.append(t)
        for b in bullets:
            story.append(Paragraph(f'<font color="#222">•</font> {b}', s_body2))
        story.append(Spacer(1, 3))

    proj("ALFA PDF Reader", "React 18 | TypeScript | Electron 43 | PDF.js | Vite | electron-updater",
         "github.com/AlexAlvesAmorim/AlfaPDF",
         [
             "Leitor PDF desktop profissional para Windows distribuído como instalador .exe com NSIS customizado (~100 MB), registrado como app padrão para .pdf (duplo clique) com atalhos e Jump List de arquivos recentes. Substitui nativos do sistema.",
             "Suporte multi-abas, PDFs com senha (validação PDF.js + modal dedicada) e pipeline de impressão silenciosa/nativa (pdf-lib) com memória de preferências — validado em campo em EPSON L3150 e impressoras de rede.",
              "Auto-update silencioso via GitHub Releases + sino de notificações, 10 releases publicadas (v2.1.6 atual), 3 temas (dark/light/midnight) e pipeline typecheck + lint 100% verde com Vitest + Testing Library."
         ])
    # 99Food
    t2 = Table([
        [Paragraph('<b><font color="#0f3ab8">99Food Analyser</font></b> <font color="#0f3ab8">React 19 | TypeScript | Vite | Tailwind 4 | React Router 7 | lucide-react</font>', s_project)]
    ], colWidths=[510])
    story.append(t2)
    story.append(Paragraph('<font color="#222">✓</font> <b>CS50x Harvard Final Project | youtu.be/e3zGgwpHqeU</b>', ParagraphStyle('cs50', parent=s_small, leftIndent=10, textColor=black, fontName='Helvetica-Bold')))
    for b in [
        "Dashboard SaaS analítico para delivery (CS50x Final Project): KPIs de receita, pedidos, ticket médio e entregues calculados em useMemo sem backend; receita por dia/método com insights automáticos (melhor dia/forma de pagamento).",
        "Visualização com CSS puro (sem chart lib) + ARIA progressbar e MetricCards com trends; filtros, busca e modal acessível (ESC, overlay, scroll-lock) para gestão de status via Context API + useCallback.",
        "Arquitetura desacoplada pronta para API REST: types tipados, mocks realistas (15 pedidos) em src/mocks/, utils Intl.NumberFormat pt-BR e Error Boundary; vídeo demo e README file-by-file documentados para banca CS50."
    ]:
        story.append(Paragraph(f'<font color="#222">•</font> {b}', s_body2))
    story.append(Spacer(1,3))

    t3 = Table([
        [Paragraph('<b><font color="#0f3ab8">EuAlexDev Hub (Dev. de Favela)</font></b> <font color="#0f3ab8">React 19 | TypeScript | Vite | Tailwind 4 | react-icons | Portfólio Hub Autoral</font>', s_project)]
    ], colWidths=[510])
    story.append(t3)
    for b in [
        "Hub de portfólio como produto: carrossel 3D autoral com CSS puro + requestAnimationFrame (sem libs 3D), 10 arquivos CSS modulares e 2 hooks customizados; cada projeto com case study próprio.",
        "Componentização reutilizável, 100% navegável por teclado, prefers-reduced-motion, foco visível e testes de acessibilidade; deploy estático com Vite e roteamento tipado.",
        "Vitrine viva que centraliza todos os produtos, currículo em PDF e links para GitHub/LinkedIn — prova de consistência de design system pessoal."
    ]:
        story.append(Paragraph(f'<font color="#222">•</font> {b}', s_body2))
    story.append(Spacer(1,3))

    t4 = Table([
        [Paragraph('<b><font color="#0f3ab8">Fabulosa E-Commerce</font></b> <font color="#0f3ab8">React 19 | TypeScript | Vite | Tailwind | Node.js | Fastify | Prisma | Docker</font>', s_project)]
    ], colWidths=[510])
    story.append(t4)
    story.append(Paragraph('<font color="#222">✓</font> <b>Projeto B2B VENDIDO | Base profissional</b>', ParagraphStyle('vend', parent=s_small, leftIndent=10, fontName='Helvetica-Bold', textColor=black)))
    for b in [
        "E-commerce de moda feminina/masculina vendido em negociação B2B para empresa real — marco da transição do aprendizado para receita; catálogo completo, design responsivo e identidade visual de moda.",
        "Stack profissional completa: front SPA + server Fastify + Prisma, Docker e docker-compose, Husky, ESLint/Prettier, Vitest + Playwright (e2e) — pipeline profissional raro em portfólio júnior.",
        "Código refatorado que serviu de base para o 99Food Analyser, demonstrando evolução arquitetural e reaproveitamento de design system."
    ]:
        story.append(Paragraph(f'<font color="#222">•</font> {b}', s_body2))
    story.append(Spacer(1,3))

    t5 = Table([
        [Paragraph('<b><font color="#0f3ab8">Alfa Curriculum Maker</font></b> <font color="#0f3ab8">React 19 | TypeScript | docx | jsPDF | @imgly/background-removal &nbsp; Gerador de currículos | 7 templates</font>', s_project)]
    ], colWidths=[510])
    story.append(t5)
    for b in [
        "Gerador de currículos com 7 modelos em PDF e DOCX (docx + jsPDF), edição ao vivo e remoção de fundo por IA 100% no navegador — sem envio a servidor, focado em quem busca emprego.",
        "Importação via pdfjs-dist + mammoth, preview instantâneo e exportação profissional; desenvolvido em paralelo ao Hub (2026) como produto de impacto social."
    ]:
        story.append(Paragraph(f'<font color="#222">•</font> {b}', s_body2))
    story.append(Spacer(1,4))

    # Competencias
    story.append(Paragraph("COMPETÊNCIAS TÉCNICAS", s_section))
    story.append(hr(NAVY, 1.2))
    story.append(Paragraph('<b>Desenvolvimento:</b> React.js, TypeScript, JavaScript (ES6+), Electron, Node.js, HTML5, CSS3, Tailwind CSS, Vite, React Router, PDF.js, Git/GitHub, APIs REST, hooks customizados, arquitetura modular.', s_body))
    story.append(Paragraph('<b>Qualidade & DevOps:</b> Vitest, Testing Library, Playwright (e2e), Husky, ESLint, Prettier, Docker, docker-compose, electron-updater, GitHub Releases, typecheck 100%.', s_body))
    story.append(Paragraph('<b>Complementar (15a suporte):</b> Troubleshooting avançado, Windows, Linux, macOS, Redes TCP/IP, Hardware, manutenção de placas lógicas — diferencial para debug e performance.', s_body))
    story.append(Paragraph('<b>Ferramentas & Design:</b> Jira, GLPI, Zendesk, Figma/Photoshop (básico), CorelDRAW, Microsoft 365, Google Workspace.', s_body))

    # Experiencia
    story.append(Paragraph("EXPERIÊNCIA PROFISSIONAL", s_section))
    story.append(hr(NAVY, 1.2))
    def exp(title, period):
        t = Table([
            [Paragraph(f'<b>{title}</b>', ParagraphStyle('expTitle', parent=s_project, fontSize=7.5)),
             Paragraph(f'<font color="#222">{period}</font>', ParagraphStyle('expPer', parent=s_small, alignment=2))]
        ], colWidths=[400, 110])
        t.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'MIDDLE'),('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),0)]))
        story.append(t)
    exp("Desenvolvedor Full-Stack Freelancer — ALVS - Soluções Tecnológicas", "2023 – Atual")
    story.append(Paragraph('<i>Atuação autônoma com projetos sob demanda (fora do expediente) — em paralelo ao vínculo CLT na InfoMorais | Ainda sem atuação CLT/PJ como Dev, em busca da primeira oportunidade</i>', ParagraphStyle('expSub', parent=s_small, fontName='Helvetica-Oblique', leftIndent=0, textColor=HexColor("#444"))))
    for b in [
        "Concepção e entrega de 5 produtos autorais web/desktop com React, TypeScript, Electron, Node.js, Vite e Tailwind, aplicando Clean Code, componentização e arquitetura modular; todos com repositório Git, README técnico e releases.",
        "Interfaces responsivas, acessíveis e performáticas com integração REST, gestão de estado via Context API, testes Vitest/Playwright e CI com Husky + lint; foco em UX e manutenabilidade.",
        "Experiência ponta-a-ponta: prototipação, codificação, testes em hardware real (impressão), empacotamento NSIS/Docker e distribuição — vivência de produto, não só de tutorial."
    ]:
        story.append(Paragraph(f'<font color="#222">•</font> {b}', s_body2))
    exp("Técnico de TI N3 — InfoMorais.com", "2022 – Atual")
    story.append(Paragraph('<i>Vínculo atual – CLT | Referência técnica da equipe</i>', ParagraphStyle('expSub2', parent=s_small, fontName='Helvetica-Oblique', textColor=HexColor("#444"))))
    for b in [
        "Diagnósticos avançados em hardware, software e sistemas operacionais (Windows/Linux), reduzindo tempo médio de resolução de chamados e elevando estabilidade para clientes finais e corporativos.",
        "Otimização de ambientes, redes LAN/WAN e infraestrutura crítica; atendimento N3 que hoje acelera debugging, leitura de logs e visão de produto no front-end.",
        "Ponte entre suporte e desenvolvimento: traduz dor do usuário em requisito de interface — diferencial trazido para os projetos freelance."
    ]:
        story.append(Paragraph(f'<font color="#222">•</font> {b}', s_body2))
    exp("Histórico em Suporte & Infraestrutura", "2005 – 2019")
    story.append(Paragraph('<i>InfoStarter, TecInfo TemTudo, Bronze LanHouse, Galacticus CyberCaffe | Trajetória N1 → N3 | Base para transição de carreira</i>', ParagraphStyle('expSub3', parent=s_small, fontName='Helvetica-Oblique', textColor=HexColor("#444"))))
    story.append(Paragraph('<font color="#222">•</font> Evolução de 14 anos de N1 a N3: manutenção de hardware/placas lógicas, redes, servidores e criação de identidades visuais (Web Designer em 2013-2016). Consolidou troubleshooting, atendimento e gestão de infraestrutura que hoje sustenta a qualidade do código.', s_body2))

    # Formação
    story.append(Paragraph("FORMAÇÃO ACADÊMICA, CERTIFICAÇÕES E IDIOMAS", s_section))
    story.append(hr(NAVY, 1.2))
    for b in [
        "<b>CS50x – Introduction to Computer Science – Harvard University – Certificado 2026</b><br/>&nbsp;&nbsp;&nbsp;&nbsp;➢ Final Project: 99Food Analyser (React 19 + TypeScript + Vite) com vídeo demo e banca",
        "Seven Informática – Formação Técnica certificada",
        "Ensino Médio Completo – C.E. Paraná",
        "Inglês: Intermediário – leitura técnica fluente, documentação, comunicação e cursos (CS50 em inglês)",
        "Disponibilidade: Imediata para transição CLT/PJ como Full-Stack.<br/>&nbsp;&nbsp;&nbsp;&nbsp;➢ Presencial/Híbrido no RJ e Remoto | Portfólio, GitHub, releases e vídeo demo disponíveis para avaliação técnica"
    ]:
        story.append(Paragraph(f'<font color="#222">•</font> {b}', s_body2))

    doc = SimpleDocTemplate(path, pagesize=A4, leftMargin=14*mm, rightMargin=14*mm, topMargin=10*mm, bottomMargin=10*mm, title="Currículo Alex Alves Amorim - Completo", author="Alex Alves Amorim")
    doc.build(story)

def build_minimal(path):
    styles = getSampleStyleSheet()
    s_title = ParagraphStyle('TitleMin', parent=styles['Title'], fontName='Helvetica-Bold', fontSize=18, textColor=HexColor("#1a1a1a"), alignment=TA_CENTER, spaceAfter=1, leading=20)
    s_sub = ParagraphStyle('SubMin', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8.5, textColor=PURPLE, alignment=TA_CENTER, leading=10)
    s_contact = ParagraphStyle('ContactMin', parent=styles['Normal'], fontName='Helvetica', fontSize=6.5, textColor=HexColor("#555"), alignment=TA_CENTER, leading=8)
    s_link = ParagraphStyle('LinkMin', parent=s_contact, textColor=PURPLE, fontName='Helvetica')
    s_section = ParagraphStyle('SectionMin', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=8, textColor=PURPLE, leading=10, spaceBefore=7, spaceAfter=2)
    s_body = ParagraphStyle('BodyMin', parent=styles['Normal'], fontName='Helvetica', fontSize=6.7, textColor=HexColor("#222"), leading=8.5, alignment=TA_JUSTIFY, spaceAfter=2)
    s_body2 = ParagraphStyle('Body2Min', parent=s_body, alignment=TA_LEFT, leftIndent=10, spaceAfter=1.2)
    s_project = ParagraphStyle('ProjMin', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=7, textColor=HexColor("#111"), leading=8.5)
    s_stack = ParagraphStyle('StackMin', parent=styles['Normal'], fontName='Helvetica-Oblique', fontSize=6.3, textColor=PURPLE, leading=8)
    s_small = ParagraphStyle('SmallMin', parent=styles['Normal'], fontName='Helvetica', fontSize=6.2, textColor=HexColor("#444"), leading=7.5)
    s_table_cell = ParagraphStyle('CellMin', parent=styles['Normal'], fontName='Helvetica', fontSize=6.3, leading=7.5, textColor=HexColor("#222"))

    story = []
    story.append(Paragraph("ALEX ALVES AMORIM", s_title))
    story.append(Paragraph("Desenvolvedor Full-Stack &nbsp;|&nbsp; React &nbsp;•&nbsp; TypeScript &nbsp;•&nbsp; Node.js", s_sub))
    story.append(Paragraph('Jacarepaguá, Rio de Janeiro - RJ &nbsp;|&nbsp; alex.a.amorim@outlook.com &nbsp;|&nbsp; (21) 97680-7111', s_contact))
    story.append(Paragraph('github.com/AlexAlvesAmorim &nbsp;|&nbsp; linkedin.com/in/alex-a-amorim', s_link))
    story.append(Paragraph('Portfólio + releases + demos | https://eu-alex-dev-hub-project.vercel.app/', s_link))
    # thin line purple
    story.append(HRFlowable(width="100%", thickness=0.7, color=PURPLE, spaceAfter=4, spaceBefore=4))
    # RESUMO
    story.append(Paragraph("RESUMO PROFISSIONAL", s_section))
    story.append(HRFlowable(width="100%", thickness=0.7, color=PURPLE, spaceAfter=4, spaceBefore=1))
    story.append(Paragraph(
        "Desenvolvedor Full-Stack com certificação <b>CS50x - Harvard University (2026)</b> e <b>15 anos de experiência em suporte técnico N3</b>, com forte base em troubleshooting, performance e experiência do usuário. Desde 2023 como freelancer (ALVS Soluções Tecnológicas), criei <b>5 produtos reais</b> em React 19, TypeScript, Electron e Node.js - do leitor PDF desktop distribuído com instalador .exe e auto-update a dashboards SaaS e e-commerce vendido em negociação B2B. Busco transição definitiva para CLT/PJ como Full-Stack (presencial/híbrido RJ ou remoto), com disponibilidade imediata.",
        s_body))
    # PROJETOS
    story.append(Paragraph("PROJETOS EM DESTAQUE - PRODUTOS COM CÓDIGO, RELEASE E DEMO", s_section))
    story.append(HRFlowable(width="100%", thickness=0.7, color=PURPLE, spaceAfter=4, spaceBefore=1))

    def proj_min(title, stack, link, bullets):
        story.append(Paragraph(f'<b>{title}</b> &nbsp;<font color="#5b1fb8"><i>{stack}</i></font>', s_project))
        if link:
            story.append(Paragraph(f'<font color="#5b1fb8">{link}</font>', ParagraphStyle('projlink', parent=s_small, fontName='Helvetica-Oblique', textColor=PURPLE)))
        for b in bullets:
            story.append(Paragraph(f'<font color="#222">•</font> {b}', s_body2))
        story.append(Spacer(1,2))

    proj_min("ALFA PDF Reader", "React 18 | TypeScript | Electron 43 | PDF.js | Vite | electron-updater", "github.com/AlexAlvesAmorim/AlfaPDF", [
        "Leitor PDF desktop para Windows com instalador NSIS (~100 MB), registro como app padrão .pdf, atalhos e Jump List. Substitui leitores nativos.",
        "Multi-abas, validação de PDFs com senha e pipeline de impressão nativa/silenciosa (pdf-lib) validado em impressoras físicas - <b>10 releases publicadas (v2.1.6)</b>, 3 temas e auto-update via GitHub Releases. Pipeline typecheck + lint 100% com Vitest."
    ])
    proj_min("99Food Analyser - CS50x Harvard Final Project", "React 19 | TypeScript | Vite | Tailwind 4 | React Router 7", "youtu.be/e3zGgwpHqeU", [
        "Dashboard SaaS para delivery com KPIs (receita, pedidos, ticket médio) calculados em <b>useMemo</b> sem backend e insights automáticos (melhor dia/forma de pagamento).",
        "Visualização em CSS puro e acessibilidade (ARIA, progressbar, modal com ESC/scroll-lock) via Context API. Arquitetura desacoplada pronta para REST com mocks, types e Error Boundary."
    ])
    proj_min("EuAlexDev Hub - Portfólio como Produto", "React 19 | TypeScript | Vite | Tailwind 4", "eu-alex-dev-hub-project.vercel.app", [
        "Hub autoral com carrossel 3D em CSS puro + requestAnimationFrame (sem libs 3D), 10 módulos CSS e 2 hooks custom. Cada projeto com case study próprio.",
        "100% navegável por teclado, prefers-reduced-motion e foco visível. Prova de consistência de design system pessoal."
    ])
    proj_min("Fabulosa E-Commerce - Projeto B2B VENDIDO", "React 19 | Node.js | Fastify | Prisma | Docker | Vitest | Playwright", "base profissional", [
        "E-commerce de moda com catálogo completo e identidade visual, <b>vendido para empresa real</b> - marco da transição de estudo para receita.",
        "Stack full: SPA + API Fastify + Prisma + Docker Compose, Husky, ESLint/Prettier e testes e2e. Base reutilizada no 99Food, demonstrando evolução arquitetural."
    ])
    proj_min("Alfa Curriculum Maker", "React 19 | docx | jsPDF | @imgly/background-removal | 7 templates - PDF e DOCX", "", [
        "Gerador de currículos com edição ao vivo, exportação PDF/DOCX e <b>remoção de fundo por IA 100% no navegador</b> (sem envio a servidor). Importação via pdfjs-dist + mammoth."
    ])

    # Competencias como tabela
    story.append(Paragraph("COMPETÊNCIAS TÉCNICAS", s_section))
    story.append(HRFlowable(width="100%", thickness=0.7, color=PURPLE, spaceAfter=4, spaceBefore=1))
    # Build table data with Paragraphs
    def p(txt): return Paragraph(txt, s_table_cell)
    header_style = ParagraphStyle('HeaderCell', parent=s_table_cell, fontName='Helvetica-Bold', textColor=HexColor("#333"), fontSize=6.5)
    def hp(txt): return Paragraph(txt, header_style)
    data = [
        [hp("Desenvolvimento"), p("React.js, TypeScript, JavaScript (ES6+), Electron, Node.js, HTML5, CSS3, Tailwind CSS, Vite, React Router, PDF.js, APIs REST, Hooks Customizados, Arquitetura Modular")],
        [hp("Qualidade & DevOps"), p("Vitest, Testing Library, Playwright (e2e), Husky, ESLint, Prettier, Docker, docker-compose, electron-updater, GitHub Releases, TypeCheck 100%")],
        [hp("Diferencial Suporte"), p("15 anos Troubleshooting Nível 3 - Windows / Linux / macOS - Redes TCP/IP - Hardware e manutenção de placas lógicas - acelera debug e performance no front-end")],
        [hp("Ferramentas"), p("Git/GitHub, Jira, GLPI, Zendesk, Figma (básico), Microsoft 365 / Google Workspace")],
    ]
    t = Table(data, colWidths=[90, 420])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,-1), HexColor("#f3f0ff")),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.4, BORDER),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t)

    # Experiencia
    story.append(Paragraph("EXPERIÊNCIA PROFISSIONAL", s_section))
    story.append(HRFlowable(width="100%", thickness=0.7, color=PURPLE, spaceAfter=4, spaceBefore=1))
    def exp_min(title, period, sub, bullets):
        story.append(Table(
            [[Paragraph(f'<b>{title}</b>', ParagraphStyle('expT', parent=s_project, fontSize=6.8)), Paragraph(f'<font color="#5b1fb8"><b>{period}</b></font>', ParagraphStyle('expP', parent=s_small, alignment=2, textColor=PURPLE))]],
            colWidths=[400, 110]
        ))
        if sub:
            story.append(Paragraph(f'<i>{sub}</i>', ParagraphStyle('expSub', parent=s_small, fontName='Helvetica-Oblique', textColor=HexColor("#666"), fontSize=6)))
        for b in bullets:
            story.append(Paragraph(f'<font color="#222">•</font> {b}', s_body2))
        story.append(Spacer(1,2))

    exp_min("Desenvolvedor Full-Stack Freelancer - ALVS Soluções Tecnológicas", "2023 - Atual", "Projetos sob demanda (fora do expediente) - em paralelo ao vínculo CLT na InfoMorais", [
        "Concepção e entrega de <b>5 produtos autorais</b> web/desktop com React, TypeScript, Electron e Tailwind, com README técnico, repositório Git e releases.",
        "Interfaces responsivas, acessíveis e performáticas com Context API, Vitest/Playwright e CI (Husky + lint) - foco em UX e manutenabilidade ponta a ponta (protótipo ao empacotamento NSIS/Docker)."
    ])
    exp_min("Técnico de TI N3 - InfoMorais.com", "2022 - Atual", "Vínculo CLT atual | Referência técnica da equipe", [
        "Diagnósticos avançados em hardware/software (Windows/Linux) reduzindo tempo médio de resolução; otimização de redes LAN/WAN e infraestrutura crítica.",
        "Ponte entre suporte e desenvolvimento: traduz dor do usuário em requisito de interface - diferencial aplicado nos produtos freelance."
    ])
    exp_min("Histórico em Suporte & Infraestrutura - InfoStarter, TecInfo TemTudo, Bronze LanHouse, Galacticus CyberCaffe", "2005 - 2019", "Trajetória N1 > N3 | 14 anos", [
        "Evolução de N1 a N3 com manutenção de hardware/placas lógicas, redes e servidores e atuação como Web Designer (2013-2016) - base sólida de troubleshooting e gestão de infraestrutura."
    ])

    # Formação
    story.append(Paragraph("FORMAÇÃO ACADÊMICA, CERTIFICAÇÕES E IDIOMAS", s_section))
    story.append(HRFlowable(width="100%", thickness=0.7, color=PURPLE, spaceAfter=4, spaceBefore=1))
    for b in [
        "<b>CS50x - Introduction to Computer Science - Harvard University - Certificado 2026</b> | Final Project: 99Food Analyser (React 19 + TS) com vídeo demo e banca",
        "Seven Informática - Formação Técnica certificada &nbsp;|&nbsp; Ensino Médio Completo - C.E. Paraná",
        "<b>Inglês Intermediário</b> - leitura técnica fluente, documentação e cursos (CS50x em inglês)",
        "<b>Disponibilidade:</b> Imediata para transição CLT/PJ Full-Stack &nbsp;|&nbsp; Presencial/Híbrido no RJ e Remoto &nbsp;|&nbsp; Portfólio, GitHub e releases disponíveis para avaliação técnica"
    ]:
        story.append(Paragraph(f'<font color="#222">•</font> {b}', s_body2))
    story.append(Spacer(1,8))
    story.append(HRFlowable(width="100%", thickness=0.4, color=BORDER, spaceAfter=3, spaceBefore=3))
    story.append(Paragraph('<i>Referências, repositórios e demonstrações sob consulta - todos os projetos com código aberto e histórico de commits.</i>', ParagraphStyle('foot', parent=s_small, alignment=TA_CENTER, fontName='Helvetica-Oblique', textColor=HexColor("#777"), fontSize=5.5)))

    doc = SimpleDocTemplate(path, pagesize=A4, leftMargin=12*mm, rightMargin=12*mm, topMargin=10*mm, bottomMargin=10*mm, title="Currículo Alex Alves Amorim - Minimal", author="Alex Alves Amorim")
    doc.build(story)

if __name__ == "__main__":
    os.makedirs(OUT_DIR, exist_ok=True)
    completo = os.path.join(OUT_DIR, "curriculo-completo.pdf")
    minimal = os.path.join(OUT_DIR, "curriculo-minimal.pdf")
    # também mantém o alias legado apontando para o completo
    legado = os.path.join(OUT_DIR, "curriculo-alex-alves-amorim.pdf")
    print(f"Gerando {completo} ...")
    build_completo(completo)
    print(f"Gerando {minimal} ...")
    build_minimal(minimal)
    # Atualiza legado como cópia do completo para compatibilidade
    import shutil
    shutil.copyfile(completo, legado)
    print("OK - PDFs gerados")
    for p in [completo, minimal, legado]:
        print(p, os.path.getsize(p))

