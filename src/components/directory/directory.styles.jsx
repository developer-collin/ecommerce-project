import styled from 'styled-components';

export const DirectoryContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-flow: dense;
  gap: 10px;
`;