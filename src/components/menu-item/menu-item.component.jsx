import { useNavigate } from 'react-router-dom';

import { getShopImageUrl } from '../utils/images';

import {
  MenuItemContainer,
  BackgroundImageContainer,
  ContentContainer,
  ContentTitle,
  ContentSubtitle
} from './menu-item.styles';

const MenuItem = ({ title, imageFilename, size, linkUrl }) => {
  const imageUrl = getShopImageUrl(imageFilename);
  const navigate = useNavigate();

  return (
    <MenuItemContainer
      size={size}
      onClick={() => navigate(linkUrl)}
    >
      <BackgroundImageContainer imageUrl={imageUrl} />
      <ContentContainer>
        <ContentTitle>{title}</ContentTitle>
        <ContentSubtitle>Shop now</ContentSubtitle>
      </ContentContainer>
    </MenuItemContainer>
  );
};

export default MenuItem;
