import { Route, Routes } from 'react-router-dom'
import './assets/CSS/main.css'
import CenterLayout from './assets/layouts/CenterLayout.jsx'
import PortalLayout from './assets/layouts/PortalLayout.jsx'
import Events from './assets/pages/Events.jsx'


function App() {
  

  return (
    <>
      <Routes>
        <Route element={<PortalLayout />}>
          <Route element={<CenterLayout />}>
            <Route path="/" element={<Events/>} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
