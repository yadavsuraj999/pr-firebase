import { BrowserRouter, Route, Routes, useLocation, useParams } from "react-router-dom"
import Login from "./components/Login"
import Home from "./components/Dashboard"
import Signup from "./components/Signup"
import Protectedroute from "./components/Protectedroute"
import ErrorPage from "./components/ErrorPage"
import { ToastContainer } from "react-toastify"

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={
                        <Protectedroute>
                            <Home />
                        </Protectedroute>
                    } />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
                <ToastContainer/>
            </BrowserRouter>
        </div>
    )
}

export default App