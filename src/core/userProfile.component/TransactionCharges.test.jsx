import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionCharges from './TransactionCharges';

describe('TransactionCharges Component', () => {
  test('renders Transaction Charges heading', () => {
    render(<TransactionCharges />);
    const headingElement = screen.getByText(/Transaction Charges/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders transaction data in grid', () => {
    render(<TransactionCharges />);
    const serviceElement = screen.getByText(/ATM Withdrawal/i);
    const chargeTypeElement = screen.getByText(/Fixed/i);
    const amountElement = screen.getByText(/4.50/i);

    expect(serviceElement).toBeInTheDocument();
    expect(chargeTypeElement).toBeInTheDocument();
    expect(amountElement).toBeInTheDocument();
  });
});