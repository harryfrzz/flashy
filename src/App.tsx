import { useState } from 'react'
import InputBar from './components/input-bar'
import Topbar from './components/topbar'
import Sidebar from './components/sidebar'
import FlashCard from './components/flash-card'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const openSidebar = () => setIsSidebarOpen(true)
  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <div className='w-[500px] h-[600px] relative bg-blue-100 overflow-hidden'>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <Topbar onOpenSidebar={openSidebar} />

      <div className='w-full h-full p-5 flex justify-start items-center flex-col gap-4'>
        <FlashCard/>
      </div>
      
      <InputBar/>
    </div>
  )
}

export default App
