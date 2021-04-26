import { Link, useLocation } from 'react-router-dom';

import CollectionItem from '../collection-item/collection-item.component';

import {
  CollectionPreviewContainer,
  TitleContainer,
  PreviewContainer
} from './collection-preview.styles';

const CollectionPreview = ({ title, items, routeName }) => {
  const location = useLocation();

  return (
  <CollectionPreviewContainer>
    <TitleContainer>
      <Link to={`${location.pathname}/${routeName}`}>
        {title.toUpperCase()}
      </Link>
    </TitleContainer>
    <PreviewContainer>
      {
        items
          .filter((item, index) => index < 4)
          .map(item => (
            <CollectionItem key={item.id} item={item} />
          ))
      }
    </PreviewContainer>
  </CollectionPreviewContainer>
)};

export default CollectionPreview;