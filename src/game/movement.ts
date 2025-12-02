import { Direction, Position } from './useGameLogic';
import { getSegmentSize } from '../draw/draw';

const createSnakeMovement = () => {
  const gridSize = getSegmentSize();
  return {
  moveRight: (snakeBody: Position[]) => {
    const bodyCopy = [...snakeBody];
    const headPos = bodyCopy[bodyCopy.length - 1];
    bodyCopy.shift();
    return [...bodyCopy, { ...headPos, x: headPos.x + gridSize }];
  },
  moveLeft: (snakeBody: Position[]) => {
    const bodyCopy = [...snakeBody];
    const headPos = bodyCopy[bodyCopy.length - 1];
    bodyCopy.shift();
    return [...bodyCopy, { ...headPos, x: headPos.x - gridSize }];
  },
  moveDown: (snakeBody: Position[]) => {
    const bodyCopy = [...snakeBody];
    const headPos = bodyCopy[bodyCopy.length - 1];
    bodyCopy.shift();
    return [...bodyCopy, { ...headPos, y: headPos.y + gridSize }];
  },
  moveUp: (snakeBody: Position[]) => {
    const bodyCopy = [...snakeBody];
    const headPos = bodyCopy[bodyCopy.length - 1];
    bodyCopy.shift();
    return [...bodyCopy, { ...headPos, y: headPos.y - gridSize }];
  },
};
};

interface WillSnakeHitTheFoodArgs {
  foodPosition: Position;
  snakeHeadPosition: Position;
  direction: Direction;
}

const checkRectangleOverlap = (rect1: Position, rect2: Position, size: number) => {
  return (
    rect1.x < rect2.x + size &&
    rect1.x + size > rect2.x &&
    rect1.y < rect2.y + size &&
    rect1.y + size > rect2.y
  );
};

export const willSnakeHitTheFood = ({
  foodPosition,
  snakeHeadPosition,
  direction,
}: WillSnakeHitTheFoodArgs) => {
  const segmentSize = getSegmentSize();
  let nextHeadPosition: Position;
  
  switch (direction) {
    case Direction.UP:
      nextHeadPosition = { x: snakeHeadPosition.x, y: snakeHeadPosition.y - segmentSize };
      break;
    case Direction.DOWN:
      nextHeadPosition = { x: snakeHeadPosition.x, y: snakeHeadPosition.y + segmentSize };
      break;
    case Direction.LEFT:
      nextHeadPosition = { x: snakeHeadPosition.x - segmentSize, y: snakeHeadPosition.y };
      break;
    case Direction.RIGHT:
      nextHeadPosition = { x: snakeHeadPosition.x + segmentSize, y: snakeHeadPosition.y };
      break;
  }
  
  return checkRectangleOverlap(nextHeadPosition, foodPosition, segmentSize);
};

export const hasSnakeEatenItself = (snakeBody: Position[]) => {
  if (snakeBody.length <= 1) {
    return false;
  }

  const head = snakeBody[snakeBody.length - 1];
  const body = snakeBody.slice(0, snakeBody.length - 1);

  const segmentSize = getSegmentSize();
  return body.some((segment) => checkRectangleOverlap(head, segment, segmentSize));
};

export default createSnakeMovement;
