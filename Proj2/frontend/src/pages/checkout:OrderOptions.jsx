import React, { useState, useEffect } from 'react';
import { Clock, Users, Zap, MapPin, TrendingDown, Leaf } from 'lucide-react';

// Mock data for nearby pools
const nearbyPools = [
  {
    id: 1,
    restaurantName: "Pizza Palace",
    restaurantEmoji: "🍕",
    organizerName: "John D.",
    currentMembers: 3,
    maxMembers: 8,
    timeRemaining: "12 min",
    estimatedSavings: 4.50,
    deliveryLocation: "Building A, Floor 3",
    distance: "0.2 km"
  },
  {
    id: 2,
    restaurantName: "Pizza Palace",
    restaurantEmoji: "🍕",
    organizerName: "Sarah M.",
    currentMembers: 5,
    maxMembers: 10,
    timeRemaining: "8 min",
    estimatedSavings: 5.20,
    deliveryLocation: "Main Campus Center",
    distance: "0.4 km"
  },
  {
    id: 3,
    restaurantName: "Pizza Palace",
    restaurantEmoji: "🍕",
    organizerName: "Mike R.",
    currentMembers: 2,
    maxMembers: 6,
    timeRemaining: "15 min",
    estimatedSavings: 3.80,
    deliveryLocation: "Library Building",
    distance: "0.6 km"
  }
];

function OrderOptionsModal() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [poolTimeLimit, setPoolTimeLimit] = useState(15);
  const [maxMembers, setMaxMembers] = useState(8);
  const [selectedPool, setSelectedPool] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Sample cart data
  const cartTotal = 42.50;
  const deliveryFee = 5.99;
  const estimatedDeliveryTime = "30-40 min";

  const handleOrderNow = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCreatePool = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleJoinPool = (pool) => {
    setSelectedPool(pool);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedPool(null);
    }, 3000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>How would you like to order?</h2>
          <p style={styles.subtitle}>Choose the best option for your order</p>
        </div>

        {/* Order Summary */}
        <div style={styles.orderSummary}>
          <div style={styles.summaryRow}>
            <span>Order Total</span>
            <span style={styles.boldText}>${cartTotal.toFixed(2)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div style={{...styles.summaryRow, ...styles.totalRow}}>
            <span style={styles.boldText}>Total</span>
            <span style={styles.totalAmount}>${(cartTotal + deliveryFee).toFixed(2)}</span>
          </div>
        </div>

        {/* Options Grid */}
        {!selectedOption && (
          <div style={styles.optionsGrid}>
            {/* Order Now */}
            <div 
              style={styles.optionCard}
              onClick={() => setSelectedOption('now')}
            >
              <div style={styles.optionIcon}>
                <Zap size={32} color="#2563eb" />
              </div>
              <h3 style={styles.optionTitle}>Order Now</h3>
              <p style={styles.optionDescription}>
                Place your order immediately and get it delivered solo
              </p>
              <div style={styles.optionBadge}>
                <Clock size={16} />
                <span>{estimatedDeliveryTime}</span>
              </div>
              <div style={styles.optionDetails}>
                <div>Full delivery fee: ${deliveryFee.toFixed(2)}</div>
              </div>
              <button style={styles.optionButton}>
                Order Now
              </button>
            </div>

            {/* Create Pool */}
            <div 
              style={{...styles.optionCard, ...styles.recommendedCard}}
              onClick={() => setSelectedOption('create')}
            >
              <div style={styles.recommendedBadge}>
                Recommended
              </div>
              <div style={styles.optionIcon}>
                <Users size={32} color="#059669" />
              </div>
              <h3 style={styles.optionTitle}>Create a Pool</h3>
              <p style={styles.optionDescription}>
                Start a new pool and save money when others join
              </p>
              <div style={styles.optionBadge}>
                <TrendingDown size={16} />
                <span>Save up to 80%</span>
              </div>
              <div style={styles.optionDetails}>
                <div>Set time limit for others to join</div>
                <div>Split delivery costs</div>
              </div>
              <button style={{...styles.optionButton, ...styles.createButton}}>
                Create Pool
              </button>
            </div>

            {/* Join Pool */}
            <div 
              style={styles.optionCard}
              onClick={() => setSelectedOption('join')}
            >
              <div style={styles.optionIcon}>
                <MapPin size={32} color="#7c3aed" />
              </div>
              <h3 style={styles.optionTitle}>Join a Pool</h3>
              <p style={styles.optionDescription}>
                Join an existing pool nearby and save instantly
              </p>
              <div style={styles.optionBadge}>
                <Users size={16} />
                <span>{nearbyPools.length} pools nearby</span>
              </div>
              <div style={styles.optionDetails}>
                <div>Instant savings</div>
                <div>Meet new people</div>
              </div>
              <button style={{...styles.optionButton, ...styles.joinButton}}>
                Browse Pools
              </button>
            </div>
          </div>
        )}

        {/* Order Now Confirmation */}
        {selectedOption === 'now' && !showSuccess && (
          <div style={styles.detailView}>
            <button style={styles.backButton} onClick={() => setSelectedOption(null)}>
              ← Back to options
            </button>
            
            <div style={styles.confirmCard}>
              <Zap size={48} color="#2563eb" style={{marginBottom: '16px'}} />
              <h3 style={styles.confirmTitle}>Confirm Immediate Order</h3>
              <p style={styles.confirmText}>
                Your order will be placed right away and delivered to your location.
              </p>
              
              <div style={styles.confirmDetails}>
                <div style={styles.confirmRow}>
                  <span>Estimated Delivery</span>
                  <span style={styles.boldText}>{estimatedDeliveryTime}</span>
                </div>
                <div style={styles.confirmRow}>
                  <span>Total Amount</span>
                  <span style={styles.boldText}>${(cartTotal + deliveryFee).toFixed(2)}</span>
                </div>
              </div>

              <button style={styles.confirmButton} onClick={handleOrderNow}>
                Confirm & Place Order
              </button>
            </div>
          </div>
        )}

        {/* Create Pool Configuration */}
        {selectedOption === 'create' && !showSuccess && (
          <div style={styles.detailView}>
            <button style={styles.backButton} onClick={() => setSelectedOption(null)}>
              ← Back to options
            </button>
            
            <div style={styles.confirmCard}>
              <Users size={48} color="#059669" style={{marginBottom: '16px'}} />
              <h3 style={styles.confirmTitle}>Configure Your Pool</h3>
              <p style={styles.confirmText}>
                Set parameters for your pool. If no one joins within the time limit, your order will be placed automatically.
              </p>
              
              <div style={styles.configSection}>
                <label style={styles.label}>
                  Time Limit
                  <span style={styles.labelHelper}>How long to wait for others?</span>
                </label>
                <div style={styles.sliderContainer}>
                  <input 
                    type="range" 
                    min="5" 
                    max="30" 
                    step="5"
                    value={poolTimeLimit}
                    onChange={(e) => setPoolTimeLimit(parseInt(e.target.value))}
                    style={styles.slider}
                  />
                  <div style={styles.sliderValue}>
                    <Clock size={16} />
                    <span>{poolTimeLimit} minutes</span>
                  </div>
                </div>
              </div>

              <div style={styles.configSection}>
                <label style={styles.label}>
                  Maximum Members
                  <span style={styles.labelHelper}>Cap the pool size</span>
                </label>
                <div style={styles.sliderContainer}>
                  <input 
                    type="range" 
                    min="2" 
                    max="15" 
                    step="1"
                    value={maxMembers}
                    onChange={(e) => setMaxMembers(parseInt(e.target.value))}
                    style={styles.slider}
                  />
                  <div style={styles.sliderValue}>
                    <Users size={16} />
                    <span>{maxMembers} people</span>
                  </div>
                </div>
              </div>

              <div style={styles.savingsEstimate}>
                <Leaf size={20} color="#059669" />
                <div>
                  <div style={styles.savingsTitle}>Estimated Savings</div>
                  <div style={styles.savingsAmount}>
                    ${(deliveryFee * 0.75).toFixed(2)} - ${(deliveryFee * 0.9).toFixed(2)}
                  </div>
                  <div style={styles.savingsNote}>Based on 3-5 members joining</div>
                </div>
              </div>

              <button style={{...styles.confirmButton, backgroundColor: '#059669'}} onClick={handleCreatePool}>
                Create Pool & Wait
              </button>
            </div>
          </div>
        )}

        {/* Join Pool - Browse Pools */}
        {selectedOption === 'join' && !showSuccess && (
          <div style={styles.detailView}>
            <button style={styles.backButton} onClick={() => setSelectedOption(null)}>
              ← Back to options
            </button>
            
            <h3 style={styles.sectionTitle}>Available Pools Nearby</h3>
            <p style={styles.sectionSubtitle}>Join a pool and save on delivery costs instantly</p>

            <div style={styles.poolsList}>
              {nearbyPools.map(pool => (
                <div key={pool.id} style={styles.poolCard}>
                  <div style={styles.poolHeader}>
                    <div style={styles.poolRestaurant}>
                      <span style={styles.restaurantEmoji}>{pool.restaurantEmoji}</span>
                      <div>
                        <div style={styles.poolRestaurantName}>{pool.restaurantName}</div>
                        <div style={styles.poolOrganizer}>by {pool.organizerName}</div>
                      </div>
                    </div>
                    <div style={styles.timeRemaining}>
                      <Clock size={16} />
                      <span>{pool.timeRemaining}</span>
                    </div>
                  </div>

                  <div style={styles.poolStats}>
                    <div style={styles.poolStat}>
                      <Users size={16} color="#6b7280" />
                      <span>{pool.currentMembers}/{pool.maxMembers} members</span>
                    </div>
                    <div style={styles.poolStat}>
                      <MapPin size={16} color="#6b7280" />
                      <span>{pool.distance}</span>
                    </div>
                  </div>

                  <div style={styles.poolLocation}>
                    <MapPin size={14} />
                    <span>{pool.deliveryLocation}</span>
                  </div>

                  <div style={styles.poolSavings}>
                    <TrendingDown size={18} color="#059669" />
                    <span>Save ${pool.estimatedSavings.toFixed(2)} on delivery</span>
                  </div>

                  <button 
                    style={styles.joinPoolButton}
                    onClick={() => handleJoinPool(pool)}
                  >
                    Join This Pool
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div style={styles.successOverlay}>
            <div style={styles.successCard}>
              <div style={styles.successIcon}>✓</div>
              <h3 style={styles.successTitle}>
                {selectedOption === 'now' && 'Order Placed Successfully!'}
                {selectedOption === 'create' && 'Pool Created!'}
                {selectedOption === 'join' && 'Joined Pool Successfully!'}
              </h3>
              <p style={styles.successText}>
                {selectedOption === 'now' && 'Your order is being prepared and will be delivered soon.'}
                {selectedOption === 'create' && `Waiting for others to join. Order will auto-place in ${poolTimeLimit} min.`}
                {selectedOption === 'join' && 'You\'re now part of this pool. Order will be placed when ready.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #e0f2fe, #dbeafe)',
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  modal: {
    width: '100%',
    maxWidth: '1200px',
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
    overflow: 'hidden'
  },
  header: {
    padding: '32px',
    borderBottom: '1px solid #e5e7eb',
    textAlign: 'center'
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: '0 0 8px 0'
  },
  subtitle: {
    fontSize: '16px',
    color: '#6b7280',
    margin: 0
  },
  orderSummary: {
    padding: '24px 32px',
    background: '#f9fafb',
    borderBottom: '1px solid #e5e7eb'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    fontSize: '16px',
    color: '#4b5563'
  },
  totalRow: {
    paddingTop: '12px',
    borderTop: '2px solid #d1d5db',
    marginTop: '8px',
    marginBottom: 0
  },
  boldText: {
    fontWeight: '600',
    color: '#1f2937'
  },
  totalAmount: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2563eb'
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    padding: '32px'
  },
  optionCard: {
    background: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    padding: '24px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    position: 'relative',
    ':hover': {
      borderColor: '#2563eb',
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 20px rgba(37,99,235,0.15)'
    }
  },
  recommendedCard: {
    borderColor: '#059669',
    background: 'linear-gradient(to bottom, #d1fae5, white)'
  },
  recommendedBadge: {
    position: 'absolute',
    top: '-12px',
    right: '24px',
    background: '#059669',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600'
  },
  optionIcon: {
    marginBottom: '16px'
  },
  optionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px'
  },
  optionDescription: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '16px',
    lineHeight: '1.5'
  },
  optionBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: '#f3f4f6',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    color: '#4b5563',
    marginBottom: '16px'
  },
  optionDetails: {
    fontSize: '13px',
    color: '#6b7280',
    marginBottom: '20px',
    lineHeight: '1.8'
  },
  optionButton: {
    width: '100%',
    background: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s'
  },
  createButton: {
    background: '#059669'
  },
  joinButton: {
    background: '#7c3aed'
  },
  detailView: {
    padding: '32px'
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#2563eb',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '24px',
    fontWeight: '500'
  },
  confirmCard: {
    background: '#f9fafb',
    borderRadius: '12px',
    padding: '32px',
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto'
  },
  confirmTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '12px'
  },
  confirmText: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '24px',
    lineHeight: '1.6'
  },
  confirmDetails: {
    background: 'white',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '24px'
  },
  confirmRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    fontSize: '16px',
    color: '#4b5563'
  },
  confirmButton: {
    width: '100%',
    background: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '16px',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s'
  },
  configSection: {
    marginBottom: '24px',
    textAlign: 'left'
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '12px'
  },
  labelHelper: {
    fontSize: '13px',
    fontWeight: '400',
    color: '#6b7280'
  },
  sliderContainer: {
    background: 'white',
    padding: '16px',
    borderRadius: '8px'
  },
  slider: {
    width: '100%',
    height: '6px',
    borderRadius: '3px',
    outline: 'none',
    marginBottom: '12px'
  },
  sliderValue: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#059669'
  },
  savingsEstimate: {
    display: 'flex',
    gap: '16px',
    background: '#d1fae5',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '24px',
    textAlign: 'left'
  },
  savingsTitle: {
    fontSize: '14px',
    color: '#065f46',
    marginBottom: '4px'
  },
  savingsAmount: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: '4px'
  },
  savingsNote: {
    fontSize: '12px',
    color: '#047857'
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px'
  },
  sectionSubtitle: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '24px'
  },
  poolsList: {
    display: 'grid',
    gap: '16px'
  },
  poolCard: {
    background: '#f9fafb',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    padding: '20px',
    transition: 'all 0.3s'
  },
  poolHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px'
  },
  poolRestaurant: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  restaurantEmoji: {
    fontSize: '40px'
  },
  poolRestaurantName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1f2937'
  },
  poolOrganizer: {
    fontSize: '14px',
    color: '#6b7280'
  },
  timeRemaining: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: '#fef3c7',
    color: '#92400e',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600'
  },
  poolStats: {
    display: 'flex',
    gap: '24px',
    marginBottom: '12px'
  },
  poolStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    color: '#6b7280'
  },
  poolLocation: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '12px'
  },
  poolSavings: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#d1fae5',
    color: '#065f46',
    padding: '10px 16px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    marginBottom: '16px'
  },
  joinPoolButton: {
    width: '100%',
    background: '#7c3aed',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s'
  },
  successOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  successCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '48px',
    textAlign: 'center',
    maxWidth: '400px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
  },
  successIcon: {
    width: '64px',
    height: '64px',
    background: '#d1fae5',
    color: '#059669',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '0 auto 24px'
  },
  successTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '12px'
  },
  successText: {
    fontSize: '16px',
    color: '#6b7280',
    lineHeight: '1.6'
  }
};

export default OrderOptionsModal;