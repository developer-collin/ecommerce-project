import React from 'react';
import lostInSpaceImg from '../../assets/error-lost-in-space.png';

import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText
} from './error-boundary.styles';

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
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl={lostInSpaceImg} />
          <ErrorImageText>
            Sorry, something went wrong.
          </ErrorImageText>
        </ErrorImageOverlay>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;