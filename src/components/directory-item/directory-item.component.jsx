import { useNavigate } from 'react-router-dom';

import { getShopImageUrl } from '../utils/images';

import * as S from './directory-item.styles';

const DirectoryItem = ({ title, imageFilename, size, linkUrl }) => {
  const imageUrl = getShopImageUrl(imageFilename);
  const navigate = useNavigate();

  return (
    <S.DirectoryItemContainer
      size={size}
      onClick={() => navigate(linkUrl)}
    >
      <S.BackgroundImageContainer imageUrl={imageUrl} />
      <S.ContentContainer>
        <S.ContentTitle>{title}</S.ContentTitle>
        <S.ContentSubtitle>Shop now</S.ContentSubtitle>
      </S.ContentContainer>
    </S.DirectoryItemContainer>
  );
};

export default DirectoryItem;
