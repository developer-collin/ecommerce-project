import styled from 'styled-components';

export const OrderContainer = styled.div`
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

export const Headline = styled.div`
  overflow: hidden;
  margin-bottom: 1em;

  > div {
    display: inline-block;
    vertical-align: middle;

    &:first-child {
      ::after {
        content: "|";
        margin: 0 .7em;
        color: #c2c2c2;
      }
    }
  }
`;

export const OrderId = styled.span`
  word-break: break-all;
`;

export const Details = styled.div`
  margin-bottom: 16px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const LineItems = styled.div`
  margin-bottom: 16px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  padding: 10px 15px;
`;

export const Shipping = styled.div`
  margin-right: 16px;

  @media screen and (max-width: 568px) {
    margin-right: 0;
    margin-bottom: 16px;
  }
`;

export const CostSummary = styled.div`
  width: 100%;
  max-width: 300px;
  display: grid;
  grid-template-columns: auto auto;
  gap: 0 1em;
`;

export const DetailsTitle = styled.h2`
  grid-column: 1 / span 2;
  margin: .2em 0;
  font-size: 1.6rem;
  font-weight: bold;
`;

export const Label = styled.div`
  ${ props => props.footer ? `
    margin: .2em 0;
    font-weight: bold;
  ` : null }
`;

export const Value = styled.div`
  justify-self: end;

  ${ props => props.footer ? `
    margin: .2em 0;
    font-weight: bold;
  ` : null }
`;