export function speak(text: string, lang: string = 'en-IN') {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;

  const voices = window.speechSynthesis.getVoices();
  const targetVoice =
    voices.find((v) => v.lang.toLowerCase().replace('_', '-').startsWith(lang.toLowerCase())) ||
    voices.find((v) => v.lang.toLowerCase().startsWith('en'));

  if (targetVoice) {
    utterance.voice = targetVoice;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
}

export async function requestMicrophonePermission(): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop all tracks immediately once permission is granted so mic isn't held open
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch {
      return false;
    }
  }
  return true;
}

export async function startListening(
  lang: string,
  onResult: (text: string, isFinal: boolean) => void,
  onError: (error: string) => void,
  onEnd: () => void
): Promise<any> {
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    onError('Browser does not support Speech Recognition');
    onEnd();
    return null;
  }

  // Explicitly prompt the browser permission prompt if not yet allowed
  if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
    } catch (e: any) {
      onError('not-allowed');
      onEnd();
      return null;
    }
  }

  const recognition = new SpeechRecognition();
  recognition.lang = lang;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event: any) => {
    let interimTranscript = '';
    let finalTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    if (finalTranscript) {
      onResult(finalTranscript, true);
    } else if (interimTranscript) {
      onResult(interimTranscript, false);
    }
  };

  recognition.onerror = (event: any) => {
    // Gracefully handle expected browser permissions, no-speech or aborted events without console spam
    const expectedEvents = ['no-speech', 'aborted', 'not-allowed', 'service-not-allowed'];
    if (!expectedEvents.includes(event.error)) {
      console.warn('Speech recognition status:', event.error);
    }
    onError(event.error);
  };

  recognition.onend = () => {
    onEnd();
  };

  try {
    recognition.start();
    return recognition;
  } catch {
    onError('Failed to start');
    onEnd();
    return null;
  }
}
