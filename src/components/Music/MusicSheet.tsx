'use client'
import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

const INITIAL_NOTES = ['C4', 'D4', 'E4', "F4", 'G4', 'A4', 'B4', 'C5'];

// Musical note positions on staff (in pixels from the bottom line)
const NOTE_POSITIONS: Record<string, number> = {
  'C4': 64,  
  'D4': 54,  
  'E4': 45,  
  'F4': 31,  
  'G4': 20,
  'A4': 7,  
  'B4': -5,  
  'C5': -18,  
};

// Musical note HTML entities for different note types
const NOTE_SYMBOLS = {
  QUARTER_NOTE: '♩',    // Unicode: U+2669
  HALF_NOTE: '𝅗𝅥',     // Unicode: U+1D15D
  WHOLE_NOTE: '𝅝',     // Unicode: U+1D15D
};

// CSS to prevent selection and focus effects
const noSelectStyle = {
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',
  outline: 'none',
};

export default function MusicSheet() {
  const synthRef = useRef<Tone.Synth | null>(null);
  const [notes, setNotes] = useState(INITIAL_NOTES);

  useEffect(() => {
    synthRef.current = new Tone.Synth().toDestination();
    return () => {
      if (synthRef.current) {
        synthRef.current.dispose();
      }
    };
  }, []);

  const handleNoteClick = async (index: number) => {
    event?.preventDefault();
    await Tone.start();
    if (index >= 0 && index < notes.length && synthRef.current) {
      synthRef.current.triggerAttackRelease(notes[index], '8n');
      console.log('Playing note:', notes[index]);
      // Move the played note to the end using state update
      setNotes(prevNotes => {
        const newNotes = [...prevNotes];
        const note = newNotes[index];
        newNotes.splice(index, 1);
        newNotes.push(note);
        return newNotes;
      });
    }
  };

  return (
    <div className="music-container w-full items-center justify-center flex flex-col" style={noSelectStyle}>
      {/* Music Staff */}
      <div className="bg-[#f5f0e1] flex items-center relative h-[180px] w-full rounded-lg shadow-xl">
        {/* Treble Clef */}
        <div className="text-[120px] text-black mr-8" style={{ marginTop: '-10px', ...noSelectStyle }}>&#119070;</div>

        {/* Staff Lines Container */}
        <div className="flex-1 flex flex-col justify-between h-[100px] relative">
          {/* Staff Lines */}
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="h-[1.5px] bg-black w-full"
            />
          ))}

          {/* Notes */}
          <div className="absolute w-full flex justify-around items-end h-full">
            {notes.map((note, idx) => (
              <div
                key={`${note}-${idx}`}
                className="group relative cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  handleNoteClick(idx);
                }}
                style={noSelectStyle}
              >
                {/* Musical Note Symbol */}
                <div 
                  className="text-[100px] text-black transition-colors"
                  style={{
                    position: 'relative',
                    top: `${NOTE_POSITIONS[note]}px`,
                    transform: 'translateY(+5%)',
                    fontFamily: 'serif',
                    ...noSelectStyle,
                    WebkitTapHighlightColor: 'transparent', // Remove tap highlight on mobile
                  }}
                >
                  {NOTE_SYMBOLS.QUARTER_NOTE}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}