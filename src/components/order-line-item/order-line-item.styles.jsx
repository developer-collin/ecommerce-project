import styled from 'styled-components';

export const LineItemContainer = styled.div`
  display: flex;
  margin-top: 2px;
  padding: 10px;
  background-color: #eee;

  &:first-child {
    margin-top: 0;
  }
`;

export const ImageWrap = styled.div`
  padding-right: 10px;

  img {
    display: block;
    max-width: 70px;
  }
`;

export const Info = styled.div``;

export const Actions = styled.div`
  margin-left: auto;
`;

export const Name = styled.div``;
export const Quantity = styled.div``;
export const Price = styled.div``;