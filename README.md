# মাত্রা · MATRA
**Paediatric Drug Dose Calculator**
*Precise. Offline-ready. Built for clinical use in Bangladesh.*

---

## What is MATRA?

MATRA (মাত্রা) is a free, browser-based paediatric drug dose calculator designed for doctors, medical officers, and clinical staff. It calculates weight-based doses, applies maximum dose capping automatically, and shows available brand information for the Bangladeshi market — all without requiring an internet connection after the first load.

---

## How to Use

### Step 1 — Enter Patient Age
Fill in the patient's age using the **Years / Months / Weeks / Days** fields. You only need to fill what you know — leave the rest at zero. On mobile, the cursor moves to the next field automatically as you type.

### Step 2 — Enter Patient Weight
Type the weight in **kilograms**. If you leave the weight field empty, MATRA will estimate it from the age using a standard paediatric formula and show an **(Est.)** badge so you know it was calculated, not measured. Always use a measured weight when available.

### Step 3 — Search for a Drug
Tap or click the **Drug Search** box and start typing the generic name. You can also search by **brand name** — the result will show the matching brand below the drug name. Tap the drug to select it.

### Step 4 — Select Indication and Formulation
Once a drug is selected, two dropdowns will appear:
- **Indication** — the clinical reason for prescribing (e.g. Fever, Infection). Different indications may have different dose targets.
- **Formulation** — the available form and strength (e.g. Syrup 120mg/5ml, Tablet 500mg).

Select both to generate the result.

### Step 5 — Read the Result

| Field | What it means |
|---|---|
| **Dose** | The practical rounded dose to give (e.g. *5 ml*, *1 tablet*) |
| **Exact** | The mathematically precise volume before rounding |
| **Frequency** | How often to give the dose (e.g. TDS = three times daily) |
| **Target Dose** | The mg/kg/dose used for this calculation |
| **Calculated** | The raw mg calculated from weight × dose |
| **Precise Volume** | Exact ml before practical rounding |
| **Clinical Notes** | Important instructions or warnings for this drug and indication |

> If the calculated dose exceeds the maximum single dose or maximum daily dose, MATRA caps it automatically and shows an orange warning.

### Step 6 — Copy or Move On
- Tap **Copy Prescription** to copy a summary line to your clipboard, ready to paste into a notes app, EMR, or messaging tool.
- Tap **↺ New Patient** in the top right to clear all fields for the next patient.

---

## Key Features

- **Works offline** — after opening once, MATRA works without internet. If you're offline, a banner will appear confirming cached data is in use.
- **Brand search** — search by brand name (e.g. "Napa") and MATRA will find the generic drug.
- **Available brands panel** — shows brands available in the BD market with strength, form, and price where data is available.
- **Auto weight estimation** — if weight is unknown, age-based estimation is used with a clear visual indicator.
- **Maximum dose safety** — all calculations respect per-dose and per-day capping with visible warnings.
- **Keyboard friendly** — use ↑ ↓ arrows in the search dropdown, Enter to select, Escape to close.
- **Installable** — on Android or iOS, open MATRA in your browser and use "Add to Home Screen" to install it like an app. It will work fully offline once installed.

---

## Drug Database

MATRA uses a curated database of paediatric drugs with age-appropriate filtering. Drugs outside the patient's age range are automatically excluded from the dropdown. The database is periodically updated.

> **Important:** MATRA is a clinical decision support tool, not a replacement for clinical judgement. Always verify doses against current guidelines, especially for neonates, critically ill patients, or drugs with narrow therapeutic indices.

---

## Compatibility

| Platform | Status |
|---|---|
| Android (Chrome) | ✓ Full support, installable |
| iOS (Safari) | ✓ Full support, installable |
| Desktop (Chrome, Edge, Firefox) | ✓ Full support |
| Offline use | ✓ After first load |

---

## Privacy

MATRA runs entirely in your browser. No patient data is sent to any server. No accounts, no tracking, no data collection of any kind.

---

## Feedback

If you find a dosing error, a missing drug, or a bug, please open an issue on this repository or contact the maintainer directly.

---

*Developed for clinical use in Bangladesh · Free to use · Not for commercial distribution*
