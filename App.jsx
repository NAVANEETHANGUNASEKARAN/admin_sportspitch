* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Responsive Booking Cards for Mobile */
@media (max-width: 768px) {
  .admin-table {
    display: none;
  }
  
  .admin-booking-cards {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .admin-booking-card {
    background: white;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
  }
  
  .admin-booking-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid #eee;
  }
  
  .admin-booking-card-customer {
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }
  
  .admin-booking-card-status {
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    color: white;
  }
  
  .admin-booking-card-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;
  }
  
  .admin-booking-card-detail {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
  
  .admin-booking-card-label {
    color: #666;
    font-weight: 500;
  }
  
  .admin-booking-card-value {
    color: #333;
    font-weight: 600;
  }
  
  .admin-booking-card-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    padding-top: 12px;
    border-top: 1px solid #eee;
  }
  
  .admin-booking-card-actions button {
    flex: 1;
    min-width: 80px;
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    color: white;
    transition: transform 0.2s ease;
  }
  
  .admin-booking-card-actions button:hover {
    transform: translateY(-2px);
  }
  
  .admin-booking-card-actions button:active {
    transform: translateY(0);
  }
}

@media (min-width: 769px) {
  .admin-booking-cards {
    display: none;
  }
  
  .admin-payment-cards {
    display: none;
  }
}

/* Responsive Payment Cards for Mobile */
@media (max-width: 768px) {
  .admin-payment-cards {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .admin-payment-card {
    background: white;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
  }
  
  .admin-payment-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid #eee;
  }
  
  .admin-payment-card-customer {
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }
  
  .admin-payment-card-status {
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    color: white;
  }
  
  .admin-payment-card-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;
  }
  
  .admin-payment-card-detail {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
  
  .admin-payment-card-label {
    color: #666;
    font-weight: 500;
  }
  
  .admin-payment-card-value {
    color: #333;
    font-weight: 600;
  }
  
  .admin-payment-card-amount {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }
  
  .admin-payment-card-amount input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .admin-payment-card-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    padding-top: 12px;
    border-top: 1px solid #eee;
  }
  
  .admin-payment-card-actions button {
    flex: 1;
    min-width: 80px;
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    color: white;
    transition: transform 0.2s ease;
  }
  
  .admin-payment-card-actions button:hover {
    transform: translateY(-2px);
  }
  
  .admin-payment-card-actions button:active {
    transform: translateY(0);
  }
}

/* ==========================================================================
   Fee Collection (Payments) page — modern dashboard styling
   ========================================================================== */

/* Summary cards */
.fee-summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
  margin-bottom: 24px;
}

.fee-summary-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.06), 0 1px 2px rgba(16, 24, 40, 0.04);
  border: 1px solid #eef0f4;
  border-left: 4px solid var(--accent, #0d6efd);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.fee-summary-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(16, 24, 40, 0.08);
}

.fee-summary-icon {
  width: 46px;
  height: 46px;
  min-width: 46px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fee-summary-label {
  color: #8a91a8;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.fee-summary-value {
  color: #1a2035;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.3;
}

.fee-summary-sublabel {
  color: #a3a9bd;
  font-size: 12px;
  margin-top: 2px;
}

/* Toolbar: search + filters */
.fee-toolbar {
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.06);
  border: 1px solid #eef0f4;
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
}

.fee-search-wrap {
  position: relative;
  flex: 1;
  min-width: 240px;
}

.fee-search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #a3a9bd;
  pointer-events: none;
}

.fee-search-input {
  width: 100%;
  padding: 10px 12px 10px 38px;
  border-radius: 8px;
  border: 1px solid #e1e4ea;
  font-size: 14px;
  color: #1a2035;
  background: #f9fafb;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
}

.fee-search-input:focus {
  outline: none;
  border-color: #0d6efd;
  background: white;
  box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.12);
}

.fee-filter-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.fee-select {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #e1e4ea;
  font-size: 14px;
  color: #1a2035;
  background: #f9fafb;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;
}

.fee-select:hover {
  border-color: #c3c9d6;
}

.fee-select:focus {
  outline: none;
  border-color: #0d6efd;
  background: white;
  box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.12);
}

/* Empty state */
.fee-empty-state {
  background-color: white;
  padding: 48px 20px;
  border-radius: 12px;
  text-align: center;
  color: #8a91a8;
  font-size: 14px;
  border: 1px solid #eef0f4;
}

/* Table */
.fee-table-container {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.06);
  border: 1px solid #eef0f4;
  overflow: hidden;
}

.fee-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.fee-table thead tr {
  background-color: #0d6efd;
  background-image: linear-gradient(135deg, #0d6efd, #0b5ed7);
}

.fee-table thead th {
  padding: 14px 16px;
  text-align: left;
  font-weight: 600;
  color: white;
  font-size: 13px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.fee-table thead th.fee-col-right {
  text-align: right;
}

.fee-table tbody td {
  padding: 12px 16px;
  vertical-align: middle;
}

.fee-row {
  border-bottom: 1px solid #f0f1f5;
  transition: background-color 0.12s ease;
}

.fee-row:hover {
  background-color: #f5f8ff;
}

.fee-row:last-child {
  border-bottom: none;
}

.fee-player-name {
  font-weight: 600;
  color: #1a2035;
}

.fee-player-phone {
  color: #8a91a8;
  font-size: 12px;
  margin-top: 2px;
}

.fee-col-right {
  text-align: right;
}

.fee-currency {
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  color: #1a2035;
}

.fee-currency-due {
  color: #c22a2a;
}

.fee-currency-clear {
  color: #1a7f4b;
}

/* Status badges */
.fee-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.01em;
  white-space: nowrap;
}

.fee-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
}

/* Buttons */
.fee-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  color: white;
  transition: transform 0.12s ease, box-shadow 0.12s ease, filter 0.12s ease;
  white-space: nowrap;
}

.fee-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.05);
  box-shadow: 0 4px 10px rgba(16, 24, 40, 0.15);
}

.fee-btn:active {
  transform: translateY(0);
  filter: brightness(0.97);
}

.fee-btn-sm {
  padding: 6px 10px;
  font-size: 12px;
  border-radius: 6px;
}

.fee-actions {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.fee-btn-success { background-color: #1fa855; }
.fee-btn-info { background-color: #0d6efd; }
.fee-btn-danger { background-color: #6c757d; }
.fee-btn-whatsapp { background-color: #25D366; color: #05320f; }
.fee-btn-whatsapp:hover { filter: brightness(0.97); }

/* Mobile payment card badge/status polish (overrides default block-status style) */
.fee-mobile-card .fee-badge {
  font-size: 11px;
  padding: 4px 10px;
}
