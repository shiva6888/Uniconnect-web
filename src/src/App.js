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
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import './App.css';
import { AnimatePresence, motion } from 'framer-motion';

function AppContent() {
  const { currentUser, darkMode } = useContext(AppContext);
  const location = useLocation();

  const PrivateRoute = ({ children }) =>
    currentUser ? children : <Navigate to="/login" />;

  const DashboardRoute = () => {
    if (!currentUser) return <Navigate to="/login" />;
    switch (currentUser.profileType) {
      case 'student':
        return <StudentDashboard />;
      case 'eventOrganiser':
        return <EventOrganiserDashboard />;
      case 'accommodationProvider':
        return <AccommodationProviderDashboard />;
      default:
        return <Navigate to="/login" />;
    }
  };

  const pageVariants = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } };
  const pageTransition = { duration: 0.3, ease: 'easeInOut' };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="app-container">
        <Header />
        <main className="content">
          <ErrorBoundaryWrapper>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route
                  path="/login"
                  element={
                    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
                      {currentUser ? <Navigate to="/" /> : <LoginPage />}
                    </motion.div>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
                      {currentUser ? <Navigate to="/" /> : <SignupPage />}
                    </motion.div>
                  }
                />
                <Route
                  path="/otp"
                  element={
                    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
                      <OtpVerification />
                    </motion.div>
                  }
                />
                <Route
                  path="/"
                  element={
                    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
                      <PrivateRoute>
                        <DashboardRoute />
                      </PrivateRoute>
                    </motion.div>
                  }
                />
                <Route
                  path="/feedback"
                  element={
                    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
                      <FeedbackPage />
                    </motion.div>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
                      <PrivateRoute>
                        <UserProfile />
                      </PrivateRoute>
                    </motion.div>
                  }
                />
                <Route
                  path="*"
                  element={
                    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
                      <NotFoundPage />
                    </motion.div>
                  }
                />
              </Routes>
            </AnimatePresence>
          </ErrorBoundaryWrapper>
        </main>
        <Footer />
        <AddItemDialog />
      </div>
    </ThemeProvider>
  );
}

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