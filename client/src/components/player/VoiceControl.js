"use client";

import { useState, useEffect } from "react";
// import { useEffect } from "react"; // but you're not using it → warning
// const [lastCommand, setLastCommand] = useState(""); // if lastCommand is never used → warning

export default function VoiceControl() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [lastCommand, setLastCommand] = useState("");
  const [commandFeedback, setCommandFeedback] = useState("");

  const mockCommands = [
    "play music",
    "pause music",
    "next song",
    "previous song",
    "play happy music",
    "play relaxed music",
    "increase volume",
    "decrease volume",
    "shuffle on",
    "shuffle off",
  ];

  const startListening = () => {
    setIsListening(true);
    setTranscript("");
    setCommandFeedback("Listening...");

    // Simulated voice recognition logic
    setTimeout(() => {
      const randomCommand =
        mockCommands[Math.floor(Math.random() * mockCommands.length)];
      setTranscript(randomCommand);
      setLastCommand(randomCommand);
      setIsListening(false);
      processCommand(randomCommand);
    }, 2000);
  };

  const processCommand = (command) => {
    let feedback = "";

    if (command.includes("play") && command.includes("happy")) {
      feedback = "Playing happy music for you!";
    } else if (command.includes("play") && command.includes("relaxed")) {
      feedback = "Playing relaxed music to help you unwind.";
    } else if (command.includes("next")) {
      feedback = "Skipping to next song.";
    } else if (command.includes("previous")) {
      feedback = "Going back to previous song.";
    } else if (command.includes("pause")) {
      feedback = "Music paused.";
    } else if (command.includes("play")) {
      feedback = "Music resumed.";
    } else if (command.includes("volume")) {
      feedback = command.includes("increase")
        ? "Volume increased."
        : "Volume decreased.";
    } else if (command.includes("shuffle")) {
      feedback = command.includes("on")
        ? "Shuffle enabled."
        : "Shuffle disabled.";
    } else {
      feedback = "Command not recognized. Try again.";
    }

    setCommandFeedback(feedback);

    setTimeout(() => {
      setCommandFeedback("");
    }, 3000);
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm border-b border-white/10 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <div className="w-6 h-6 mr-3 flex items-center justify-center">
              <i className="ri-mic-line"></i>
            </div>
            Voice Control
          </h3>

          <div className="flex items-center space-x-3">
            <div className="text-sm text-purple-300">
              Status: {isListening ? "Listening..." : "Ready"}
            </div>
            <div
              className={`w-3 h-3 rounded-full ${
                isListening ? "bg-red-500 animate-pulse" : "bg-green-500"
              }`}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Voice Input */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <div className="text-center mb-6">
                <button
                  onClick={startListening}
                  disabled={isListening}
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all duration-300 ${
                    isListening
                      ? "bg-red-500 text-white animate-pulse cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:scale-105 cursor-pointer"
                  }`}
                >
                  <i className="ri-mic-line"></i>
                </button>
                <p className="text-white mt-4 font-medium">
                  {isListening ? "Listening for commands..." : "Tap to speak"}
                </p>
              </div>

              {transcript && (
                <div className="bg-black/30 rounded-lg p-4 mb-4">
                  <div className="text-sm text-purple-300 mb-1">You said:</div>
                  <div className="text-white font-medium">"{transcript}"</div>
                </div>
              )}

              {commandFeedback && (
                <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">
                  <div className="text-sm text-purple-300 mb-1">
                    System response:
                  </div>
                  <div className="text-purple-200">{commandFeedback}</div>
                </div>
              )}
            </div>
          </div>

          {/* Command Examples */}
          <div>
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="text-lg font-semibold text-white mb-4">
                Voice Commands
              </h4>
              <div className="space-y-2">
                {mockCommands.map((command, index) => (
                  <div
                    key={index}
                    className="text-sm text-purple-200 bg-white/5 rounded-lg p-3 border border-white/10"
                  >
                    "{command}"
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="text-xs text-white/60">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 mr-2 flex items-center justify-center">
                      <i className="ri-information-line"></i>
                    </div>
                    Tips for better recognition:
                  </div>
                  <ul className="space-y-1 ml-5">
                    <li>• Speak clearly and naturally</li>
                    <li>• Use simple commands</li>
                    <li>• Wait for the response</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
