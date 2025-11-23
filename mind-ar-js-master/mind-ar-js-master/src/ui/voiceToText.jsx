import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = () => {
  const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [fullTranscript, setFullTranscript] = useState([]);
  
  useEffect(() => {
    if (browserSupportsSpeechRecognition) {
      const startListening = async () => {
        try {
          await SpeechRecognition.startListening({ continuous: true });
        } catch (error) {
          console.error('Error starting speech recognition:', error);
        }
      };
      startListening();
    }
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    if (transcript) {
      const sentences = transcript.match(/[^.!?]+[.!?]?/g) || [];
      const lastAddedIndex = fullTranscript.length;
      const newSentences = sentences.slice(lastAddedIndex).map(sentence => {
        const time = new Date().toLocaleTimeString();
        return `[${time}] ${sentence.trim()}`;
      });
      if (newSentences.length > 0) {
        setFullTranscript(prev => [...prev, ...newSentences]);
      }
    }
  }, [transcript, fullTranscript]);

  const displaySentences = fullTranscript.slice(-3);

  const downloadTranscript = () => {
    const blob = new Blob([fullTranscript.join('\n')], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transcript.txt';
    link.click();
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div style={{ color: 'white', padding: '8px 16px', textAlign: 'center', fontSize: '14px' }}>
        Browser doesn't support speech recognition.
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '100%', color: 'white', padding: '12px 16px', textAlign: 'center', fontSize: '14px', minHeight: '24px' }}>
      {listening ? (
        <div style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}>
          {displaySentences.length > 0 ? displaySentences.join('\n') : 'Listening...'}
        </div>
      ) : (
        <div style={{ opacity: 0.7, fontStyle: 'italic' }}>Requesting microphone permission...</div>
      )}
      <button 
        onClick={downloadTranscript} 
        style={{ marginTop: '10px', padding: '6px 12px', cursor: 'pointer' }}
      >
        Download Full Transcript
      </button>
    </div>
  );
};

export default Dictaphone;