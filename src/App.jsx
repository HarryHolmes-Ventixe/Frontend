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


function App() {
  

  return (
    <>
      <Routes>
        <Route element={<PortalLayout />}>
          <Route element={<CenterLayout />}>
            <Route path="/" element={<Navigate to="/events" replace />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />
            <Route path="/events/:id/booking" element={<BookingPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
