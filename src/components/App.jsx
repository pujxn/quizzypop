import { Routes, Route } from "react-router-dom"
import LandingPage from "@/routes/LandingPage";
import Layout from "@/components/Layout";
import Game from "@/routes/Game";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<LandingPage />} />
                <Route path="game" element={<Game />} />
            </Route>
        </Routes>
    )
}

export default App;