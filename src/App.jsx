import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { GameContext } from "./context/games.context";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AllGames from "./pages/AllGames";
import GameDetailsPage from "./pages/GameDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";

import "./App.css";
import ReviewsPage from "./pages/ReviewsPage";

function App() {
  // const { games } = useContext(GameContext)

  return (
    <>
        <div className="coverIMG">
         <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<AllGames />} />
          <Route path="/games/details/:gameId" element={<GameDetailsPage />} />
          <Route path="/review" element={<ReviewsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* {games.length > 0 &&
        <div>
          {
            games.map((game) => {
              return (
                <h2>{game.name}</h2>
                )
            })
          }
        </div>
      } 
      
      
      <Route path="/games/details/:productId" element={<ProductDetailsPage />} />*/}
      </div>
    </>
  );
}

export default App;
