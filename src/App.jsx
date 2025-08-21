import { BrowserRouter, Route, Routes, useLocation, useParams } from "react-router-dom"
import Login from "./components/Login"
import Home from "./components/Home"
import Signup from "./components/Signup"
import Protectedroute from "./components/Protectedroute"

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
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App