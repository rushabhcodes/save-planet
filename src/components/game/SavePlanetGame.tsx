import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

// Import building images
import building14 from '@/assets/building14.png';
import building15 from '@/assets/building15.png';
import building18 from '@/assets/building18.png';
import building19 from '@/assets/building19.png';
import building20 from '@/assets/building20.png';
import building21 from '@/assets/building21.png';
import building22 from '@/assets/building22.png';
import building23 from '@/assets/building23.png';

// Import questions from JSON file
import questionsData from '@/data/questions.json';

// Game configuration
const BUILDINGS = [
  { id: 1, x: 15, y: 50, image: building14 },  // Adjusted to be on ground area
  { id: 2, x: 30, y: 45, image: building15 },  // Adjusted to be on ground area
  { id: 3, x: 45, y: 48, image: building18 },  // Adjusted to be on ground area
  { id: 4, x: 60, y: 45, image: building19 },  // Adjusted to be on ground area
  { id: 5, x: 75, y: 50, image: building20 },  // Adjusted to be on ground area
  { id: 6, x: 85, y: 60, image: building21 },  // Adjusted to be on ground area
  { id: 7, x: 50, y: 65, image: building22 },  // Adjusted to be on ground area
  { id: 8, x: 25, y: 60, image: building23 },  // Adjusted to be on ground area
];

// Questions are loaded from the JSON file
const { questions: QUESTIONS } = questionsData;

// Types
interface Building {
  id: number;
  x: number;
  y: number;
  image: string;
}

interface BuildingComponentProps {
  building: Building;
  isRepaired: boolean;
  onClick: () => void;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

// Building component with tailwind styles
const BuildingComponent: React.FC<BuildingComponentProps> = ({ building, isRepaired, onClick }) => {
  return (
    <div 
      className={`
        absolute cursor-pointer transition-all duration-500 z-20
        hover:scale-105 active:scale-95
        ${isRepaired ? 'filter-none' : 'brightness-60 contrast-85'}
      `}
      style={{ 
        left: `${building.x}%`, 
        top: `${building.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      onClick={onClick}
    >
      <div className="relative">
        {/* Building shadow cast to the top right (light source from bottom left) */}
        <div className={`absolute -top-4 -right-8 z-0 blur-md transform rotate-45 skew-x-12 transition-all duration-500 opacity-90
          ${isRepaired ? 'w-16 h-28 bg-slate-900/30' : 'w-16 h-28 bg-slate-900/20'}`}></div>
        
        {/* Enhanced area around building - simulating ground damage when not repaired */}
        {!isRepaired && (
          <div className="absolute -inset-4 bottom-0 z-0">
            {/* Damaged ground effect */}
            <div className="absolute bottom-0 left-1/2 w-28 h-8 -translate-x-1/2 bg-gray-900/50 blur-sm rounded-full"></div>
            <div className="absolute bottom-1 left-1/2 w-20 h-6 -translate-x-1/2 bg-gray-800/40 blur-sm rounded-full"></div>
            
            {/* Scorch marks */}
            <div className="absolute bottom-2 left-[40%] w-12 h-3 bg-gray-900/60 blur-sm rounded-full transform rotate-12"></div>
            <div className="absolute bottom-1 right-[40%] w-14 h-4 bg-gray-900/50 blur-sm rounded-full transform -rotate-12"></div>
            
            {/* Small debris */}
            <div className="absolute bottom-3 left-[30%] w-2 h-2 bg-gray-700/80 rounded-sm transform rotate-45"></div>
            <div className="absolute bottom-2 right-[35%] w-3 h-1 bg-gray-800/70 rounded-sm transform -rotate-30"></div>
            <div className="absolute bottom-4 left-[45%] w-1 h-1 bg-gray-600/80 rounded-full"></div>
          </div>
        )}
        
        {/* Building ground contact shadow (additional to the cast shadow) */}
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full blur-md transition-all duration-500
          ${isRepaired ? 'w-24 h-4 bg-black/20' : 'w-20 h-3 bg-black/30'}`}></div>
        
        {/* Building image */}
        <img 
          src={building.image} 
          alt={`Building ${building.id}`} 
          className="w-24 h-32 object-contain relative z-10" 
        />
        
        {/* Enhanced effects for damaged buildings */}
        {!isRepaired && (
          <>
            {/* Large rising smoke plume */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-full h-20 pointer-events-none overflow-visible z-40">
              {/* Main smoke column */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-10 h-10">
                <div className="absolute w-8 h-8 bg-white/70 rounded-full blur-xl animate-[smoke_4s_ease-out_infinite]"></div>
                <div className="absolute w-7 h-7 bg-white/60 rounded-full blur-lg animate-[smoke_4.5s_ease-out_infinite_0.5s]"></div>
                <div className="absolute w-9 h-9 bg-gray-200/50 rounded-full blur-2xl animate-[smoke_5s_ease-out_infinite_1s]"></div>
              </div>
              
              {/* Secondary smoke trails */}
              <div className="absolute left-1/3 bottom-2 w-8 h-8">
                <div className="absolute w-6 h-6 bg-white/60 rounded-full blur-lg animate-[smoke_3.5s_ease-out_infinite_0.2s]"></div>
                <div className="absolute w-5 h-5 bg-gray-300/50 rounded-full blur-xl animate-[smoke_4s_ease-out_infinite_0.7s]"></div>
              </div>
              
              <div className="absolute right-1/3 bottom-1 w-8 h-8">
                <div className="absolute w-7 h-7 bg-white/60 rounded-full blur-xl animate-[smoke_3.8s_ease-out_infinite_0.4s]"></div>
                <div className="absolute w-5 h-5 bg-gray-200/50 rounded-full blur-lg animate-[smoke_4.2s_ease-out_infinite_1.2s]"></div>
              </div>
              
              {/* Darker smoke particles */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-10 h-10">
                <div className="absolute w-6 h-6 bg-gray-500/60 rounded-full blur-lg animate-[smoke_4.7s_ease-out_infinite_0.3s]"></div>
                <div className="absolute w-5 h-5 bg-gray-600/50 rounded-full blur-md animate-[smoke_5.2s_ease-out_infinite_1.5s]"></div>
              </div>
            </div>
            
            {/* Glowing embers at base of smoke */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4">
              <div className="absolute w-2 h-2 bg-orange-500/70 rounded-full blur-sm animate-[spark_2s_ease_infinite_0.1s]"></div>
              <div className="absolute left-1 w-1 h-1 bg-yellow-500/70 rounded-full blur-sm animate-[spark_1.5s_ease_infinite_0.4s]"></div>
              <div className="absolute right-2 w-1.5 h-1.5 bg-red-500/70 rounded-full blur-sm animate-[spark_1.8s_ease_infinite_0.7s]"></div>
            </div>
            
            {/* Fire spots with enhanced glow */}
            <div className="absolute bottom-8 right-4 z-20">
              <div className="w-5 h-7 bg-gradient-to-t from-orange-600 to-yellow-400 rounded-full blur-sm animate-[flicker_0.5s_ease_infinite_alternate]"></div>
              <div className="absolute inset-0 bg-orange-500/30 rounded-full blur-lg"></div>
            </div>
            
            <div className="absolute bottom-10 left-5 z-20">
              <div className="w-4 h-6 bg-gradient-to-t from-orange-600 to-yellow-300 rounded-full blur-sm animate-[flicker_0.7s_ease_infinite_alternate]"></div>
              <div className="absolute inset-0 bg-orange-500/30 rounded-full blur-lg"></div>
            </div>
            
            {/* Enhanced sparks */}
            <div className="absolute bottom-12 right-6 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-[spark_1.5s_ease_infinite] shadow-sm shadow-yellow-200"></div>
            <div className="absolute bottom-14 left-7 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-[spark_2s_ease_infinite_0.5s] shadow-sm shadow-yellow-200"></div>
            <div className="absolute bottom-10 left-1/2 w-1 h-1 bg-orange-400 rounded-full animate-[spark_1.7s_ease_infinite_0.9s] shadow-sm shadow-orange-300"></div>
          </>
        )}
        
        {/* Glow and effects for repaired buildings - blue-white glow */}
        {isRepaired && (
          <>
            {/* Base healing glow - cyan/blue-white */}
            <div className="absolute inset-0 rounded-xl bg-cyan-400/20 blur-md animate-pulse"></div>
            
            {/* Soft light halo */}
            <div className="absolute inset-0 scale-110 rounded-full bg-blue-100/10 blur-xl"></div>
            
            {/* Regeneration particles - blue-white */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 5 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-200 rounded-full animate-[spark_2s_ease_infinite]"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${Math.random() * 1.5 + 1}s`
                  }}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Status indicator */}
        <div className={`
          absolute -bottom-3 left-1/2 -translate-x-1/2
          w-3 h-3 rounded-full 
          ${isRepaired ? 'bg-green-500 animate-pulse ring-2 ring-green-400/30' : 'bg-red-500 ring-2 ring-red-400/30'}
        `}></div>

      </div>
    </div>
  );
};

// Main Game component
export function SavePlanetGame() {
  // Game state
  const [repairedBuildings, setRepairedBuildings] = useState<number[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [showQuestionDialog, setShowQuestionDialog] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timer, setTimer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  // Track used questions to avoid repeating
  const [usedQuestionIndices, setUsedQuestionIndices] = useState<number[]>([]);
  
  // Start timer when game starts
  useEffect(() => {
    let interval: number | undefined;
    
    if (gameStarted && !gameComplete) {
      interval = window.setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStarted, gameComplete]);
  
  // Check if game is complete
  useEffect(() => {
    if (repairedBuildings.length === BUILDINGS.length && gameStarted) {
      setGameComplete(true);
    }
  }, [repairedBuildings, gameStarted]);
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle building click
  const handleBuildingClick = (building: Building) => {
    if (repairedBuildings.includes(building.id)) return;
    
    // Start the game if it's not already started
    if (!gameStarted) {
      setGameStarted(true);
    }
    
    setSelectedBuilding(building);
    
    // Select 3 random non-repeated questions
    const availableQuestions = QUESTIONS.map((_, index) => index)
      .filter(index => !usedQuestionIndices.includes(index));
    
    // If we're running low on questions, reset the used questions
    const questionPool = availableQuestions.length < 3 ? 
      QUESTIONS.map((_, index) => index) : availableQuestions;
    
    // Randomly select 3 questions
    const selectedIndices: number[] = [];
    while (selectedIndices.length < 3 && questionPool.length > 0) {
      const randomIndex = Math.floor(Math.random() * questionPool.length);
      const questionIndex = questionPool[randomIndex];
      
      selectedIndices.push(questionIndex);
      questionPool.splice(randomIndex, 1); // Remove the selected question from the pool
    }
    
    // Get the selected questions
    const selectedQuestions = selectedIndices.map(index => QUESTIONS[index]);
    
    // Update state
    setCurrentQuestions(selectedQuestions);
    setUsedQuestionIndices(prev => [...prev, ...selectedIndices]);
    setCurrentQuestionIndex(0);
    setShowQuestionDialog(true);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };
  
  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === currentQuestions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);
    
    // Wait a bit before moving to next question or closing dialog
    setTimeout(() => {
      if (!correct) {
        // Wrong answer, close dialog
        setShowQuestionDialog(false);
        setSelectedBuilding(null);
        return;
      }
      
      if (currentQuestionIndex < currentQuestions.length - 1) {
        // Move to next question
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        // All questions answered correctly, repair the building
        if (selectedBuilding) {
          setRepairedBuildings(prev => [...prev, selectedBuilding.id]);
        }
        setShowQuestionDialog(false);
        setSelectedBuilding(null);
      }
    }, 1000);
  };
  
  // Reset game
  const resetGame = () => {
    setRepairedBuildings([]);
    setSelectedBuilding(null);
    setShowQuestionDialog(false);
    setTimer(0);
    setGameStarted(false);
    setGameComplete(false);
    // Reset used questions
    setUsedQuestionIndices([]);
  };
  
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background with cyberpunk theme - darker sky for more dramatic effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800"></div>
      
      {/* Stars in the sky - with fixed positions and only in sky area */}
      <div className="absolute inset-x-0 top-0 h-1/4 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => {
          // Use index-based deterministic positioning
          const topPercentage = (i % 10) * 2.5;  // Spreads across 0% to 22.5% (top quarter)
          const leftPercentage = (i * 7.3) % 100; // Pseudo-random but fixed distribution
          const opacity = 0.3 + ((i * 13) % 7) / 10; // Between 0.3 and 1.0
          const duration = 2 + ((i * 17) % 5); // Between 2 and 7 seconds
          const delay = ((i * 19) % 4); // Between 0 and 4 seconds
          
          return (
            <div 
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
              style={{
                top: `${topPercentage}%`,
                left: `${leftPercentage}%`,
                opacity: opacity,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`
              }}
            />
          );
        })}
      </div>
      
      {/* Enhanced horizon line with city silhouette */}
      <div className="absolute inset-x-0 top-1/4 overflow-visible">
        {/* Distant cityscape silhouette */}
        <div className="absolute inset-x-0 -top-8 h-16">
          {/* Distant buildings silhouette */}
          <div className="absolute left-[5%] bottom-0 w-8 h-10 bg-slate-900 rounded-sm"></div>
          <div className="absolute left-[8%] bottom-0 w-10 h-14 bg-slate-900 rounded-sm"></div>
          <div className="absolute left-[12%] bottom-0 w-6 h-8 bg-slate-900 rounded-sm"></div>
          <div className="absolute left-[20%] bottom-0 w-14 h-12 bg-slate-900 rounded-sm"></div>
          <div className="absolute left-[25%] bottom-0 w-8 h-16 bg-slate-900 rounded-sm"></div>
          <div className="absolute left-[30%] bottom-0 w-10 h-10 bg-slate-900 rounded-sm"></div>
          <div className="absolute left-[45%] bottom-0 w-12 h-14 bg-slate-900 rounded-sm"></div>
          <div className="absolute left-[50%] bottom-0 w-8 h-12 bg-slate-900 rounded-sm"></div>
          <div className="absolute left-[55%] bottom-0 w-10 h-16 bg-slate-900 rounded-sm"></div>
          <div className="absolute left-[65%] bottom-0 w-14 h-12 bg-slate-900 rounded-sm"></div>
          <div className="absolute left-[72%] bottom-0 w-10 h-14 bg-slate-900 rounded-sm"></div>
          <div className="absolute left-[78%] bottom-0 w-8 h-10 bg-slate-900 rounded-sm"></div>
          <div className="absolute left-[85%] bottom-0 w-12 h-16 bg-slate-900 rounded-sm"></div>
          <div className="absolute left-[92%] bottom-0 w-10 h-12 bg-slate-900 rounded-sm"></div>
        </div>
        
        {/* Gradient horizon glow - changed from cyan to amber/green */}
        <div className="absolute inset-x-0 -top-2 h-8 bg-gradient-to-b from-amber-900/10 to-green-900/20 blur-sm"></div>
        
        {/* Horizon line with slight glow - changed from cyan to amber */}
        <div className="absolute inset-x-0 top-0 h-px bg-amber-500/30 shadow-lg shadow-amber-500/20"></div>
      </div>
      
      {/* Ground texture */}
      <div className="absolute inset-x-0 top-1/4 bottom-0 bg-gradient-to-b from-green-950/50 via-green-900/40 to-green-800/30">
        {/* Grid lines for cyberpunk effect */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_39px,#1e293b_1px),linear-gradient(0deg,transparent_39px,#1e293b_1px)] bg-[size:40px_40px]"></div>
        
        {/* Terrain texture overlay for more natural look */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgo8ZGVmcz4KPHBhdHRlcm4gaWQ9InBhdHRlcm4iIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMzUiIGZpbGw9InRyYW5zcGFyZW50IiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjA1Ii8+CjwvcGF0dGVybj4KPC9kZWZzPgo8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIiAvPgo8L3N2Zz4=')] opacity-70"></div>
      </div>
      
      {/* Atmospheric effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Distant smoke clouds */}
        <div className="absolute left-[10%] top-[10%] w-32 h-16 bg-gray-500/10 rounded-full blur-3xl animate-[smoke_25s_ease-out_infinite_3s]"></div>
        <div className="absolute right-[20%] top-[15%] w-40 h-20 bg-gray-600/15 rounded-full blur-3xl animate-[smoke_30s_ease-out_infinite_5s]"></div>
        
        {/* Atmospheric fog - changed from cyan to warm tones */}
        <div className="absolute inset-x-0 top-1/3 h-1/3 bg-amber-900/5 blur-3xl"></div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-orange-900/10 blur-3xl"></div>
        
        {/* Distant lights (as if from other clusters of buildings) */}
        <div className="absolute top-[25%] left-[5%] w-2 h-2 bg-yellow-400/70 blur-sm"></div>
        <div className="absolute top-[20%] right-[8%] w-2 h-2 bg-cyan-400/70 blur-sm"></div>
        <div className="absolute top-[15%] right-[15%] w-1 h-1 bg-red-400/70 blur-sm"></div>
      </div>
      
      {/* Environmental elements - positioned in the ground area only */}
      <div className="absolute inset-x-0 top-1/4 bottom-0 pointer-events-none overflow-hidden">
        {/* Trees - positioned with percentages relative to the ground area */}
        <div className="absolute bottom-[10%] left-[5%] z-0">
          <div className="w-8 h-12 bg-green-900 rounded-full"></div>
          <div className="w-6 h-8 bg-green-800 rounded-full absolute -top-4 left-1"></div>
          <div className="w-5 h-6 bg-green-700 rounded-full absolute -top-6 left-1.5"></div>
        </div>
        
        <div className="absolute bottom-[12%] left-[20%] z-0">
          <div className="w-6 h-10 bg-green-900 rounded-full"></div>
          <div className="w-5 h-7 bg-green-800 rounded-full absolute -top-4 left-0.5"></div>
          <div className="w-4 h-5 bg-green-700 rounded-full absolute -top-5 left-1"></div>
        </div>
        
        <div className="absolute bottom-[15%] right-[10%] z-0">
          <div className="w-10 h-14 bg-green-900 rounded-full"></div>
          <div className="w-8 h-10 bg-green-800 rounded-full absolute -top-5 left-1"></div>
          <div className="w-6 h-7 bg-green-700 rounded-full absolute -top-7 left-2"></div>
        </div>
        
        <div className="absolute bottom-[8%] right-[25%] z-0">
          <div className="w-7 h-11 bg-green-900 rounded-full"></div>
          <div className="w-6 h-8 bg-green-800 rounded-full absolute -top-4 left-0.5"></div>
          <div className="w-4 h-6 bg-green-700 rounded-full absolute -top-6 left-1.5"></div>
        </div>
        
      </div>
      
      {/* Game content */}
      <div className="relative h-full flex flex-col z-10">
        {/* Game HUD - Floating elements */}
        <div className="absolute top-4 left-4 z-20">
          <Card className="bg-slate-900/80 border-amber-500/30 backdrop-blur-sm shadow-lg shadow-amber-900/20">
            <CardContent className="p-3 flex items-center">
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Planet Repair
              </span>
            </CardContent>
          </Card>
        </div>
        
        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end z-20">
          <Card className="bg-slate-900/80 border-amber-500/30 backdrop-blur-sm shadow-lg shadow-amber-900/20 w-auto">
            <CardContent className="py-2 px-3">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">Repaired:</span>
                <span className="text-amber-400 font-mono font-bold">
                  {repairedBuildings.length}/{BUILDINGS.length}
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/80 border-amber-500/30 backdrop-blur-sm shadow-lg shadow-amber-900/20 w-auto">
            <CardContent className="py-2 px-3">
              <div className="text-amber-400 font-mono font-bold">
                {formatTime(timer)}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Progress bar at bottom */}
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <div className="mb-1 flex justify-between px-1">
            <span className="text-xs text-amber-300/70">Repair Progress</span>
            <span className="text-xs text-amber-300/70">{Math.round((repairedBuildings.length / BUILDINGS.length) * 100)}%</span>
          </div>
          <Progress 
            value={(repairedBuildings.length / BUILDINGS.length) * 100} 
            className="h-2 bg-slate-700/50 backdrop-blur-sm"
          />
        </div>
        
        {/* Buildings Container - Constrained to ground area and higher z-index than trees */}
        <div className="absolute inset-x-0 top-1/12 bottom-0 overflow-hidden">
          {/* Buildings */}
          {BUILDINGS.map(building => (
            <BuildingComponent
              key={building.id}
              building={building}
              isRepaired={repairedBuildings.includes(building.id)}
              onClick={() => handleBuildingClick(building)}
            />
          ))}
        </div>
      </div>
      
      {/* Question Dialog */}
      <Dialog open={showQuestionDialog} onOpenChange={setShowQuestionDialog}>
        <DialogContent className="bg-black border-2 border-cyan-500/70 text-white max-w-md shadow-lg shadow-cyan-500/30 backdrop-blur-sm  overflow-hidden p-4 top-1/2 -mt-4">
          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-30 h-[10px]" 
                style={{ animation: 'scanline 4s linear infinite' }}></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_4px]"></div>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          
          {/* Terminal-like header with blinking cursor and system info */}
          <div className="border-b border-cyan-600/50 pb-2 mb-3 relative z-20">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs font-mono text-cyan-400" style={{ animation: 'terminal-glitch 3s infinite' }}>CYBERNET v4.32</span>
            </div>
            
            <h2 className="font-mono text-xl text-cyan-400 font-bold tracking-tight flex items-center gap-2">
              <span className="text-sm text-cyan-600">[SYS]</span> 
              Building Repair Terminal
              <span className="w-2 h-5 bg-cyan-400" style={{ animation: 'cursor-blink 1s step-end infinite' }}></span>
            </h2>
            
            <div className="flex items-center justify-between mt-2 text-xs font-mono">
              <span className="text-cyan-600">SEC://LEVEL_3_ACCESS_GRANTED</span>
              <span className="text-cyan-300">Question {currentQuestionIndex + 1}/{currentQuestions.length}</span>
            </div>
          </div>
          
          {currentQuestions[currentQuestionIndex] && (
            <div className="bg-black/80 rounded-md border border-cyan-800/50 p-4">
              {/* Terminal command prompt style question with typing effect */}
              <div className="font-mono mb-4 relative z-20">
                <div className="flex items-start gap-2 mb-3">
                  <span className="text-cyan-500 shrink-0">root@cybernet:~$</span>
                  <span className="text-cyan-100 inline-block whitespace-pre-wrap" 
                        style={{ animation: `typing 1s steps(${currentQuestions[currentQuestionIndex].question.length}) 0.5s forwards` }}>
                    {currentQuestions[currentQuestionIndex].question}
                  </span>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-800/50 to-transparent mb-3"></div>
                <div className="text-cyan-500 text-xs mb-2">SELECT ONE OPTION:</div>
              </div>
              
              {/* Answer options with terminal style */}
              <div className="space-y-2 font-mono relative z-20">
                {currentQuestions[currentQuestionIndex].options.map((option, idx) => (
                  <button
                    key={option}
                    className={`
                      w-full text-left px-4 py-2 rounded-sm border transition-all flex items-center gap-2 relative group
                      ${selectedAnswer === option 
                        ? (isCorrect 
                            ? 'border-green-500 bg-green-900/20 text-green-400' 
                            : 'border-red-500 bg-red-900/20 text-red-400')
                        : 'border-cyan-800/30 hover:border-cyan-500 hover:bg-cyan-900/10 text-cyan-100'}
                    `}
                    onClick={() => !selectedAnswer && handleAnswerSelect(option)}
                    disabled={!!selectedAnswer}
                  >
                    <span className="text-cyan-500 text-sm">{idx + 1}&gt;</span> {option}
                    
                    {/* Add tech decorations to button */}
                    <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-4 h-4 border border-cyan-500 flex items-center justify-center">
                        <div className="w-2 h-2 bg-cyan-500"></div>
                      </div>
                    </div>
                    <div className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-1 h-2/3 bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                ))}
              </div>
              
              {/* Terminal style progress bar */}
              <div className="mt-6 pt-2 border-t border-cyan-800/30 relative z-20">
                <div className="flex justify-between text-xs text-cyan-600 font-mono mb-1">
                  <span>PROCESS STATUS: {Math.round(((currentQuestionIndex + 1) / currentQuestions.length) * 100)}%</span>
                  <span className="text-cyan-500">{currentQuestionIndex + 1}/{currentQuestions.length}</span>
                </div>
                
                <div className="flex items-center">
                  <div className="text-cyan-500 text-xs mr-1">[</div>
                  <div className="h-3 flex-grow bg-black border border-cyan-900/50 flex">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-700/50 via-cyan-500/50 to-cyan-700/50 relative"
                      style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
                    >
                      {/* Progress bar with animated segments */}
                      {Array.from({length: 10}).map((_, i) => (
                        <div 
                          key={i} 
                          className="absolute top-0 bottom-0" 
                          style={{
                            width: '10%',
                            left: `${i * 10}%`,
                            background: i % 2 ? 'rgba(6, 182, 212, 0.3)' : 'rgba(6, 182, 212, 0.5)',
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="text-cyan-500 text-xs ml-1">]</div>
                </div>
                
                {/* System info readout */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3 text-xs font-mono">
                  <div className="text-cyan-600">REPAIR SYSTEM:</div>
                  <div className="text-cyan-400">ONLINE</div>
                  <div className="text-cyan-600">BUILDING ID:</div>
                  <div className="text-cyan-400">{selectedBuilding?.id || 'N/A'}</div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Game Complete Dialog */}
      <Dialog open={gameComplete} onOpenChange={setGameComplete}>
        <DialogContent className="bg-slate-900 border-amber-500/50 text-white max-w-md top-1/2 -mt-4 p-4">
          <DialogHeader>
            <DialogTitle className="text-center font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Planet Saved!
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-6 text-center">
            <p className="text-slate-300 mb-6">
              You've successfully repaired all buildings and restored the planet!
            </p>
            
            <Card className="bg-slate-800/50 border-slate-700 mb-6">
              <CardHeader>
                <CardTitle className="text-slate-400 text-sm font-normal">Your time</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-3xl font-mono font-bold text-amber-400">
                  {formatTime(timer)}
                </p>
                <CardDescription className="text-orange-400 font-semibold mt-2">
                  {timer < 60 ? "ULTIMATE SAVIOR!" : 
                   timer < 120 ? "MASTER ENGINEER!" :
                   "PLANET DEFENDER!"}
                </CardDescription>
              </CardContent>
            </Card>
            
            <Button 
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              onClick={resetGame}
            >
              Play Again
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Game Start Dialog */}
      <Dialog open={!gameStarted && !gameComplete}>
        <DialogContent className="bg-slate-900 border-amber-500/50 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Planet Repair Mission
            </DialogTitle>
            <DialogDescription className="text-slate-300 text-center">
              Our cyberpunk planet has been damaged! Repair all buildings by answering computer questions.
            </DialogDescription>
          </DialogHeader>
          
          <Card className="bg-slate-800/70 border-slate-700">
            <CardHeader>
              <CardTitle className="text-amber-400 text-base">Mission Objectives</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="list-disc text-slate-400 pl-5 space-y-1">
                <li>Click on any damaged building to begin</li>
                <li>Answer 3 computer-related questions per building</li>
                <li>Repair all 8 buildings as fast as you can</li>
                <li>Timer starts when you click your first building</li>
              </ul>
            </CardContent>
            <CardFooter className="justify-center pt-2 pb-4">
              <Button 
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                onClick={() => setGameStarted(true)}
              >
                Start Mission
              </Button>
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}
