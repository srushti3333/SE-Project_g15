import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import GroupsPage from './GroupsPage';
import { getUserGroups } from '../../api/groups';
import GroupCard from '../../components/group/GroupCard';

// Mock the API and component
jest.mock('../../api/groups', () => ({
  getUserGroups: jest.fn(),
}));

jest.mock('../../components/group/GroupCard', () => jest.fn(() => <div data-testid="group-card" />));

describe('GroupsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders header and fetches user groups', async () => {
    const mockGroups = [
      { id: 1, name: 'Lunch Crew' },
      { id: 2, name: 'Study Group' },
    ];
    getUserGroups.mockResolvedValueOnce(mockGroups);

    render(<GroupsPage />);

    // Header should always render immediately
    expect(screen.getByText(/Your Groups/i)).toBeInTheDocument();

    // Wait for async groups to load
    await waitFor(() => {
      expect(getUserGroups).toHaveBeenCalledTimes(1);
      expect(screen.getAllByTestId('group-card')).toHaveLength(2);
    });
  });

  it('renders no GroupCard when API returns empty list', async () => {
    getUserGroups.mockResolvedValueOnce([]);

    render(<GroupsPage />);

    await waitFor(() => {
      expect(getUserGroups).toHaveBeenCalledTimes(1);
    });

    expect(screen.queryByTestId('group-card')).toBeNull();
  });

  it('handles API error gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    getUserGroups.mockRejectedValueOnce(new Error('Network error'));

    render(<GroupsPage />);

    await waitFor(() => {
      expect(getUserGroups).toHaveBeenCalledTimes(1);
    });

    // It should log the error, but not crash or show GroupCard
    expect(consoleSpy).toHaveBeenCalled();
    expect(screen.queryByTestId('group-card')).toBeNull();

    consoleSpy.mockRestore();
  });
});
