import styled from 'styled-components';

export const CategoryPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CategoryTitle = styled.h2`
  font-size: 2em;
  margin: 0 auto 30px;
`;

export const CategoryItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;

  > div {
    margin-bottom: 30px;
  }
  
  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
    margin: auto;
  }
`;
