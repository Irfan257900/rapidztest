// UserProfileCard.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserProfileCard from './UserProfileCard';
import { UserContext } from 'src/core/context/UserContext';
import * as userApi from 'src/api/userApi';

jest.mock('src/api/userApi');

describe('UserProfileCard', () => {
  const user = { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', avatar: 'avatar_url' };

  beforeEach(() => {
    userApi.fetchUserProfile.mockResolvedValue(user);
  });

  test('renders user profile card', async () => {
    render(<UserContext.Provider value={{}}><UserProfileCard userId={1} /></UserContext.Provider>);

    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(user.name);
    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(await screen.findByText(user.role)).toBeInTheDocument();
  });

  test('displays loading state', () => {
    render(<UserContext.Provider value={{}}><UserProfileCard userId={1} /></UserContext.Provider>);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('handles error', async () => {
    userApi.fetchUserProfile.mockRejectedValue(new Error('Failed to fetch user'));
    render(<UserContext.Provider value={{}}><UserProfileCard userId={1} /></UserContext.Provider>);

    await waitFor(() => expect(screen.getByText(/Failed to fetch user/i)).toBeInTheDocument());
  });
});