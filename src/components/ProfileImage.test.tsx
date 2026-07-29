import { render, screen } from '@testing-library/react';
import ProfileImage from './ProfileImage';

describe('ProfileImage', () => {
  it('renders an image when the user has a photoURL', () => {
    const user = { photoURL: 'https://example.com/photo.jpg', displayName: 'Ash' };
    render(<ProfileImage user={user} />);
    expect(screen.getByAltText('Ash')).toBeInTheDocument();
  });

  it('renders the initial fallback when the user has no photoURL', () => {
    const user = { photoURL: null, displayName: 'Ash' };
    render(<ProfileImage user={user} />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('renders the initial fallback when photoURL is an empty string', () => {
    const user = { photoURL: '', displayName: 'Misty' };
    render(<ProfileImage user={user} />);
    expect(screen.getByText('M')).toBeInTheDocument();
  });
});
