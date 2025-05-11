// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AppProvider, AppContext } from './context/AppContext';
import { CommentProvider } from './context/CommentContext';
import { SnackbarProvider } from './components/SnackbarProvider';
import { DialogProvider } from './components/DialogManager';
import { lightTheme, darkTheme } from './theme/theme';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import StudentDashboard from './components/StudentDashboard';
import EventOrganiserDashboard from './components/EventOrganiserDashboard';
import AccommodationProviderDashboard from './components/AccommodationProviderDashboard';
import FeedbackPage from './components/FeedbackPage';
import UserProfile from './components/UserProfile';
import OtpVerification from './components/OtpVerification';
import NotFoundPage from './components/NotFoundPage';
import ErrorBoundaryWrapper from './components/ErrorBoundary';
import AddItemDialog from './components/AddItemDialog';
import './App.css';
import { AnimatePresence, motion } from 'framer-motion';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import CareersPage from './components/CareersPage';
import ReviewPage from './components/ReviewPage';
import HelpPage from './components/HelpPage';
import ChatPage from './components/chat/ChatPage';
import HomePage from './components/HomePage'; // <-- Import the new HomePage
import EventListPage from './components/EventListPage';
import EventRegistrationPage from './components/EventRegistrationPage';

function AppContent() {
  const { currentUser, darkMode } = useContext(AppContext);
  const location = useLocation();

  // Updated PrivateRoute to be more reusable
  const PrivateRoute = ({ children }) => {
    if (!currentUser) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to. This allows us to send them along to that page after they login,
      // which is a nicer user experience than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
  };

  // Specific Dashboard component based on user type
  const DashboardRoute = () => {
    // No need to check currentUser here, PrivateRoute handles it
    switch (currentUser.profileType) {
      case 'student':
        return <StudentDashboard />;
      case 'eventOrganiser':
        return <EventOrganiserDashboard />;
      case 'accommodationProvider':
        return <AccommodationProviderDashboard />;
      default:
        // Should not happen if currentUser is validated, but good practice
        return <Navigate to="/login" />;
    }
  };

  const pageVariants = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } };
  const pageTransition = { duration: 0.3, ease: 'easeInOut' };

  // Helper for animated routes
  const AnimatedRoute = ({ element }) => (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
      {element}
    </motion.div>
  );

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="app-container">
        <Header />
        <main className="content">
          <ErrorBoundaryWrapper>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                {/* --- Public Routes --- */}
                <Route path="/" element={<AnimatedRoute element={<HomePage />} />} />
                <Route path="/aboutus" element={<AnimatedRoute element={<AboutUs />} />} />
                <Route path="/contactus" element={<AnimatedRoute element={<ContactUs />} />} />
                <Route path="/careers" element={<AnimatedRoute element={<CareersPage />} />} />
                <Route path="/reviews" element={<AnimatedRoute element={<ReviewPage />} />} />
                <Route path="/help" element={<AnimatedRoute element={<HelpPage />} />} />
                <Route path="/feedback" element={<AnimatedRoute element={<FeedbackPage />} />} /> {/* Assuming Feedback is public or semi-public */}
                <Route path="/events/:eventId/register" element={<AnimatedRoute element={<EventRegistrationPage />} />} /> {/* Assuming Feedback is public or semi-public */}
                
                {/* --- Auth Routes --- */}
                <Route
                  path="/login"
                  element={<AnimatedRoute element={currentUser ? <Navigate to="/dashboard" /> : <LoginPage />} />}
                />
                <Route
                  path="/signup"
                  element={<AnimatedRoute element={currentUser ? <Navigate to="/dashboard" /> : <SignupPage />} />}
                />
                <Route
                  path="/otp"
                  element={<AnimatedRoute element={<OtpVerification />} />} // Needs logic check: should redirect if no signup payload?
                />

                {/* --- Private Routes --- */}
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <AnimatedRoute element={<DashboardRoute />} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/chat"
                  element={
                    <PrivateRoute>
                      <AnimatedRoute element={<ChatPage />} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/events"
                  element={
                    <PrivateRoute>
                      <AnimatedRoute element={<EventListPage />} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <AnimatedRoute element={<UserProfile />} />
                    </PrivateRoute>
                  }
                />

                {/* --- Not Found Route --- */}
                <Route path="*" element={<AnimatedRoute element={<NotFoundPage />} />} />
              </Routes>
            </AnimatePresence>
          </ErrorBoundaryWrapper>
        </main>
        <Footer />
        {/* Render AddItemDialog only if user is logged in and it's relevant */}
        {currentUser && <AddItemDialog />}
      </div>
    </ThemeProvider>
  );
}

// Keep the App structure the same
function App() {
  return (
    <AppProvider>
      <CommentProvider>
        <SnackbarProvider>
          <DialogProvider>
            <Router>
              <AppContent />
            </Router>
          </DialogProvider>
        </SnackbarProvider>
      </CommentProvider>
    </AppProvider>
  );
}

export default App;
