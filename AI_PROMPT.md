# Matra AI Data Generation Prompt

Use the following prompt when asking an AI (ChatGPT, Claude, Gemini, etc.) to generate drug data for the Matra system. This prompt ensures the data is perfectly compatible with the latest schema and clinical requirements.

---

## The Prompt

"Please generate clinical drug data for **[INSERT DRUG NAME HERE]** in the following JSON format for my Matra system.

**Requirements:**
1. **Generic Name**: Use the standard generic name as found in the Bangladeshi market.
2. **Age Limits**: The standard pediatric age range is from `0` days to `216` months (18 years).
3. **Formulations**: 
   - Split multiple strengths into separate objects (e.g., 200mg and 400mg tablets should be two separate items).
   - `concentration`: Must be a number. For liquids, calculate it (e.g., 250mg/5ml = 50). For solids (tablets/capsules/suppositories), use the strength value in mg (e.g., 500mg tablet = 500).
4. **Indications**: 
   - Include standard pediatric labels.
   - Units must be precise: "mg/kg/dose", "mg/kg/day", "mcg/kg/min", etc.
   - Frequencies: Use standard abbreviations like "OD", "BD", "TDS", "QDS", "PRN".
5. **Safety**: Provide `maxSingleDose` and `maxDailyDose` based on standard pediatric guidelines (BNF-C/WHO/AAP).
6. **Clinical Notes**: Provide concise instructions. Do NOT include the prefix "Clinical Audit: ".
7. **Metadata**: Include `originalName` and `brands` (as an empty array `[]`) to maintain compatibility with the system's mapping logic.

**JSON Schema:**
```json
{
  "drugName": "Generic Name",
  "ageMinDays": 0,
  "ageMaxMonths": 216,
  "formulations": [
    {
      "type": "syrup/tablet/capsule/injection/suppository",
      "strength": "250mg/5ml",
      "concentration": 50
    }
  ],
  "indications": [
    {
      "label": "Indication Label",
      "dose": 15,
      "unit": "mg/kg/dose",
      "frequency": "TDS",
      "maxSingleDose": 1000,
      "maxDailyDose": 4000,
      "note": "Important clinical instructions or warnings."
    }
  ],
  "originalName": "Generic Name",
  "brands": []
}
```"
