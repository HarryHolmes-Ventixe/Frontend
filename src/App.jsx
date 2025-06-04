import { Navigate, Route, Routes } from 'react-router-dom'
import './assets/CSS/main.css'
import CenterLayout from './assets/layouts/CenterLayout.jsx'
import PortalLayout from './assets/layouts/PortalLayout.jsx'
import EventsPage from './assets/pages/EventsPage.jsx'
import EventDetailsPage from './assets/pages/EventDetailsPage.jsx'
import BookingPage from './assets/pages/BookingPage.jsx'
import SignInPage from './assets/pages/SignInPage.jsx'
import SignUpPage from './assets/pages/SignUpPage.jsx'
import DashboardPage from './assets/pages/DashboardPage.jsx'
import VerificationPage from './assets/pages/VerificationPage.jsx'
import { AuthProvider } from './assets/contexts/AuthContext.jsx'
import BookingConfirmationPage from './assets/pages/BookingConfirmationPage.jsx'


function App() {
  

  return (
    <>
    <AuthProvider>
      <Routes>
        <Route element={<PortalLayout />}>
          <Route element={<CenterLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />
            <Route path="/events/:id/booking" element={<BookingPage />} />
            <Route path="/booking-confirmation/:id" element={<BookingConfirmationPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/verification" element={<VerificationPage />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
    </>
  )
}

export default App
