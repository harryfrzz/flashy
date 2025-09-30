import { useState } from 'react'
import InputBar from './components/input-bar'
import Topbar from './components/topbar'
import Sidebar from './components/sidebar'
import Welcome from './components/welcome-screen'
import AttachFile from './components/attach-files'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const [isPopupOpen, setPopupOpen] = useState(false)


  const openSidebar = () => {
    setIsSidebarOpen(true)
    setPopupOpen(false)
  }
  const closeSidebar = () => setIsSidebarOpen(false)
  
  const togglePopup = () => setPopupOpen(!isPopupOpen)
  const closePopup = () => setPopupOpen(false)

  return (
    <div onClick={closePopup} className='w-[500px] h-[600px] relative bg-blue-100 overflow-hidden'>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <Topbar onOpenSidebar={openSidebar} />

      <div className='w-full h-full p-5 flex justify-start items-center flex-col gap-4'>
        <Welcome/>
      </div>
      
      <AttachFile isOpen={isPopupOpen}/>
      <InputBar onOpenPopup={togglePopup}/>
    </div>
  )
}

export default App
