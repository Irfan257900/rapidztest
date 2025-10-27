import React from 'react';
import { lazy } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';

const SupportDashboard = lazy(() => import('./SupportDashboard'));
const TicketDetails = lazy(() => import('./TicketDetails'));
const CreateTicket = lazy(() => import('./CreateTicket'));

export const supportRoutes = [
  { path: '/support', element: <ProtectedRoute><SupportDashboard /></ProtectedRoute> },
  { path: '/support/ticket/:id', element: <ProtectedRoute><TicketDetails /></ProtectedRoute> },
  { path: '/support/create', element: <ProtectedRoute><CreateTicket /></ProtectedRoute> }
];