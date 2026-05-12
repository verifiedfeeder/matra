# PediDose AI Data Generation Prompt

Use the following prompt when asking an AI (ChatGPT, Claude, etc.) to generate drug data for the PediDose system.

---

## The Prompt

"Please generate clinical drug data for **[INSERT DRUG NAME HERE]** in the following JSON format for my PediDose system. 

**Requirements:**
1. **concentration**: Must be a number (mg/ml) calculated from strength (e.g., 250mg/5ml = 50).
2. **Numerical Values**: `ageMinDays`, `ageMaxMonths`, `dose`, `concentration`, `maxSingleDose`, and `maxDailyDose` must be numbers, NOT strings.
3. **Indications**: Include standard pediatric labels, units (e.g., "mg/kg/dose" or "mg/kg/day"), and common frequencies (e.g., "OD", "BD", "TDS", "QDS").
4. **Safety**: Include `maxSingleDose` and `maxDailyDose` based on standard pediatric guidelines (BNF-C/WHO).

**JSON Schema:**
```json
{
  "drugName": "Full Drug Name",
  "ageMinDays": 0,
  "ageMaxMonths": 144,
  "formulations": [
    {
      "type": "syrup/tablet/injection",
      "strength": "250mg/5ml",
      "concentration": 50
    }
  ],
  "indications": [
    {
      "label": "Indication Name",
      "dose": 15,
      "unit": "mg/kg/dose",
      "frequency": "TDS",
      "maxSingleDose": 1000,
      "maxDailyDose": 4000,
      "note": "Clinical notes or warnings"
    }
  ]
}
```"
