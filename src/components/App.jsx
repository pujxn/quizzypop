import { Routes, Route } from "react-router-dom"
import LandingPage from "@/routes/LandingPage";
import Layout from "@/components/Layout";
import GameContainer from "@/routes/GameContainer";
import GamePage from "@/routes/GamePage";
import NotMatch from "@/routes/NotMatch";

const App = () => {
    return (
        <Routes>
            <Route path="/" component={<Layout />}>
                <Route index element={<LandingPage />} />
                <Route path="game" element={<GameContainer />}>
                    <Route path=":slug" element={<GamePage />} />
                </Route>
                <Route path="*" element={<NotMatch />} />
            </Route>
        </Routes >
    )
}

export default App;