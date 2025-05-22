import { Route, Routes } from 'react-router-dom'
import './assets/CSS/main.css'
import CenterLayout from './assets/layouts/CenterLayout.jsx'
import PortalLayout from './assets/layouts/PortalLayout.jsx'
import Events from './assets/pages/EventsPage.jsx'
import EventDetails from './assets/pages/EventDetailsPage.jsx'
import Booking from './assets/pages/BookingPage.jsx'


function App() {
  

  return (
    <>
      <Routes>
        <Route element={<PortalLayout />}>
          <Route element={<CenterLayout />}>
            {/* <Route path="/" element={<Dashboard/>} /> */}
            {/* <Route path="/events" element={<Events />} /> */}
            <Route path="/" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/events/:id/booking" element={<Booking />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
