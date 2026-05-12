# Matra (মাত্রা) | Pediatric Drug Dose Calculator

**Matra (মাত্রা)** is a high-precision, modular pediatric drug dose calculator designed with a "Terminal-meets-Swiss-Design" aesthetic. It provides clinicians with accurate, rounded, and practical dosing information based on age and weight.

## ✨ Key Features

- **Anti-Clinic Aesthetic**: Sophisticated high-contrast dark mode with "Electric Lime" accents.
- **High-Precision Inputs**: Precise age input (Years, Months, Weeks, Days) with automatic weight estimation using APLS formulas.
- **Smart Search**: Hybrid "Search-as-you-type" drug database filtering with keyboard navigation support.
- **Practical Dose Engine**: Automatically rounds volumes to clinically useful fractions (1.0, 0.5, 0.33, 0.25) and provides Teaspoon (TSF) equivalents.
- **Safety Guardrails**: Built-in clinical audit for age limits and maximum dose capping (Single & Daily).

## 🛠 Technical Stack

- **Frontend**: Single-file HTML5, CSS3 (Variables, Flexbox, Grid), and Vanilla JavaScript.
- **Data**: JSON-based modular database (`drugs.json`).
- **Typography**: Inter (UI) and JetBrains Mono (Technical Data).

## 🚀 Deployment

This app is designed to be hosted on **GitHub Pages**.

1. Upload `index.html`, `drugs.json`, and `manifest.json` to a GitHub repository.
2. Enable GitHub Pages in **Settings > Pages**.

## 📝 AI Data Generation

New drug data can be generated using the structured prompt provided in `AI_PROMPT.md` with any advanced LLM (Claude, ChatGPT).

---

*Disclaimer: This tool is intended for educational and reference purposes only. Always verify doses against local clinical guidelines before administration.*
