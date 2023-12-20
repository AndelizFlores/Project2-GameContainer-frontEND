import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GameContext } from "../context/games.context";
import GameCardList from "../components/GameCardList";
import search from "../assets/searchIMG.png";
import axios from "axios";
import { BACKEND_URL } from "../services/external_urls";

const AllGames = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [allGames, setAllGames] = useState([])

  
  const { games, getGames } = useContext(GameContext);


  
  let filtered = searchTerm
    ? games.filter((game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : games;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm && filtered.length < 1) {
      console.log("No matching games!!!!")
      axios.get(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_KEY}&search=${searchTerm}&search_exact=true`)
        .then(async (response) => {
          console.log("Search results ===>", response.data.results)
          let gameIds = games.map((game) => game.id)
          let newGames = response.data.results

          let filteredGames = newGames.filter((game) => gameIds.indexOf(game.id) < 0)
              
          console.log("New games ===>", filteredGames.length, newGames.length, filteredGames.map((game) => game.id), gameIds)

          let gamePromises = filteredGames.map((game) => axios.post(BACKEND_URL + '/games', game))

          let gameResults = await Promise.allSettled(gamePromises).then(() => getGames())
          // console.log("Game Results", gameResults.length ? gameResults.length : 'no results')
          // getGames()
        })
        .catch((err) => {
          console.log(err)
        })
      
    }
    console.log("Searching...");
  };

  // let filtered = searchTerm
  // ? allGames.filter((game) =>
  //     game.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  // : allGames;

  useEffect(() => {
    console.log(filtered)
    setAllGames(games)
  }, [games])

  return (
    
    <div className="AllGames">
      <div className="search-div">
        <form className="searchContainer" onSubmit={handleSubmit}>
          <input
            value={searchTerm}
            placeholder="Find Game"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <img src={search}></img>
          </button>
        </form>
      </div>
{/* <scroll-container className='scroll-listGames'>
  <scroll-page> */}
      {filtered && filtered.length > 0 && (
        <div className="listGames">
          {filtered.map((game) => {
            return (
              <div className="AllOverCardList">
                <div className="CardList">
                  <div className="face front">
                    <img
                      className="IMG-gameList"
                      src={game.background_image}
                      alt="game-image"
                    />
                    <h3>{game.name}</h3>
                  </div>
                  <div className="face back">
                    <h3>{game.name}</h3>
                    <p>release date: {game.released}</p>
                    <p>metacritic: {game.metacritic}</p>
                    <div className="CardLinkDetails">
                      <Link to={`/games/details/${game.id}`}>Details</Link>
                      {/* <a href="/games/details/:gameId">Details</a> map in the product.id */}
                    </div>
                  </div>
                </div>
              </div>
            
              //  <h2>{game.name}</h2>
              //Why cant use GameCardList?
            );
          })}
        </div>
      )}
      {/* </scroll-page>
      </scroll-container> */}
    </div>
  );
};

export default AllGames;

//    <div className="ProductListPage">

// {loading && <p>Loading...</p>}

// {
//   products.length ?

//   <>
//     {
//       products.map((product) => {
//         return (
//                 <Link key={product.id} to={`/product/details/${product.id}`} >
//                   <ProductCard product={product}/>
//                 </Link>
//                 )
//       })
//     }
//   </>
//   : <p>Loading...</p>
// }

//Aqui va el Game Card

//tendre que hacer más divs

{
  /* <div className='CardList'>
<div className='AllGameslist'>
<img className= 'IMG-gameList'src={game.background_image} alt="game-image"/>
<h3>{game.name}</h3>
<p>{game.released}</p>
<p>{game.metacritic}</p>
</div>
</div> */
}
