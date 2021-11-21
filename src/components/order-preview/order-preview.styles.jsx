import styled from 'styled-components';

export const OrderPreviewContainer = styled.div`
`;

export const Headline = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-bottom: 2px;
  padding: 0.5rem 1em;
  background-color: #e5e5e5;

  > div {
    margin-right: 2em;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const Title = styled.span`
  display: block;
  font-size: 0.9em;
`;

export const ViewDetails = styled.div`
  margin-left: auto;
  text-decoration: underline;
`;

export const Details = styled.div`
  margin-bottom: 2em;
`;