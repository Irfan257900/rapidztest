import React, { lazy, Suspense } from 'react';
import ProtectedRoute from '../../core/ProtectedRoute';

const HelpCenter = lazy(() => import('./HelpCenter'));

export const helpRoutes = [
  {
    path: '/help',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <HelpCenter />
        </Suspense>
      </ProtectedRoute>
    )
  }
];