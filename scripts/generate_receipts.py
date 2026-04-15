#!/usr/bin/env python3
"""
Generate PDF receipts for Corporate Mundo orders.
Run from project root: python scripts/generate_receipts.py
Output: public/receipts/MUNDO-001.pdf, MUNDO-002.pdf, COOKIES-001..005.pdf
"""

from pathlib import Path

from fpdf import FPDF

# Orders must match src/pages/Profile.jsx
ORDERS = [
    {
        "id": "MUNDO-001",
        "date": "2026-02-18",
        "items": [
            ("Light Snack", 1, 299),
            ("Big Snack", 1, 599),
        ],
    },
    {
        "id": "MUNDO-002",
        "date": "2026-02-18",
        "items": [
            ("Executive Suitcase", 1, 449),
            ("Corporate Telephone", 1, 199),
        ],
    },
    {
        "id": "MUNDO-003",
        "date": "2026-02-18",
        "items": [
            ("Executive Suitcase", 1, 449),
            ("Corporate Telephone", 1, 199),
        ],
    },
]

# Subscription orders must match src/pages/Subscription.jsx
SUBSCRIPTION_ORDERS = [
    {
        "id": f"COOKIES-{str(i).zfill(3)}",
        "date": "2026-03-03",
        "items": [("Cookies", 1, 5)],
    }
    for i in range(1, 6)
]


class ReceiptPDF(FPDF):
    def header(self):
        self.set_font("Helvetica", "B", 18)
        self.cell(0, 12, "Corporate Mundo", 0, 1, "C")
        self.set_font("Helvetica", "", 10)
        self.cell(0, 8, "PUSH PUSH PUSH", 0, 1, "C")
        self.ln(6)

    def footer(self):
        self.set_y(-18)
        self.set_font("Helvetica", "I", 8)
        self.cell(0, 10, "Thank you. Go in. Go forward.", 0, 0, "C")


def generate_receipt(order: dict, out_dir: Path) -> Path:
    pdf = ReceiptPDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=20)

    # Order info
    pdf.set_font("Helvetica", "B", 14)
    pdf.cell(0, 10, f"Order #{order['id']}", 0, 1)
    pdf.set_font("Helvetica", "", 11)
    pdf.cell(0, 8, f"Date: {order['date']}", 0, 1)
    pdf.ln(8)

    # Items
    pdf.set_font("Helvetica", "B", 11)
    pdf.cell(120, 8, "Item", 0, 0)
    pdf.cell(25, 8, "Qty", 0, 0)
    pdf.cell(40, 8, "Amount", 0, 1)
    pdf.set_font("Helvetica", "", 10)

    total = 0
    for name, qty, price in order["items"]:
        subtotal = qty * price
        total += subtotal
        pdf.cell(120, 8, name, 0, 0)
        pdf.cell(25, 8, str(qty), 0, 0)
        pdf.cell(40, 8, f"${subtotal:.2f}", 0, 1)

    pdf.ln(4)
    pdf.set_font("Helvetica", "B", 11)
    pdf.cell(120, 8, "Total", 0, 0)
    pdf.cell(25, 8, "", 0, 0)
    pdf.cell(40, 8, f"${total:.2f}", 0, 1)

    out_path = out_dir / f"{order['id']}.pdf"
    pdf.output(str(out_path))
    return out_path


def main():
    project_root = Path(__file__).resolve().parent.parent
    out_dir = project_root / "public" / "receipts"
    out_dir.mkdir(parents=True, exist_ok=True)

    all_orders = ORDERS + SUBSCRIPTION_ORDERS
    for order in all_orders:
        path = generate_receipt(order, out_dir)
        print(f"Generated {path}")

    print(f"Done. {len(all_orders)} receipt(s) in {out_dir}")


if __name__ == "__main__":
    main()
