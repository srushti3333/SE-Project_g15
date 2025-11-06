// src/pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import Navbar from '../../components/common/Navbar/Navbar';
import CartSidebar from '../../components/common/Cart/CartSidebar';
import RestaurantCard from '../../components/restaurant/RestaurantCard';
import MenuItemCard from '../../components/restaurant/MenuItemCard';
import GroupDetail from '../../components/group/GroupDetail';
import GroupCard from '../../components/group/GroupCard';
import EditGroupPage from '../EditGroup/EditGroupPage';
import Button from '../../components/common/Button/Button';
import { RESTAURANTS, PAGES } from '../../utils/constants';
import CreatePollPage from '../Poll/CreatePollPage';
import { getUserGroups, getAllGroups, getGroupDetails, joinGroup } from '../../api/groups';

import './Dashboard.css';

function Dashboard() {
  const [currentPage, setCurrentPage] = useState(PAGES.HOME);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const { addToCart } = useCart();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [editingGroup, setEditingGroup] = useState(null);
  const [pollGroup, setPollGroup] = useState(null);

  // Backend state
  const [myGroups, setMyGroups] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // const currentUser = 'Alice'; // Replace with actual logged-in user from auth context

  const currentUser = localStorage.getItem('username') || "Guest";
  // Fetch user's groups when navigating to MY_GROUPS
  useEffect(() => {
    if (currentPage === PAGES.MY_GROUPS) {
      fetchMyGroups();
    }
  }, [currentPage]);

  // Fetch all groups when navigating to FIND_GROUPS
  useEffect(() => {
    if (currentPage === PAGES.FIND_GROUPS) {
      fetchAllGroups();
    }
  }, [currentPage]);

  const fetchMyGroups = async () => {
    setLoading(true);
    setError('');
    try {
      const groups = await getUserGroups();
      setMyGroups(groups);
    } catch (err) {
      console.error('Error fetching my groups:', err);
      setError('Failed to load your groups');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllGroups = async () => {
    setLoading(true);
    setError('');
    try {
      const groups = await getAllGroups();
      // Filter out groups the user is already a member of
      // const availableGroups = groups.filter(g => !g.members.includes(currentUser));
      setAllGroups(groups);
    } catch (err) {
      console.error('Error fetching all groups:', err);
      setError('Failed to load groups');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedRestaurant(null);
    setSelectedGroup(null);
  };

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleBackToRestaurants = () => {
    setSelectedRestaurant(null);
  };

  const handleViewGroup = async (group) => {
    try {
      const fullGroupData = await getGroupDetails(group.id);
      setSelectedGroup(fullGroupData);
    } catch (err) {
      console.error('Error fetching group details:', err);
      alert('Failed to load group details');
    }
  };

  const handleJoinGroup = async (group) => {
    if (window.confirm(`Do you want to join "${group.name}"?`)) {
      try {
        await joinGroup(group.id);
        alert(`Successfully joined ${group.name}!`);
        fetchAllGroups(); // Refresh the list
        fetchMyGroups(); // Update my groups as well
      } catch (err) {
        console.error('Error joining group:', err);
        alert(err.response?.data?.error || 'Failed to join group');
      }
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar currentPage={currentPage} onPageChange={handlePageChange} />

      <div className="main-content">
        {/* Home Page - Restaurant List */}
        {currentPage === PAGES.HOME && !selectedRestaurant && (
          <div>
            <h2 className="page-title">Restaurants Near You</h2>
            <div className="restaurant-grid">
              {RESTAURANTS.map(restaurant => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={handleRestaurantClick}
                />
              ))}
            </div>
          </div>
        )}

        {/* Home Page - Restaurant Detail */}
        {currentPage === PAGES.HOME && selectedRestaurant && (
          <div>
            <Button
              variant="secondary"
              onClick={handleBackToRestaurants}
              className="back-button"
            >
              ← Back to Restaurants
            </Button>

            <div className="restaurant-detail">
              <div className="restaurant-header">
                <div className="restaurant-emoji-large">{selectedRestaurant.image}</div>
                <div>
                  <h2 className="restaurant-title">{selectedRestaurant.name}</h2>
                  <div className="restaurant-info">
                    <span>⭐ {selectedRestaurant.rating}</span>
                    <span>📍 {selectedRestaurant.location}</span>
                  </div>
                  <div className="restaurant-offer-large">{selectedRestaurant.offers}</div>
                </div>
              </div>
            </div>

            <h3 className="menu-title">Menu Items</h3>
            <div className="menu-grid">
              {selectedRestaurant.items.map(item => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
        )}

        {/* My Groups Page */}
        {currentPage === PAGES.MY_GROUPS && (
          <div>
            {/* Inline Group Detail Card */}
            {selectedGroup && (
              <div className="mt-8">
                <GroupDetail
                  group={selectedGroup}
                  onClose={() => setSelectedGroup(null)}
                  onEditGroup={(grp) => {
                    setEditingGroup(grp);
                    setCurrentPage(PAGES.EDIT_GROUP);
                  }}
                  onCreatePoll={(grp) => {
                    setPollGroup(grp);
                    setCurrentPage(PAGES.CREATE_POLL);
                  }}
                />
              </div>
            )}

            {!selectedGroup && (
              <>
                <h2 className="page-title">My Groups</h2>

                {error && (
                  <div className="error-banner">
                    {error}
                    <Button variant="secondary" onClick={fetchMyGroups}>Retry</Button>
                  </div>
                )}

                {loading ? (
                  <div className="loading-state">
                    <p>Loading your groups...</p>
                  </div>
                ) : myGroups.length === 0 ? (
                  <div className="empty-state">
                    <p>You haven't joined any groups yet.</p>
                    <p className="empty-state-subtitle">
                      Browse available groups or create a pool when ordering!
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => setCurrentPage(PAGES.FIND_GROUPS)}
                    >
                      Find Groups
                    </Button>
                  </div>
                ) : (
                  <div className="groups-grid">
                    {myGroups.map(group => (
                      <GroupCard
                        key={group.id}
                        group={group}
                        onAction={() => handleViewGroup(group)}
                        actionLabel="View Details"
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Find Groups Page */}
        {currentPage === PAGES.FIND_GROUPS && (
          <div>
            <h2 className="page-title">Find Groups</h2>

            {error && (
              <div className="error-banner">
                {error}
                <Button variant="secondary" onClick={fetchAllGroups}>Retry</Button>
              </div>
            )}

            {loading ? (
              <div className="loading-state">
                <p>Loading available groups...</p>
              </div>
            ) : allGroups.length === 0 ? (
              <div className="empty-state">
                <p>No groups available to join right now.</p>
                <p className="empty-state-subtitle">
                  Create a pool when you order to start a new group!
                </p>
              </div>
            ) : (
              <div className="groups-grid">
                {allGroups.map(group => (
                  <GroupCard
                    key={group.id}
                    group={group}
                    isJoinable={true}
                    onAction={() => handleJoinGroup(group)}
                    actionLabel="Join Group"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Edit Group Page */}
        {currentPage === PAGES.EDIT_GROUP && editingGroup && (
          <EditGroupPage
            group={editingGroup}
            onSave={(updatedGroup) => {
              console.log("Saved updated group", updatedGroup);

              // Instantly update the edited group in state
              setMyGroups((prevGroups) =>
                prevGroups.map((g) => (g.id === updatedGroup.id ? updatedGroup : g))
              );

              // If this group is currently open in detail view, update it too
              setSelectedGroup((prev) =>
                prev && prev.id === updatedGroup.id ? updatedGroup : prev
              );

              // Close edit page and refresh as backup (optional)
              setEditingGroup(null);
              setCurrentPage(PAGES.MY_GROUPS);
              fetchMyGroups(); // optional fallback to ensure backend sync
            }}
            onCancel={() => {
              setEditingGroup(null);
              setCurrentPage(PAGES.MY_GROUPS);
            }}
          />
        )}

        {/* Create Poll Page */}
        {currentPage === PAGES.CREATE_POLL && pollGroup && (
          <CreatePollPage
            group={pollGroup}
            onBack={() => {
              setPollGroup(null);
              setCurrentPage(PAGES.MY_GROUPS);
            }}
          />
        )}
      </div>

      <CartSidebar selectedRestaurant={selectedRestaurant} />
    </div>
  );
}

export default Dashboard;