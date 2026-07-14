from pathlib import Path

from PIL import Image, ImageDraw
from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph
from reportlab.graphics.barcode import qr
from reportlab.graphics.shapes import Drawing
from reportlab.graphics import renderPDF


ROOT = Path(__file__).resolve().parents[2]
ASSETS = Path(__file__).resolve().parent / "source-assets"
OUTPUT = Path(__file__).resolve().parent / "vincenzo-meccariello-cv.pdf"

NAVY = HexColor("#001F3F")
BLUE = HexColor("#0074D9")
PAPER = HexColor("#F5F7FA")
INK = HexColor("#0A2747")
MUTED = HexColor("#44566C")
LINE = HexColor("#D7E2EE")

PORTFOLIO = "https://vincenzomec97-ship-it.github.io/VinMec-portfolio/"
GITHUB = "https://github.com/vincenzomec97-ship-it"
LINKEDIN = "https://www.linkedin.com/in/vincenzo-meccariello-4140b9386/"
EMAIL = "mailto:Vincenzomec97@gmail.com"
PHONE = "tel:+393277942828"


def register_fonts():
    pdfmetrics.registerFont(TTFont("Arial", r"C:\Windows\Fonts\arial.ttf"))
    pdfmetrics.registerFont(TTFont("Arial-Bold", r"C:\Windows\Fonts\arialbd.ttf"))
    pdfmetrics.registerFont(TTFont("Georgia-Bold", r"C:\Windows\Fonts\georgiab.ttf"))


def para(c, text, x, y_top, width, size=8.2, leading=None, color=INK,
         font="Arial", bold=False, link=None):
    leading = leading or size * 1.25
    if link:
        text = f'<link href="{link}" color="#{color.hexval()[2:]}">{text}</link>'
    style = ParagraphStyle(
        "cv", fontName="Arial-Bold" if bold else font, fontSize=size,
        leading=leading, textColor=color, alignment=TA_LEFT, spaceAfter=0,
    )
    p = Paragraph(text, style)
    _, h = p.wrap(width, 200)
    p.drawOn(c, x, y_top - h)
    return h


def pill(c, x, y_top, width, title, dark=False):
    h = 25
    c.setFillColor(NAVY if dark else BLUE)
    c.roundRect(x, y_top - h, width, h, 13, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Georgia-Bold", 12.5 if not dark else 11.5)
    c.drawString(x + 12, y_top - 17.5, title)
    return y_top - h


def circle_photo(c, path, cx, cy, radius):
    img = Image.open(path).convert("RGB")
    # Same close portrait crop used by the original CV.
    side = int(img.width * 0.66)
    left = (img.width - side) // 2
    top = int(img.height * 0.055)
    crop = img.crop((left, top, left + side, top + side))
    crop = crop.resize((900, 900), Image.Resampling.LANCZOS)
    mask = Image.new("L", crop.size, 0)
    ImageDraw.Draw(mask).ellipse((0, 0, 899, 899), fill=255)
    out = Image.new("RGBA", crop.size, (255, 255, 255, 0))
    out.paste(crop, (0, 0), mask)
    c.drawImage(ImageReader(out), cx-radius, cy-radius, radius*2, radius*2, mask="auto")


def add_qr(c, value, x, y, size):
    widget = qr.QrCodeWidget(value)
    bounds = widget.getBounds()
    drawing = Drawing(size, size, transform=[size/(bounds[2]-bounds[0]), 0, 0,
                                             size/(bounds[3]-bounds[1]), 0, 0])
    drawing.add(widget)
    c.setFillColor(white)
    c.rect(x-3, y-3, size+6, size+6, fill=1, stroke=0)
    renderPDF.draw(drawing, c, x, y)
    c.linkURL(value, (x-3, y-3, x+size+3, y+size+3), relative=0)


def contact(c, icon_name, text, href, x, y, width):
    icon = ASSETS / f"contact_{icon_name}.png"
    if icon.exists():
        c.drawImage(str(icon), x, y-5, 14, 14, preserveAspectRatio=True, mask="auto")
    else:
        c.setStrokeColor(white); c.setLineWidth(0.8)
        c.roundRect(x, y-4, 14, 13, 3, fill=0, stroke=1)
        c.setFillColor(white); c.setFont("Arial-Bold", 5.2)
        c.drawCentredString(x+7, y, "GH")
    c.setFillColor(white)
    c.setFont("Arial", 7.65)
    c.drawString(x + 22, y, text)
    c.linkURL(href, (x, y-2, x+width, y+9), relative=0)


def compact_list(c, title, lines, x, y, width):
    y = pill(c, x, y, width, title, dark=True) - 10
    for line in lines:
        h = para(c, f"• {line}", x+10, y, width-18, 7.4, 9.4, white)
        y -= h + 2
    return y


def icon_row(c, names, x, y, width, height=23):
    cell = width / len(names)
    for i, name in enumerate(names):
        path = ASSETS / f"{name}.png"
        if path.exists():
            c.drawImage(str(path), x + i*cell + (cell-height)/2, y-height,
                        height, height, preserveAspectRatio=True, mask="auto")
    return y-height


def logo_grid(c, items, x, y_top, width, cols=3, cell_h=38):
    """Logo-first grid: every symbol has its readable name directly below."""
    rows = (len(items) + cols - 1) // cols
    cell_w = width / cols
    for i, (asset_name, label, monogram) in enumerate(items):
        row, col = divmod(i, cols)
        cx = x + col*cell_w + cell_w/2
        top = y_top - row*cell_h
        asset = ASSETS / f"{asset_name}.png" if asset_name else None
        if asset and asset.exists():
            c.drawImage(str(asset), cx-10, top-20, 20, 20,
                        preserveAspectRatio=True, mask="auto")
        else:
            c.setStrokeColor(white); c.setLineWidth(1)
            c.roundRect(cx-9, top-19, 18, 18, 4, fill=0, stroke=1)
            c.setFillColor(white); c.setFont("Arial-Bold", 5.8)
            c.drawCentredString(cx, top-13, monogram)
        c.setFillColor(white); c.setFont("Arial-Bold", 5.35)
        c.drawCentredString(cx, top-29, label)
    return y_top - rows*cell_h


def project(c, number, title, tag, description, tech, links, x, y, width):
    c.setFillColor(BLUE)
    c.setFont("Arial-Bold", 7.7)
    c.drawString(x, y, number)
    c.setFillColor(INK)
    c.setFont("Arial-Bold", 9.0)
    c.drawString(x+20, y, title)
    tag_w = c.stringWidth(tag.upper(), "Arial-Bold", 5.8) + 10
    c.setFillColor(HexColor("#E2EFFC"))
    c.roundRect(x+width-tag_w, y-2, tag_w, 11, 5, fill=1, stroke=0)
    c.setFillColor(BLUE)
    c.setFont("Arial-Bold", 5.8)
    c.drawCentredString(x+width-tag_w/2, y+1, tag.upper())
    y -= 11
    h = para(c, description, x+20, y, width-20, 7.25, 9.15, MUTED)
    y -= h + 5
    c.setFillColor(INK)
    c.setFont("Arial-Bold", 6.5)
    c.drawString(x+20, y, tech)
    link_x = x + width
    for label, href in reversed(links):
        tw = c.stringWidth(label, "Arial-Bold", 6.35)
        link_x -= tw
        c.setFillColor(BLUE)
        c.setFont("Arial-Bold", 6.35)
        c.drawString(link_x, y, label)
        c.linkURL(href, (link_x, y-2, link_x+tw, y+7), relative=0)
        link_x -= 11
    y -= 12
    c.setStrokeColor(LINE)
    c.setLineWidth(0.45)
    c.line(x+20, y, x+width, y)
    return y - 7


def draw_cv():
    register_fonts()
    W, H = A4
    c = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
    c.setTitle("Vincenzo Meccariello - Junior Frontend Developer")
    c.setAuthor("Vincenzo Meccariello")
    c.setSubject("CV - Frontend Development, UI Design e AI-assisted workflow")

    left_w = 228
    header_h = 156
    c.setFillColor(PAPER); c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(BLUE); c.rect(0, 0, left_w, H-header_h, fill=1, stroke=0)
    c.setFillColor(NAVY); c.rect(0, H-header_h, W, header_h, fill=1, stroke=0)

    circle_photo(c, ASSETS / "photo.png", 111, H-133, 101)
    add_qr(c, PORTFOLIO, W-70, H-73, 46)

    c.setFillColor(white)
    c.setFont("Georgia-Bold", 26)
    c.drawString(248, H-54, "VINCENZO")
    c.drawString(248, H-91, "MECCARIELLO")
    c.setFont("Arial-Bold", 10.1)
    c.drawString(258, H-113, "JUNIOR FRONTEND DEVELOPER")
    c.setFont("Arial", 7.9)
    c.drawString(258, H-128, "UI DESIGN  •  FIGMA TO CODE  •  AI-ASSISTED DEVELOPMENT")
    c.setFont("Arial", 6.8)
    c.drawString(258, H-143, "Web design, automazione e problem solving per prodotti digitali chiari.")

    # Sidebar
    # Start below the portrait: contact data no longer competes with the photo.
    sx, sw, sy = 13, left_w-26, H-header_h-74
    sy = pill(c, sx, sy, sw, "CONTATTI", dark=True) - 12
    contact(c, "phone", "327 794 2828", PHONE, sx+12, sy, sw-20); sy -= 17
    contact(c, "email", "Vincenzomec97@gmail.com", EMAIL, sx+12, sy, sw-20); sy -= 17
    contact(c, "location", "Milano", "https://maps.google.com/?q=Milano", sx+12, sy, sw-20); sy -= 17
    contact(c, "linkedin", "LinkedIn", LINKEDIN, sx+12, sy, sw-20); sy -= 17
    contact(c, "github", "GitHub", GITHUB, sx+12, sy, sw-20); sy -= 17
    contact(c, "portfolio", "Portfolio", PORTFOLIO, sx+12, sy, sw-20); sy -= 12

    sy = pill(c, sx, sy, sw, "TECH STACK", dark=True) - 7
    sy = logo_grid(c, [
        ("html", "HTML5", "H5"), ("css", "CSS3", "C3"), ("js", "JavaScript", "JS"),
        ("python", "Python", "PY"), (None, "Git", "GIT"), (None, "GitHub", "GH"),
        (None, "GitHub Pages", "GP"), (None, "Supabase", "SB"), (None, "Vercel", "V"),
    ], sx+8, sy, sw-16, cols=3, cell_h=37) - 3

    sy = pill(c, sx, sy, sw, "DESIGN TOOLS", dark=True) - 7
    sy = logo_grid(c, [
        ("figma", "Figma", "F"), ("photoshop", "Photoshop", "PS"), ("canva", "Canva", "CA"),
    ], sx+12, sy, sw-24, cols=3, cell_h=39) - 3

    sy = pill(c, sx, sy, sw, "AI & DEVELOPMENT TOOLS", dark=True) - 7
    sy = logo_grid(c, [
        ("openai", "OpenAI", "AI"), ("agentic", "Agentic AI", "AG"), (None, "Prompt Engineering", "PE"),
        (None, "Vibe Coding", "VC"), (None, "Automation", "AU"), (None, "VS Code", "VS"),
    ], sx+8, sy, sw-16, cols=3, cell_h=37) - 3

    sy = compact_list(c, "MARKETING", [
        "SEO  •  Digital Marketing",
        "Copywriting base  •  Conversione",
    ], sx, sy, sw) - 3

    sy = pill(c, sx, sy, sw, "LINGUE", dark=True) - 12
    c.setFillColor(white); c.setFont("Arial-Bold", 7.5)
    c.drawString(sx+12, sy, "ITALIANO"); c.drawString(sx+12, sy-15, "INGLESE")
    c.setFillColor(HexColor("#BFDFFF")); c.rect(sx+66, sy-2, 120, 7, fill=1, stroke=0)
    c.setFillColor(white); c.rect(sx+66, sy-17, 64, 7, fill=1, stroke=0)

    # Main content
    mx, mw, my = left_w+20, W-left_w-34, H-header_h-15
    my = pill(c, mx, my, mw, "PROFILO") - 7
    profile = ("Junior Frontend Developer con competenze in <b>Web Design, UI/UX e sviluppo AI-assisted</b>. "
               "Trasformo prototipi Figma in siti, landing page e web app responsive con HTML, CSS e JavaScript, "
               "unendo chiarezza visiva, problem solving e attenzione agli obiettivi digitali.")
    my -= para(c, profile, mx+14, my, mw-28, 8.0, 10.2) + 9

    my = pill(c, mx, my, mw, "PROGETTI") - 10
    projects = [
        ("01", "Portfolio Personale", "Personal Brand",
         "Portfolio responsive con progetti, case study e contenuti dinamici. Obiettivo: rendere il profilo immediatamente valutabile.",
         "HTML • CSS • JavaScript • JSON • GitHub Pages",
         [("DEMO LIVE", PORTFOLIO), ("GITHUB", GITHUB + "/VinMec-portfolio")]),
        ("02", "Sito Aziendale C.M. Pulizie", "Progetto reale",
         "Sito per impresa locale con servizi, preventivo dinamico, WhatsApp e chatbot controllato. Obiettivo: generare contatti.",
         "Figma • HTML • CSS • JavaScript • JSON",
         [("DEMO LIVE", "https://vincenzomec97-ship-it.github.io/cm-pulizie/"),
          ("GITHUB", GITHUB + "/cm-pulizie")]),
        ("03", "Landing Page FitZone", "UI Concept",
         "Landing responsive per palestra con hero, navigazione e call to action. Obiettivo: comunicare energia e guidare all'azione.",
         "Figma • HTML • CSS",
         [("DEMO LIVE", PORTFOLIO + "projects/fitzone/")]),
        ("04", "Shoes Concept", "Figma",
         "Concept e-commerce dedicato alle sneaker con card prodotto, ricerca e navigazione. Obiettivo: esplorare una UI retail riconoscibile.",
         "Figma • UI Design",
         [("PROTOTIPO", "https://www.figma.com/proto/G09Tq8i37addPsCe293DVz/Untitled")]),
        ("05", "Registration Form", "Frontend Practice",
         "Form responsive con campi, checkbox e validazione HTML5. Obiettivo: curare usabilità, struttura e comportamento mobile.",
         "HTML • CSS • HTML5 Validation",
         [("DEMO LIVE", PORTFOLIO + "projects/registration-form/")]),
    ]
    for p in projects:
        my = project(c, *p, mx+8, my, mw-16)

    my = pill(c, mx, my+1, mw, "ESPERIENZE") - 8
    c.setFillColor(INK); c.setFont("Arial-Bold", 8.5)
    c.drawString(mx+14, my, "Junior Web Developer & Designer - Freelance")
    my -= 10
    exp = ("Progettazione di interfacce responsive su Figma; sviluppo di siti e landing page con HTML, CSS e JavaScript; "
           "pubblicazione con GitHub Pages; utilizzo di strumenti AI per ricerca, prototipazione, debugging e revisione del codice.")
    my -= para(c, exp, mx+14, my, mw-28, 7.15, 8.9, MUTED) + 9

    my = pill(c, mx, my, mw, "FORMAZIONE") - 8
    formation = ("<b>Masterclass in Vibe Coding & Agentic AI</b> - Jobformazione  •  "
                 "<b>Graphic & Web Design</b> - Percorso autonomo  •  "
                 "<b>Diploma I.T.E. Informatico</b> - Istituto Tecnico Economico")
    my -= para(c, formation, mx+14, my, mw-28, 7.0, 8.8) + 9

    my = pill(c, mx, my, mw, "CERTIFICAZIONI") - 7
    certs = [
        ("cert_master", "MASTER JOB", "Vibe Coding & Agentic AI"),
        ("cert_fcc", "FREECODECAMP", "Responsive Web Design"),
        ("cert_google", "GOOGLE", "Digital Marketing"),
        ("cert_hubspot", "HUBSPOT", "SEO / AI"),
        ("cert_openai", "OPENAI", "AI / Agentic AI"),
    ]
    col = mw / len(certs)
    for i, (image_name, issuer, cert) in enumerate(certs):
        x = mx + i*col + col/2
        icon = ASSETS / f"{image_name}.png"
        if icon.exists():
            c.drawImage(str(icon), x-11, my-17, 22, 18,
                        preserveAspectRatio=True, mask="auto")
        c.setFillColor(INK); c.setFont("Arial-Bold", 6.05)
        c.drawCentredString(x, my-23, issuer)
        c.setFillColor(MUTED); c.setFont("Arial", 5.75)
        c.drawCentredString(x, my-32, cert)

    # Signature and footer links
    c.setStrokeColor(BLUE); c.setLineWidth(1)
    c.line(mx+mw-118, 19, mx+mw, 19)
    c.setFillColor(INK); c.setFont("Georgia-Bold", 9.2)
    c.drawRightString(mx+mw, 7.5, "Vincenzo Meccariello")
    c.setFillColor(MUTED); c.setFont("Arial", 5.8)
    c.drawString(mx, 8, "Portfolio  •  GitHub  •  LinkedIn")
    c.linkURL(PORTFOLIO, (mx, 5, mx+33, 15), relative=0)
    c.linkURL(GITHUB, (mx+39, 5, mx+70, 15), relative=0)
    c.linkURL(LINKEDIN, (mx+76, 5, mx+112, 15), relative=0)

    c.showPage(); c.save()


if __name__ == "__main__":
    draw_cv()
