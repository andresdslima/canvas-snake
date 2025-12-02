import styled from 'styled-components';

export const Canvas = styled.canvas`
  border: 5px solid black;
  width: ${() => window.innerWidth <= 768 ? '100vw' : '75vw'};
  height: ${() => window.innerWidth <= 768 ? '100vh' : '75vh'};
  box-sizing: border-box;
  border-image-slice: 1;
  border-image-source: linear-gradient(to left, #743ad5, #d53a9d);
`;
