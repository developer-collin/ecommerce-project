import React from 'react';
import lostInSpaceImg from '../../assets/error-lost-in-space.png';

import * as S from './error-boundary.styles';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      return(
        <S.ErrorImageOverlay>
          <S.ErrorImageContainer imageUrl={lostInSpaceImg} />
          <S.ErrorImageText>
            Sorry, something went wrong.
          </S.ErrorImageText>
        </S.ErrorImageOverlay>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;