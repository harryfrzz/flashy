import { useState } from 'react'
import InputBar from './components/input-bar'
import Topbar from './components/topbar'
import Sidebar from './components/sidebar'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const openSidebar = () => setIsSidebarOpen(true)
  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <div className='w-[500px] h-[600px] relative bg-black overflow-hidden'>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <div className='w-full h-full'>
        <Topbar onOpenSidebar={openSidebar} />
      </div>
      
      <InputBar/>
    </div>
  )
}

export default App
