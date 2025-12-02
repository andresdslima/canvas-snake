import React, { useRef, useState, useEffect } from 'react';
import Canvas from '../canvas/Canvas';
import draw from '../draw/draw';
import { GameWrapper, Score } from './Game.styles';
import useGameLogic from './useGameLogic';

interface GameProps {}

export enum GameState {
  RUNNING,
  GAME_OVER,
  PAUSED,
}

const Game: React.FC<GameProps> = ({}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>(GameState.PAUSED);
  const [maxScore, setMaxScore] = useState<number>(() => {
    const saved = localStorage.getItem('snakeMaxScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateCanvasSize = () => {
      const isMobile = window.innerWidth <= 768;
      const multiplier = isMobile ? 1 : 0.75;
      setCanvasSize({
        width: window.innerWidth * multiplier,
        height: window.innerHeight * multiplier
      });
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const onGameOver = () => {
    const currentScore = (snakeBody.length - 1) * 10;
    if (currentScore > maxScore) {
      setMaxScore(currentScore);
      localStorage.setItem('snakeMaxScore', currentScore.toString());
    }
    setGameState(GameState.GAME_OVER);
  };

  const toggleGameState = () => {
    setGameState(
      gameState === GameState.RUNNING
        ? GameState.PAUSED
        : GameState.RUNNING
    );
  };

  const { snakeBody, onKeyDownHandler, foodPosition, resetGameState } =
    useGameLogic({
      canvasHeight: canvasSize.height,
      canvasWidth: canvasSize.width,
      onGameOver,
      gameState,
      onToggleGameState: toggleGameState,
    });

  const drawGame = (ctx: CanvasRenderingContext2D) => {
    draw({ ctx, snakeBody, foodPosition });
  };

  if (canvasSize.width === 0 || canvasSize.height === 0) {
    return null;
  }

  return (
    <GameWrapper tabIndex={0} onKeyDown={onKeyDownHandler}>
      <Canvas ref={canvasRef} draw={drawGame} width={canvasSize.width} height={canvasSize.height} />
      {gameState === GameState.GAME_OVER ? (
        <button
          onClick={() => {
            setGameState(GameState.RUNNING);
            resetGameState();
          }}
        >
          Play Again
        </button>
      ) : (
        <button
          onClick={() => {
            setGameState(
              gameState === GameState.RUNNING
                ? GameState.PAUSED
                : GameState.RUNNING
            );
          }}
        >
          {gameState === GameState.RUNNING ? 'pause' : 'play'}
        </button>
      )}
      <Score style={{ top: '20px' }}>{`Your score: ${(snakeBody.length - 1) * 10} `}</Score>
      <Score style={{ top: '60px' }}>{`Max score: ${maxScore} `}</Score>
    </GameWrapper>
  );
};

export default Game;
