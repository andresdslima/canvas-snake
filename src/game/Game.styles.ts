import styled from 'styled-components';

export const GameWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

export const Score = styled.h1`
  background: linear-gradient(to left, #753ad5, #d53a9d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: absolute;
  top: ${props => props.theme?.top || '20px'};
  left: 20px;
  margin: 0;
  font-size: clamp(16px, 4vw, 24px);
  z-index: 10;
`;
