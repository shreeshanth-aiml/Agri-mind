import { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../lib/store';
import { speak, stopSpeaking, startListening } from '../lib/voice';
import { callGemini } from '../lib/gemini';
import { useTranslation } from '../lib/translations';
import {
  processGroundedQuery,
  GroundedSource,
  getCurrentMandiPrice,
  getWeatherNow,
  getLatestYieldForecast,
  getSoilStatus,
} from '../lib/assistantGrounding';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Send,
  Sparkles,
  Database,
  ChevronDown,
  ChevronUp,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  sources?: GroundedSource[];
  isStreaming?: boolean;
}

export function VoiceAssistant() {
  const { state, setAssistantOpen, toggleAssistant } = useAppContext();
  const { t, currentLang } = useTranslation(state.language);
  const isKannada = currentLang === 'kn-IN';

  const [windowWidth, setWindowWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop =
    state.layoutMode === 'desktop' ||
    (state.layoutMode !== 'mobile' && windowWidth >= 1024);

  const isOpen = state.isAssistantOpen;
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [transcript, setTranscript] = useState('');
  const transcriptRef = useRef('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [permissionBlocked, setPermissionBlocked] = useState(false);
  const [expandedSourceId, setExpandedSourceId] = useState<string | null>(null);

  // Streaming text animation ref
  const streamTimerRef = useRef<any>(null);
  const speechStartedForMsgRef = useRef<boolean>(false);

  // Clean up streams/speaking on unmount
  useEffect(() => {
    return () => {
      if (streamTimerRef.current) clearInterval(streamTimerRef.current);
      stopSpeaking();
    };
  }, []);

  /**
   * Helper to stream tokens into chat bubble token-by-token
   * and begin speaking once the first complete sentence is streamed in.
   */
  const streamAssistantResponse = (
    fullText: string,
    sources: GroundedSource[] = []
  ) => {
    const msgId = `asst_${Date.now()}`;
    speechStartedForMsgRef.current = false;

    // Insert empty message placeholder
    setMessages((prev) => [
      ...prev,
      {
        id: msgId,
        role: 'assistant',
        text: '',
        sources,
        isStreaming: true,
      },
    ]);

    // Split text into word tokens
    const tokens = fullText.split(' ');
    let currentWordIndex = 0;
    let accumulatedText = '';

    if (streamTimerRef.current) clearInterval(streamTimerRef.current);

    streamTimerRef.current = setInterval(() => {
      if (currentWordIndex < tokens.length) {
        accumulatedText += (currentWordIndex === 0 ? '' : ' ') + tokens[currentWordIndex];
        currentWordIndex++;

        // Perceived live TTS: start speaking once the first complete sentence has streamed in
        if (!speechStartedForMsgRef.current && (accumulatedText.includes('.') || accumulatedText.includes('?') || accumulatedText.includes('!'))) {
          speechStartedForMsgRef.current = true;
          setIsSpeaking(true);
          speak(fullText, state.language);
        }

        const isStillStreaming = currentWordIndex < tokens.length;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === msgId
              ? { ...msg, text: accumulatedText, isStreaming: isStillStreaming }
              : msg
          )
        );
      } else {
        clearInterval(streamTimerRef.current);
        streamTimerRef.current = null;
        // If not started yet, speak now
        if (!speechStartedForMsgRef.current) {
          speechStartedForMsgRef.current = true;
          setIsSpeaking(true);
          speak(fullText, state.language);
        }
      }
    }, 45); // 45ms per word feels immediate, natural, and readable
  };

  /**
   * Voice Input with Stage 5 debugging & permissions handling
   */
  const toggleListen = async () => {
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      setIsListening(false);
      if (transcriptRef.current.trim()) {
        handleUserMessage(transcriptRef.current);
      }
    } else {
      setTranscript('');
      transcriptRef.current = '';
      setIsListening(true);
      setPermissionBlocked(false);

      recognitionRef.current = await startListening(
        state.language,
        (text, isFinal) => {
          setTranscript(text);
          transcriptRef.current = text;
          if (isFinal) {
            if (recognitionRef.current) {
              try {
                recognitionRef.current.stop();
              } catch {
                // ignore
              }
            }
            handleUserMessage(text);
            setIsListening(false);
            transcriptRef.current = '';
          }
        },
        (err) => {
          if (err !== 'no-speech' && err !== 'aborted') {
            const isPermissionError = err === 'not-allowed' || err === 'service-not-allowed';
            if (isPermissionError) {
              setPermissionBlocked(true);
            }
            const friendlyNote = isPermissionError
              ? isKannada
                ? 'ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಮೈಕ್ರೊಫೋನ್ ಅನುಮತಿ ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ. ವಿಳಾಸ ಪಟ್ಟಿಯಲ್ಲಿರುವ (Address bar) ಪ್ಯಾಡ್‌ಲಾಕ್ (🔒) ಅಥವಾ ಸೈಟ್ ಸೆಟ್ಟಿಂಗ್ಸ್‌ ಕ್ಲಿಕ್ ಮಾಡಿ "Microphone: Allow" ನೀಡಿ, ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ. ಅಥವಾ ಕೆಳಗಿನ ಪೆಟ್ಟಿಗೆಯಲ್ಲಿ ನೇರವಾಗಿ ಪ್ರಶ್ನೆ ಟೈಪ್ ಮಾಡಬಹುದು.'
                : 'Microphone access is blocked in browser settings. Click the lock icon (🔒) or site settings in your browser address bar to allow microphone access, then tap the mic again. You can also type directly below.'
              : isKannada
              ? 'ಧ್ವನಿ ಗ್ರಹಿಕೆ ತಾತ್ಕಾಲಿಕವಾಗಿ ಲಭ್ಯವಿಲ್ಲ. ಕೆಳಗಿನ ಪೆಟ್ಟಿಗೆಯಲ್ಲಿ ನೇರವಾಗಿ ಪ್ರಶ್ನೆ ಟೈಪ್ ಮಾಡಬಹುದು.'
              : 'Voice recognition is momentarily unavailable. You can type your questions directly in the box below.';

            setMessages((prev) => [
              ...prev,
              {
                id: `asst_${Date.now()}`,
                role: 'assistant',
                text: friendlyNote,
              },
            ]);
          }
          setIsListening(false);
        },
        () => {
          setIsListening(false);
          if (transcriptRef.current.trim()) {
            handleUserMessage(transcriptRef.current);
            transcriptRef.current = '';
          }
        }
      );
    }
  };

  /**
   * Unified message pipeline for Typed & Spoken questions:
   * 1. Tool Grounding: Dispatches through internal app functions
   * 2. Strict Answer Construction: Numbers carry freshness tags inline
   * 3. Streamed output into chat bubble
   */
  const handleUserMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsgId = `user_${Date.now()}`;
    setMessages((prev) => [...prev, { id: userMsgId, role: 'user', text }]);
    setTranscript('');
    transcriptRef.current = '';
    setIsLoading(true);

    try {
      // Step 1: Tool-Grounding layer (calls internal data tools)
      const grounded = processGroundedQuery(
        text,
        state.district,
        state.language,
        state.soilProfile
      );

      if (grounded.isGrounded && grounded.answer) {
        setIsLoading(false);
        streamAssistantResponse(grounded.answer, grounded.sources);
        return;
      }

      // Step 2: Answer construction for general agronomy advisory queries
      // Provide system context containing actual verified numbers from the app state
      const currentMandiSummary = getCurrentMandiPrice('Tomato', state.district);
      const currentWeatherSummary = getWeatherNow(state.district);
      const currentSoilSummary = getSoilStatus(state.district, state.soilProfile);

      const prompt = `You are AgriMind, a helpful AI agricultural decision assistant for farmers in Karnataka.
Language: ${state.language === 'kn-IN' ? 'Kannada' : 'English'}. District: ${state.district}, Season: ${state.season}.

STRICT ANSWER CONSTRUCTION RULES:
1. You may explain, summarize, translate, and give general farming guidance freely in 2-3 short, actionable sentences.
2. Any specific number (price, weather, yield, soil) must come directly from our app's verified internal data objects:
   - Live Weather: ${currentWeatherSummary.temp}°C, ${currentWeatherSummary.condition} (Freshness: ${currentWeatherSummary.freshness})
   - Tomato APMC Price: ₹${currentMandiSummary.price}/quintal (Freshness: ${currentMandiSummary.freshness})
   - Soil: ${currentSoilSummary.type}, pH ${currentSoilSummary.ph}, N:${currentSoilSummary.n} P:${currentSoilSummary.p} K:${currentSoilSummary.k} (Freshness: ${currentSoilSummary.freshness})
3. Never invent or hallucinate a numeric figure without its verified freshness tag. If asked about a crop/region not in this state, say so directly and offer the closest verified data.
4. Keep the answer to 2-3 sentences.

Farmer asks: "${text}"`;

      const response = await callGemini({ prompt });
      setIsLoading(false);

      streamAssistantResponse(response, [
        {
          tool: 'GeminiAgriAdvisory',
          queryParam: text,
          freshness: 'General Agronomic Guidance',
          dataSummary: 'UAS Bengaluru & KAU Package of Practices',
          timestamp: 'Standard Reference',
        },
      ]);
    } catch {
      setIsLoading(false);
      const fallback = isKannada
        ? 'ನಮಸ್ಕಾರ! ನಿಮ್ಮ ಜಿಲ್ಲೆಯ ಹವಾಮಾನ, ಬೆಳೆ ಶಿಫಾರಸು ಹಾಗೂ ಮಂಡಿ ದರಗಳ ಕುರಿತು ಮಾಹಿತಿ ಪಡೆಯಲು ಅಗ್ರಿಮೈಂಡ್ ಸಿದ್ಧವಾಗಿದೆ.'
        : 'Namaskara! AgriMind is ready to help with your crop advisory, plant doctor, and mandi price queries.';
      streamAssistantResponse(fallback);
    }
  };

  return (
    <>
      {/* Floating Toggle Button (visible on mobile or when closed on desktop) */}
      <div
        className={`fixed z-40 flex flex-col items-end space-y-2 ${
          isDesktop ? 'bottom-6 right-6' : 'bottom-20 right-4'
        }`}
      >
        <button
          onClick={toggleAssistant}
          className="bg-forest text-cream p-3.5 rounded-full shadow-lg hover:opacity-90 transition-transform active:scale-95 flex items-center justify-center border-2 border-wheat cursor-pointer min-h-[44px] min-w-[44px]"
          aria-label={isOpen ? t('closeAssistant') : t('openAssistant')}
          title={isOpen ? t('closeAssistant') : t('openAssistant')}
        >
          {isOpen ? <X size={22} /> : <Mic size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={
              isDesktop
                ? { opacity: 0, x: 80 }
                : { opacity: 0, y: 40, scale: 0.95 }
            }
            animate={
              isDesktop
                ? { opacity: 1, x: 0 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              isDesktop
                ? { opacity: 0, x: 80 }
                : { opacity: 0, y: 40, scale: 0.95 }
            }
            transition={{ duration: 0.25 }}
            className={
              isDesktop
                ? 'fixed top-0 bottom-0 right-0 w-[380px] bg-cream border-l border-soil/25 shadow-2xl z-50 overflow-hidden flex flex-col h-screen'
                : 'fixed bottom-24 right-4 left-4 md:left-auto md:w-96 bg-cream border border-soil/25 shadow-2xl rounded-2xl z-40 overflow-hidden flex flex-col max-h-[72vh]'
            }
            aria-label="AgriMind Assistant Panel"
          >
            {/* Header */}
            <div className="bg-forest p-3.5 flex justify-between items-center text-cream flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-sm tracking-wide">{t('assistantTitle')}</span>
                <span className="text-[10px] bg-wheat/30 text-wheat px-2 py-0.5 rounded font-semibold border border-wheat/20 flex items-center gap-1">
                  <Activity size={10} />
                  <span>{isKannada ? 'ನೇರ ದತ್ತಾಂಶ ಬೆಂಬಲಿತ' : 'Grounded Assistant'}</span>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {isSpeaking ? (
                  <button
                    onClick={() => {
                      stopSpeaking();
                      setIsSpeaking(false);
                    }}
                    className="text-wheat hover:text-cream cursor-pointer p-1"
                    aria-label="Mute voice"
                  >
                    <VolumeX size={18} />
                  </button>
                ) : (
                  <Volume2 size={18} className="text-wheat/60" />
                )}
                <button
                  onClick={() => setAssistantOpen(false)}
                  className="text-cream/80 hover:text-cream cursor-pointer p-1"
                  aria-label={t('closeAssistant')}
                  title={t('closeAssistant')}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div
              className={`flex-1 p-3.5 overflow-y-auto space-y-3 ${
                isDesktop ? 'max-h-none' : 'max-h-[46vh]'
              }`}
            >
              {messages.length === 0 && (
                <div className="text-center py-5 space-y-3">
                  <div className="w-12 h-12 bg-wheat/30 text-forest rounded-full mx-auto flex items-center justify-center border border-soil/15">
                    <Sparkles size={24} />
                  </div>
                  <p className="text-xs text-charcoal/80 font-medium px-4">{t('assistantGreeting')}</p>

                  <div className="flex flex-col space-y-1.5 pt-1 max-w-[280px] mx-auto text-left">
                    <button
                      onClick={() =>
                        handleUserMessage(
                          isKannada
                            ? 'ಕೋಲಾರದಲ್ಲಿ ಈರುಳ್ಳಿ ಮತ್ತು ಟೊಮೇಟೊ ಇಂದಿನ ಮಂಡಿ ದರ ಎಷ್ಟು?'
                            : "What is today's tomato mandi price?"
                        )
                      }
                      className="text-xs bg-white hover:bg-wheat/20 text-forest p-2 rounded-xl border border-soil/15 cursor-pointer text-left font-medium"
                    >
                      {isKannada ? '📊 ಇಂದಿನ ಟೊಮೇಟೊ ಮಂಡಿ ದರ?' : "📊 Today's tomato price?"}
                    </button>
                    <button
                      onClick={() =>
                        handleUserMessage(
                          isKannada
                            ? 'ನಮ್ಮ ಜಿಲ್ಲೆಯ ಇಂದಿನ ಹವಾಮಾನ ಮತ್ತು ಮಳೆ ವಿವರ ತಿಳಿಸಿ'
                            : "What is the weather and rain forecast?"
                        )
                      }
                      className="text-xs bg-white hover:bg-wheat/20 text-forest p-2 rounded-xl border border-soil/15 cursor-pointer text-left font-medium"
                    >
                      {isKannada ? '🌦️ ಹವಾಮಾನ ಹಾಗೂ ಮಳೆ ಮುನ್ಸೂಚನೆ?' : '🌦️ Weather & rain outlook?'}
                    </button>
                    <button
                      onClick={() =>
                        handleUserMessage(
                          isKannada
                            ? 'ರಾಗಿ ಬೆಳೆಗೆ ಎಕರೆಗೆ ಅಂದಾಜು ಇಳುವರಿ ಎಷ್ಟು?'
                            : 'What is the estimated yield for Ragi?'
                        )
                      }
                      className="text-xs bg-white hover:bg-wheat/20 text-forest p-2 rounded-xl border border-soil/15 cursor-pointer text-left font-medium"
                    >
                      {isKannada ? '🌾 ರಾಗಿ ನಿರೀಕ್ಷಿತ ಇಳುವರಿ ಎಷ್ಟು?' : '🌾 What is expected yield for Ragi?'}
                    </button>
                  </div>
                </div>
              )}

              {messages.map((m) => (
                <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-3 rounded-2xl max-w-[88%] text-xs leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-forest text-cream rounded-br-sm'
                        : 'bg-white border border-soil/15 text-charcoal rounded-bl-sm shadow-xs'
                    }`}
                  >
                    {m.text}
                    {m.isStreaming && (
                      <span className="inline-block w-1.5 h-3 ml-1 bg-forest animate-pulse align-middle" />
                    )}
                  </div>

                  {/* Stage 11: Collapsible Grounded Sources note (developer / debug view) */}
                  {m.sources && m.sources.length > 0 && !m.isStreaming && (
                    <div className="mt-1 max-w-[88%]">
                      <button
                        onClick={() =>
                          setExpandedSourceId(expandedSourceId === m.id ? null : m.id)
                        }
                        className="flex items-center space-x-1 text-[10px] text-soil font-semibold hover:text-forest transition-colors cursor-pointer"
                      >
                        <Database size={11} />
                        <span>
                          {isKannada
                            ? `ಮೂಲ ದತ್ತಾಂಶ (${m.sources.length})`
                            : `Sources used (${m.sources.length})`}
                        </span>
                        {expandedSourceId === m.id ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                      </button>

                      {expandedSourceId === m.id && (
                        <div className="mt-1 p-2 rounded-lg bg-wheat/20 border border-soil/15 text-[10px] text-charcoal/80 space-y-1">
                          {m.sources.map((s, sIdx) => (
                            <div key={sIdx} className="space-y-0.5 pb-1 border-b border-soil/10 last:border-b-0">
                              <div className="font-bold text-forest flex items-center justify-between">
                                <span>{s.tool}()</span>
                                <span className="text-[9px] bg-white text-soil px-1 py-0.2 rounded border border-soil/10">
                                  {s.freshness}
                                </span>
                              </div>
                              <div className="text-[10px]">{s.dataSummary}</div>
                              <div className="text-[9px] text-charcoal/50">{s.timestamp}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-2xl bg-wheat/30 text-charcoal rounded-bl-sm flex space-x-1.5 items-center">
                    <div className="w-2 h-2 bg-forest rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-forest rounded-full animate-bounce"
                      style={{ animationDelay: '0.15s' }}
                    />
                    <div
                      className="w-2 h-2 bg-forest rounded-full animate-bounce"
                      style={{ animationDelay: '0.3s' }}
                    />
                  </div>
                </div>
              )}

              {transcript && (
                <div className="flex justify-end">
                  <div className="p-2.5 rounded-2xl bg-forest/80 text-cream rounded-br-sm max-w-[85%] text-xs italic">
                    {transcript}...
                  </div>
                </div>
              )}
            </div>

            {/* Permission warning & retry banner */}
            {permissionBlocked && (
              <div className="bg-amber-50 border-b border-amber-200 px-3 py-2 text-[11px] text-amber-900 flex items-center justify-between">
                <span className="truncate pr-2">
                  {isKannada ? '🔒 ಮೈಕ್ ಅನುಮತಿ ಅಗತ್ಯವಿದೆ' : '🔒 Mic permission blocked'}
                </span>
                <button
                  onClick={toggleListen}
                  className="bg-amber-200 hover:bg-amber-300 text-amber-900 px-2 py-0.5 rounded font-bold text-[10px] cursor-pointer flex-shrink-0"
                >
                  {isKannada ? 'ಅನುಮತಿಸಿ' : 'Allow / Retry'}
                </button>
              </div>
            )}

            {/* Stage 11: Honesty line under chat */}
            <div className="px-3 py-1.5 bg-cream/70 border-t border-soil/10 text-[9px] text-charcoal/65 leading-tight">
              {isKannada
                ? 'ಸಹಾಯಕವು ಅಪ್ಲಿಕೇಶನ್‌ನ ನೇರ ದತ್ತಾಂಶವನ್ನು ಬಳಸುತ್ತದೆ; ಕೆಲವು ಮೌಲ್ಯಗಳು ಅಂದಾಜಾಗಿದ್ದು, ನಿಖರ ತಾಜಾತನ ಟ್ಯಾಗ್‌ನೊಂದಿಗೆ ತೋರಿಸಲಾಗುತ್ತದೆ.'
                : 'Assistant uses your app’s live data where available; some numbers may be estimated or last-reported — always shown with a freshness tag.'}
            </div>

            {/* Input Footer */}
            <div className="p-3 border-t border-soil/10 bg-white">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={t('typeOrSpeakPlaceholder')}
                  className="flex-1 bg-cream border border-soil/20 rounded-full px-3.5 py-2 text-xs focus:outline-none focus:border-forest text-charcoal"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUserMessage(inputVal);
                      setInputVal('');
                    }
                  }}
                />
                {inputVal.trim() ? (
                  <button
                    onClick={() => {
                      handleUserMessage(inputVal);
                      setInputVal('');
                    }}
                    className="p-2.5 rounded-full bg-forest text-cream hover:opacity-90 flex-shrink-0 cursor-pointer"
                    aria-label="Send"
                  >
                    <Send size={16} />
                  </button>
                ) : (
                  <button
                    onClick={toggleListen}
                    className={`p-2.5 rounded-full flex-shrink-0 transition-all cursor-pointer ${
                      isListening
                        ? 'bg-rose-600 text-white animate-pulse ring-2 ring-rose-400'
                        : 'bg-forest text-cream hover:opacity-90'
                    }`}
                    aria-label={isListening ? 'Stop listening' : 'Start voice input'}
                  >
                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
