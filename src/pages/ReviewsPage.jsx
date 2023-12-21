import { useContext, useState, useEffect } from "react";
import { GameContext } from "../context/games.context";
import AllGames from "./AllGames";
import { BACKEND_URL } from "../services/external_urls";
import axios from "axios";
import { Link } from "react-router-dom";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState(null);
  const { games } = useContext(GameContext);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/reviews`);
        console.log(response.data);
        setReviews(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, []);
  // const [reviews, setReviews] = useState(null);

  // const findGame = (gameId) => {
  //   return games.find(game => game.id === gameId);
  // };

  // const findGameID = findGame()

  // const getReviews = async () => {
  //   try {
  //     const reviewsHERE = await axios.get(
  //       `${BACKEND_URL}/games/${findGameID}?_embed=reviews`
  //     );

  //     setReviews(response.data.reviews);
  //   } catch (error) {
  //     console.log(error);
  //   }};

  //   useEffect(() => {
  //     if (!reviews.length) {
  //       getReview();
  //     } else {
  //       console.log("Review Id ===>", reviews.Id)
  //       let thisReview = reviews.find((review) => review.id === Number(reviews.id));
  //       setReview(thisReview);
  //     }})

  return reviews && games.length ? (
    <div className="Review-Container">
      <div className="card-ReviewContent">
      {reviews.map((review) => {  
        const game = games.find((game) => game.id === review.gameId);
        return (
          <div className="card-Review">
            <img className="IMG-Review" src={game.background_image} alt="game image" />
            <div className="result-reviews">
            <h2>{game.name}</h2>
            <p>{review.review}</p>
            <p>{review.rating}</p>
            <p>{review.date}</p>
            {/* <button className="btn-reviewsLast" href="">Details</button> */}
            <br/>
            <Link to={`/games/details/${game.id}`}><button className="btn-reviewsLast">Details</button></Link>
            </div>
            </div>
        );
      })}
      </div>
    </div>
  ) : (
    <p>Loading recent reviews...</p>
  );
};
export default ReviewsPage;
