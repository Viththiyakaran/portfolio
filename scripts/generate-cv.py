from pathlib import Path
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "viththiyakaran-nadarajah-cv.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

INK = HexColor("#17211b")
GREEN = HexColor("#174f3b")
MUTED = HexColor("#526158")
TINT = HexColor("#eaf0e7")
LIME = HexColor("#d6ed80")
WHITE = HexColor("#ffffff")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="Name", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=22, leading=24, textColor=WHITE, alignment=TA_LEFT, spaceAfter=5))
styles.add(ParagraphStyle(name="Role", parent=styles["Normal"], fontName="Helvetica", fontSize=11, leading=14, textColor=LIME, spaceAfter=7))
styles.add(ParagraphStyle(name="Contact", parent=styles["Normal"], fontName="Helvetica", fontSize=8.5, leading=11, textColor=WHITE))
styles.add(ParagraphStyle(name="Section", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=11.5, leading=14, textColor=GREEN, spaceBefore=8, spaceAfter=5))
styles.add(ParagraphStyle(name="BodySmall", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.7, leading=12, textColor=INK, spaceAfter=4))
styles.add(ParagraphStyle(name="ItemTitle", parent=styles["BodyText"], fontName="Helvetica-Bold", fontSize=9.2, leading=12, textColor=INK, spaceAfter=2))
styles.add(ParagraphStyle(name="ItemMeta", parent=styles["BodyText"], fontName="Helvetica-Bold", fontSize=8, leading=10, textColor=MUTED, spaceAfter=2))
styles.add(ParagraphStyle(name="BulletSmall", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.5, leading=11.5, leftIndent=10, firstLineIndent=-6, bulletIndent=0, textColor=INK, spaceAfter=2))
styles.add(ParagraphStyle(name="SidebarHead", parent=styles["Heading3"], fontName="Helvetica-Bold", fontSize=10, leading=12, textColor=LIME, spaceBefore=7, spaceAfter=4))
styles.add(ParagraphStyle(name="Sidebar", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.2, leading=11, textColor=WHITE, spaceAfter=3))

def bullet(text):
    return Paragraph(f"&#8226; {text}", styles["BulletSmall"])

def draw_background(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(INK)
    canvas.rect(0, A4[1] - 46 * mm, A4[0], 46 * mm, fill=1, stroke=0)
    canvas.setFillColor(GREEN)
    canvas.rect(0, 0, 57 * mm, A4[1] - 46 * mm, fill=1, stroke=0)
    canvas.setFillColor(WHITE)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawRightString(A4[0] - 15 * mm, 9 * mm, "viththiyakaran.co.uk")
    canvas.restoreState()

doc = BaseDocTemplate(str(OUTPUT), pagesize=A4, leftMargin=0, rightMargin=0, topMargin=0, bottomMargin=0, title="Viththiyakaran Nadarajah CV", author="Viththiyakaran Nadarajah")
header = Frame(17 * mm, A4[1] - 41 * mm, A4[0] - 34 * mm, 31 * mm, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0, id="header")
sidebar = Frame(10 * mm, 15 * mm, 39 * mm, A4[1] - 67 * mm, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0, id="sidebar")
main = Frame(66 * mm, 15 * mm, A4[0] - 81 * mm, A4[1] - 67 * mm, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0, id="main")
doc.addPageTemplates(PageTemplate(id="cv", frames=[header, sidebar, main], onPage=draw_background))

story = [
    Paragraph("Viththiyakaran Nadarajah", styles["Name"]),
    Paragraph("Software Developer and IT Support Professional", styles["Role"]),
    Paragraph("Newtown, Powys, Wales  |  hello@viththiyakaran.co.uk  |  github.com/Viththiyakaran", styles["Contact"]),
]

sidebar_flow = [
    Paragraph("CORE SKILLS", styles["SidebarHead"]),
    Paragraph("C# and .NET", styles["Sidebar"]),
    Paragraph("React and TypeScript", styles["Sidebar"]),
    Paragraph("SQL and relational data", styles["Sidebar"]),
    Paragraph("Application and technical support", styles["Sidebar"]),
    Paragraph("Troubleshooting and root-cause thinking", styles["Sidebar"]),
    Paragraph("AWS cloud foundations", styles["Sidebar"]),
    Spacer(1, 5),
    Paragraph("LOCATION", styles["SidebarHead"]),
    Paragraph("Based in Newtown, Powys. Available for Wales-based, hybrid and suitable UK remote opportunities.", styles["Sidebar"]),
    Spacer(1, 5),
    Paragraph("WORK STATUS", styles["SidebarHead"]),
    Paragraph("Right to work in the UK. No sponsorship required.", styles["Sidebar"]),
    Spacer(1, 5),
    Paragraph("TARGET ROLES", styles["SidebarHead"]),
    Paragraph("Software development", styles["Sidebar"]),
    Paragraph("Application support", styles["Sidebar"]),
    Paragraph("IT and technical support", styles["Sidebar"]),
    Paragraph("Systems support", styles["Sidebar"]),
    Paragraph("Junior cloud roles", styles["Sidebar"]),
]

main_flow = [
    Paragraph("PROFESSIONAL PROFILE", styles["Section"]),
    Paragraph("Software developer and IT professional combining previous software engineering and technical support experience with current UK operational and supervisory responsibility. I build practical .NET and React solutions, investigate business-system issues and approach software around real users, supportability, accessibility and clear operational requirements.", styles["BodySmall"]),
    Paragraph("EXPERIENCE", styles["Section"]),
    KeepTogether([
        Paragraph("UK operational and supervisory experience", styles["ItemTitle"]),
        Paragraph("Current", styles["ItemMeta"]),
        bullet("Leadership, responsibility, compliance awareness and customer service."),
        bullet("Day-to-day problem solving, team coordination and clear operational handovers."),
        bullet("Practical understanding of business processes and the impact of reliable systems.")
    ]),
    Spacer(1, 4),
    KeepTogether([
        Paragraph("Technical support experience", styles["ItemTitle"]),
        Paragraph("Previous experience - employer and dates to be added when verified", styles["ItemMeta"]),
        bullet("Structured investigation, user communication and practical issue resolution."),
        bullet("Support-minded approach to errors, diagnostics, documentation and recovery.")
    ]),
    Spacer(1, 4),
    KeepTogether([
        Paragraph("Software engineering experience", styles["ItemTitle"]),
        Paragraph("Previous experience - employer and dates to be added when verified", styles["ItemMeta"]),
        bullet("Foundation in application development and maintainable software design."),
        bullet("Portfolio work covers C#, .NET, React, TypeScript, SQL, security and accessibility.")
    ]),
    Paragraph("EDUCATION", styles["Section"]),
    Paragraph("MSc IT studies - UWE Bristol", styles["ItemTitle"]),
    Paragraph("Completion status, dates and modules to be added when verified.", styles["ItemMeta"]),
    Paragraph("B.Tech in Software Technology", styles["ItemTitle"]),
    Paragraph("Institution, dates and classification to be added when verified.", styles["ItemMeta"]),
    Paragraph("SELECTED PROJECT EVIDENCE", styles["Section"]),
    Paragraph("<b>QR Facility Access Management System</b> - Architecture case study exploring opaque QR tokens, role-based access, audit events and supportable .NET/React boundaries.", styles["BodySmall"]),
    Paragraph("<b>FuelOps Rota Planning</b> - Concept for accessible weekly rota planning, validation, schedule state and maintainable business workflows.", styles["BodySmall"]),
    Paragraph("Portfolio: https://viththiyakaran.co.uk/projects", styles["BodySmall"]),
]

content = [
    Table([[story]], colWidths=[A4[0] - 34 * mm], style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")])),
    Table([[sidebar_flow, main_flow]], colWidths=[39 * mm, A4[0] - 81 * mm], style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0)]))
]

# Frames consume flowables sequentially, so insert explicit frame breaks.
from reportlab.platypus import FrameBreak
story_final = story + [FrameBreak()] + sidebar_flow + [FrameBreak()] + main_flow
doc.build(story_final)
print(OUTPUT)
