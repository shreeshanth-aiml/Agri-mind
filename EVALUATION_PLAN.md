# AgriMind — Universal Plant Health Assistant: Offline Evaluation Plan

> **Scope & Honesty Statement**: AgriMind does **not** claim to detect all plant diseases or replace laboratory pathology. The system is scoped to a curated registry of 20 Karnataka crops (`src/data/plants.json`) and documented conditions (`src/data/diseases.json`), separating **Visual Observation** from **Knowledge Base (KB) Matching**. While an interactive 5-case regression suite runs inside the app ("Developer Regression Test Mode") to verify deterministic guardrails, full statistical evaluation requires an offline benchmark pipeline described below. This offline benchmark is **planned and documented**, not claimed as already executed inside the browser runtime.

---

## 1. Why Lab Datasets (e.g., PlantVillage) Are Insufficient

1. **Background & Lighting Bias**: Standard public datasets such as PlantVillage consist of detached leaves photographed indoors against uniform grey/black paper backgrounds. Models trained or evaluated solely on PlantVillage suffer severe accuracy drops (often >40% degradation) on real smartphone photos taken in Karnataka fields with soil, weeds, harsh midday glare, shadows, and overlapping foliage.
2. **Absence of Non-Infectious & Look-Alike Conditions**: Field symptoms frequently arise from sap-sucking insect honeydew (*sooty mould*), epiphytic algal crusts, nutrient deficiencies (N, K, Mg), pesticide burn, or moisture stress rather than primary fungal/bacterial pathogens.
3. **Plot-Level Leakage**: Splitting multiple photos of the same plant or same farmer plot across train and test sets inflates metrics through background memorization.

---

## 2. Held-Out Field Dataset Protocol (No Train/Test Leakage)

- **Source Composition**:
  - Real field images collected across Karnataka agro-climatic zones (KVK submissions, UAS Bengaluru/Dharwad field trials, and open field benchmarks such as PlantDoc).
  - Stratified across all 20 registry crops plus **Out-of-Distribution (OOD)** plant species (weeds, ornamentals, forest trees) and **Unknown/Unlisted Conditions**.
- **Strict Group Split (Zero Leakage)**:
  - Partitioning is performed by `farmer_plot_id + date_session` so no two images from the same field visit appear in both reference/calibration and held-out test splits.
- **Ground-Truth Annotation Tiering**:
  - **Tier 1 (Lab/PCR/Microscopy Confirmed)**: Required for evaluating viral, phytoplasma, and vascular bacterial wilt cases.
  - **Tier 2 (Dual Extension Agronomist Consensus)**: Independent sign-off by two KVK/university plant protection specialists inspecting both upper/lower leaf surfaces and whole-plant context.

---

## 3. Quantitative Metrics to Report Offline

### A. Per-Plant & Per-Condition Classification Metrics
- **Macro and Per-Class Precision, Recall, and F1-Score** across each of the 20 registry crops and each documented KB condition.
- **Multi-Label / Top-$k$ Recall ($k \in \{1, 3\}$)** for Decision State B (*"Possible conditions"*), measuring whether the true condition appears within the top 3 differential candidates when single-photo evidence is ambiguous.

### B. Confusion Matrix Analysis
- Cross-tabulation specifically tracking high-risk agronomic confusions:
  - *Glossy black saprophytic/sooty mould or algal spots* vs. *Alternaria Early Blight* (must remain 0% false Early Blight calls).
  - *Abiotic Potassium marginal scorch* vs. *Bacterial Leaf Blight*.
  - *Mite/Thrips leaf curl* vs. *Begomovirus Leaf Curl (TYLCV)*.

### C. Unknown-Condition & Out-of-Scope Detection Rate (AUROC / FPR@95%TPR)
- **Crop Mismatch Rejection Rate**: Percentage of non-matching plant photos correctly halted at Step 1 before disease matching.
- **Unknown-Condition Recall (State D)**: Percentage of conditions not in `diseases.json` that correctly land in **State D ("Unknown condition")** or **State C ("Inconclusive")** rather than being force-fitted into a named KB disease.

### D. False-Diagnosis Rate & High-Confidence Error Rate (Critical Safety Metric)
- **False State-A Rate**: Proportion of held-out test cases where the pipeline outputs **State A ("Likely match", $\ge 80\%$)** for an incorrect condition. Because State A unlocks reviewed chemical active-ingredient guidance, the target False State-A Rate is $< 2\%$.
- **State E Routing Accuracy**: Proportion of viral/phytoplasma cases (`imageRecognitionSupported: false`) properly routed to **State E ("Documented but needs expert confirmation")** with zero chemical cure recommendations.

### E. Confidence Calibration
- **Expected Calibration Error (ECE)** and **Reliability Diagrams** comparing predicted confidence bins ($[0\text{–}39], [40\text{–}59], [60\text{–}79], [80\text{–}100]$) against empirical accuracy on held-out field photos.

---

## 4. Environmental & Image-Quality Stratification

Evaluate all metrics above across stratified slices:
1. **Lighting Conditions**: Harsh midday sun (glare), overcast daylight, shade, and low-light dusk.
2. **Background Complexity**: Cluttered soil/weed background, hand-held leaf, vs. close-up lamina.
3. **Single-Photo vs. Multi-Photo Evidence**: Comparing diagnostic resolution with 1 photo (`leaf_upper` only) vs. 3 photos (`leaf_upper` + `leaf_underside` + `whole_plant`).

---

## 5. Rare-Disease & System Limitations

- Conditions with $< 30$ verified field samples in a given Karnataka agro-climatic zone cannot be statistically validated for automated visual recognition and must keep `imageRecognitionSupported: false` and `reviewStatus: "draft"` in `src/data/diseases.json`.
- Root pathogens, nematodes, vascular wilts, and latent viral complexes require physical stem-sectioning, root washing, or KVK laboratory assays and are explicitly flagged under **"What would settle it"** on the result screen.
