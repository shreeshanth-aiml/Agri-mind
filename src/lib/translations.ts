export type TranslationKey =
  | 'appName'
  | 'stateSubtitle'
  | 'season'
  | 'kharif'
  | 'rabi'
  | 'zaid'
  | 'homeTab'
  | 'cropTab'
  | 'diseaseTab'
  | 'yieldTab'
  | 'marketTab'
  | 'safetyScore'
  | 'favorable'
  | 'safetyDesc'
  | 'safetySource'
  | 'updatedToday'
  | 'weatherTitle'
  | 'soilHealthTitle'
  | 'soilProfile'
  | 'liveForecast'
  | 'humidity'
  | 'testedData'
  | 'estimatedData'
  | 'actionRequired'
  | 'rainWarningTitle'
  | 'rainWarningDesc'
  | 'fourDayOutlook'
  | 'cropAdvisoryTitle'
  | 'cropAdvisorySubtitle'
  | 'selectDistrict'
  | 'selectSeason'
  | 'soilLabel'
  | 'getCropRecs'
  | 'analyzingAgroData'
  | 'topRecommendedCrops'
  | 'startOver'
  | 'suitability'
  | 'viewWhy'
  | 'hideFactors'
  | 'soilCompat'
  | 'climateFit'
  | 'marketDemand'
  | 'listenSpeech'
  | 'plantDoctorTitle'
  | 'plantDoctorSubtitle'
  | 'captureTitle'
  | 'captureDesc'
  | 'takePhotoButton'
  | 'testSampleLeaves'
  | 'diagnosingLeaf'
  | 'leafAnalysisDetails'
  | 'diagnosisResult'
  | 'confidenceLevel'
  | 'immediateTreatment'
  | 'futurePrevention'
  | 'scanAnother'
  | 'severityHigh'
  | 'severityMedium'
  | 'severityLow'
  | 'selectCropBeingChecked'
  | 'cropTomato'
  | 'cropMaize'
  | 'cropPaddy'
  | 'cropRagi'
  | 'cropCotton'
  | 'cropOnion'
  | 'cropChilli'
  | 'cropOther'
  | 'shortlistCountLabel'
  | 'focusedCheckActive'
  | 'unlistedCropNotice'
  | 'sampleTomatoBlight'
  | 'sampleMaizeBlight'
  | 'samplePaddyBlast'
  | 'sampleGlossyBlackSpots'
  | 'qualityCheckFailedTitle'
  | 'qualityIssueTooDark'
  | 'qualityIssueTooBright'
  | 'qualityIssueBlurry'
  | 'qualityIssueFramingSmall'
  | 'photoGuideTitle'
  | 'goodPhotoTitle'
  | 'goodPhotoTip1'
  | 'goodPhotoTip2'
  | 'goodPhotoTip3'
  | 'badPhotoTitle'
  | 'badPhotoTip1'
  | 'badPhotoTip2'
  | 'badPhotoTip3'
  | 'holdSteadyRetakeBtn'
  | 'cancelBtn'
  | 'verifyingLeafIdentity'
  | 'verifyingLeafSubtext'
  | 'diagnosingLeafSubtext'
  | 'cropMismatchTitle'
  | 'cropMismatchDefaultMsg'
  | 'cropMismatchWhyTitle'
  | 'cropMismatchWhyDesc'
  | 'retakeCorrectLeafBtn'
  | 'confirmProceedAnywayBtn'
  | 'notSureYetHeading'
  | 'confidenceLabel'
  | 'inconclusiveBannerTitle'
  | 'inconclusiveBannerDesc'
  | 'retakePhotoBtn'
  | 'addLeafUndersideBtn'
  | 'leafUndersideAddedBadge'
  | 'showToKvkBtn'
  | 'readAloudBtn'
  | 'kvkHelperTitle'
  | 'kvkHelperSubtitle'
  | 'kvkHelplineLabel'
  | 'kvkChecklist1'
  | 'kvkChecklist2'
  | 'kvkChecklist3'
  | 'heresWhatWeSaw'
  | 'checkedAgainstPhoto'
  | 'obsGlossyBlackRaised'
  | 'obsReddishBrownRim'
  | 'obsPaleYellowPatches'
  | 'obsSmallBlackDotsVeins'
  | 'obsNoRingPattern'
  | 'obsNoYellowEdge'
  | 'obsNoCrispBrownRim'
  | 'otherPossibilitiesConsidered'
  | 'bestFit'
  | 'possibleFit'
  | 'weakFit'
  | 'howToTellTitle'
  | 'howToTell_generic'
  | 'howToTell_altBlackSootyMold'
  | 'takePhotoUnderside'
  | 'ifItIs'
  | 'careSootyMold'
  | 'careInsectFeeding'
  | 'careLeafSpot'
  | 'defaultCare'
  | 'likelyMatch'
  | 'possibleMatch'
  | 'lowConfidence'
  | 'unknownCondition'
  | 'expertCheckNeeded'
  | 'causeLeafSpotTitle'
  | 'careLeafSpot1'
  | 'careLeafSpot2'
  | 'careLeafSpot3'
  | 'causeSootyMoldTitle'
  | 'careSootyMold1'
  | 'careSootyMold2'
  | 'allSafeNonChemicalNote'
  | 'unknownBannerTitle'
  | 'unknownBannerDesc'
  | 'mostLikely'
  | 'alsoPossible'
  | 'preventSootyMoldTitle'
  | 'preventSootyMold1'
  | 'preventSootyMold2'
  | 'preventSootyMold3'
  | 'preventLeafSpotTitle'
  | 'preventLeafSpot1'
  | 'preventLeafSpot2'
  | 'preventLeafSpot3'
  | 'possibleCause'
  | 'supportsThisLabel'
  | 'doesntFitLabel'
  | 'confidenceLimitLow'
  | 'confidenceLimitMedium'
  | 'confidenceLimitHigh'
  | 'aiEstimatedNotProbability'
  | 'consistencyCheckTitle'
  | 'runConsistencyCheckBtn'
  | 'runningConsistencyCheck'
  | 'consistencyVerified'
  | 'consistencyDivergent'
  | 'calibrationLogTitle'
  | 'calibrationLogComment'
  | 'tierLabel'
  | 'totalScreenings'
  | 'confirmedAccurate'
  | 'disconfirmed'
  | 'unsureCount'
  | 'accuracyRate'
  | 'altSootySupports'
  | 'altSootyDoesntFit'
  | 'altInsectSupports'
  | 'altInsectDoesntFit'
  | 'altAlgalSupports'
  | 'altAlgalDoesntFit'
  | 'healthyLeafTitle'
  | 'healthyLeafEvidence'
  | 'healthyLeafSafeCare1'
  | 'healthyLeafSafeCare2'
  | 'healthyLeafPrevention'
  | 'notAPlantTitle'
  | 'notAPlantDesc'
  | 'kvkSummaryModalTitle'
  | 'kvkSummaryHeading'
  | 'shareSummaryBtn'
  | 'savePdfBtn'
  | 'summaryCopied'
  | 'diagnosisDateLabel'
  | 'cropAndDistrictLabel'
  | 'statusLabel'
  | 'closeBtn'
  | 'detailsSectionTitle'
  | 'exactConfidenceScore'
  | 'colorTextureMetrics'
  | 'devCalibrationTitle'
  | 'devCalibrationDesc'
  | 'runAllTestsBtn'
  | 'runningTests'
  | 'testPassed'
  | 'testFailed'
  | 'testInLiveViewBtn'
  | 'sampleCleanHealthy'
  | 'sampleNonPlant'
  | 'matchSuffix'
  | 'altBlackSootyMold'
  | 'altBlackSootyMoldReason'
  | 'altInsectFeedingSpots'
  | 'altInsectFeedingReason'
  | 'altAlgalOrBacterialSpot'
  | 'altAlgalOrBacterialReason'
  | 'safeCareTitle'
  | 'safeCareStep1'
  | 'safeCareStep2'
  | 'safeCareStep3'
  | 'recommendedTreatmentTitle'
  | 'chemicalWithheldTitle'
  | 'chemicalWithheldDesc'
  | 'defaultPreventionTip'
  | 'aiScreeningDisclaimer'
  | 'wasDiagnosisAccurate'
  | 'feedbackRecorded'
  | 'feedbackYes'
  | 'feedbackNo'
  | 'feedbackNotSure'
  | 'feedbackThankYouNo'
  | 'feedbackThankYouYes'
  | 'scanAnotherLeafBtn'
  | 'farmDiagnosisHistoryTitle'
  | 'feedbackConfirmed'
  | 'feedbackMismatched'
  | 'feedbackUnconfirmed'
  | 'feedbackPending'
  | 'devDebugViewTitle'
  | 'devStep4bLabel'
  | 'devStep4bTriggered'
  | 'devStep4bPassed'
  | 'devDominantColorLabel'
  | 'devRingPatternLabel'
  | 'devYellowEdgeLabel'
  | 'devTreatmentTierLabel'
  | 'yesWord'
  | 'noWord'
  | 'yieldForecastTitle'
  | 'yieldForecastSubtitle'
  | 'estimatedOutput'
  | 'quintalsPerAcre'
  | 'vsFiveYearAvg'
  | 'canopyHealthScore'
  | 'yieldHistoryChart'
  | 'historicalYield'
  | 'aiForecastYield'
  | 'aiConfidenceNote'
  | 'keyFactorsTitle'
  | 'modelDetailsTitle'
  | 'mandiIntelTitle'
  | 'mandiIntelSubtitle'
  | 'searchCropPlaceholder'
  | 'checkPriceButton'
  | 'checkingPrice'
  | 'liveMandiPrice'
  | 'twoWeekForecast'
  | 'perQuintal'
  | 'expectedRise'
  | 'projectedRange'
  | 'aiMarketSignal'
  | 'upwardMomentum'
  | 'downwardPressure'
  | 'stablePrice'
  | 'roiCalcTitle'
  | 'todayPrice'
  | 'forecastPrice'
  | 'expectedYieldLabel'
  | 'totalInputCostLabel'
  | 'totalRevenue'
  | 'netProfit'
  | 'returnOnInvestment'
  | 'assistantTitle'
  | 'assistantGreeting'
  | 'typeOrSpeakPlaceholder'
  | 'switchLanguage'
  | 'kannada'
  | 'english'
  | 'viewMode'
  | 'viewModeAuto'
  | 'viewModeMobile'
  | 'viewModeDesktop'
  | 'dragAndDropPhoto'
  | 'dropToUpload'
  | 'browseFiles'
  | 'farmerProfile'
  | 'assistantSidebarBtn'
  | 'openAssistant'
  | 'closeAssistant';

export const TRANSLATIONS: Record<'en-IN' | 'kn-IN', Record<TranslationKey, string>> = {
  'en-IN': {
    appName: 'AgriMind',
    stateSubtitle: 'Karnataka',
    season: 'Season',
    kharif: 'Kharif (Monsoon)',
    rabi: 'Rabi (Winter)',
    zaid: 'Zaid (Summer)',
    homeTab: 'Home',
    cropTab: 'Crop',
    diseaseTab: 'Disease',
    yieldTab: 'Yield',
    marketTab: 'Market',
    safetyScore: 'Overall Crop Safety Score',
    favorable: 'Favorable',
    safetyDesc: 'Favorable growing conditions in the region. Low pest pressure and balanced root-zone soil moisture.',
    safetySource: 'Source: AI Risk Assessment & Agro-Climatic Data',
    updatedToday: 'Updated Today',
    weatherTitle: 'Weather',
    soilHealthTitle: 'Soil Profile',
    soilProfile: 'Soil Profile',
    liveForecast: 'Live Forecast',
    humidity: 'Humidity',
    testedData: 'Tested Profile',
    estimatedData: 'Regional Baseline',
    actionRequired: 'Action Required: Spray Window Alert',
    rainWarningTitle: 'Rain Incoming',
    rainWarningDesc: 'Rain expected on Wednesday afternoon. Consider delaying foliar pesticide or urea top-dressing to prevent runoff losses.',
    fourDayOutlook: '4-Day Agro-Weather Outlook',
    cropAdvisoryTitle: 'Crop Advisory',
    cropAdvisorySubtitle: 'Precision AI matching soil, monsoon, and local APMC market trends',
    selectDistrict: 'District',
    selectSeason: 'Season',
    soilLabel: 'Soil',
    getCropRecs: 'Get Crop Recommendations',
    analyzingAgroData: 'Analyzing Agro-Climatic Data...',
    topRecommendedCrops: 'Top 3 Recommended Crops',
    startOver: 'Start Over',
    suitability: 'Suitability',
    viewWhy: 'View Why (Factor Analysis)',
    hideFactors: 'Hide Factor Breakdown',
    soilCompat: 'Soil Compatibility',
    climateFit: 'Climate & Rainfall Fit',
    marketDemand: 'Market & MSP Demand',
    listenSpeech: 'Listen in voice',
    plantDoctorTitle: 'Plant Doctor',
    plantDoctorSubtitle: 'Check leaf spots with your phone camera and get safe care steps',
    captureTitle: 'Take a Photo of the Leaf',
    captureDesc: 'Take a clear photo in daylight showing the leaf spots closely.',
    takePhotoButton: 'Take Photo / Upload',
    testSampleLeaves: 'Or try a sample leaf:',
    diagnosingLeaf: 'Checking Leaf Photo...',
    leafAnalysisDetails: 'Checking spot colours, surface texture, and edges',
    diagnosisResult: 'Leaf Check Result',
    confidenceLevel: 'Confidence Level',
    immediateTreatment: 'Immediate Care',
    futurePrevention: 'How to Prevent Next Time',
    scanAnother: 'Check Another Leaf',
    severityHigh: 'High Severity',
    severityMedium: 'Medium Severity',
    severityLow: 'Low Severity',
    selectCropBeingChecked: 'Select crop being checked:',
    cropTomato: 'Tomato',
    cropMaize: 'Maize',
    cropPaddy: 'Paddy',
    cropRagi: 'Ragi',
    cropCotton: 'Cotton',
    cropOnion: 'Onion',
    cropChilli: 'Chilli',
    cropOther: 'Other',
    shortlistCountLabel: 'Local crop diseases checked:',
    focusedCheckActive: 'Local crop check active',
    unlistedCropNotice: 'This crop is not in our local list yet. We will check carefully, or you can ask your local agriculture officer.',
    sampleTomatoBlight: 'Tomato Early Blight',
    sampleMaizeBlight: 'Maize Leaf Blight',
    samplePaddyBlast: 'Paddy Blast Sample',
    sampleGlossyBlackSpots: 'Glossy Black Spots (Uncertain)',
    qualityCheckFailedTitle: 'Photo is Not Clear Enough',
    qualityIssueTooDark: 'Photo is too dark — move into good daylight and take the photo again.',
    qualityIssueTooBright: 'Photo is too bright — turn off camera flash and avoid direct sun glare.',
    qualityIssueBlurry: 'Photo is blurry — hold your phone steady, tap the leaf on screen to focus, and retake.',
    qualityIssueFramingSmall: 'Leaf is too small in the photo — move your phone closer to the leaf.',
    photoGuideTitle: 'How to Take a Clear Leaf Photo:',
    goodPhotoTitle: 'Good Photo ✓',
    goodPhotoTip1: 'Leaf fills most of the screen',
    goodPhotoTip2: 'Spots look sharp and clear',
    goodPhotoTip3: 'Taken in natural daylight',
    badPhotoTitle: 'Bad Photo ✗',
    badPhotoTip1: 'Blurry from shaking hands',
    badPhotoTip2: 'Too dark or in deep shadow',
    badPhotoTip3: 'Leaf is far away in the background',
    holdSteadyRetakeBtn: 'Hold Steady & Retake Photo',
    cancelBtn: 'Cancel',
    verifyingLeafIdentity: 'Checking if leaf matches selected crop...',
    verifyingLeafSubtext: 'Comparing leaf shape and veins before checking spots',
    diagnosingLeafSubtext: 'Checking spot colour and texture against local crop conditions',
    cropMismatchTitle: 'Leaf Does Not Match Selected Crop',
    cropMismatchDefaultMsg: 'This leaf does not look like the selected crop. Please check the crop name or take a clear photo of the leaf.',
    cropMismatchWhyTitle: 'Why we check this first',
    cropMismatchWhyDesc: 'Matching the right plant first stops wrong disease advice meant for a different crop.',
    retakeCorrectLeafBtn: 'Retake Photo',
    confirmProceedAnywayBtn: 'This is the right crop, continue',
    notSureYetHeading: 'Not sure yet – need more information',
    confidenceLabel: 'Confidence',
    inconclusiveBannerTitle: 'Confidence is below 60% — cannot confirm one disease from this photo',
    inconclusiveBannerDesc: 'These spots could come from more than one cause (such as insect marks, black mold, or a leaf infection). Take a closer photo, add a photo of the leaf underside, or show the leaf to your Krishi Vigyan Kendra.',
    retakePhotoBtn: 'Retake photo',
    addLeafUndersideBtn: 'Add photo of leaf underside',
    leafUndersideAddedBadge: 'Leaf underside photo added — checked both sides',
    showToKvkBtn: 'Show to Krishi Vigyan Kendra',
    readAloudBtn: 'Read Aloud',
    kvkHelperTitle: 'Krishi Vigyan Kendra (KVK) & Farmer Help',
    kvkHelperSubtitle: 'Show this screen or carry a fresh leaf in a closed plastic bag to your local agriculture officer.',
    kvkHelplineLabel: 'Kisan Call Centre (Toll-Free): 1800-180-1551',
    kvkChecklist1: 'Carry 1–2 affected leaves showing both the top and underside.',
    kvkChecklist2: 'Tell the officer when you first saw the spots and whether many plants have them.',
    kvkChecklist3: 'Ask before buying or spraying any chemical pesticide.',
    heresWhatWeSaw: "Here's what we saw",
    checkedAgainstPhoto: 'Checked against your photo',
    obsGlossyBlackRaised: 'Glossy black raised spots on the green leaf surface.',
    obsReddishBrownRim: 'Dry tan patches with a reddish-brown rim on the leaf.',
    obsPaleYellowPatches: 'Pale yellow patches between the green leaf veins.',
    obsSmallBlackDotsVeins: 'Small black raised dots scattered near the leaf veins.',
    obsNoRingPattern: 'No ring pattern seen.',
    obsNoYellowEdge: 'No yellow edge seen.',
    obsNoCrispBrownRim: 'No reddish-brown rim seen.',
    otherPossibilitiesConsidered: 'Other possibilities considered',
    bestFit: 'Best fit',
    possibleFit: 'Possible',
    weakFit: 'Weak fit',
    howToTellTitle: 'How to find out',
    howToTell_generic: 'Perform simple tests to differentiate the condition.',
    howToTell_altBlackSootyMold:
      'Rub the black spot gently with a damp cloth (if it wipes off, it is likely sooty mold from insect honeydew; if it stays with a clear edge, it is more likely a leaf spot). Check for ants, sticky leaves, or tiny insects on the underside. Take a photo of the leaf underside and the whole plant.',
    takePhotoUnderside: 'Take a photo of the leaf underside and the whole plant.',
    ifItIs: 'If it is',
    careSootyMold: 'Control the insects (wash leaves with plain water, check for ants) and do not just remove leaves.',
    careInsectFeeding: 'Remove badly affected leaves and keep leaves dry.',
    careLeafSpot: 'Remove badly affected leaves, keep leaves dry, and avoid overhead irrigation.',
    defaultCare: 'Follow safe non-chemical care steps above.',
    likelyMatch: 'Likely match',
    possibleMatch: 'Possible match',
    lowConfidence: 'Low confidence',
    unknownCondition: 'Unknown condition',
    expertCheckNeeded: 'Expert check needed',
    causeLeafSpotTitle: 'If it is a leaf spot:',
    careLeafSpot1: 'Remove badly affected leaves and dispose of them away from plants.',
    careLeafSpot2: 'Keep leaves dry to prevent fungal spread.',
    careLeafSpot3: 'Water at the base of the plant, not over the leaves.',
    causeSootyMoldTitle: 'If it is sooty mold or insects:',
    careSootyMold1: 'Control the insects first (rinse leaves gently with plain water, check for ants).',
    careSootyMold2: 'Do not rely on removing leaves alone, as mold returns if insects remain.',
    allSafeNonChemicalNote: 'All care steps are non-chemical and safe for your crop.',
    unknownBannerTitle: 'Unknown condition — no known crop disease matched',
    unknownBannerDesc: 'This condition does not match known diseases in our database for this crop. Take a closer photo or show the leaf to your local Krishi Vigyan Kendra.',
    mostLikely: 'Most likely',
    alsoPossible: 'Also possible',
    preventSootyMoldTitle: 'If sooty mold or sap-sucking insects:',
    preventSootyMold1: 'Monitor for ants and sap-sucking insects early on leaf undersides.',
    preventSootyMold2: 'Install yellow sticky traps near the crop canopy.',
    preventSootyMold3: 'Keep plants from crowding to reduce humid shelter for pests.',
    preventLeafSpotTitle: 'If a leaf spot (fungal or bacterial):',
    preventLeafSpot1: 'Maintain proper plant spacing for good airflow and sunlight.',
    preventLeafSpot2: 'Avoid overhead watering — water at the base of the plant.',
    preventLeafSpot3: 'Clean tools and pruning shears between plants.',
    possibleCause: 'Possible cause',
    supportsThisLabel: 'Supports this:',
    doesntFitLabel: "Doesn't fit / not seen:",
    confidenceLimitLow:
      'Low confidence (preliminary screening): Symptoms could stem from multiple unrelated causes, or the photo lacks distinguishing features. Do not spray chemicals based on this screening alone.',
    confidenceLimitMedium:
      'Medium confidence: Symptoms match typical patterns, but physical or laboratory confirmation is required before specific intervention.',
    confidenceLimitHigh:
      'High confidence: Strong symptom match with verified regional crop records. Confirm on ground before applying recommended interventions.',
    aiEstimatedNotProbability: 'AI-estimated, not a measured probability',
    consistencyCheckTitle: 'Self-Consistency Verification (2x Model Pass)',
    runConsistencyCheckBtn: 'Run Consistency Check (2x Pass)',
    runningConsistencyCheck: 'Running 2 independent model passes on this photo...',
    consistencyVerified: 'Concordance verified: Both model passes produced consistent labels and supporting evidence.',
    consistencyDivergent: 'Divergence flagged: Passes produced conflicting labels or contradictory evidence for the same photo.',
    calibrationLogTitle: 'Field Calibration Log (Farmer Feedback vs Confidence Tier)',
    calibrationLogComment:
      'Thresholds should be adjusted from this empirical confirmation data and a labelled test set, not guessed statically.',
    tierLabel: 'Confidence Tier',
    totalScreenings: 'Total Screenings',
    confirmedAccurate: 'Accurate (Confirmed)',
    disconfirmed: 'Not Accurate',
    unsureCount: 'Not Sure',
    accuracyRate: 'Confirmation Rate',
    altSootySupports: 'Glossy black raised spots on the leaf surface; no yellow edge seen.',
    altSootyDoesntFit: 'No insects, ants, sticky honeydew shine, or wipe-off coating confirmed in this photo.',
    altInsectSupports: 'Small black raised spots on the leaf; no ring pattern seen.',
    altInsectDoesntFit: 'No live insects, eggs, or punctured leaf margins visible in this photo.',
    altAlgalSupports: 'Dark spots with distinct margins; no ring pattern seen.',
    altAlgalDoesntFit: 'No water-soaked borders, brown halo rim, or bacterial ooze visible in this photo.',
    healthyLeafTitle: 'No problem seen in this photo',
    healthyLeafEvidence: 'Clean green leaf with no visible spots, yellowing, or abnormal damage.',
    healthyLeafSafeCare1: 'Maintain regular balanced watering at the base of the plant.',
    healthyLeafSafeCare2: 'Continue scouting your field weekly for any new spot emergence.',
    healthyLeafPrevention:
      'Early-stage problems may not be visible yet. Re-check in a few days if you notice changes.',
    notAPlantTitle: "I can't see a plant here",
    notAPlantDesc: 'Please take a clear photo showing a crop leaf or plant.',
    kvkSummaryModalTitle: 'Krishi Vigyan Kendra (KVK) Summary',
    kvkSummaryHeading: 'Field Diagnostic Summary for Extension Officer',
    shareSummaryBtn: 'Share Summary',
    savePdfBtn: 'Save / Print PDF',
    summaryCopied: 'Summary copied to clipboard!',
    diagnosisDateLabel: 'Date',
    cropAndDistrictLabel: 'Crop & District',
    statusLabel: 'Status',
    closeBtn: 'Close',
    detailsSectionTitle: 'Diagnosis Details',
    exactConfidenceScore: 'Exact confidence score',
    colorTextureMetrics: 'Observation & texture metrics',
    devCalibrationTitle: 'Developer Calibration & Test Suite',
    devCalibrationDesc:
      'Verifies all 6 diagnostic cases (textbook, healthy, wrong crop, blurry, regression black spots, non-plant).',
    runAllTestsBtn: 'Run Calibration Suite',
    runningTests: 'Running tests...',
    testPassed: 'PASSED',
    testFailed: 'FAILED',
    testInLiveViewBtn: 'Test in Live View',
    sampleCleanHealthy: 'Clean Healthy Leaf',
    sampleNonPlant: 'Non-Plant / Table',
    matchSuffix: 'match',
    altBlackSootyMold: 'Black Sooty Mold (from sap-sucking insects)',
    altBlackSootyMoldReason: 'Glossy black raised coating on the leaf with no yellow edge.',
    altInsectFeedingSpots: 'Insect Feeding or Egg Spots',
    altInsectFeedingReason: 'Solid black raised dots with no ring pattern.',
    altAlgalOrBacterialSpot: 'Algal or Bacterial Leaf Spot',
    altAlgalOrBacterialReason: 'Sharp dark spot edges with no ring pattern.',
    safeCareTitle: 'Safe Care Steps (No Chemicals)',
    safeCareStep1: 'Pick off heavily spotted leaves and remove them from the field and dispose of them away from the plants (bury deep or follow your local guidance).',
    safeCareStep2: 'Water at the base of the plant so the leaves stay dry.',
    safeCareStep3: 'Turn the leaf over and check the underside for tiny insects, eggs, or sticky liquid.',
    recommendedTreatmentTitle: 'Recommended Treatment (High Confidence)',
    chemicalWithheldTitle: 'Chemical spray advice held back for safety',
    chemicalWithheldDesc: 'Because we are not 80% sure from this single photo, chemical sprays are not listed so your crop is not harmed by the wrong spray. Follow the safe care steps above.',
    defaultPreventionTip: 'Keep enough space between plants for air flow and use yellow sticky traps to catch insects early.',
    aiScreeningDisclaimer: 'AI screening aid, not a lab diagnosis. For chemical treatment decisions, confirm with your local agriculture officer.',
    wasDiagnosisAccurate: 'Was this check helpful and accurate?',
    feedbackRecorded: 'Feedback saved',
    feedbackYes: 'Yes, accurate',
    feedbackNo: 'No, not right',
    feedbackNotSure: 'Not sure',
    feedbackThankYouNo: 'Thank you. We noted this mismatch so we can improve future checks.',
    feedbackThankYouYes: 'Thank you. Saved to your farm history.',
    scanAnotherLeafBtn: 'Check Another Leaf',
    farmDiagnosisHistoryTitle: 'Past Leaf Checks',
    feedbackConfirmed: 'Confirmed ✓',
    feedbackMismatched: 'Not right ✗',
    feedbackUnconfirmed: 'Not sure',
    feedbackPending: 'Pending',
    devDebugViewTitle: 'Developer / Debug View',
    devStep4bLabel: 'Step 4b Pixel Self-Consistency:',
    devStep4bTriggered: 'Active (Overrode boilerplate claims to match image pixels)',
    devStep4bPassed: 'Consistent with image pixels',
    devDominantColorLabel: 'Dominant Spot Colour Class:',
    devRingPatternLabel: 'Ring Pattern in Pixels:',
    devYellowEdgeLabel: 'Yellow Edge in Pixels:',
    devTreatmentTierLabel: 'Treatment Advice Tier:',
    yesWord: 'Yes',
    noWord: 'No',
    yieldForecastTitle: 'Yield Forecast',
    yieldForecastSubtitle: 'Multi-year predictive model powered by satellite canopy & weather',
    estimatedOutput: 'Estimated 2026 Harvest Output',
    quintalsPerAcre: 'quintals / acre',
    vsFiveYearAvg: '+8.5% vs 5-Yr Avg',
    canopyHealthScore: 'Canopy Health Score',
    yieldHistoryChart: 'Yield History & AI Forecast',
    historicalYield: 'Historical Yield',
    aiForecastYield: 'AI 2026 Forecast',
    aiConfidenceNote: 'AI Forecast Confidence Note',
    keyFactorsTitle: 'Key Contributing Factors',
    modelDetailsTitle: 'Under the Hood: Machine Learning Model Details',
    mandiIntelTitle: 'Mandi & ROI Intel',
    mandiIntelSubtitle: 'Real-time APMC price signals & crop profitability forecast',
    searchCropPlaceholder: 'Search crop (e.g. Tomato, Onion, Ragi)...',
    checkPriceButton: 'Check Price',
    checkingPrice: 'Checking...',
    liveMandiPrice: 'Live Mandi Price',
    twoWeekForecast: '2-Week Forecast',
    perQuintal: 'per quintal (100 kg)',
    expectedRise: 'Expected Rise',
    projectedRange: 'Projected Range',
    aiMarketSignal: 'AI Market Signal',
    upwardMomentum: 'Upward Momentum',
    downwardPressure: 'Downward Pressure',
    stablePrice: 'Stable Price',
    roiCalcTitle: 'Farm Profit & ROI Calculator',
    todayPrice: "Today's Price",
    forecastPrice: '2-Wk Forecast',
    expectedYieldLabel: 'Expected Yield (Quintals)',
    totalInputCostLabel: 'Total Input Cost (₹)',
    totalRevenue: 'Total Revenue',
    netProfit: 'Net Profit',
    returnOnInvestment: 'Return on Investment (ROI)',
    assistantTitle: 'AgriMind Voice & Chat',
    assistantGreeting: 'Welcome to AgriMind. Tap mic or ask questions about your crops.',
    typeOrSpeakPlaceholder: 'Type or speak in Kannada / English...',
    switchLanguage: 'Language / ಭಾಷೆ',
    kannada: 'ಕನ್ನಡ',
    english: 'English',
    viewMode: 'View Mode',
    viewModeAuto: 'Auto',
    viewModeMobile: 'Mobile',
    viewModeDesktop: 'Desktop',
    dragAndDropPhoto: 'Drag & drop photo here or click to browse',
    dropToUpload: 'Drop photo to upload',
    browseFiles: 'Browse files',
    farmerProfile: 'Farmer Profile',
    assistantSidebarBtn: 'Voice & Chat Assistant',
    openAssistant: 'Open Voice & Chat Assistant',
    closeAssistant: 'Close Assistant',
  },
  'kn-IN': {
    appName: 'ಅಗ್ರಿಮೈಂಡ್ (AgriMind)',
    stateSubtitle: 'ಕರ್ನಾಟಕ ಕೃಷಿ ಮಾಹಿತಿ',
    season: 'ಋತುಮಾನ',
    kharif: 'ಮುಂಗಾರು (ಖಾರಿಫ್)',
    rabi: 'ಹಿಂಗಾರು (ರಬಿ)',
    zaid: 'ಬೇಸಿಗೆ (ಜೈದ್)',
    homeTab: 'ಮುಖಪುಟ',
    cropTab: 'ಬೆಳೆ ಸಲಹೆ',
    diseaseTab: 'ರೋಗ ಪತ್ತೆ',
    yieldTab: 'ಇಳುವರಿ',
    marketTab: 'ಮಾರುಕಟ್ಟೆ',
    safetyScore: 'ಒಟ್ಟಾರೆ ಬೆಳೆ ಸುರಕ್ಷತಾ ಅಂಕ',
    favorable: 'ಅನುಕೂಲಕರ',
    safetyDesc: 'ನಿಮ್ಮ ಜಿಲ್ಲೆಯಲ್ಲಿ ಬೆಳೆಗೆ ಉತ್ತಮ ವಾತಾವರಣವಿದೆ. ಕಡಿಮೆ ಕೀಟ ಬಾಧೆ ಮತ್ತು ಮಣ್ಣಿನಲ್ಲಿ ಸರಿಯಾದ ತೇವಾಂಶವಿದೆ.',
    safetySource: 'ಮೂಲ: ಎಐ ಅಪಾಯ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಹವಾಮಾನ ಮಾಹಿತಿ',
    updatedToday: 'ಇಂದು ನವೀಕರಿಸಿದೆ',
    weatherTitle: 'ಹವಾಮಾನ',
    soilHealthTitle: 'ಮಣ್ಣಿನ ಮಾಹಿತಿ',
    soilProfile: 'ಮಣ್ಣಿನ ವಿವರ',
    liveForecast: 'ಇಂದಿನ ಹವಾಮಾನ',
    humidity: 'ತೇವಾಂಶ',
    testedData: 'ಪರೀಕ್ಷಿಸಿದ ಮಣ್ಣು',
    estimatedData: 'ಜಿಲ್ಲೆಯ ಸಾಮಾನ್ಯ ಮಣ್ಣು',
    actionRequired: 'ಗಮನಿಸಿ: ಔಷಧಿ ಸಿಂಪಡಣೆ ಎಚ್ಚರಿಕೆ',
    rainWarningTitle: 'ಮಳೆ ಬರುವ ಸಾಧ್ಯತೆ',
    rainWarningDesc: 'ಬುಧವಾರ ಮಧ್ಯಾಹ್ನ ಮಳೆ ಬರುವ ಸಾಧ್ಯತೆ ಇದೆ. ಗೊಬ್ಬರ ಅಥವಾ ಔಷಧಿ ಸಿಂಪಡಣೆಯನ್ನು ಸ್ವಲ್ಪ ಮುಂದೂಡಿ.',
    fourDayOutlook: 'ಮುಂದಿನ ೪ ದಿನಗಳ ಹವಾಮಾನ',
    cropAdvisoryTitle: 'ಸೂಕ್ತ ಬೆಳೆ ಸಲಹೆ',
    cropAdvisorySubtitle: 'ಮಣ್ಣು, ಮಳೆ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ನೋಡಿ ಬೆಳೆ ಶಿಫಾರಸು',
    selectDistrict: 'ಜಿಲ್ಲೆ ಆರಿಸಿ',
    selectSeason: 'ಋತುಮಾನ',
    soilLabel: 'ಮಣ್ಣು',
    getCropRecs: 'ಸೂಕ್ತ ಬೆಳೆಗಳನ್ನು ನೋಡಿ',
    analyzingAgroData: 'ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
    topRecommendedCrops: 'ನಿಮ್ಮ ಹೊಲಕ್ಕೆ ಸೂಕ್ತವಾದ ೩ ಬೆಳೆಗಳು',
    startOver: 'ಮತ್ತೆ ಮೊದಲಿನಿಂದ',
    suitability: 'ಹೊಂದಾಣಿಕೆ',
    viewWhy: 'ಕಾರಣ ನೋಡಿ',
    hideFactors: 'ವಿವರ ಮುಚ್ಚಿ',
    soilCompat: 'ಮಣ್ಣಿನ ಹೊಂದಾಣಿಕೆ',
    climateFit: 'ಮಳೆ ಮತ್ತು ಹವಾಮಾನ',
    marketDemand: 'ಮಾರುಕಟ್ಟೆ ಬೇಡಿಕೆ',
    listenSpeech: 'ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ',
    plantDoctorTitle: 'ಸಸ್ಯ ವೈದ್ಯ (ಎಲೆ ಪರೀಕ್ಷೆ)',
    plantDoctorSubtitle: 'ಫೋನ್ ಕ್ಯಾಮೆರಾದಲ್ಲಿ ಎಲೆಯ ಚುಕ್ಕೆಗಳನ್ನು ತೋರಿಸಿ ಮತ್ತು ಸುರಕ್ಷಿತ ಆರೈಕೆ ತಿಳಿಯಿರಿ',
    captureTitle: 'ಎಲೆಯ ಫೋಟೋ ತೆಗೆಯಿರಿ',
    captureDesc: 'ಹಗಲು ಬೆಳಕಿನಲ್ಲಿ ಎಲೆಯ ಮೇಲಿನ ಚುಕ್ಕೆಗಳು ಸ್ಪಷ್ಟವಾಗಿ ಕಾಣುವಂತೆ ಹತ್ತಿರದಿಂದ ಫೋಟೋ ತೆಗೆಯಿರಿ.',
    takePhotoButton: 'ಫೋಟೋ ತೆಗೆಯಿರಿ / ಫೋಟೋ ಹಾಕಿ',
    testSampleLeaves: 'ಅಥವಾ ಮಾದರಿ ಎಲೆಯನ್ನು ಒತ್ತಿ ಪರೀಕ್ಷಿಸಿ:',
    diagnosingLeaf: 'ಎಲೆಯ ಫೋಟೋ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
    leafAnalysisDetails: 'ಚುಕ್ಕೆಯ ಬಣ್ಣ, ಮೇಲ್ಮೈ ಮತ್ತು ಅಂಚುಗಳನ್ನು ನೋಡಲಾಗುತ್ತಿದೆ',
    diagnosisResult: 'ಎಲೆ ಪರೀಕ್ಷೆಯ ಫಲಿತಾಂಶ',
    confidenceLevel: 'ಖಚಿತತೆ',
    immediateTreatment: 'ತಕ್ಷಣದ ಆರೈಕೆ',
    futurePrevention: 'ಮುಂದೆ ರೋಗ ಬರದಂತೆ ತಡೆಯಲು',
    scanAnother: 'ಇನ್ನೊಂದು ಎಲೆ ಪರೀಕ್ಷಿಸಿ',
    severityHigh: 'ಹೆಚ್ಚು ತೀವ್ರತೆ',
    severityMedium: 'ಮಧ್ಯಮ ತೀವ್ರತೆ',
    severityLow: 'ಕಡಿಮೆ ತೀವ್ರತೆ',
    selectCropBeingChecked: 'ಪರೀಕ್ಷಿಸುತ್ತಿರುವ ಬೆಳೆ ಆರಿಸಿ:',
    cropTomato: 'ಟೊಮೇಟೊ',
    cropMaize: 'ಮೆಕ್ಕೆಜೋಳ',
    cropPaddy: 'ಭತ್ತ',
    cropRagi: 'ರಾಗಿ',
    cropCotton: 'ಹತ್ತಿ',
    cropOnion: 'ಈರುಳ್ಳಿ',
    cropChilli: 'ಮೆಣಸಿನಕಾಯಿ',
    cropOther: 'ಇತರ ಬೆಳೆ',
    shortlistCountLabel: 'ಪರೀಕ್ಷಿಸುವ ಸ್ಥಳೀಯ ರೋಗಗಳು:',
    focusedCheckActive: 'ಸ್ಥಳೀಯ ಬೆಳೆ ಆಧಾರಿತ ಪರೀಕ್ಷೆ',
    unlistedCropNotice: 'ಈ ಬೆಳೆ ನಮ್ಮ ಸ್ಥಳೀಯ ಪಟ್ಟಿಯಲ್ಲಿ ಇನ್ನೂ ಇಲ್ಲ. ನಾವು ಎಚ್ಚರಿಕೆಯಿಂದ ಪರೀಕ್ಷಿಸುತ್ತೇವೆ, ಖಚಿತ ಮಾಹಿತಿಗೆ ಸ್ಥಳೀಯ ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಕೇಳಿ.',
    sampleTomatoBlight: 'ಟೊಮೇಟೊ ಎಲೆ ಚುಕ್ಕೆ',
    sampleMaizeBlight: 'ಮೆಕ್ಕೆಜೋಳ ಎಲೆ ಮಚ್ಚೆ',
    samplePaddyBlast: 'ಭತ್ತದ ಬೆಂಕಿ ರೋಗ ಮಾದರಿ',
    sampleGlossyBlackSpots: 'ಹೊಳೆಯುವ ಕಪ್ಪು ಚುಕ್ಕೆಗಳು (ಅನಿಶ್ಚಿತ)',
    qualityCheckFailedTitle: 'ಫೋಟೋ ಸರಿಯಾಗಿ ಕಾಣುತ್ತಿಲ್ಲ',
    qualityIssueTooDark: 'ಫೋಟೋ ತುಂಬಾ ಕತ್ತಲೆಯಾಗಿದೆ — ಉತ್ತಮ ಹಗಲು ಬೆಳಕಿನಲ್ಲಿ ಮತ್ತೆ ಫೋಟೋ ತೆಗೆಯಿರಿ.',
    qualityIssueTooBright: 'ಫೋಟೋದಲ್ಲಿ ಬೆಳಕು ಹೆಚ್ಚಾಗಿ ಹೊಳೆಯುತ್ತಿದೆ — ಕ್ಯಾಮೆರಾ ಫ್ಲಾಶ್ ಆಫ್ ಮಾಡಿ ಮತ್ತೆ ತೆಗೆಯಿರಿ.',
    qualityIssueBlurry: 'ಫೋಟೋ ಮಂಜಾಗಿದೆ — ಕೈ ಅಲುಗಾಡಿಸದೆ ಹಿಡಿದು, ಪರದೆಯ ಮೇಲೆ ಎಲೆಯನ್ನು ಮುಟ್ಟಿ ಫೋಕಸ್ ಮಾಡಿ ಮತ್ತೆ ತೆಗೆಯಿರಿ.',
    qualityIssueFramingSmall: 'ಫೋಟೋದಲ್ಲಿ ಎಲೆ ತುಂಬಾ ಚಿಕ್ಕದಾಗಿ ಕಾಣುತ್ತಿದೆ — ಫೋನ್ ಅನ್ನು ಎಲೆಯ ಹತ್ತಿರ ಹಿಡಿದು ತೆಗೆಯಿರಿ.',
    photoGuideTitle: 'ಸ್ಪಷ್ಟವಾದ ಫೋಟೋ ತೆಗೆಯುವುದು ಹೇಗೆ:',
    goodPhotoTitle: 'ಒಳ್ಳೆಯ ಫೋಟೋ ✓',
    goodPhotoTip1: 'ಎಲೆ ಫೋಟೋದಲ್ಲಿ ದೊಡ್ಡದಾಗಿ ಕಾಣಬೇಕು',
    goodPhotoTip2: 'ಚುಕ್ಕೆಗಳು ಮಂಜಾಗದೆ ಸ್ಪಷ್ಟವಾಗಿರಬೇಕು',
    goodPhotoTip3: 'ಹಗಲು ಬೆಳಕಿನಲ್ಲಿ ತೆಗೆದಿರಬೇಕು',
    badPhotoTitle: 'ಸರಿಯಲ್ಲದ ಫೋಟೋ ✗',
    badPhotoTip1: 'ಕೈ ಅಲುಗಾಡಿ ಮಂಜಾದ ಫೋಟೋ',
    badPhotoTip2: 'ಕತ್ತಲೆ ಅಥವಾ ನೆರಳಿನಲ್ಲಿ ತೆಗೆದ ಫೋಟೋ',
    badPhotoTip3: 'ಎಲೆ ತುಂಬಾ ದೂರದಲ್ಲಿರುವ ಫೋಟೋ',
    holdSteadyRetakeBtn: 'ಕೈ ಸ್ಥಿರವಾಗಿ ಹಿಡಿದು ಮತ್ತೆ ಫೋಟೋ ತೆಗೆಯಿರಿ',
    cancelBtn: 'ಬೇಡ (ರದ್ದುಮಾಡಿ)',
    verifyingLeafIdentity: 'ಎಲೆ ಆಯ್ದ ಬೆಳೆಯದ್ದೇ ಎಂದು ನೋಡಲಾಗುತ್ತಿದೆ...',
    verifyingLeafSubtext: 'ಚುಕ್ಕೆ ಪರೀಕ್ಷಿಸುವ ಮುನ್ನ ಎಲೆಯ ಆಕಾರ ಮತ್ತು ನರಗಳನ್ನು ನೋಡಲಾಗುತ್ತಿದೆ',
    diagnosingLeafSubtext: 'ಚುಕ್ಕೆಯ ಬಣ್ಣ ಮತ್ತು ಮೇಲ್ಮೈಯನ್ನು ಸ್ಥಳೀಯ ಬೆಳೆ ರೋಗಗಳೊಂದಿಗೆ ಹೋಲಿಸಲಾಗುತ್ತಿದೆ',
    cropMismatchTitle: 'ಈ ಎಲೆ ಆಯ್ದ ಬೆಳೆಯಂತೆ ಕಾಣುತ್ತಿಲ್ಲ',
    cropMismatchDefaultMsg: 'ನೀವು ಆರಿಸಿದ ಬೆಳೆಗೂ ಈ ಫೋಟೋದಲ್ಲಿರುವ ಎಲೆಗೂ ಹೊಂದಾಣಿಕೆಯಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಸರಿಯಾದ ಬೆಳೆ ಆರಿಸಿ ಅಥವಾ ಮತ್ತೆ ಫೋಟೋ ತೆಗೆಯಿರಿ.',
    cropMismatchWhyTitle: 'ನಾವು ಇದನ್ನು ಮೊದಲು ಏಕೆ ನೋಡುತ್ತೇವೆ',
    cropMismatchWhyDesc: 'ಬೇರೆ ಗಿಡದ ಎಲೆಗೆ ತಪ್ಪಾದ ರೋಗದ ಹೆಸರು ಹೇಳುವುದನ್ನು ತಡೆಯಲು ಮೊದಲು ಎಲೆಯನ್ನು ಗುರುತಿಸುತ್ತೇವೆ.',
    retakeCorrectLeafBtn: 'ಮತ್ತೆ ಫೋಟೋ ತೆಗೆಯಿರಿ',
    confirmProceedAnywayBtn: 'ಇದೇ ಬೆಳೆ, ಮುಂದುವರಿಸಿ',
    notSureYetHeading: 'ಇನ್ನೂ ಖಚಿತವಾಗಿಲ್ಲ – ಹೆಚ್ಚಿನ ಮಾಹಿತಿ ಬೇಕು',
    confidenceLabel: 'ಖಚಿತತೆ',
    inconclusiveBannerTitle: 'ಖಚಿತತೆ ಶೇಕಡಾ ೬೦ಕ್ಕಿಂತ ಕಡಿಮೆಯಿದೆ — ಈ ಫೋಟೋದಿಂದ ಒಂದೇ ರೋಗ ಎಂದು ಹೇಳಲು ಸಾಧ್ಯವಿಲ್ಲ',
    inconclusiveBannerDesc: 'ಈ ಎಲೆಯ ಮೇಲಿನ ಚುಕ್ಕೆಗಳು ಒಂದಕ್ಕಿಂತ ಹೆಚ್ಚು ಕಾರಣಗಳಿಂದ ಬಂದಿರಬಹುದು (ಕೀಟದ ಗುರುತು, ಕಪ್ಪು ಬೂಷ್ಟ್ ಅಥವಾ ಎಲೆ ಸೋಂಕು). ಇನ್ನಷ್ಟು ಹತ್ತಿರದಿಂದ ಫೋಟೋ ತೆಗೆಯಿರಿ, ಎಲೆಯ ಕೆಳಭಾಗದ ಫೋಟೋ ಸೇರಿಸಿ, ಅಥವಾ ಹತ್ತಿರದ ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರಕ್ಕೆ (KVK) ತೋರಿಸಿ.',
    retakePhotoBtn: 'ಮತ್ತೆ ಫೋಟೋ ತೆಗೆಯಿರಿ',
    addLeafUndersideBtn: 'ಎಲೆಯ ಕೆಳಭಾಗದ ಫೋಟೋ ಸೇರಿಸಿ',
    leafUndersideAddedBadge: 'ಎಲೆಯ ಕೆಳಭಾಗದ ಫೋಟೋ ಸೇರಿಸಲಾಗಿದೆ — ಎರಡೂ ಬದಿ ನೋಡಲಾಗಿದೆ',
    showToKvkBtn: 'ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರಕ್ಕೆ (KVK) ತೋರಿಸಿ',
    readAloudBtn: 'ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ',
    kvkHelperTitle: 'ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರ (KVK) ಮತ್ತು ರೈತ ಸಹಾಯ',
    kvkHelperSubtitle: 'ಈ ಪರದೆಯನ್ನು ಅಥವಾ ಚುಕ್ಕೆ ಇರುವ ಎಲೆಯನ್ನು ಕವರ್‌ನಲ್ಲಿ ಹಾಕಿ ನಿಮ್ಮ ಹತ್ತಿರದ ಕೃಷಿ ಅಧಿಕಾರಿಗೆ ತೋರಿಸಿ.',
    kvkHelplineLabel: 'ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್ (ಉಚಿತ ಕರೆ): 1800-180-1551',
    kvkChecklist1: 'ಎಲೆಯ ಮೇಲ್ಭಾಗ ಮತ್ತು ಕೆಳಭಾಗ ಕಾಣುವಂತೆ ೧–೨ ಎಲೆಗಳನ್ನು ತೆಗೆದುಕೊಂಡು ಹೋಗಿ.',
    kvkChecklist2: 'ಚುಕ್ಕೆಗಳು ಯಾವಾಗ ಕಾಣಿಸಿಕೊಂಡವು ಮತ್ತು ಎಷ್ಟು ಗಿಡಗಳಲ್ಲಿ ಇವೆ ಎಂದು ಅಧಿಕಾರಿಗೆ ತಿಳಿಸಿ.',
    kvkChecklist3: 'ಯಾವುದೇ ರಾಸಾಯನಿಕ ಔಷಧಿ ಕೊಳ್ಳುವ ಮುನ್ನ ಕೃಷಿ ಅಧಿಕಾರಿಯ ಸಲಹೆ ಪಡೆಯಿರಿ.',
    heresWhatWeSaw: 'ನಾವು ಫೋಟೋದಲ್ಲಿ ಕಂಡಿದ್ದು',
    checkedAgainstPhoto: 'ನಿಮ್ಮ ಫೋಟೋದೊಂದಿಗೆ ತಾಳೆ ನೋಡಲಾಗಿದೆ',
    obsGlossyBlackRaised: 'ಹಸಿರು ಎಲೆಯ ಮೇಲೆ ಹೊಳೆಯುವ ಕಪ್ಪು ಉಬ್ಬಿದ ಚುಕ್ಕೆಗಳು ಕಾಣುತ್ತಿವೆ.',
    obsReddishBrownRim: 'ಎಲೆಯ ಮೇಲೆ ಕೆಂಪು-ಕಂದು ಅಂಚಿನ ಒಣಗಿದ ಮಚ್ಚೆಗಳು ಕಾಣುತ್ತಿವೆ.',
    obsPaleYellowPatches: 'ಎಲೆಯ ಹಸಿರು ನರಗಳ ನಡುವೆ ತಿಳಿ ಹಳದಿ ಮಚ್ಚೆಗಳು ಕಾಣುತ್ತಿವೆ.',
    obsSmallBlackDotsVeins: 'ಎಲೆಯ ನರಗಳ ಪಕ್ಕದಲ್ಲಿ ಸಣ್ಣ ಕಪ್ಪು ಉಬ್ಬಿದ ಚುಕ್ಕೆಗಳು ಕಾಣುತ್ತಿವೆ.',
    obsNoRingPattern: 'ಯಾವುದೇ ಉಂಗುರದ ಗುರುತು ಕಾಣುತ್ತಿಲ್ಲ.',
    obsNoYellowEdge: 'ಚುಕ್ಕೆಯ ಸುತ್ತ ಹಳದಿ ಅಂಚು ಕಾಣುತ್ತಿಲ್ಲ.',
    obsNoCrispBrownRim: 'ಸ್ಪಷ್ಟವಾದ ಕೆಂಪು-ಕಂದು ಅಂಚು ಕಾಣುತ್ತಿಲ್ಲ.',
    otherPossibilitiesConsidered: 'ಪರಿಗಣಿಸಲಾದ ಇತರ ಸಾಧ್ಯತೆಗಳು',
    bestFit: 'ಅತ್ಯುತ್ತಮ ಹೊಂದಾಣಿಕೆ',
    possibleFit: 'ಸಾಧ್ಯತೆ',
    weakFit: 'ಕಡಿಮೆ ಹೊಂದಾಣಿಕೆ',
    howToTellTitle: 'ಹೇಗೆ ಪತ್ತೆಹಚ್ಚುವುದು',
    howToTell_generic: 'ಸ್ಥಿತಿಯನ್ನು ಪ್ರತ್ಯೇಕಿಸಲು ಸರಳ ಪರೀಕ್ಷೆಗಳನ್ನು ಮಾಡಿ.',
    howToTell_altBlackSootyMold:
      'ಕಪ್ಪು ಚುಕ್ಕೆಯನ್ನು ತೇವಾಂಶವಿರುವ ಬಟ್ಟೆಯಿಂದ ನಿಧಾನವಾಗಿ ಒರೆಸಿ (ಅದು ಒರೆಸಿದರೆ ಹೋದರೆ, ಅದು ರಸ ಹೀರುವ ಕೀಟಗಳಿಂದ ಉಂಟಾದ ಕಪ್ಪು ಬೂಷ್ಟ್ ಆಗಿರಬಹುದು; ಗಟ್ಟಿ ಅಂಚಿನೊಂದಿಗೆ ಉಳಿದರೆ, ಅದು ಎಲೆ ಚುಕ್ಕೆ ರೋಗವಾಗಿರಬಹುದು). ಇರುವೆಗಳು, ಜಿಗುಟು ಎಲೆಗಳು ಅಥವಾ ಎಲೆಯ ಕೆಳಭಾಗದಲ್ಲಿ ಸಣ್ಣ ಕೀಟಗಳಿವೆಯೇ ಎಂದು ನೋಡಿ. ಎಲೆಯ ಕೆಳಭಾಗ ಮತ್ತು ಇಡೀ ಗಿಡದ ಫೋಟೋ ತೆಗೆಯಿರಿ.',
    takePhotoUnderside: 'ಎಲೆಯ ಕೆಳಭಾಗ ಮತ್ತು ಇಡೀ ಗಿಡದ ಫೋಟೋ ತೆಗೆಯಿರಿ.',
    ifItIs: 'ಒಂದು ವೇಳೆ ಇದು',
    careSootyMold: 'ಕೀಟಗಳನ್ನು ನಿಯಂತ್ರಿಸಿ (ಎಲೆಗಳನ್ನು ಶುದ್ಧ ನೀರಿನಿಂದ ತೊಳೆಯಿರಿ, ಇರುವೆಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ) ಮತ್ತು ಕೇವಲ ಎಲೆಗಳನ್ನು ಕೀಳಬೇಡಿ.',
    careInsectFeeding: 'ಹೆಚ್ಚು ಹಾನಿಗೊಳಗಾದ ಎಲೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ ಮತ್ತು ಎಲೆಗಳು ಒಣಗಿರುವಂತೆ ನೋಡಿಕೊಳ್ಳಿ.',
    careLeafSpot: 'ಹೆಚ್ಚು ಹಾನಿಗೊಳಗಾದ ಎಲೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ, ಎಲೆಗಳನ್ನು ಒಣಗಿಸಿ, ಮತ್ತು ಮೇಲಿನಿಂದ ನೀರು ಹಾಯಿಸುವುದನ್ನು ತಪ್ಪಿಸಿ.',
    defaultCare: 'ಮೇಲೆ ತಿಳಿಸಲಾದ ಸುರಕ್ಷಿತ ರಾಸಾಯನಿಕ ರಹಿತ ಕ್ರಮಗಳನ್ನು ಪಾಲಿಸಿ.',
    likelyMatch: 'ಹೆಚ್ಚು ಸಂಭವನೀಯ',
    possibleMatch: 'ಸಂಭವನೀಯ ಹೊಂದಾಣಿಕೆ',
    lowConfidence: 'ಕಡಿಮೆ ಖಚಿತತೆ',
    unknownCondition: 'ಅಪರಿಚಿತ ಸ್ಥಿತಿ',
    expertCheckNeeded: 'ತಜ್ಞರ ತಪಾಸಣೆ ಅಗತ್ಯ',
    causeLeafSpotTitle: 'ಇದು ಎಲೆ ಚುಕ್ಕೆ ರೋಗವಾಗಿದ್ದರೆ:',
    careLeafSpot1: 'ಹೆಚ್ಚು ಚುಕ್ಕೆಗಳಿರುವ ಎಲೆಗಳನ್ನು ಕಿತ್ತು ಗಿಡಗಳಿಂದ ದೂರ ವಿಲೇವಾರಿ ಮಾಡಿ.',
    careLeafSpot2: 'ಶಿಲೀಂಧ್ರ ಹರಡುವುದನ್ನು ತಡೆಯಲು ಎಲೆಗಳು ಒಣಗಿರುವಂತೆ ನೋಡಿಕೊಳ್ಳಿ.',
    careLeafSpot3: 'ಎಲೆಗಳ ಮೇಲಲ್ಲ, ಗಿಡದ ಬುಡಕ್ಕೆ ಮಾತ್ರ ನೀರು ಹಾಯಿಸಿ.',
    causeSootyMoldTitle: 'ಇದು ಕಪ್ಪು ಬೂಷ್ಟ್ ಅಥವಾ ಕೀಟಗಳಾಗಿದ್ದರೆ:',
    careSootyMold1: 'ಮೊದಲು ಕೀಟಗಳನ್ನು ನಿಯಂತ್ರಿಸಿ (ಎಲೆಗಳನ್ನು ಶುದ್ಧ ನೀರಿನಿಂದ ತೊಳೆಯಿರಿ, ಇರುವೆಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ).',
    careSootyMold2: 'ಕೇವಲ ಎಲೆಗಳನ್ನು ಕೀಳುವುದರ ಮೇಲೆ ಅವಲಂಬಿತರಾಗಬೇಡಿ, ಕೀಟಗಳಿದ್ದರೆ ಬೂಷ್ಟ್ ಮತ್ತೆ ಬರುತ್ತದೆ.',
    allSafeNonChemicalNote: 'ಎಲ್ಲಾ ಕ್ರಮಗಳು ರಾಸಾಯನಿಕ ರಹಿತವಾಗಿದ್ದು ನಿಮ್ಮ ಬೆಳೆಗೆ ಸಂಪೂರ್ಣ ಸುರಕ್ಷಿತವಾಗಿವೆ.',
    unknownBannerTitle: 'ಅಪರಿಚಿತ ಸ್ಥಿತಿ — ತಿಳಿದಿರುವ ಯಾವುದೇ ಬೆಳೆ ರೋಗ ಹೊಂದಾಣಿಕೆಯಾಗಿಲ್ಲ',
    unknownBannerDesc: 'ಈ ಲಕ್ಷಣಗಳು ನಮ್ಮ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿರುವ ಯಾವುದೇ ತಿಳಿದಿರುವ ರೋಗಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಸ್ಪಷ್ಟವಾದ ಫೋಟೋ ತೆಗೆಯಿರಿ ಅಥವಾ ಸ್ಥಳೀಯ ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರಕ್ಕೆ ತೋರಿಸಿ.',
    mostLikely: 'ಅತ್ಯಂತ ಸಂಭವನೀಯ',
    alsoPossible: 'ಇನ್ನೊಂದು ಸಾಧ್ಯತೆ',
    preventSootyMoldTitle: 'ಕಪ್ಪು ಬೂಷ್ಟ್ ಅಥವಾ ಕೀಟಗಳಾಗಿದ್ದರೆ:',
    preventSootyMold1: 'ಎಲೆಯ ಕೆಳಭಾಗದಲ್ಲಿ ರಸ ಹೀರುವ ಕೀಟಗಳು ಮತ್ತು ಇರುವೆಗಳನ್ನು ಆರಂಭದಲ್ಲೇ ಗಮನಿಸಿ.',
    preventSootyMold2: 'ಬೆಳೆಯ ಎತ್ತರದಲ್ಲಿ ಹಳದಿ ಜಿಗುಟು ಬಲೆಗಳನ್ನು (yellow sticky traps) ಕಟ್ಟಿ.',
    preventSootyMold3: 'ಕೀಟಗಳಿಗೆ ನೆರಳು ಮತ್ತು ತೇವಾಂಶ ಸಿಗದಂತೆ ಗಿಡಗಳು ಒಂದಕ್ಕೊಂದು ಒತ್ತಾಗಿರದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.',
    preventLeafSpotTitle: 'ಎಲೆ ಚುಕ್ಕೆ ರೋಗವಾಗಿದ್ದರೆ:',
    preventLeafSpot1: 'ಗಿಡಗಳ ನಡುವೆ ಉತ್ತಮ ಗಾಳಿ ಮತ್ತು ಸೂರ್ಯನ ಬೆಳಕು ಆಡುವಂತೆ ಸೂಕ್ತ ಅಂತರವಿರಲಿ.',
    preventLeafSpot2: 'ಎಲೆಗಳ ಮೇಲೆ ನೀರು ಸಿಂಪಡಿಸಬೇಡಿ — ಗಿಡದ ಬುಡಕ್ಕೆ ಮಾತ್ರ ನೀರು ಹಾಯಿಸಿ.',
    preventLeafSpot3: 'ಕತ್ತರಿಸುವ ಉಪಕರಣಗಳು ಮತ್ತು ಕತ್ತರಿಗಳನ್ನು ಸ್ವಚ್ಛವಾಗಿಟ್ಟುಕೊಳ್ಳಿ.',
    possibleCause: 'ಸಂಭವನೀಯ ಕಾರಣ',
    supportsThisLabel: 'ಇದನ್ನು ಬೆಂಬಲಿಸುವ ಲಕ್ಷಣಗಳು:',
    doesntFitLabel: 'ಹೊಂದಿಕೆಯಾಗದ / ಕಾಣಿಸದ ಅಂಶಗಳು:',
    confidenceLimitLow:
      'ಕಡಿಮೆ ಖಚಿತತೆ (ಆರಂಭಿಕ ತಪಾಸಣೆ): ಲಕ್ಷಣಗಳು ಹಲವು ಪ್ರತ್ಯೇಕ ಕಾರಣಗಳಿಂದ ಇರಬಹುದು ಅಥವಾ ಫೋಟೋದಲ್ಲಿ ಗುರುತಿಸುವ ಲಕ್ಷಣಗಳು ಸಾಕಷ್ಟಿಲ್ಲ. ಕೇವಲ ಈ ತಪಾಸಣೆಯ ಆಧಾರದ ಮೇಲೆ ರಾಸಾಯನಿಕ ಸಿಂಪಡಿಸಬೇಡಿ.',
    confidenceLimitMedium:
      'ಮಧ್ಯಮ ಖಚಿತತೆ: ಲಕ್ಷಣಗಳು ಸಾಮಾನ್ಯ ರೋಗ ಲಕ್ಷಣಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತಿವೆ, ಆದರೆ ಔಷಧ ಸಿಂಪಡಣೆಗೆ ಮುನ್ನ ತಜ್ಞರ ಪರಿಶೀಲನೆ ಅಗತ್ಯ.',
    confidenceLimitHigh:
      'ಹೆಚ್ಚಿನ ಖಚಿತತೆ: ನಿಮ್ಮ ಜಿಲ್ಲೆಯ ಋತುವಿನ ದಾಖಲೆಗಳಿಗೆ ಬಲವಾಗಿ ಹೊಂದಿಕೆಯಾಗುತ್ತಿದೆ. ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮಗಳನ್ನು ಕೈಗೊಳ್ಳುವ ಮುನ್ನ ಹೊಲದಲ್ಲಿ ಒಮ್ಮೆ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.',
    aiEstimatedNotProbability: 'ಎಐ-ಅಂದಾಜು, ನಿಖರ ಸಂಭವನೀಯತೆಯಲ್ಲ',
    consistencyCheckTitle: 'ಸ್ವಯಂ-ಸ್ಥಿರತೆ ಪರಿಶೀಲನೆ (೨ ಬಾರಿ ಮಾದರಿ ಪರೀಕ್ಷೆ)',
    runConsistencyCheckBtn: 'ಸ್ಥಿರತೆ ಪರೀಕ್ಷೆ ಚಲಾಯಿಸಿ (೨ ಬಾರಿ)',
    runningConsistencyCheck: 'ಈ ಫೋಟೋ ಮೇಲೆ ೨ ಸ್ವತಂತ್ರ ಪರೀಕ್ಷೆಗಳನ್ನು ನಡೆಸಲಾಗುತ್ತಿದೆ...',
    consistencyVerified: 'ಸ್ಥಿರತೆ ದೃಢಪಟ್ಟಿದೆ: ಎರಡೂ ಪರೀಕ್ಷೆಗಳಲ್ಲಿ ಒಂದೇ ರೀತಿಯ ಲೇಬಲ್‌ಗಳು ಮತ್ತು ಲಕ್ಷಣಗಳು ಬಂದಿವೆ.',
    consistencyDivergent: 'ವ್ಯತ್ಯಾಸ ಪತ್ತೆಯಾಗಿದೆ: ಒಂದೇ ಫೋಟೋಗೆ ವಿರುದ್ಧ ಲೇಬಲ್‌ಗಳು ಅಥವಾ ಅಸಮಂಜಸ ಲಕ್ಷಣಗಳು ಬಂದಿವೆ.',
    calibrationLogTitle: 'ಕ್ಷೇತ್ರ ಮಾಪನಾಂಕ ಲಾಗ್ (ರೈತರ ಪ್ರತಿಕ್ರಿಯೆ ಮತ್ತು ಖಚಿತತೆಯ ಹಂತ)',
    calibrationLogComment:
      'ಖಚಿತತೆಯ ಮಿತಿಗಳನ್ನು ಊಹೆಯ ಬದಲಿಗೆ ಈ ಕ್ಷೇತ್ರದ ದೃಢೀಕರಣ ದತ್ತಾಂಶ ಮತ್ತು ಲೇಬಲ್ ಮಾಡಿದ ಪರೀಕ್ಷಾ ಸೆಟ್ ಆಧಾರದ ಮೇಲೆ ಸರಿಹೊಂದಿಸಬೇಕು.',
    tierLabel: 'ಖಚಿತತೆಯ ಹಂತ',
    totalScreenings: 'ಒಟ್ಟು ತಪಾಸಣೆಗಳು',
    confirmedAccurate: 'ಸರಿಯಾಗಿದೆ (ದೃಢಪಟ್ಟಿದೆ)',
    disconfirmed: 'ಸರಿಯಲ್ಲ',
    unsureCount: 'ಗೊತ್ತಿಲ್ಲ',
    accuracyRate: 'ದೃಢೀಕರಣ ಪ್ರಮಾಣ',
    altSootySupports: 'ಎಲೆಯ ಮೇಲ್ಮೈಯಲ್ಲಿ ಹೊಳೆಯುವ ಕಪ್ಪು ಉಬ್ಬಿದ ಚುಕ್ಕೆಗಳು; ಯಾವುದೇ ಹಳದಿ ಅಂಚು ಕಾಣುತ್ತಿಲ್ಲ.',
    altSootyDoesntFit: 'ಈ ಫೋಟೋದಲ್ಲಿ ಯಾವುದೇ ಕೀಟಗಳು, ಇರುವೆಗಳು, ಜಿಗುಟು ದ್ರವ ಅಥವಾ ಒರೆಸಬಹುದಾದ ಪದರ ಕಾಣಿಸಿಲ್ಲ.',
    altInsectSupports: 'ಎಲೆಯ ಮೇಲೆ ಸಣ್ಣ ಕಪ್ಪು ಉಬ್ಬಿದ ಚುಕ್ಕೆಗಳು; ಯಾವುದೇ ಉಂಗುರದ ಗುರುತಿಲ್ಲ.',
    altInsectDoesntFit: 'ಈ ಫೋಟೋದಲ್ಲಿ ಜೀವಂತ ಕೀಟಗಳು, ಮೊಟ್ಟೆಗಳು ಅಥವಾ ಕಡಿದ ಎಲೆಯ ಅಂಚುಗಳು ಕಾಣಿಸಿಲ್ಲ.',
    altAlgalSupports: 'ಚೂಪಾದ ಅಂಚುಗಳಿರುವ ಕಪ್ಪು ಚುಕ್ಕೆಗಳು; ಯಾವುದೇ ಉಂಗುರದ ಗುರುತಿಲ್ಲ.',
    altAlgalDoesntFit: 'ಈ ಫೋಟೋದಲ್ಲಿ ನೀರಿನಲ್ಲಿ ನೆನೆದಂತಹ ಅಂಚುಗಳು, ಕಂದು ಅಂಚಿನ ವೃತ್ತ ಅಥವಾ ಕೀವು ಕಾಣಿಸಿಲ್ಲ.',
    healthyLeafTitle: 'ಈ ಫೋಟೋದಲ್ಲಿ ಯಾವುದೇ ರೋಗ ಲಕ್ಷಣ ಕಾಣುತ್ತಿಲ್ಲ',
    healthyLeafEvidence: 'ಯಾವುದೇ ಚುಕ್ಕೆ ಅಥವಾ ಹಾನಿಯಿಲ್ಲದೆ ಎಲೆ ಸ್ವಚ್ಛವಾಗಿ ಹಸಿರಾಗಿದೆ.',
    healthyLeafSafeCare1: 'ಗಿಡದ ಬುಡಕ್ಕೆ ನಿಯಮಿತವಾಗಿ ಸಮತೋಲಿತ ನೀರು ಹಾಯಿಸಿ.',
    healthyLeafSafeCare2: 'ವಾರಕ್ಕೊಮ್ಮೆ ಹೊಲದಲ್ಲಿ ಎಲೆಗಳನ್ನು ಸೂಕ್ಷ್ಮವಾಗಿ ಗಮನಿಸುತ್ತಿರಿ.',
    healthyLeafPrevention:
      'ಆರಂಭಿಕ ಹಂತದ ಸಮಸ್ಯೆಗಳು ತಕ್ಷಣ ಕಾಣಿಸದಿರಬಹುದು. ಎಲೆಯಲ್ಲಿ ಯಾವುದೇ ಬದಲಾವಣೆ ಕಂಡರೆ ಕೆಲವು ದಿನಗಳ ನಂತರ ಮತ್ತೆ ಪರೀಕ್ಷಿಸಿ.',
    notAPlantTitle: 'ಇಲ್ಲಿ ಯಾವುದೇ ಸಸ್ಯ ಕಾಣಿಸುತ್ತಿಲ್ಲ',
    notAPlantDesc: 'ದಯವಿಟ್ಟು ಬೆಳೆಯ ಎಲೆ ಅಥವಾ ಸಸ್ಯವನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ತೋರಿಸುವ ಫೋಟೋ ತೆಗೆಯಿರಿ.',
    kvkSummaryModalTitle: 'ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರ (KVK) ಸಾರಾಂಶ',
    kvkSummaryHeading: 'ಕೃಷಿ ಅಧಿಕಾರಿಗಾಗಿ ಕ್ಷೇತ್ರ ತಪಾಸಣಾ ಸಾರಾಂಶ',
    shareSummaryBtn: 'ಸಾರಾಂಶ ಹಂಚಿಕೊಳ್ಳಿ',
    savePdfBtn: 'ಪಿಡಿಎಫ್ ಉಳಿಸಿ / ಪ್ರಿಂಟ್',
    summaryCopied: 'ಸಾರಾಂಶ ನಕಲಿಸಲಾಗಿದೆ!',
    diagnosisDateLabel: 'ದಿನಾಂಕ',
    cropAndDistrictLabel: 'ಬೆಳೆ ಮತ್ತು ಜಿಲ್ಲೆ',
    statusLabel: 'ಸ್ಥಿತಿ',
    closeBtn: 'ಮುಚ್ಚಿ',
    detailsSectionTitle: 'ತಪಾಸಣೆಯ ವಿವರಗಳು',
    exactConfidenceScore: 'ನಿಖರ ಖಚಿತತೆಯ ಪ್ರಮಾಣ',
    colorTextureMetrics: 'ಬಣ್ಣ ಮತ್ತು ಮೇಲ್ಮೈ ವಿವರಗಳು',
    devCalibrationTitle: 'ಡೆವಲಪರ್ ಪರೀಕ್ಷಾ ಸೂಟ್',
    devCalibrationDesc:
      'ಎಲ್ಲಾ ೬ ಪರೀಕ್ಷೆಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ (ಮುಂಚಿನ ಅಂಗಮಾರಿ, ಆರೋಗ್ಯಕರ ಎಲೆ, ತಪ್ಪು ಬೆಳೆ, ಮಂಜಾದ ಫೋಟೋ, ಕಪ್ಪು ಚುಕ್ಕೆಗಳು, ಸಸ್ಯವಲ್ಲದ್ದು).',
    runAllTestsBtn: 'ಎಲ್ಲಾ ಪರೀಕ್ಷೆಗಳನ್ನು ಚಲಾಯಿಸಿ',
    runningTests: 'ಪರೀಕ್ಷಿಸಲಾಗುತ್ತಿದೆ...',
    testPassed: 'ಯಶಸ್ವಿಯಾಗಿದೆ ✓',
    testFailed: 'ವಿಫಲವಾಗಿದೆ ✗',
    testInLiveViewBtn: 'ಪರದೆಯಲ್ಲಿ ಪರೀಕ್ಷಿಸಿ',
    sampleCleanHealthy: 'ಆರೋಗ್ಯಕರ ಹಸಿರು ಎಲೆ',
    sampleNonPlant: 'ಸಸ್ಯವಲ್ಲದ ಚಿತ್ರ (ಮೇಜು)',
    matchSuffix: 'ಹೊಂದಾಣಿಕೆ',
    altBlackSootyMold: 'ಕಪ್ಪು ಬೂಷ್ಟ್ (ರಸ ಹೀರುವ ಕೀಟಗಳಿಂದ ಬರುವ ಮಸಿ)',
    altBlackSootyMoldReason: 'ಹಳದಿ ಅಂಚಿಲ್ಲದ ಹೊಳೆಯುವ ಕಪ್ಪು ಉಬ್ಬಿದ ಚುಕ್ಕೆಗಳು.',
    altInsectFeedingSpots: 'ಕೀಟಗಳ ಕಡಿತ ಅಥವಾ ಮೊಟ್ಟೆಯ ಗುರುತುಗಳು',
    altInsectFeedingReason: 'ಉಂಗುರದ ಗುರುತಿಲ್ಲದ ಗಟ್ಟಿ ಕಪ್ಪು ಉಬ್ಬಿದ ಚುಕ್ಕೆಗಳು.',
    altAlgalOrBacterialSpot: 'ಪಾಚಿ ಅಥವಾ ಬ್ಯಾಕ್ಟೀರಿಯಾ ಎಲೆ ಚುಕ್ಕೆ',
    altAlgalOrBacterialReason: 'ಉಂಗುರದ ಗುರುತಿಲ್ಲದ ಚೂಪಾದ ಅಂಚಿನ ಕಪ್ಪು ಚುಕ್ಕೆಗಳು.',
    safeCareTitle: 'ಸುರಕ್ಷಿತ ಆರೈಕೆ ಕ್ರಮಗಳು (ರಾಸಾಯನಿಕ ರಹಿತ)',
    safeCareStep1: 'ಹೆಚ್ಚು ಚುಕ್ಕೆಗಳಿರುವ ಎಲೆಗಳನ್ನು ಕಿತ್ತು ಹೊಲದಿಂದ ದೂರ ಸುಟ್ಟುಹಾಕಿ ಅಥವಾ ಗುಂಡಿಯಲ್ಲಿ ಮುಚ್ಚಿ.',
    safeCareStep2: 'ಎಲೆಗಳ ಮೇಲೆ ನೀರು ಬೀಳದಂತೆ ಗಿಡದ ಬುಡಕ್ಕೆ ಮಾತ್ರ ನೀರು ಹಾಯಿಸಿ.',
    safeCareStep3: 'ಎಲೆಯನ್ನು ತಿರುಗಿಸಿ ಕೆಳಭಾಗದಲ್ಲಿ ಸಣ್ಣ ಕೀಟಗಳು, ಮೊಟ್ಟೆ ಅಥವಾ ಜಿಗುಟಾದ ದ್ರವ ಇದೆಯೇ ಎಂದು ನೋಡಿ.',
    recommendedTreatmentTitle: 'ಶಿಫಾರಸು ಮಾಡಿದ ಚಿಕಿತ್ಸೆ (ಹೆಚ್ಚಿನ ಖಚಿತತೆ)',
    chemicalWithheldTitle: 'ಬೆಳೆ ಸುರಕ್ಷತೆಗಾಗಿ ರಾಸಾಯನಿಕ ಔಷಧಿ ಸಲಹೆ ನೀಡಿಲ್ಲ',
    chemicalWithheldDesc: 'ಈ ಒಂದು ಫೋಟೋದಿಂದ ಶೇಕಡಾ ೮೦ರಷ್ಟು ಖಚಿತತೆ ಇಲ್ಲದಿರುವುದರಿಂದ, ತಪ್ಪಾದ ಔಷಧಿ ಸಿಂಪಡಣೆಯಿಂದ ಬೆಳೆಗೆ ಹಾನಿಯಾಗಬಾರದೆಂದು ರಾಸಾಯನಿಕ ಹೆಸರು ನೀಡಿಲ್ಲ. ಮೇಲಿನ ಸುರಕ್ಷಿತ ಕ್ರಮಗಳನ್ನು ಪಾಲಿಸಿ.',
    defaultPreventionTip: 'ಗಿಡಗಳ ನಡುವೆ ಗಾಳಿ-ಬೆಳಕು ಆಡುವಂತೆ ಸೂಕ್ತ ಅಂತರವಿರಲಿ ಮತ್ತು ಕೀಟಗಳನ್ನು ಹಿಡಿಯಲು ಹಳದಿ ಜಿಗುಟು ಪಟ್ಟಿಗಳನ್ನು ಕಟ್ಟಿ.',
    aiScreeningDisclaimer: 'ಇದು ಎಐ ಆರಂಭಿಕ ಪರೀಕ್ಷಾ ನೆರವು ಮಾತ್ರ, ಪ್ರಯೋಗಾಲಯದ ವರದಿಯಲ್ಲ. ರಾಸಾಯನಿಕ ಔಷಧಿ ಸಿಂಪಡಿಸುವ ಮುನ್ನ ನಿಮ್ಮ ಸ್ಥಳೀಯ ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಕೇಳಿ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.',
    wasDiagnosisAccurate: 'ಈ ಮಾಹಿತಿ ನಿಮಗೆ ಸರಿಯಾಗಿ ಕಂಡಿತೇ?',
    feedbackRecorded: 'ನಿಮ್ಮ ಅಭಿಪ್ರಾಯ ಉಳಿಸಲಾಗಿದೆ',
    feedbackYes: 'ಹೌದು, ಸರಿಯಾಗಿದೆ',
    feedbackNo: 'ಇಲ್ಲ, ಸರಿಯಲ್ಲ',
    feedbackNotSure: 'ಗೊತ್ತಿಲ್ಲ',
    feedbackThankYouNo: 'ಧನ್ಯವಾದಗಳು. ಮುಂದಿನ ಬಾರಿ ಇನ್ನಷ್ಟು ಉತ್ತಮವಾಗಿ ಗುರುತಿಸಲು ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ದಾಖಲಿಸಿದ್ದೇವೆ.',
    feedbackThankYouYes: 'ಧನ್ಯವಾದಗಳು. ಇದನ್ನು ನಿಮ್ಮ ಹೊಲದ ದಾಖಲೆಯಲ್ಲಿ ಉಳಿಸಲಾಗಿದೆ.',
    scanAnotherLeafBtn: 'ಇನ್ನೊಂದು ಎಲೆ ಪರೀಕ್ಷಿಸಿ',
    farmDiagnosisHistoryTitle: 'ಹಿಂದಿನ ಎಲೆ ಪರೀಕ್ಷೆಗಳು',
    feedbackConfirmed: 'ಸರಿ ಇದೆ ✓',
    feedbackMismatched: 'ಸರಿಯಲ್ಲ ✗',
    feedbackUnconfirmed: 'ಖಚಿತವಿಲ್ಲ',
    feedbackPending: 'ಬಾಕಿ ಇದೆ',
    devDebugViewTitle: 'ಡೆವಲಪರ್ / ಡಿಬಗ್ ವಿವರ (Developer / Debug View)',
    devStep4bLabel: 'ಹಂತ 4b ಪಿಕ್ಸೆಲ್ ತಾಳೆ ಪರಿಶೀಲನೆ:',
    devStep4bTriggered: 'ಸಕ್ರಿಯ (ಫೋಟೋ ಪಿಕ್ಸೆಲ್‌ಗೆ ತಕ್ಕಂತೆ ಸರಿಪಡಿಸಲಾಗಿದೆ)',
    devStep4bPassed: 'ಫೋಟೋ ಪಿಕ್ಸೆಲ್‌ಗೆ ಹೊಂದಿಕೆಯಾಗಿದೆ',
    devDominantColorLabel: 'ಪ್ರಮುಖ ಚುಕ್ಕೆ ಬಣ್ಣ:',
    devRingPatternLabel: 'ಪಿಕ್ಸೆಲ್‌ನಲ್ಲಿ ಉಂಗುರದ ಗುರುತು:',
    devYellowEdgeLabel: 'ಪಿಕ್ಸೆಲ್‌ನಲ್ಲಿ ಹಳದಿ ಅಂಚು:',
    devTreatmentTierLabel: 'ಚಿಕಿತ್ಸಾ ಸಲಹೆಯ ಹಂತ:',
    yesWord: 'ಹೌದು',
    noWord: 'ಇಲ್ಲ',
    yieldForecastTitle: 'ಇಳುವರಿ ಮುನ್ಸೂಚನೆ',
    yieldForecastSubtitle: 'ಉಪಗ್ರಹ ಹಸಿರು ಸೂಚ್ಯಂಕ ಮತ್ತು ಮಳೆಯ ಆಧಾರಿತ ನಿಖರ ಅಂದಾಜು',
    estimatedOutput: 'ಅಂದಾಜು ೨೦೨೬ರ ಬೆಳೆ ಇಳುವರಿ',
    quintalsPerAcre: 'ಕ್ವಿಂಟಾಲ್ / ಎಕರೆಗೆ',
    vsFiveYearAvg: '+೮.೫% ಕಳೆದ ೫ ವರ್ಷಕ್ಕಿಂತ ಹೆಚ್ಚು',
    canopyHealthScore: 'ಉಪಗ್ರಹ ಬೆಳೆ ಆರೋಗ್ಯ',
    yieldHistoryChart: 'ಇಳುವರಿ ಇತಿಹಾಸ ಮತ್ತು ಎಐ ಮುನ್ಸೂಚನೆ',
    historicalYield: 'ಹಿಂದಿನ ಇಳುವರಿ',
    aiForecastYield: 'ಎಐ ಮುನ್ಸೂಚನೆ ಇಳುವರಿ',
    aiConfidenceNote: 'ಎಐ ಮುನ್ಸೂಚನೆ ವಿಶ್ಲೇಷಣೆ ಟಿಪ್ಪಣಿ',
    keyFactorsTitle: 'ಪ್ರಮುಖ ಕಾರಣಗಳು',
    modelDetailsTitle: 'ಮೆಷಿನ್ ಲರ್ನಿಂಗ್ ಮಾದರಿ ವಿವರಗಳು',
    mandiIntelTitle: 'ಎಪಿಎಂಸಿ ದರ ಮತ್ತು ಲಾಭ ಲೆಕ್ಕಾಚಾರ',
    mandiIntelSubtitle: 'ಕರ್ನಾಟಕದ ಎಪಿಎಂಸಿ ಲೈವ್ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಮತ್ತು ಲಾಭದ ಅಂದಾಜು',
    searchCropPlaceholder: 'ಬೆಳೆ ಹುಡುಕಿ (ಉದಾ: ಟೊಮೇಟೊ, ಈರುಳ್ಳಿ, ರಾಗಿ)...',
    checkPriceButton: 'ದರ ಪರಿಶೀಲಿಸಿ',
    checkingPrice: 'ದರ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
    liveMandiPrice: 'ಲೈವ್ ಎಪಿಎಂಸಿ ಧಾರಣೆ',
    twoWeekForecast: '೨ ವಾರಗಳ ಮುನ್ಸೂಚನೆ ದರ',
    perQuintal: 'ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್‌ಗೆ (೧೦೦ ಕೆಜಿ)',
    expectedRise: 'ಬೆಲೆ ಏರಿಕೆಯ ನಿರೀಕ್ಷೆ',
    projectedRange: 'ಅಂದಾಜು ಶ್ರೇಣಿ',
    aiMarketSignal: 'ಎಐ ಮಾರುಕಟ್ಟೆ ಸಂಕೇತ',
    upwardMomentum: 'ಬೆಲೆ ಏರಿಕೆಯ ಹಾದಿ',
    downwardPressure: 'ಬೆಲೆ ಇಳಿಕೆಯ ಒತ್ತಡ',
    stablePrice: 'ಸ್ಥಿರ ಬೆಲೆ',
    roiCalcTitle: 'ರೈತರ ನಿವ್ವಳ ಲಾಭ ಮತ್ತು ಆರ್.ಒ.ಐ ಲೆಕ್ಕಾಚಾರ',
    todayPrice: 'ಇಂದಿನ ದರ',
    forecastPrice: '೨ ವಾರಗಳ ಅಂದಾಜು ದರ',
    expectedYieldLabel: 'ನಿರೀಕ್ಷಿತ ಇಳುವರಿ (ಕ್ವಿಂಟಾಲ್)',
    totalInputCostLabel: 'ಒಟ್ಟು ಕೃಷಿ ವೆಚ್ಚ (₹)',
    totalRevenue: 'ಒಟ್ಟು ಆದಾಯ',
    netProfit: 'ನಿವ್ವಳ ಲಾಭ',
    returnOnInvestment: 'ಲಾಭಾಂಶ ಶೇಕಡಾವಾರು (ROI)',
    assistantTitle: 'ಅಗ್ರಿಮೈಂಡ್ ಧ್ವನಿ ಸಹಾಯಕ',
    assistantGreeting: 'ನಮಸ್ಕಾರ! ನಿಮ್ಮ ಬೆಳೆ ಮತ್ತು ಕೃಷಿ ಸಂಬಂಧಿತ ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ.',
    typeOrSpeakPlaceholder: 'ಕನ್ನಡದಲ್ಲಿ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ / ಮಾತನಾಡಿ...',
    switchLanguage: 'ಭಾಷೆ ಬದಲಿಸಿ',
    kannada: 'ಕನ್ನಡ',
    english: 'English',
    viewMode: 'ನೋಟದ ಮೋಡ್',
    viewModeAuto: 'ಆಟೋ',
    viewModeMobile: 'ಮೊಬೈಲ್',
    viewModeDesktop: 'ಡೆಸ್ಕ್‌ಟಾಪ್',
    dragAndDropPhoto: 'ಫೋಟೋವನ್ನು ಇಲ್ಲಿ ಎಳೆದು ಹಾಕಿ ಅಥವಾ ಫೈಲ್ ಆರಿಸಿ',
    dropToUpload: 'ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಫೋಟೋ ಬಿಡಿ',
    browseFiles: 'ಫೈಲ್‌ಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ',
    farmerProfile: 'ರೈತರ ಪ್ರೊಫೈಲ್',
    assistantSidebarBtn: 'ಧ್ವನಿ ಮತ್ತು ಚಾಟ್ ಸಹಾಯಕ',
    openAssistant: 'ಧ್ವನಿ ಮತ್ತು ಚಾಟ್ ಸಹಾಯಕ ತೆರೆಯಿರಿ',
    closeAssistant: 'ಸಹಾಯಕವನ್ನು ಮುಚ್ಚಿ',
  },
};

export function useTranslation(lang: string) {
  const currentLang = (lang === 'kn-IN' || lang.startsWith('kn') ? 'kn-IN' : 'en-IN') as 'en-IN' | 'kn-IN';
  const t = (key: TranslationKey): string => {
    return TRANSLATIONS[currentLang][key] || TRANSLATIONS['en-IN'][key] || key;
  };
  return { t, currentLang };
}
