import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithState } from '../utils/testing';
import CollectionItem from './collection-item.component';

describe('CollectionItem component', () => {
  const mockImageFilename = 'whatever.png';
  const mockName = 'Blue hat';
  const mockPrice = 20;

  beforeEach(() => {
    const mockProps = {
      item: {
        imageFilename: mockImageFilename,
        price: mockPrice,
        name: mockName
      }
    };

    renderWithState(<CollectionItem {...mockProps} />);
  });

  it('should render', () => {
    expect(screen.getByText(mockName)).toBeInTheDocument();
    expect(screen.getByText(mockPrice)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', mockName);
  });

  it('should have clickable button', () => {
    const button = screen.getByRole('button', { hidden: true });
    userEvent.click(button);
    expect(button).toHaveFocus();
  });
});
