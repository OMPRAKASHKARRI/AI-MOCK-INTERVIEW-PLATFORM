import { useState, useEffect } from 'react';
import { BsMicFill } from 'react-icons/bs';
import './index.css';

const SILENCE_TIMEOUT = 3000;

function ConversationalMic({ onTranscriptReady, onAutoSubmit, disabled }) {
  const [isListening, setIsListening] = useState(false);
  const [liveText, setLiveText] = useState('');
  const [finalText, setFinalText] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [autoSubmitCountdown, setAutoSubmitCountdown] = useState(null);
  const [recognition, setRecognition] = useState(null);
  const [silenceTimer, setSilenceTimer] = useState(null);

useEffect(() => {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition

  if (!SpeechRecognition) {
    setIsSupported(false)
    return
  }

  const recognitionInstance =
    new SpeechRecognition()

  recognitionInstance.continuous = true
  recognitionInstance.interimResults = true
  recognitionInstance.lang = 'en-US'

  recognitionInstance.onresult = event => {
    let interimTranscript = ''
    let finalTranscript = ''

    for (
      let i = event.resultIndex;
      i < event.results.length;
      i++
    ) {
      const transcript =
        event.results[i][0].transcript

      if (event.results[i].isFinal) {
        finalTranscript += transcript + ' '
      } else {
        interimTranscript += transcript
      }
    }

    if (finalTranscript) {
      setFinalText(
        prev => prev + finalTranscript
      )
    }

    setLiveText(interimTranscript)

    clearSilenceTimer()
    startSilenceTimer()
  }

  recognitionInstance.onerror = event => {
    console.error(
      'Speech Recognition Error:',
      event.error
    )

    setIsListening(false)
  }

  recognitionInstance.onend = () => {
    setIsListening(false)
  }

  setRecognition(recognitionInstance)
}, [])
useEffect(() => {
  if (recognition && !disabled) {
    startListening()
  }
}, [recognition])
const clearSilenceTimer = () => {
  if (silenceTimer) {
    clearTimeout(silenceTimer)
    setSilenceTimer(null)
  }

  setAutoSubmitCountdown(null)
}
const startSilenceTimer = () => {
  let countdown = 3

  setAutoSubmitCountdown(countdown)

  const countdownInterval =
    setInterval(() => {
      countdown--

      if (countdown > 0) {
        setAutoSubmitCountdown(
          countdown
        )
      }
    }, 1000)

  const timeout = setTimeout(() => {
    clearInterval(countdownInterval)

    setAutoSubmitCountdown(null)

    handleAutoSubmit()
  }, SILENCE_TIMEOUT)

  setSilenceTimer(timeout)
}
const startListening = () => {
  if (!recognition || disabled) {
    return
  }

  try {
    recognition.start()

    setIsListening(true)

    clearSilenceTimer()
  } catch (error) {
    console.log(error)
  }
}
const stopListening = () => {
  if (!recognition) {
    return
  }

  recognition.stop()

  clearSilenceTimer()

  setIsListening(false)
}
const handleAutoSubmit = () => {
  const transcript =
    (
      finalText +
      ' ' +
      liveText
    ).trim()

  if (!transcript) {
    return
  }

  stopListening()

  onTranscriptReady?.(
    transcript
  )

  onAutoSubmit?.(transcript)
}
const handleManualSubmit = () => {
  const transcript =
    (
      finalText +
      ' ' +
      liveText
    ).trim()

  if (!transcript) {
    return
  }

  stopListening()

  onTranscriptReady?.(
    transcript
  )

  onAutoSubmit?.(transcript)
}
const handleRestart = () => {
  clearSilenceTimer()

  setFinalText('')
  setLiveText('')

  startListening()
}
  const displayText = (finalText + ' ' + liveText).trim();

  if (!isSupported) {
    return (
      <div className="cm-unsupported">
        <p className="cm-unsupported-text">
          Voice recognition is not supported in this browser. Please use Chrome
          or Edge.
        </p>
      </div>
    );
  }

  return (
    <div className="cm-container">
      <div className="cm-mic-button-wrapper">
        <button
          className={`cm-mic-button ${isListening ? 'cm-mic-active' : ''} ${disabled ? 'cm-mic-button-disabled' : ''}`}
          onClick={isListening ? stopListening : startListening}
          disabled={disabled}
        >
          <BsMicFill className="cm-mic-icon" />
        </button>
      </div>

      <div className="cm-status">
        {isListening && !displayText && (
          <p className="cm-status-listening">Listening...</p>
        )}
        {isListening && displayText && !autoSubmitCountdown && (
          <p className="cm-status-listening">Hearing you...</p>
        )}
        {autoSubmitCountdown && (
          <p className="cm-status-countdown">
            Submitting in {autoSubmitCountdown}s...{' '}
            <button
              className="cm-keep-talking-btn"
              onClick={() => {
                clearSilenceTimer();
                startListening();
              }}
            >
              Keep talking
            </button>
          </p>
        )}
        {!isListening && displayText && (
          <p className="cm-status-done">Done</p>
        )}
        {!isListening && !displayText && (
          <p className="cm-status-ready">Ready to listen</p>
        )}
      </div>

      {displayText && (
        <div className="cm-transcript-box">
          <span className="cm-transcript-final">{finalText}</span>
          {liveText && (
            <span className="cm-transcript-interim">{liveText}</span>
          )}
        </div>
      )}

      <div className="cm-controls">
        {isListening ? (
          <button
            className={`cm-submit-btn ${!displayText ? 'cm-submit-btn-disabled' : ''}`}
            onClick={handleManualSubmit}
            disabled={!displayText}
          >
            Submit Answer
          </button>
        ) : displayText ? (
          <div className="cm-done-actions">
            <button className="cm-speak-again-btn" onClick={handleRestart}>
              Speak Again
            </button>
            <button className="cm-submit-btn" onClick={handleManualSubmit}>
              Submit Answer
            </button>
          </div>
        ) : (
          <button
            className={`cm-start-btn ${disabled ? 'cm-start-btn-disabled' : ''}`}
            onClick={startListening}
            disabled={disabled}
          >
            Start listening
          </button>
        )}
      </div>
    </div>
  );
}

export default ConversationalMic;
