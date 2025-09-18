import InputBar from './components/input-bar'

function App() {

  return (
    <div className='w-96 h-96 relative bg-black'>
      <div className='w-full h-full'>
        {/* Main content area */}
        <div className='pb-20 p-4'>
          <h1 className='text-white text-xl mb-4'>Meeting Assistant</h1>
        </div>
      </div>
      <InputBar/>
    </div>
  )
}

export default App
