import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithState } from '../utils/testing';
import CategoryItem from './category-item.component';

describe('CategoryItem component', () => {
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

    renderWithState(<CategoryItem {...mockProps} />);
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
