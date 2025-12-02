import React, { useRef, useState } from 'react';
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
  const [gameState, setGameState] = useState<GameState>(GameState.RUNNING);
  const [maxScore, setMaxScore] = useState<number>(() => {
    const saved = localStorage.getItem('snakeMaxScore');
    return saved ? parseInt(saved, 10) : 0;
  });

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
      canvasHeight: 150,
      canvasWidth: 300,
      onGameOver,
      gameState,
      onToggleGameState: toggleGameState,
    });

  const drawGame = (ctx: CanvasRenderingContext2D) => {
    draw({ ctx, snakeBody, foodPosition });
  };

  return (
    <GameWrapper tabIndex={0} onKeyDown={onKeyDownHandler}>
      <Canvas ref={canvasRef} draw={drawGame} />
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
      <Score>{`Your score: ${(snakeBody.length - 1) * 10} `}</Score>
      <Score>{`Max score: ${maxScore} `}</Score>
    </GameWrapper>
  );
};

export default Game;
