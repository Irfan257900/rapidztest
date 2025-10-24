import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserProfileCard from './UserProfileCard';
import { UserContext } from 'src/core/context/UserContext';
import { getUser } from 'src/api/userService';
jest.mock('src/api/userService');

const user = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'Admin',
  avatar: 'avatar_url'
};

describe('UserProfileCard', () => {
  beforeEach(() => {
    getUser.mockResolvedValue(user);
  });

  it('renders loading state', () => {
    render(<UserProfileCard userId="1" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders user information', async () => {
    render(
      <UserContext.Provider value={{ setUser: jest.fn() }}>
        <UserProfileCard userId="1" />
      </UserContext.Provider>
    );
    expect(await screen.findByText(user.name)).toBeInTheDocument();
    expect(screen.getByText(user.email)).toBeInTheDocument();
  });

  it('handles edit button click', async () => {
    const { history } = render(
      <UserContext.Provider value={{ setUser: jest.fn() }}>
        <UserProfileCard userId="1" />
      </UserContext.Provider>
    );
    const editButton = await screen.findByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    expect(history.location.pathname).toBe('/profile/edit/1');
  });

  it('handles error state', async () => {
    getUser.mockRejectedValue(new Error('Failed to fetch'));
    render(
      <UserContext.Provider value={{ setUser: jest.fn() }}>
        <UserProfileCard userId="1" />
      </UserContext.Provider>
    );
    expect(await screen.findByText('Failed to fetch')).toBeInTheDocument();
  });
});
