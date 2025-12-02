import { Position } from '../game/useGameLogic';

interface DrawArgs {
  ctx: CanvasRenderingContext2D;
  snakeBody: Position[];
  foodPosition?: Position;
}

export const getSegmentSize = () => {
  const isMobile = window.innerWidth <= 768;
  return isMobile ? 20 : 30;
};

const draw = ({ ctx, snakeBody, foodPosition }: DrawArgs) => {
  const segmentSize = getSegmentSize();
  
  if (foodPosition) {
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(foodPosition?.x, foodPosition?.y, segmentSize, segmentSize);
  }

  ctx.fillStyle = 'rgb(0, 200, 0)';
  snakeBody.forEach((segment) =>
    ctx.fillRect(segment.x, segment.y, segmentSize, segmentSize)
  );
};

export const SEGMENT_SIZE = getSegmentSize();

export default draw;
