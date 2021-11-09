import { useHistory, useRouteMatch } from 'react-router-dom';

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
  const history = useHistory();
  const { url } = useRouteMatch();

  return (
    <MenuItemContainer
      size={size}
      onClick={() => history.push(`${url}${linkUrl}`)}
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
