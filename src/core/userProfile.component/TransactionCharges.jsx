import React from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';

const TransactionCharges = () => {
  const transactionData = [
    { service: 'ATM Withdrawal', chargeType: 'Fixed', amount: '$2.50' },
    { service: 'Foreign Exchange', chargeType: 'Percentage', amount: '1.5%' },
    { service: 'Wire Transfer', chargeType: 'Fixed', amount: '$15.00' },
  ];

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Transaction Charges</h2>
      <Grid data={transactionData} style={{ height: '400px' }}>
        <GridColumn field="service" title="Service" />
        <GridColumn field="chargeType" title="Charge Type" />
        <GridColumn field="amount" title="Amount/Rate" />
      </Grid>
    </div>
  );
};

export default TransactionCharges;