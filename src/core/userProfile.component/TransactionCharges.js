import React from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';

const TransactionCharges = () => {
  const data = [
    { service: 'ATM Withdrawal Fee', chargeType: 'Fixed', amount: '$2.00' },
    { service: 'Foreign Exchange Fee', chargeType: 'Percentage', amount: '2%' },
    { service: 'Overseas ATM Fee', chargeType: 'Fixed', amount: '$3.00' },
  ];

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Transaction Charges</h2>
      <Grid data={data} style={{ height: '400px' }}>
        <GridColumn field="service" title="Service" />
        <GridColumn field="chargeType" title="Charge Type" />
        <GridColumn field="amount" title="Amount/Rate" />
      </Grid>
    </div>
  );
};

export default TransactionCharges;

// In settings.js
import React from 'react';
import TransactionCharges from './TransactionCharges'; // Import the new component

const Settings = () => {
  return (
    <div className="settings-container">
      <h1 className="text-2xl font-bold">Manage Account</h1>
      <div className="fees-section">
        <h2 className="text-xl mb-2">Fees</h2>
        <TransactionCharges /> {/* Integrate new component here */}
      </div>
    </div>
  );
};

export default Settings;
