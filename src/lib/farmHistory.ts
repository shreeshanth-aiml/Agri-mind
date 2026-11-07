export interface DiagnosisHistoryRecord {
  id: string;
  timestamp: number;
  dateStr: string;
  crop: string;
  plantId?: string;
  conditionId?: string;
  diseaseName: string;
  decisionState?: 'A' | 'B' | 'C' | 'D' | 'E';
  confidence: number;
  confidenceTier?: 'Low' | 'Medium' | 'High';
  isConfident: boolean;
  severity: 'Low' | 'Medium' | 'High' | string;
  matchedSymptoms: string[];
  photoCount?: number;
  userFeedback?: 'yes' | 'no' | 'not_sure';
  verifiedDiagnosis?: string;
  expertOrLabResult?: string;
  feedbackReviewStatus?: 'unverified' | 'reviewed';
}

const STORAGE_KEY = 'agrimind_disease_history';
const MISMATCH_KEY = 'agrimind_mismatch_flags';
const CONSENT_KEY = 'agrimind_photo_ai_consent';

export function getPhotoConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setPhotoConsent(consent: boolean) {
  try {
    localStorage.setItem(CONSENT_KEY, consent ? 'true' : 'false');
  } catch {
    // ignore
  }
}

export function getDiagnosisHistory(): DiagnosisHistoryRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveDiagnosisRecord(record: DiagnosisHistoryRecord) {
  try {
    const history = getDiagnosisHistory();
    const filtered = history.filter((r) => r.id !== record.id);
    const updated = [record, ...filtered].slice(0, 30); // Keep last 30 records
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to save diagnosis to history:', err);
  }
}

export function recordFeedback(
  id: string,
  feedback: 'yes' | 'no' | 'not_sure',
  details?: { verifiedDiagnosis?: string; expertOrLabResult?: string }
) {
  try {
    const history = getDiagnosisHistory();
    let targetPlant = '';
    let targetCondition = '';

    const updated = history.map((item) => {
      if (item.id === id) {
        targetPlant = item.plantId || item.crop;
        targetCondition = item.conditionId || item.diseaseName;
        return {
          ...item,
          userFeedback: feedback,
          verifiedDiagnosis: details?.verifiedDiagnosis ?? item.verifiedDiagnosis,
          expertOrLabResult: details?.expertOrLabResult ?? item.expertOrLabResult,
          // All farmer/field feedback is stored as "unverified" until reviewed by an extension specialist.
          // PRODUCTION NOTE: In production, human-reviewed feedback records are routed into KB symptom weight updates and field-classifier retraining.
          feedbackReviewStatus: 'unverified' as const,
        };
      }
      return item;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Running mismatch flag counter per plant+condition pair
    // In production, this mismatch tally feeds back into candidate weighting or active learning fine-tuning.
    if (feedback === 'no' && targetPlant && targetCondition) {
      incrementMismatchFlag(targetPlant.toLowerCase(), targetCondition);
    }
  } catch (err) {
    console.warn('Failed to update feedback:', err);
  }
}

export function incrementMismatchFlag(cropOrPlantId: string, diseaseOrConditionId: string) {
  try {
    const key = `${cropOrPlantId.toLowerCase()}:${diseaseOrConditionId.toLowerCase()}`;
    const raw = localStorage.getItem(MISMATCH_KEY);
    const flags: Record<string, number> = raw ? JSON.parse(raw) : {};
    flags[key] = (flags[key] || 0) + 1;
    localStorage.setItem(MISMATCH_KEY, JSON.stringify(flags));
  } catch {
    // ignore
  }
}

export function getMismatchCount(cropOrPlantId: string, diseaseOrConditionId: string): number {
  try {
    const key = `${cropOrPlantId.toLowerCase()}:${diseaseOrConditionId.toLowerCase()}`;
    const raw = localStorage.getItem(MISMATCH_KEY);
    const flags: Record<string, number> = raw ? JSON.parse(raw) : {};
    return flags[key] || 0;
  } catch {
    return 0;
  }
}

