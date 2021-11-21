import DirectoryItem from '../directory-item/directory-item.component';

import { useSelector } from 'react-redux';

import { selectDirectorySections } from '../../redux/directory/directory.selectors';

import * as S from './directory.styles';

const Directory = () => {
  const sections = useSelector(selectDirectorySections);

  return (
    <S.DirectoryContainer>
      {
        sections.map(({ id, ...otherSectionProps }) => (
          <DirectoryItem key={id} {...otherSectionProps} />
        ))
      }
    </S.DirectoryContainer>
  );
};

export default Directory;