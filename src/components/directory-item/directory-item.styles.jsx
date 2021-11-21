import styled from 'styled-components';

export const BackgroundImageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
`;

export const ContentContainer = styled.div`
  height: 90px;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: white;
  opacity: 0.7;
  position: absolute;
  text-transform: uppercase;
`;

export const ContentTitle = styled.span`
  font-weight: bold;
  margin-bottom: 6px;
  font-size: 22px;
  color: #4a4a4a;
`;

export const ContentSubtitle = styled.span`
  font-weight: lighter;
  font-size: 16px;
`;

export const DirectoryItemContainer = styled.div`
  grid-column-end: ${({ size }) => (size === 'large' ? 'span 3' : 'span 2')};
	height: ${({ size }) => (size === 'large' ? '380px' : '240px')};
  border: 1px solid black;
  position: relative;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		cursor: pointer;
	  ${BackgroundImageContainer} {
			transform: scale(1.1);
			transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
		}
		${ContentContainer} {
			opacity: 0.9;
		}
	}

  @media screen and (max-width: 800px) {
    grid-column-end: ${({ size }) => (size === 'large' ? 'span 6' : 'span 3')};
    height: 200px;
  }
`;