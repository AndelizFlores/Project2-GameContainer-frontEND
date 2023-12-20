import { useContext, useState, useEffect } from "react";
import { GameContext } from "../context/games.context";
import AllGames from "./AllGames";


const ReviewsPage = () => {


  const { games } = useContext(GameContext);
  const [reviews, setReviews] = useState(null);

  const findGame = (gameId) => {
    return games.find(game => game.id === gameId);
  };

  const findGameID = findGame()

  const getReviews = async () => {
    try {
      const reviewsHERE = await axios.get(
        `${BACKEND_URL}/games/${findGameID}?_embed=reviews`
      );

      setReviews(response.data.reviews);
    } catch (error) {
      console.log(error);
    }}};

    useEffect(() => {
      if (!reviews.length) {
        getReview();
      } else {
        console.log("Review Id ===>", reviews.Id)
        let thisReview = reviews.find((review) => review.id === Number(reviews.id));
        setReview(thisReview);
      }})

return (
          <div className="Review-Container">
          <div className="card-Review">
            {/* {findGameID ? (
              <> */}
                <img
                  className="IMG-Review"
                  src={game.background_image}
                  alt="game-image"
                />
                <div className="card-ReviewContent">
                  <h3>{game.name}</h3>
                </div>
              {/* </> */}
            {/* ) : (
              <p>'Item not found'</p>
            )} */}
      
            {findReview.length > 0 && (
              <div className="result-reviews">
                {findReview.map((review) => (
                  <div key={review.id}>
                    <p>{review.review}</p>
                    <p>{review.rating}</p>
                    <p>{review.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );

  export default ReviewsPage;



// const ReviewContext = createContext()

// const ReviewProvider = ({children}) => {

//     const [games, setGames] = useState([])

//     const getReviews = () => {
      
//         axios.get(BACKEND_URL + '/reviews').then((response) => {
            
//                 setGames(response.data) 
//                 console.log("length of games array", response.data.length)
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//     }

//     useEffect(() => {
//         getReviews()
//     }, [])


//     return (
//         <ReviewContext.Provider value={{ //</div>//reviews, getReviews }}>
//             {children}
//         </ReviewContext.Provider>)
// }

// const { games, getGames } = useContext(GameContext);


  
// let filtered = searchTerm
//   ? games.filter((game) =>
//       game.name.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   : games;

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (searchTerm && filtered.length < 1) {
//     console.log("No matching games!!!!")
//     axios.get(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_KEY}&search=${searchTerm}&search_exact=true`)
//       .then(async (response) => {
//         console.log("Search results ===>", response.data.results)
//         let gameIds = games.map((game) => game.id)
//         let newGames = response.data.results

//         let filteredGames = newGames.filter((game) => gameIds.indexOf(game.id) < 0)
            
//         console.log("New games ===>", filteredGames.length, newGames.length, filteredGames.map((game) => game.id), gameIds)

//         let gamePromises = filteredGames.map((game) => axios.post(BACKEND_URL + '/games', game))

//         let gameResults = await Promise.allSettled(gamePromises).then(() => getGames())
//         // console.log("Game Results", gameResults.length ? gameResults.length : 'no results')
//         // getGames()
//       })
//       .catch((err) => {
//         console.log(err)
//       })
    
//   }
//   console.log("Searching...");
// };

// {findG && findG.length > 0 && (
//   <div className="ReviewlistC">
//     {filtered.map((game) => {
//       return (
//         <div className="Review-Container">
//         <div className="card-Review">
//               <img
//                 className="IMG-Review"
//                 src={game.background_image}
//                 alt="game-image">
//               </img>
//               <div className="card-ReviewContent">
//               <h3>{game.name}</h3>
//               <p>{review.review}</p>
//               <p>{review.rating}</p>
//               <p>{review.date}</p>
//               </div>
//         </div>
//       </div>