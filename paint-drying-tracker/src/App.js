import React, { useState, useEffect, useRef } from 'react';
import { Droplet, Timer, Sun, Thermometer, Volume2, VolumeX } from 'lucide-react';

const PaintDryingTracker = () => {
  const [dryingProgress, setDryingProgress] = useState(0);
  const [totalDryingTime, setTotalDryingTime] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const [humidity, setHumidity] = useState(70);
  const [temperature, setTemperature] = useState(75);

  const audioRef = useRef(null);



  useEffect(() => {
    if (isTracking) {
      setTotalDryingTime(roundUpToNearestNInRange(temperature + humidity, 20, 80, 10));
    }

  }, [isTracking, totalDryingTime]);

  useEffect(() => {
    let interval;
    if (isTracking && totalDryingTime > 0) {
      interval = setInterval(() => {
        setElapsedTime(currentTime => {
          const newTime = calculateNewTime(currentTime, totalDryingTime);
          console.log("previous_time: " + currentTime + ". newTime: " + newTime);
          return newTime;
        });

      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isTracking, totalDryingTime, elapsedTime]);

  useEffect(() => {
    if (totalDryingTime > 0) {
      const progress = (elapsedTime / totalDryingTime) * 100;
      setDryingProgress(Math.min(100, progress));
    }
  }, [totalDryingTime, elapsedTime]);

  useEffect(() => {
    if (audioRef.current) {
      if (isMusicPlaying && isTracking) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isMusicPlaying, isTracking]);



  const getStatusMessage = () => {
    if (dryingProgress < 25) return "Fresh and Wet 💧";
    if (dryingProgress < 50) return "Getting There 🌬️";
    if (dryingProgress < 75) return "Almost Dry 🏜️";
    if (dryingProgress < 100) return "Nearly Perfect 🌞";
    return "Completely Dry! 🎉";
  };

  const resetTracking = () => {
    setDryingProgress(0);
    setElapsedTime(0);
    setIsTracking(false);
    setIsMusicPlaying(false);

  };

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  const roundUpToNearestNInRange = ((number, min, max, n) => {
    const rounded = Math.ceil(number / n) * n;
    return Math.min(max, Math.max(min, rounded));
  })

  const calculateNewTime = (currentTime, totalTime) => {
    const ratio = currentTime / totalTime;

    console.log("ratio: " + ratio);
    if (ratio >= 0 && ratio < 0.25) {
      return currentTime + 1;
    } else if (ratio >= 0.25 && ratio < 0.5) {
      return currentTime + (1 / currentTime);
    } else if (ratio >= 0.5 && ratio < 0.75) {
      return currentTime + (1 / (currentTime * currentTime));
    } else { //  (ratio >= 0.75) 
      return currentTime + (1 / (currentTime * currentTime * currentTime));
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg space-y-4 text-center">
      <audio
        ref={audioRef}
        src="https://cdnjs.cloudflare.com/ajax/libs/30-seconds-of-jeopardy-think-music/1.0.0/jeopardy.mp3"
        loop
      />

      <h1 className="text-2xl font-bold text-gray-800">
        🎨 Paint Drying Tracker 🖌️
      </h1>

      <button
        onClick={toggleMusic}
        disabled={!isTracking}
        className={`absolute top-4 right-4 p-2 rounded-full 
          ${isTracking ? 'hover:bg-gray-200' : 'opacity-50 cursor-not-allowed'}`}
      >
        {isMusicPlaying ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div
          className="bg-blue-600 h-4 rounded-full transition-all duration-500"
          style={{ width: `${dryingProgress}%` }}
        ></div>
      </div>


      <div className="text-xl font-semibold mb-4">
        {getStatusMessage()}
      </div>


      <div className="flex justify-center space-x-4">
        {!isTracking ? (
          <button
            onClick={() => setIsTracking(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Start Tracking
          </button>
        ) : (
          <button
            onClick={resetTracking}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Reset Tracking
          </button>
        )}
      </div>


      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex items-center justify-center">
          <Thermometer className="mr-2" />
          <input
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-20 px-2 py-1 border rounded"
            placeholder="Temp (°F)"
            min="0"
            max="150"
          />

        </div>
        <div className="flex items-center justify-center">
          <Droplet className="mr-2" />
          <input
            type="number"
            value={humidity}
            onChange={(e) => setHumidity(Number(e.target.value))}
            className="w-20 px-2 py-1 border rounded"
            placeholder="Humidity %"
            min="0"
            max="100"
          />
        </div>
      </div>


      <div className="mt-4 text-gray-600">
        <div className="flex items-center justify-center">
          <Timer className="mr-2" />
          <span>Elapsed Time: {Math.floor(elapsedTime)} seconds</span>
        </div>
        <div className="mt-2">
          Progress: {dryingProgress.toFixed(2)}%
        </div>
        <div className="mt-2">
          Total Drying Time: {totalDryingTime} Seconds
        </div>
      </div>
    </div>
  );
};

export default PaintDryingTracker;