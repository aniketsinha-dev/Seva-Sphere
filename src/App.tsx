import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { DemoControls } from './components/common/DemoControls';

// Pages
import { Landing } from './pages/Landing';
import { RoleSelection } from './pages/RoleSelection';
import { CustomerHome } from './pages/customer/CustomerHome';
import { RequestService } from './pages/customer/RequestService';
import { Matching } from './pages/customer/Matching';
import { BookingStatus } from './pages/customer/BookingStatus';
import { WorkerDashboard } from './pages/worker/WorkerDashboard';
import { CooperativeDashboard } from './pages/cooperative/CooperativeDashboard';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-brand-500 selection:text-white">
          <Navbar />

          <main className="flex-1">
            <Routes>
              {/* Home & Roles */}
              <Route path="/" element={<Landing />} />
              <Route path="/role-selection" element={<RoleSelection />} />

              {/* Customer Flow */}
              <Route path="/customer" element={<CustomerHome />} />
              <Route path="/customer/request" element={<RequestService />} />
              <Route path="/customer/matching" element={<Matching />} />
              <Route path="/customer/booking" element={<BookingStatus />} />
              <Route path="/customer/status" element={<BookingStatus />} />

              {/* Worker Flow */}
              <Route path="/worker" element={<WorkerDashboard />} />
              <Route path="/worker/jobs" element={<WorkerDashboard />} />

              {/* Cooperative Flow */}
              <Route path="/cooperative" element={<CooperativeDashboard />} />
              <Route path="/cooperative/workers" element={<CooperativeDashboard />} />
              <Route path="/cooperative/analytics" element={<CooperativeDashboard />} />

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Interactive Hackathon Demo Controls Toolbar */}
          <DemoControls />
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
