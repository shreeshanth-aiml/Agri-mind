export interface CandidateDisease {
  id: string;
  nameEn: string;
  nameKn: string;
  pathogen: string;
  seasonAffinity: string[];
  keyVisualSignsEn: string[];
  keyVisualSignsKn: string[];
  safeCareGuidanceEn: string[];
  safeCareGuidanceKn: string[];
  highConfidenceTreatmentEn: string;
  highConfidenceTreatmentKn: string;
  preventionEn: string;
  preventionKn: string;
}

export interface CropDiseaseProfile {
  cropEn: string;
  cropKn: string;
  candidates: CandidateDisease[];
}

export const REGIONAL_DISEASE_DB: Record<string, CropDiseaseProfile> = {
  Tomato: {
    cropEn: 'Tomato',
    cropKn: 'ಟೊಮೇಟೊ',
    candidates: [
      {
        id: 'early_blight',
        nameEn: 'Early Blight',
        nameKn: 'ಮುಂಚಿನ ಅಂಗಮಾರಿ ರೋಗ (Early Blight)',
        pathogen: 'Alternaria solani',
        seasonAffinity: ['Kharif', 'Rabi'],
        keyVisualSignsEn: ['Concentric target-board rings on older leaves', 'Yellow chlorotic halo around brown spots', 'Lower canopy leaf drying'],
        keyVisualSignsKn: ['ಕೆಳಗಿನ ಎಲೆಗಳಲ್ಲಿ ವೃತ್ತಾಕಾರದ ಕಂದು ಬಣ್ಣದ ಉಂಗುರ ಕಲೆಗಳು', 'ಕಲೆಗಳ ಸುತ್ತ ಹಳದಿ ಬಣ್ಣದ ವೃತ್ತ (Halo)', 'ಹಳೆಯ ಎಲೆಗಳು ಒಣಗುವುದು'],
        safeCareGuidanceEn: ['Prune off heavily infected lower leaves and safely destroy away from field', 'Avoid overhead sprinkler watering to keep leaves dry', 'Ensure at least 60cm row spacing for good air circulation'],
        safeCareGuidanceKn: ['ಸೋಂಕಿತ ಕೆಳಗಿನ ಎಲೆಗಳನ್ನು ತಕ್ಷಣ ಕಿತ್ತು ಜಮೀನಿನಿಂದ ದೂರ ಸುಟ್ಟುಹಾಕಿ', 'ಎಲೆಗಳ ಮೇಲೆ ನೇರವಾಗಿ ನೀರು ಬೀಳದಂತೆ ಬುಡಕ್ಕೆ ಮಾತ್ರ ನೀರು ಹಾಯಿಸಿ', 'ಗಾಳಿ ಬೆಳಕು ಚೆನ್ನಾಗಿ ಆಡುವಂತೆ ಗಿಡಗಳ ನಡುವೆ ಅಂತರ ಕಾಪಾಡಿ'],
        highConfidenceTreatmentEn: 'Spray Mancozeb 75% WP @ 2.5g/L or Chlorothalonil @ 2g/L. Repeat after 10-12 days if wet weather persists.',
        highConfidenceTreatmentKn: 'ಮ್ಯಾಂಕೋಜೆಬ್ ೭೫% ಡಬ್ಲ್ಯೂಪಿ (೨.೫ ಗ್ರಾಂ/ಲೀಟರ್ ನೀರಿಗೆ) ಅಥವಾ ಕ್ಲೋರೋಥಲೋನಿಲ್ (೨ ಗ್ರಾಂ/ಲೀಟರ್) ಸಿಂಪಡಿಸಿ. ತೇವ ವಾತಾವರಣವಿದ್ದರೆ ೧೦ ದಿನಗಳ ನಂತರ ಮರುಸಿಂಪಡಿಸಿ.',
        preventionEn: 'Follow 2-year crop rotation with non-solanaceous crops (millets/pulses). Apply Trichoderma viride enriched FYM during soil preparation.',
        preventionKn: 'ದ್ವಿದಳ ಧಾನ್ಯ ಅಥವಾ ರಾಗಿಯೊಂದಿಗೆ ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ. ಬಿತ್ತನೆ ಮುನ್ನ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರದೊಂದಿಗೆ ಟ್ರೈಕೋಡರ್ಮಾ ಸೇರಿಸಿ.',
      },
      {
        id: 'late_blight',
        nameEn: 'Late Blight',
        nameKn: 'ತಡವಾದ ಅಂಗಮಾರಿ ರೋಗ (Late Blight)',
        pathogen: 'Phytophthora infestans',
        seasonAffinity: ['Kharif', 'Rabi'],
        keyVisualSignsEn: ['Water-soaked dark lesions rapidly enlarging', 'White downy fungal growth on underside in high humidity', 'Sudden leaf and stem collapse'],
        keyVisualSignsKn: ['ಎಲೆಗಳ ಅಂಚಿನಲ್ಲಿ ನೀರುಗುಳ್ಳೆಯಂತಹ ಗಾಢ ಕಪ್ಪು ಕಲೆಗಳು', 'ತೇವಾಂಶವಿದ್ದಾಗ ಎಲೆಯ ಕೆಳಭಾಗದಲ್ಲಿ ಬಿಳಿಯ ಶಿಲೀಂಧ್ರ ಬೆಳವಣಿಗೆ', 'ಕಾಂಡ ಮತ್ತು ಎಲೆಗಳು ದಿಢೀರನೆ ಕಪ್ಪಾಗಿ ಕುಸಿಯುವುದು'],
        safeCareGuidanceEn: ['Remove and bury infected plants immediately', 'Improve furrow drainage so standing water does not accumulate', 'Sanitize hands and harvesting tools before touching healthy plants'],
        safeCareGuidanceKn: ['ರೋಗಗ್ರಸ್ಥ ಸಸಿಗಳನ್ನು ಬೇರು ಸಹಿತ ಕಿತ್ತು ಮಣ್ಣಿನಲ್ಲಿ ಹೂತುಹಾಕಿ', 'ಹೊಲದಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ಬಸಿಗಾಲುವೆ ಸರಿಪಡಿಸಿ', 'ಸೋಂಕಿತ ಗಿಡ ಮುಟ್ಟಿದ ಕೈಗಳಿಂದ ಆರೋಗ್ಯಕರ ಗಿಡಗಳನ್ನು ಮುಟ್ಟಬೇಡಿ'],
        highConfidenceTreatmentEn: 'Spray Metalaxyl 8% + Mancozeb 64% WP @ 2.5g/L or Cymoxanil + Mancozeb @ 2g/L. Ensure spray reaches leaf undersides.',
        highConfidenceTreatmentKn: 'ಮೆಟಾಲಾಕ್ಸಿಲ್ ೮% + ಮ್ಯಾಂಕೋಜೆಬ್ ೬೪% ಡಬ್ಲ್ಯೂಪಿ (೨.೫ ಗ್ರಾಂ/ಲೀಟರ್) ಎಲೆಯ ಕೆಳಭಾಗ ಸಂಪೂರ್ಣ ಒದ್ದೆಯಾಗುವಂತೆ ಸಿಂಪಡಿಸಿ.',
        preventionEn: 'Avoid planting tomato near potato fields. Maintain raised beds and plant certified blight-tolerant hybrids.',
        preventionKn: 'ಆಲೂಗಡ್ಡೆ ಹೊಲದ ಪಕ್ಕ ಟೊಮೇಟೊ ಬೆಳೆಯಬೇಡಿ. ಬದುಗಳ ಮೇಲೆ ಕೃಷಿ ಮಾಡಿ ರೋಗನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬಳಸಿ.',
      },
      {
        id: 'leaf_curl',
        nameEn: 'Tomato Yellow Leaf Curl Virus (TYLCV)',
        nameKn: 'ಎಲೆ ಮುದುಡು ವೈರಸ್ ರೋಗ (Leaf Curl)',
        pathogen: 'Begomovirus (Whitefly vector)',
        seasonAffinity: ['Kharif', 'Rabi', 'Zaid'],
        keyVisualSignsEn: ['Upward curling of leaf margins', 'Pronounced interveinal yellowing (chlorosis)', 'Stunted plant growth with small bunched leathery leaves'],
        keyVisualSignsKn: ['ಎಲೆಯ ಅಂಚುಗಳು ಮೇಲ್ಮುಖವಾಗಿ ಮುದುಡಿಕೊಳ್ಳುವುದು', 'ಎಲೆಯ ನರಗಳ ನಡುವೆ ಹಳದಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗುವುದು', 'ಗಿಡ ಕುಬ್ಜವಾಗುವುದು ಮತ್ತು ಚಿಕ್ಕ ಎಲೆಗಳ ಗುಚ್ಛ ಉಂಟಾಗುವುದು'],
        safeCareGuidanceEn: ['Uproot and destroy early virus-stunted plants to prevent spread', 'Install yellow sticky traps (15-20 traps/acre) to monitor whitefly vectors', 'Remove alternative weed hosts (Parthenium) from field borders'],
        safeCareGuidanceKn: ['ವೈರಸ್ ತಗುಲಿದ ಗಿಡಗಳನ್ನು ಆರಂಭದಲ್ಲೇ ಕಿತ್ತು ನಾಶಪಡಿಸಿ', 'ಬಿಳಿ ನೊಣ ನಿಯಂತ್ರಣಕ್ಕೆ ಹಳದಿ ಜಿಗುಟು ಬಲೆಗಳನ್ನು (ಎಕರೆಗೆ ೧೫-೨೦) ಅಳವಡಿಸಿ', 'ಹೊಲದ ಬದುಗಳಲ್ಲಿರುವ ಕಳೆ ಗಿಡಗಳನ್ನು (ಕಾಂಗ್ರೆಸ್ ಕಳೆ) ಕಿತ್ತುಹಾಕಿ'],
        highConfidenceTreatmentEn: 'Viral diseases cannot be cured chemically once inside plant; control whitefly vector using Neem oil 10,000 ppm @ 3ml/L or Imidacloprid 17.8 SL @ 0.5ml/L.',
        highConfidenceTreatmentKn: 'ವೈರಸ್ ಒಳಸೇರಿದ ನಂತರ ಗುಣಪಡಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ; ಬಿಳಿ ನೊಣ ಹರಡದಂತೆ ಬೇವಿನ ಎಣ್ಣೆ (೩ ಮಿಲಿ/ಲೀ) ಅಥವಾ ಇಮಿಡಾಕ್ಲೋಪ್ರಿಡ್ (೦.೫ ಮಿಲಿ/ಲೀ) ಸಿಂಪಡಿಸಿ.',
        preventionEn: 'Use 40-mesh nylon net nursery cages. Plant resistant varieties like Arka Rakshak or Arka Abhed.',
        preventionKn: 'ನರ್ಸರಿಯಲ್ಲಿ ನೈಲಾನ್ ನೆಟ್ ಕವರ್ ಬಳಸಿ ಸಸಿ ಬೆಳೆಸಿ. ಅರ್ಕಾ ರಕ್ಷಕ್ ಅಥವಾ ಅರ್ಕಾ ಅಭೇದ್ ರೋಗನಿರೋಧಕ ತಳಿ ಬೆಳೆಯಿರಿ.',
      },
      {
        id: 'bacterial_spot',
        nameEn: 'Bacterial Spot',
        nameKn: 'ದುಂಡಾಣು ಎಲೆ ಚುಕ್ಕೆ ರೋಗ (Bacterial Spot)',
        pathogen: 'Xanthomonas campestris',
        seasonAffinity: ['Kharif', 'Rabi'],
        keyVisualSignsEn: ['Small angular water-soaked spots turning black with yellow margins', 'Scabby spots on green fruit', 'Premature defoliation'],
        keyVisualSignsKn: ['ಕೋನೀಯ ಆಕಾರದ ಸಣ್ಣ ನೀರಿನ ಚುಕ್ಕೆಗಳು ನಂತರ ಕಪ್ಪಾಗುವುದು', 'ಹಸಿರು ಕಾಯಿಗಳ ಮೇಲೆ ಹುರುಪಿನಂತಹ ಕಪ್ಪು ಚುಕ್ಕೆಗಳು', 'ಎಲೆಗಳು ಉದುರುವುದು'],
        safeCareGuidanceEn: ['Avoid cultivating field when foliage is wet', 'Disinfect pruning shears in 10% bleach solution between rows', 'Mulch soil with dry straw to prevent soil splashing'],
        safeCareGuidanceKn: ['ಎಲೆಗಳ ಮೇಲೆ ಮಳೆ ಹನಿ ಇರುವಾಗ ಜಮೀನಿನಲ್ಲಿ ಕೆಲಸ ಮಾಡಬೇಡಿ', 'ಕತ್ತರಿಗಳನ್ನು ಬ್ಲೀಚ್ ದ್ರಾವಣದಲ್ಲಿ ತೊಳೆದು ಬಳಸಿ', 'ಮಣ್ಣು ಎಲೆಯ ಮೇಲೆ ಚಿಮ್ಮದಂತೆ ಒಣಹುಲ್ಲಿನ ಹೊದಿಕೆ (ಮಲ್ಚಿಂಗ್) ಮಾಡಿ'],
        highConfidenceTreatmentEn: 'Copper Oxychloride 50% WP @ 2.5g/L + Streptocycline @ 0.1g/L (1g per 10 Liters water) during early symptom onset.',
        highConfidenceTreatmentKn: 'ಕಾಪರ್ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ (೨.೫ ಗ್ರಾಂ/ಲೀ) ಜೊತೆಗೆ ಸ್ಟ್ರೆಪ್ಟೋಸೈಕ್ಲಿನ್ (೧ ಗ್ರಾಂ / ೧೦ ಲೀಟರ್ ನೀರಿಗೆ) ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.',
        preventionEn: 'Treat seed with hot water (50°C for 25 min) or buy certified disease-free seeds. Avoid overhead irrigation.',
        preventionKn: 'ಬೀಜೋಪಚಾರ ಮಾಡಿದ ಪ್ರಮಾಣಿತ ಬೀಜಗಳನ್ನು ಮಾತ್ರ ಬಳಸಿ. ಹನಿ ನೀರಾವರಿ ಪದ್ಧತಿ ಅಳವಡಿಸಿ.',
      },
    ],
  },
  Maize: {
    cropEn: 'Maize',
    cropKn: 'ಮೆಕ್ಕೆಜೋಳ',
    candidates: [
      {
        id: 'turcicum_blight',
        nameEn: 'Turcicum Leaf Blight',
        nameKn: 'ಟರ್ಸಿಕಮ್ ಎಲೆ ಅಂಗಮಾರಿ ರೋಗ',
        pathogen: 'Exserohilum turcicum',
        seasonAffinity: ['Kharif', 'Rabi'],
        keyVisualSignsEn: ['Long elliptical boat-shaped grayish-green to tan lesions', 'Lesions parallel to leaf veins up to 10-15 cm', 'Entire leaf blighting under cool humid conditions'],
        keyVisualSignsKn: ['ಎಲೆಗಳ ಮೇಲೆ ದೋಣಿಯ ಆಕಾರದ ಉದ್ದವಾದ ಬೂದು-ಕಂದು ಕಲೆಗಳು', 'ನರಗಳಿಗೆ ಸಮಾನಾಂತರವಾಗಿ ಬೆಳೆಯುವ ೧೦-೧೫ ಸೆಂ.ಮೀ ಕಲೆಗಳು', 'ಎಲೆಗಳು ಸುಟ್ಟಂತೆ ಒಣಗುವುದು'],
        safeCareGuidanceEn: ['Avoid dense plant populations to maintain inter-row ventilation', 'Deep summer ploughing to bury crop debris', 'Balance nitrogen application with recommended potash'],
        safeCareGuidanceKn: ['ಸಸಿಗಳು ತುಂಬಾ ಒತ್ತಾಗದಂತೆ ಸಾಲಿನ ಅಂತರ ಕಾಪಾಡಿ', 'ಬೇಸಿಗೆಯಲ್ಲಿ ಆಳವಾದ ಉಳುಮೆ ಮಾಡಿ ಹಳೆಯ ಕಸ ಹೂತುಹಾಕಿ', 'ಸಾರಜನಕದ ಜೊತೆಗೆ ಪೊಟ್ಯಾಷ್ ಗೊಬ್ಬರವನ್ನು ಸಮತೋಲನದಲ್ಲಿ ನೀಡಿ'],
        highConfidenceTreatmentEn: 'Spray Mancozeb 75% WP @ 2.5g/L or Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1ml/L at first appearance of spots.',
        highConfidenceTreatmentKn: 'ಕಲೆಗಳು ಕಂಡ ತಕ್ಷಣ ಮ್ಯಾಂಕೋಜೆಬ್ (೨.೫ ಗ್ರಾಂ/ಲೀ) ಅಥವಾ ಅಜೋಕ್ಸಿಸ್ಟ್ರೋಬಿನ್ + ಡೈಫೆನೊಕೊನಜೋಲ್ (೧ ಮಿಲಿ/ಲೀ) ಸಿಂಪಡಿಸಿ.',
        preventionEn: 'Grow resistant cultivars like NAC-6002 or Nityashree. Treat seeds with Carboxin + Thiram @ 2g/kg.',
        preventionKn: 'ಎನ್ಎಸಿ-೬೦೦೨ ಅಥವಾ ನಿತ್ಯಶ್ರೀ ರೋಗನಿರೋಧಕ ತಳಿ ಬಳಸಿ. ಕಾರ್ಬಾಕ್ಸಿನ್ + ಥೀರಮ್ ಬಳಸಿ ಬೀಜೋಪಚಾರ ಮಾಡಿ.',
      },
      {
        id: 'common_rust',
        nameEn: 'Common Rust',
        nameKn: 'ಮೆಕ್ಕೆಜೋಳ ಸಾಮಾನ್ಯ ತುಕ್ಕು ರೋಗ (Common Rust)',
        pathogen: 'Puccinia sorghi',
        seasonAffinity: ['Kharif', 'Rabi'],
        keyVisualSignsEn: ['Small circular to elongate cinnamon-brown pustules on both leaf surfaces', 'Powdery brown spores rubbing off on fingers', 'Severe chlorosis of heavily pustuled leaves'],
        keyVisualSignsKn: ['ಎಲೆಯ ಎರಡೂ ಬದಿಗಳಲ್ಲಿ ಸಣ್ಣ ಕೆಂಪು-ಕಂದು ಬಣ್ಣದ ಪುಡಿಯಂತಹ ಬೊಕ್ಕೆಗಳು', 'ಬೆರಳಿನಿಂದ ಮುಟ್ಟಿದಾಗ ಕಂದು ಬಣ್ಣದ ಪುಡಿ ಅಂಟಿಕೊಳ್ಳುವುದು', 'ಎಲೆಗಳು ಹಳದಿಯಾಗಿ ಒಣಗುವುದು'],
        safeCareGuidanceEn: ['Remove volunteer corn plants around field borders', 'Ensure balanced soil potassium to enhance plant epidermal strength', 'Avoid late planting in endemic zones'],
        safeCareGuidanceKn: ['ಹೊಲದ ಸುತ್ತ ಬೆಳೆದಿರುವ ಹಳೆಯ ಮೆಕ್ಕೆಜೋಳ ಗಿಡಗಳನ್ನು ತೆಗೆಯಿರಿ', 'ಗಿಡದ ರೋಗನಿರೋಧಕ ಶಕ್ತಿ ಹೆಚ್ಚಿಸಲು ಸಮರ್ಪಕ ಪೊಟ್ಯಾಷ್ ನೀಡಿ', 'ಋತುಮಾನಕ್ಕೆ ತಕ್ಕಂತೆ ಸರಿಯಾದ ಸಮಯದಲ್ಲಿ ಬಿತ್ತನೆ ಮಾಡಿ'],
        highConfidenceTreatmentEn: 'Spray Propiconazole 25% EC (Tilt) @ 1ml/L or Mancozeb @ 2.5g/L if pustules cover >5% of ear leaf area.',
        highConfidenceTreatmentKn: 'ತುಕ್ಕು ಕಲೆಗಳು ಹೆಚ್ಚಾದರೆ ಪ್ರೊಪಿಕೊನಜೋಲ್ (ಟಿಲ್ಟ್ - ೧ ಮಿಲಿ/ಲೀ) ಅಥವಾ ಮ್ಯಾಂಕೋಜೆಬ್ (೨.೫ ಗ್ರಾಂ/ಲೀ) ಸಿಂಪಡಿಸಿ.',
        preventionEn: 'Plant certified rust-resistant hybrids. Avoid late planting which exposes young crops to airborne spore showers.',
        preventionKn: 'ಪ್ರಮಾಣಿತ ತುಕ್ಕು ನಿರೋಧಕ ಹೈಬ್ರಿಡ್ ಬೀಜಗಳನ್ನು ಬಳಸಿ.',
      },
      {
        id: 'fall_armyworm',
        nameEn: 'Fall Armyworm (FAW) Damage',
        nameKn: 'ಲದ್ದಿ ಹುಳು ಹಾನಿ (Fall Armyworm)',
        pathogen: 'Spodoptera frugiperda (Insect pest)',
        seasonAffinity: ['Kharif', 'Rabi', 'Zaid'],
        keyVisualSignsEn: ['Window-pane feeding marks on young leaves', 'Shot-hole appearance on expanded leaves', 'Copious sawdust-like frass inside the central whorl'],
        keyVisualSignsKn: ['ಚಿಕ್ಕ ಎಲೆಗಳ ಮೇಲೆ ಕಿಟಕಿಯಂತಹ ಪಾರದರ್ಶಕ ರಂಧ್ರಗಳು', 'ದೊಡ್ಡ ಎಲೆಗಳಲ್ಲಿ ಗುಂಡಿನ ಚೂರಾದಂತಹ ರಂಧ್ರಗಳು', 'ಗಿಡದ ಸುಳಿಯೊಳಗೆ ಮರದ ಪುಡಿಯಂತಹ ಹಿಕ್ಕೆ (Frass)'],
        safeCareGuidanceEn: ['Hand-pick egg masses and caterpillars in early stages', 'Apply sand + wood ash (9:1) directly into central whorls to suffocate larvae', 'Install pheromone traps @ 5 traps/acre for pest monitoring'],
        safeCareGuidanceKn: ['ಆರಂಭದಲ್ಲೇ ಮೊಟ್ಟೆ ಹಾಗೂ ಮರಿ ಹುಳುಗಳನ್ನು ಹೆಕ್ಕಿ ನಾಶಪಡಿಸಿ', 'ಗಿಡದ ಸುಳಿಗೆ ಮರಳು ಮತ್ತು ಬೂದಿಯ ಮಿಶ್ರಣವನ್ನು (೯:೧) ಹಾಕಿ', 'ಎಕರೆಗೆ ೫ ಮೋಹಕ ಬಲೆಗಳನ್ನು (Pheromone traps) ಅಳವಡಿಸಿ'],
        highConfidenceTreatmentEn: 'Apply Chlorantraniliprole 18.5% SC (Coragen) @ 0.4ml/L or Emamectin benzoate 5% SG @ 0.4g/L directed into the central whorl.',
        highConfidenceTreatmentKn: 'ಸುಳಿಯೊಳಗೆ ನೇರವಾಗಿ ತಲುಪುವಂತೆ ಎಮಾಮೆಕ್ಟಿನ್ ಬೆಂಜೋಯೆಟ್ (೦.೪ ಗ್ರಾಂ/ಲೀ) ಅಥವಾ ಕ್ಲೋರಾಂಟ್ರಾನಿಲಿಪ್ರೋಲ್ (೦.೪ ಮಿಲಿ/ಲೀ) ಸಿಂಪಡಿಸಿ.',
        preventionEn: 'Intercrop with cowpea or pigeonpea. Conserve natural predators like earwigs and trichogramma wasps.',
        preventionKn: 'ಅಲಸಂದಿ ಅಥವಾ ತೊಗರಿಯನ್ನು ಮಿಶ್ರಬೆಳೆಯಾಗಿ ಬೆಳೆಯಿರಿ.',
      },
    ],
  },
  Paddy: {
    cropEn: 'Paddy / Rice',
    cropKn: 'ಭತ್ತ / ಅಕ್ಕಿ',
    candidates: [
      {
        id: 'rice_blast',
        nameEn: 'Rice Blast',
        nameKn: 'ಭತ್ತದ ಬೆಂಕಿ ರೋಗ (Blast)',
        pathogen: 'Magnaporthe oryzae',
        seasonAffinity: ['Kharif', 'Rabi'],
        keyVisualSignsEn: ['Spindle or eye-shaped lesions with gray centers and reddish-brown borders', 'Neck blast causing drooping panicles with empty grains', 'Node blackening and breakage'],
        keyVisualSignsKn: ['ಕಣ್ಣಿನ ಆಕಾರದ (Spindle) ಮಧ್ಯ ಬೂದು ಹಾಗೂ ಅಂಚು ಕೆಂಪು-ಕಂದು ಕಲೆಗಳು', 'ತೆನೆ ಕುತ್ತಿಗೆ ಕಪ್ಪಾಗಿ ಮುರಿದು ಜಳ್ಳು ತೆನೆ ಉಂಟಾಗುವುದು (Neck blast)', 'ಗೆಣ್ಣುಗಳು ಕಪ್ಪಾಗಿ ಮುರಿಯುವುದು'],
        safeCareGuidanceEn: ['Avoid excessive nitrogen split applications', 'Drain excess water and re-flood to aerate root zone', 'Burn or compost stubble after harvest'],
        safeCareGuidanceKn: ['ಸಾರಜನಕ (ಯೂರಿಯಾ) ಗೊಬ್ಬರವನ್ನು ಅತಿಯಾಗಿ ಬಳಸಬೇಡಿ', 'ಗದ್ದೆಯಲ್ಲಿ ನಿಂತ ನೀರನ್ನು ಬಸಿದು ಹೊಸ ನೀರು ಹಾಯಿಸಿ', 'ಕೊಯ್ಲಿನ ನಂತರ ಕೂಳೆ ಹಾಗೂ ಸೋಂಕಿತ ಕಸ ಸುಟ್ಟುಹಾಕಿ'],
        highConfidenceTreatmentEn: 'Spray Tricyclazole 75% WP @ 0.6g/L or Isoprothiolane 40% EC @ 1.5ml/L at initial appearance of spindle spots.',
        highConfidenceTreatmentKn: 'ಟ್ರೈಸೈಕ್ಲಾಜೋಲ್ ೭೫% ಡಬ್ಲ್ಯೂಪಿ (೦.೬ ಗ್ರಾಂ/ಲೀಟರ್) ಅಥವಾ ಐಸೊಪ್ರೊಥಿಯೊಲೇನ್ (೧.೫ ಮಿಲಿ/ಲೀ) ಸಿಂಪಡಿಸಿ.',
        preventionEn: 'Treat seeds with Tricyclazole @ 2g/kg seed. Plant blast-tolerant varieties like Jaya, IET-7191, or KMP-175.',
        preventionKn: 'ಟ್ರೈಸೈಕ್ಲಾಜೋಲ್‌ನಿಂದ ಬೀಜೋಪಚಾರ ಮಾಡಿ. ಜಯಾ ಅಥವಾ ಕೆಎಂಪಿಸಿ-೧೭೫ ನಂತಹ ರೋಗನಿರೋಧಕ ತಳಿ ಬಳಸಿ.',
      },
      {
        id: 'bacterial_leaf_blight',
        nameEn: 'Bacterial Leaf Blight (BLB)',
        nameKn: 'ದುಂಡಾಣು ಎಲೆ ಕವಚ ಅಂಗಮಾರಿ (BLB)',
        pathogen: 'Xanthomonas oryzae pv. oryzae',
        seasonAffinity: ['Kharif'],
        keyVisualSignsEn: ['Water-soaked to yellowish-white wavy stripes along leaf margins', 'Milky bacterial ooze drops visible in early morning humidity', 'Leaves wilt and roll (Kresek phase)'],
        keyVisualSignsKn: ['ಎಲೆಗಳ ಅಂಚಿನಲ್ಲಿ ಅಲೆಯಾಕಾರದ ಹಳದಿ-ಬಿಳಿ ಗೆರೆಗಳು', 'ಬೆಳಗಿನ ಜಾವ ಎಲೆಯ ಮೇಲೆ ಹಾಲಿನಂತಹ ಬ್ಯಾಕ್ಟೀರಿಯಾ ಹನಿಗಳು', 'ಎಲೆಗಳು ಒಣಗಿ ಸುರುಳಿಯಾಗುವುದು'],
        safeCareGuidanceEn: ['Drain the field immediately and keep un-flooded for 3-4 days', 'Stop top-dressing with nitrogen until symptoms subside', 'Avoid clipping seedling tips during transplanting'],
        safeCareGuidanceKn: ['ಗದ್ದೆಯಿಂದ ನೀರನ್ನು ತಕ್ಷಣ ಹೊರಹಾಕಿ ೩-೪ ದಿನ ಗದ್ದೆ ಒಣಗಲು ಬಿಡಿ', 'ರೋಗ ಶಮನವಾಗುವವರೆಗೂ ಯೂರಿಯಾ ಗೊಬ್ಬರ ಹಾಕಬೇಡಿ', 'ನಾಟಿ ಮಾಡುವಾಗ ಸಸಿಗಳ ತುದಿ ಮುರಿಯಬೇಡಿ'],
        highConfidenceTreatmentEn: 'Spray Streptocycline @ 0.1g/L (1g in 10L water) combined with Copper Oxychloride 50% WP @ 2.5g/L.',
        highConfidenceTreatmentKn: 'ಸ್ಟ್ರೆಪ್ಟೋಸೈಕ್ಲಿನ್ (೧ ಗ್ರಾಂ / ೧೦ ಲೀಟರ್ ನೀರಿಗೆ) + ಕಾಪರ್ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ (೨.೫ ಗ್ರಾಂ/ಲೀ) ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.',
        preventionEn: 'Use certified disease-free seeds. Avoid flooding water from infected fields into healthy fields.',
        preventionKn: 'ರೋಗಗ್ರಸ್ಥ ಗದ್ದೆಯ ನೀರು ಒಳ್ಳೆಯ ಗದ್ದೆಗೆ ಹರಿಯದಂತೆ ತಡೆಯಿರಿ.',
      },
      {
        id: 'sheath_blight',
        nameEn: 'Sheath Blight',
        nameKn: 'ಕವಚ ಅಂಗಮಾರಿ ರೋಗ (Sheath Blight)',
        pathogen: 'Rhizoctonia solani',
        seasonAffinity: ['Kharif'],
        keyVisualSignsEn: ['Oval or irregular greenish-gray water-soaked spots on leaf sheaths near water line', 'Spots enlarge with dark brown borders and bleached centers', 'Canopy snake-skin pattern spreading upward'],
        keyVisualSignsKn: ['ನೀರಿನ ಮಟ್ಟದ ಬಳಿ ಎಲೆ ಕವಚದ ಮೇಲೆ ಹಸಿರು-ಬೂದು ಕಲೆಗಳು', 'ಕಲೆಗಳ ಮಧ್ಯ ಭಾಗ ಬಿಳುಚಿಕೊಂಡು ಅಂಚು ಕಂದು ಬಣ್ಣಕ್ಕೆ ತಿರುಗುವುದು', 'ಹಾವು ಚರ್ಮದಂತಹ ಕಲೆಗಳು ಮೇಲ್ಮುಖವಾಗಿ ಹರಡುವುದು'],
        safeCareGuidanceEn: ['Remove floating organic debris during puddling and transplanting', 'Maintain optimal hill spacing (not closer than 20x15cm) to let sunlight reach bases', 'Apply adequate potash to harden tillers'],
        safeCareGuidanceKn: ['ನಾಟಿ ಮಾಡುವಾಗ ತೇಲುವ ಕಸ ಕಡ್ಡಿಗಳನ್ನು ಹೆಕ್ಕಿ ತೆಗೆಯಿರಿ', 'ಬೆಳಕಿನ ಕೊರತೆಯಾಗದಂತೆ ಸಸಿಗಳ ನಡುವೆ ಸಾಕಷ್ಟು ಅಂತರ ಬಿಡಿ', 'ಪೊಟ್ಯಾಷ್ ಗೊಬ್ಬರವನ್ನು ತಪ್ಪದೇ ನೀಡಿ'],
        highConfidenceTreatmentEn: 'Spray Validamycin 3% L @ 2ml/L or Hexaconazole 5% EC @ 2ml/L directed toward the lower base and sheaths.',
        highConfidenceTreatmentKn: 'ವ್ಯಾಲಿಡಾಮೈಸಿನ್ ೩% (೨ ಮಿಲಿ/ಲೀ) ಅಥವಾ ಹೆಕ್ಸಾಕೊನಜೋಲ್ (೨ ಮಿಲಿ/ಲೀ) ಗಿಡದ ಕೆಳಭಾಗಕ್ಕೆ ಸಿಂಪರಣೆ ಮಾಡಿ.',
        preventionEn: 'Apply neem cake to soil before transplanting. Destroy weed hosts on bunds (Echinochloa grass).',
        preventionKn: 'ನಾಟಿ ಮುನ್ನ ಬೇವಿನ ಹಿಂಡಿ ಸೇರಿಸಿ. ಬದುಗಳಲ್ಲಿರುವ ಹುಲ್ಲು ಕಳೆಯನ್ನು ನಿಯಂತ್ರಿಸಿ.',
      },
    ],
  },
  Ragi: {
    cropEn: 'Ragi (Finger Millet)',
    cropKn: 'ರಾಗಿ',
    candidates: [
      {
        id: 'ragi_blast',
        nameEn: 'Finger Millet Blast',
        nameKn: 'ರಾಗಿ ಬೆಂಕಿ ರೋಗ (Blast)',
        pathogen: 'Pyricularia grisea',
        seasonAffinity: ['Kharif', 'Rabi'],
        keyVisualSignsEn: ['Spindle-shaped brown lesions on seedlings and leaves', 'Neck and finger blast causing blackening and breakage of finger digits', 'Severe chaffy grain formation'],
        keyVisualSignsKn: ['ಎಲೆಗಳ ಮೇಲೆ ಕಣ್ಣಿನಂತಹ ಕಂದು ಕಲೆಗಳು', 'ರಾಗಿ ತೆನೆ ಹಾಗೂ ಕವಲುಗಳು ಕಪ್ಪಾಗಿ ಮುರಿಯುವುದು (Neck/Finger blast)', 'ತೆನೆಯಲ್ಲಿ ಕಾಳು ಕಟ್ಟದೆ ಜಳ್ಳಾಗುವುದು'],
        safeCareGuidanceEn: ['Avoid excessive urea application during foggy damp weather', 'Maintain good field drainage during panicle emergence', 'Remove infected nursery residue'],
        safeCareGuidanceKn: ['ಮಂಜು ಕವಿದ ತೇವಾಂಶದ ದಿನಗಳಲ್ಲಿ ಯೂರಿಯಾ ಹೆಚ್ಚಾಗಿ ನೀಡಬೇಡಿ', 'ತೆನೆ ಬರುವ ಹಂತದಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳಿ', 'ಸೋಂಕಿತ ಸಸಿಗಳನ್ನು ನಾಟಿ ಮಾಡಬೇಡಿ'],
        highConfidenceTreatmentEn: 'Spray Kitazin 48% EC @ 1ml/L or Carbendazim 50% WP @ 1g/L during early vegetative or earhead emergence.',
        highConfidenceTreatmentKn: 'ಕಿಟಾಜಿನ್ (೧ ಮಿಲಿ/ಲೀ) ಅಥವಾ ಕಾರ್ಬೆಂಡಾಜಿಮ್ (೧ ಗ್ರಾಂ/ಲೀ) ತೆನೆ ಹಂತದಲ್ಲಿ ಸಿಂಪಡಿಸಿ.',
        preventionEn: 'Treat seed with Pseudomonas fluorescens @ 10g/kg. Plant resistant varieties like GPU-28, GPU-48, or ML-365.',
        preventionKn: 'ಜಿಪಿಯು-೨೮, ಜಿಪಿಯು-೪೮ ಅಥವಾ ಎಂಎಲ್-೩೬೫ ನಂತಹ ರೋಗನಿರೋಧಕ ತಳಿ ಬೆಳೆಯಿರಿ.',
      },
      {
        id: 'foot_rot',
        nameEn: 'Foot Rot / Wilt',
        nameKn: 'ಬುಡ ಕೊಳೆ ರೋಗ / ಸೊರಗು ರೋಗ',
        pathogen: 'Sclerotium rolfsii',
        seasonAffinity: ['Kharif'],
        keyVisualSignsEn: ['Brown water-soaked lesion at collar region', 'White cottony mycelial growth with mustard-like sclerotial bodies', 'Sudden yellowing and wilting of tillers'],
        keyVisualSignsKn: ['ಕಾಂಡದ ಬುಡದಲ್ಲಿ ಕಂದು ಬಣ್ಣದ ಕೊಳೆತ ಕಲೆ', 'ಬುಡದ ಬಳಿ ಸಾಸಿವೆಯಂತಹ ಬಿಳಿ ಶಿಲೀಂಧ್ರ ಕಾಳುಗಳು', 'ಗಿಡಗಳು ದಿಢೀರನೆ ಹಳದಿಯಾಗಿ ಸೊರಗಿ ಒಣಗುವುದು'],
        safeCareGuidanceEn: ['Improve furrow drainage to avoid collar submergence', 'Do not pile soil too high around wet collar tissue', 'Rogue out dead clumps and apply lime to spot'],
        safeCareGuidanceKn: ['ಬುಡದಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ಬಸಿಗಾಲುವೆ ಮಾಡಿ', 'ಸತ್ತ ಗಿಡಗಳನ್ನು ಕಿತ್ತು ಆ ಜಾಗಕ್ಕೆ ಸುಣ್ಣದ ಪುಡಿ ಹಾಕಿ'],
        highConfidenceTreatmentEn: 'Soil drenching around collar with Copper Oxychloride 50% WP @ 3g/L or Captan @ 2g/L.',
        highConfidenceTreatmentKn: 'ಕಾಪರ್ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ (೩ ಗ್ರಾಂ/ಲೀ) ದ್ರಾವಣವನ್ನು ಗಿಡದ ಬುಡ ಸಂಪೂರ್ಣ ನೆನೆಯುವಂತೆ ಸುರಿಯಿರಿ.',
        preventionEn: 'Crop rotation with pulses. Mix Trichoderma viride with well-decomposed FYM into soil before sowing.',
        preventionKn: 'ದ್ವಿದಳ ಧಾನ್ಯದೊಂದಿಗೆ ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ. ಟ್ರೈಕೋಡರ್ಮಾ ಬಳಸಿ.',
      },
    ],
  },
  Cotton: {
    cropEn: 'Cotton',
    cropKn: 'ಹತ್ತಿ',
    candidates: [
      {
        id: 'cotton_leaf_curl',
        nameEn: 'Cotton Leaf Curl Virus',
        nameKn: 'ಹತ್ತಿ ಎಲೆ ಮುದುಡು ವೈರಸ್ (Leaf Curl)',
        pathogen: 'Begomovirus',
        seasonAffinity: ['Kharif'],
        keyVisualSignsEn: ['Upward or downward cupping of leaves', 'Vein thickening and enation (leaf-like outgrowths) on underside', 'Severe stunting of young fruiting branches'],
        keyVisualSignsKn: ['ಎಲೆಗಳು ಮೇಲ್ಮುಖ ಅಥವಾ ಕೆಳಮುಖವಾಗಿ ಬಟ್ಟಲಿನಂತೆ ಮುದುಡುವುದು', 'ಎಲೆಯ ಕೆಳಭಾಗದ ನರಗಳು ದಪ್ಪವಾಗುವುದು ಮತ್ತು ಚಿಕ್ಕ ಎಲೆಗಳ ರಚನೆ (Enation)', 'ಗಿಡ ಕುಂಠಿತವಾಗುವುದು'],
        safeCareGuidanceEn: ['Destroy alternative weed hosts on borders', 'Install yellow sticky traps (20/acre) to trap whitefly vectors', 'Remove affected plants if under 45 days old'],
        safeCareGuidanceKn: ['ಹಳದಿ ಜಿಗುಟು ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ ಬಿಳಿ ನೊಣ ನಿಯಂತ್ರಿಸಿ', 'ಬದುಗಳಲ್ಲಿರುವ ಕಳೆ ಗಿಡಗಳನ್ನು ನಾಶಪಡಿಸಿ'],
        highConfidenceTreatmentEn: 'Control vector whiteflies with Diafenthiuron 50% WP @ 1.2g/L or Pyriproxyfen 10% EC @ 2ml/L.',
        highConfidenceTreatmentKn: 'ಬಿಳಿ ನೊಣ ನಿಯಂತ್ರಣಕ್ಕೆ ಡಯಾಫೆಂಥಿಯುರಾನ್ (೧.೨ ಗ್ರಾಂ/ಲೀ) ಸಿಂಪಡಿಸಿ.',
        preventionEn: 'Plant certified leaf-curl resistant Bt cotton hybrids.',
        preventionKn: 'ರೋಗನಿರೋಧಕ ಬಿಟಿ ಹತ್ತಿ ಹೈಬ್ರಿಡ್ ಬೀಜಗಳನ್ನು ಮಾತ್ರ ಬಳಸಿ.',
      },
      {
        id: 'bacterial_blight_cotton',
        nameEn: 'Bacterial Blight / Angular Leaf Spot',
        nameKn: 'ಕೋನೀಯ ಎಲೆ ಚುಕ್ಕೆ / ಕಪ್ಪು ತೋಳು ರೋಗ (Black Arm)',
        pathogen: 'Xanthomonas citri pv. malvacearum',
        seasonAffinity: ['Kharif'],
        keyVisualSignsEn: ['Angular brown spots restricted by leaf veins', 'Black arm lesions on stems causing lodging', 'Water-soaked boll rot lesions'],
        keyVisualSignsKn: ['ಎಲೆಯ ನರಗಳಿಂದ ಸೀಮಿತವಾದ ಕೋನೀಯ ಕಂದು ಕಲೆಗಳು', 'ಕಾಂಡದ ಮೇಲೆ ಕಪ್ಪು ಗೆರೆಗಳು ಉಂಟಾಗಿ ಮುರಿಯುವುದು (Black arm)', 'ಹತ್ತಿ ಕಾಯಿಗಳ ಮೇಲೆ ಕೊಳೆತ ಕಲೆಗಳು'],
        safeCareGuidanceEn: ['Avoid cultivating during wet canopy conditions', 'Collect and burn infected plant debris after picking', 'Avoid overhead sprinkler irrigation'],
        safeCareGuidanceKn: ['ತೇವದ ವಾತಾವರಣದಲ್ಲಿ ಜಮೀನಿನಲ್ಲಿ ಓಡಾಡಬೇಡಿ', 'ಕೊಯ್ಲಿನ ನಂತರ ಕಸ ಕಡ್ಡಿಗಳನ್ನು ಸುಟ್ಟುಹಾಕಿ'],
        highConfidenceTreatmentEn: 'Spray Streptocycline @ 0.1g/L (1g per 10L) + Copper Oxychloride @ 2.5g/L at first appearance.',
        highConfidenceTreatmentKn: 'ಸ್ಟ್ರೆಪ್ಟೋಸೈಕ್ಲಿನ್ (೧ ಗ್ರಾಂ / ೧೦ ಲೀಟರ್ ನೀರಿಗೆ) + ಕಾಪರ್ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ (೨.೫ ಗ್ರಾಂ/ಲೀ) ಸಿಂಪಡಿಸಿ.',
        preventionEn: 'Delint seeds with concentrated sulphuric acid before sowing.',
        preventionKn: 'ಆಸಿಡ್ ಡಿಲಿಂಟಿಂಗ್ ಮಾಡಿದ ಬೀಜಗಳನ್ನು ಬಳಸಿ.',
      },
    ],
  },
  Onion: {
    cropEn: 'Onion',
    cropKn: 'ಈರುಳ್ಳಿ',
    candidates: [
      {
        id: 'purple_blotch',
        nameEn: 'Purple Blotch',
        nameKn: 'ನೇರಳೆ ಮಚ್ಚೆ ರೋಗ (Purple Blotch)',
        pathogen: 'Alternaria porri',
        seasonAffinity: ['Kharif', 'Rabi'],
        keyVisualSignsEn: ['Small water-soaked sunken lesions turning brown with characteristic purple center', 'Lesions girdle the tubular leaf causing collapse', 'Black powdery spore dust on leaf surface'],
        keyVisualSignsKn: ['ಎಲೆಯ ಮೇಲೆ ಸಣ್ಣ ಗುಳಿಬಿದ್ದ ನೇರಳೆ ಬಣ್ಣದ ಮಧ್ಯಭಾಗವಿರುವ ಕಲೆಗಳು', 'ಕಲೆಗಳು ದೊಡ್ಡದಾಗಿ ಎಲೆ ನಡುವೆ ಮುರಿದು ಬೀಳುವುದು', 'ಎಲೆಯ ಮೇಲೆ ಕಪ್ಪು ಪುಡಿ ಶಿಲೀಂಧ್ರ'],
        safeCareGuidanceEn: ['Avoid excessive irrigation intervals causing stress', 'Do not plant onion after garlic in same plot', 'Ensure raised nursery beds with sand drainage'],
        safeCareGuidanceKn: ['ಅತಿಯಾಗಿ ನೀರು ನಿಲ್ಲಿಸಬೇಡಿ', 'ಬೆಳ್ಳುಳ್ಳಿ ಬೆಳೆದ ಜಾಗದಲ್ಲಿ ತಕ್ಷಣ ಈರುಳ್ಳಿ ಬೆಳೆಯಬೇಡಿ'],
        highConfidenceTreatmentEn: 'Spray Mancozeb 75% WP @ 2.5g/L or Tebuconazole 25.9% EC @ 1ml/L + Sandovit sticking agent (0.5ml/L).',
        highConfidenceTreatmentKn: 'ಮ್ಯಾಂಕೋಜೆಬ್ (೨.೫ ಗ್ರಾಂ/ಲೀ) ಅಥವಾ ಟೆಬುಕೊನಜೋಲ್ (೧ ಮಿಲಿ/ಲೀ) ಜೊತೆಗೆ ಅಂಟು ದ್ರಾವಣ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.',
        preventionEn: 'Follow 3-year crop rotation. Ensure balanced potassium fertilization to strengthen tubular cuticle.',
        preventionKn: '೩ ವರ್ಷಗಳ ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ. ಪೊಟ್ಯಾಷ್ ಗೊಬ್ಬರ ನೀಡಿ.',
      },
    ],
  },
  Chilli: {
    cropEn: 'Chilli',
    cropKn: 'ಮೆಣಸಿನಕಾಯಿ',
    candidates: [
      {
        id: 'chilli_anthracnose',
        nameEn: 'Anthracnose / Dieback',
        nameKn: 'ಕೊಳೆ ರೋಗ / ಡೈಬ್ಯಾಕ್ (Anthracnose)',
        pathogen: 'Colletotrichum capsici',
        seasonAffinity: ['Kharif', 'Rabi'],
        keyVisualSignsEn: ['Circular sunken spots with concentric rings on ripening fruit', 'Twig die-back from tip downward', 'Black dot-like acervuli fungal fruiting bodies'],
        keyVisualSignsKn: ['ಹಣ್ಣಿನ ಮೇಲೆ ವೃತ್ತಾಕಾರದ ಗುಳಿಬಿದ್ದ ಕಲೆಗಳು', 'ಕೊಂಬೆಗಳು ಮೇಲಿನಿಂದ ಕೆಳಕ್ಕೆ ಒಣಗುತ್ತಾ ಬರುವುದು (Dieback)', 'ಕಲೆಯ ಮೇಲೆ ಸಣ್ಣ ಕಪ್ಪು ಚುಕ್ಕೆಗಳು'],
        safeCareGuidanceEn: ['Collect and burn all infected fruits and dried twigs immediately', 'Avoid sprinkler irrigation during fruiting stage', 'Ensure seed treatment before nursery sowing'],
        safeCareGuidanceKn: ['ಸೋಂಕಿತ ಕಾಯಿ ಹಾಗೂ ಒಣ ಕೊಂಬೆಗಳನ್ನು ಕತ್ತರಿಸಿ ಸುಟ್ಟುಹಾಕಿ', 'ಹೂವು-ಕಾಯಿ ಹಂತದಲ್ಲಿ ತುಂತುರು ನೀರಾವರಿ ಬಳಸಬೇಡಿ'],
        highConfidenceTreatmentEn: 'Spray Azoxystrobin 23% SC @ 1ml/L or Difenoconazole 25% EC @ 1ml/L. Repeat at 12-day interval.',
        highConfidenceTreatmentKn: 'ಅಜೋಕ್ಸಿಸ್ಟ್ರೋಬಿನ್ (೧ ಮಿಲಿ/ಲೀ) ಅಥವಾ ಡೈಫೆನೊಕೊನಜೋಲ್ (೧ ಮಿಲಿ/ಲೀ) ಸಿಂಪಡಿಸಿ.',
        preventionEn: 'Treat seed with Thiram @ 3g/kg. Plant tolerant cultivars like Arka Meghana or Arka Suphal.',
        preventionKn: 'ಅರ್ಕಾ ಮೇಘನಾ ಅಥವಾ ಅರ್ಕಾ ಸುಫಲ್ ರೋಗನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ.',
      },
      {
        id: 'chilli_leaf_curl',
        nameEn: 'Chilli Leaf Curl (Murda Disease)',
        nameKn: 'ಎಲೆ ಮುರುಟು ರೋಗ (Murda Disease)',
        pathogen: 'Thrips / Mites / Begomovirus complex',
        seasonAffinity: ['Kharif', 'Rabi', 'Zaid'],
        keyVisualSignsEn: ['Upward boat-shaped curling (thrips) or downward inverted cup curling (mites)', 'Thickening and brittleness of foliage', 'Severe flower drop and barren plants'],
        keyVisualSignsKn: ['ಎಲೆಗಳು ಮೇಲ್ಮುಖವಾಗಿ ದೋಣಿಯಂತೆ ಮುದುಡುವುದು (ನುಸಿ) ಅಥವಾ ಕೆಳಮುಖವಾಗಿ ಬಟ್ಟಲಿನಂತೆ ಮುದುಡುವುದು (ಹೇನು)', 'ಎಲೆಗಳು ದಪ್ಪವಾಗಿ ಗರಿಗರಿಯಾಗುವುದು', 'ಹೂವುಗಳು ಉದುರಿ ಕಾಯಿ ಕಟ್ಟದಿರುವುದು'],
        safeCareGuidanceEn: ['Install blue sticky traps for thrips and yellow traps for whiteflies (15 each/acre)', 'Sprinkle cold water to dislodge mites in early infestation', 'Avoid continuous application of synthetic pyrethroids'],
        safeCareGuidanceKn: ['ನೀಲಿ ಮತ್ತು ಹಳದಿ ಜಿಗುಟು ಬಲೆಗಳನ್ನು ಎಕರೆಗೆ ೧೫ ರಂತೆ ಅಳವಡಿಸಿ', 'ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ ತಣ್ಣೀರು ಸಿಂಪಡಿಸಿ ನುಸಿಗಳನ್ನು ಉದುರಿಸಿ'],
        highConfidenceTreatmentEn: 'For thrips: Fipronil 5% SC @ 2ml/L. For mites: Spiromesifen 22.9% SC @ 1ml/L or Wettable Sulphur @ 3g/L.',
        highConfidenceTreatmentKn: 'ನುಸಿ ನಿಯಂತ್ರಣಕ್ಕೆ ಫಿಪ್ರೋನಿಲ್ (೨ ಮಿಲಿ/ಲೀ) ಮತ್ತು ಹೇನು ನಿಯಂತ್ರಣಕ್ಕೆ ಸ್ಪೈರೋಮೆಸಿಫೆನ್ (೧ ಮಿಲಿ/ಲೀ) ಅಥವಾ ಗಂಧಕ (೩ ಗ್ರಾಂ/ಲೀ) ಸಿಂಪಡಿಸಿ.',
        preventionEn: 'Grow border rows of maize or sorghum as windbreaks to filter vector insects.',
        preventionKn: 'ಹೊಲದ ಬದಿಯಲ್ಲಿ ಮೆಕ್ಕೆಜೋಳ ಅಥವಾ ಜೋಳವನ್ನು ತಡೆಗೋಡೆಯಾಗಿ ೨ ಸಾಲು ಬೆಳೆಯಿರಿ.',
      },
    ],
  },
};

/**
 * Returns candidate diseases scoped specifically to the selected crop, current season, and region.
 */
export function getShortlistForContext(crop: string, season: string = 'Kharif', _district: string = 'Bengaluru Urban') {
  // Crop name normalization
  let profile = REGIONAL_DISEASE_DB[crop];
  if (!profile) {
    const key = Object.keys(REGIONAL_DISEASE_DB).find(
      (k) => k.toLowerCase() === crop.trim().toLowerCase()
    );
    if (key) profile = REGIONAL_DISEASE_DB[key];
  }

  if (!profile) {
    return {
      isSupported: false,
      cropName: crop,
      candidates: [] as CandidateDisease[],
      supportedCrops: Object.keys(REGIONAL_DISEASE_DB),
      candidateSummaryText: '',
    };
  }

  // Filter candidates plausible for current season (or multi-season)
  const matchingCandidates = profile.candidates.filter(
    (c) => c.seasonAffinity.includes(season) || c.seasonAffinity.length >= 2
  );

  const activeCandidates = matchingCandidates.length > 0 ? matchingCandidates : profile.candidates;

  const candidateSummaryText = activeCandidates
    .map(
      (c, i) =>
        `${i + 1}. ${c.nameEn} (${c.pathogen}) - Signs: ${c.keyVisualSignsEn.join(', ')}`
    )
    .join('\n');

  return {
    isSupported: true,
    cropName: profile.cropEn,
    cropKn: profile.cropKn,
    candidates: activeCandidates,
    supportedCrops: Object.keys(REGIONAL_DISEASE_DB),
    candidateSummaryText,
  };
}
