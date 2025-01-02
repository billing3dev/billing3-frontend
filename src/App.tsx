import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import './components/Navbar'
import Index from './pages/Index'
import BaseLayout from './components/BaseLayout'
import Signin from './pages/Signin'

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<BaseLayout />}>
                        <Route path='/' element={<Index />}></Route>
                        <Route path='/auth/signin' element={<Signin />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
