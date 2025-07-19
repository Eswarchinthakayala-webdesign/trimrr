
import { Outlet } from 'react-router-dom'
import Header from '../components/header'
Header
const AppLayout = () => {
  return (
    <div>
        <main className="min-h-screen px-10 pt-4">
            {/* Header */}
            <Header />
    
            <Outlet/>
            {/* Body */}

        </main>

        {/* Footer */}
        <div className="p-10 text-center bg-gray-800 mt-10">
            Made with  ❤️ by Eswar
        </div>
    </div>
  )
}

export default AppLayout