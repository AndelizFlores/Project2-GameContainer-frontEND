import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { GameContext } from "../context/games.context";
import coverTAGS from "../assets/coverTAGS.png";
import FormGameReview from "../components/FormGameReview";
import axios from "axios";
import { BACKEND_URL } from "../services/external_urls";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

function GameDetailsPage() {
  // let filtered = searchTerm ? games.filter((game) => game.name.toLowerCase().includes(searchTerm.toLowerCase())) : games

  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [reviewToUpdate, setReviewToUpdate] = useState({
    review: "",
    rating: '⭐',
    date: new Date(Date.now()).toLocaleString(),
    isEditing: false,
  });
  const { gameId } = useParams();

  // const { loading, games, getGames } = useContext(GameContext)
  const { games, getGames } = useContext(GameContext);

  const setIsEditing = (id) => {
    let theseReviews = [...reviews];
    let thisIndex;
    let thisReview = theseReviews.find((review, index) => {
      thisIndex = index;
      return review.id == id;
    });
    thisReview = { ...thisReview, isEditing: true };
    theseReviews[thisIndex] = thisReview;
    setReviews(theseReviews);
    setReviewToUpdate(thisReview);
  };

  const fetchGame = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/games/${gameId}?_embed=reviews`
      );

      setReviews(response.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReview = (id) => {
    axios
      .delete(BACKEND_URL + `/reviews/${id}`)
      .then((response) => {
        console.log("Deleted review ===>", response.data);
        fetchGame();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReviewChange = (e) => {
    setReviewToUpdate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReviewUpdate = (e, i) => {
    e.preventDefault()
    console.log("Updating Review")
    axios.put(BACKEND_URL + `/reviews/${i}`, {...reviewToUpdate, id: gameId, ['isEditing']: false})
    .then((response) => {
        console.log("Updated review ===>", response.data);
        setReviewToUpdate({
          review: "",
          rating: 0,
          date: new Date(Date.now()).toLocaleString(),
          isEditing: false,
        });
        fetchGame();
      })
      .catch((err) => {
        console.log("Review update error");
        console.log("This is the error", err);
      });
  }


  useEffect(() => {
    fetchGame();
  }, [gameId]);

  useEffect(() => {
    console.log("reviewsHERE 👌👌👌👌", reviews);
  }, [reviews]);

  useEffect(() => {
    if (!games.length) {
      getGames();
    } else {
      console.log("Games Id ===>", gameId);
      console.log("Games ===>", games);
      let thisGame = games.find((game) => game.id === Number(gameId));
      setGame(thisGame);

      console.log("This product ===>", thisGame);
    }
  }, [games, gameId]);

  return (
    <div className="GameDetailsPage">
      {game && (
        <div className="details">
          <h3>{game.name}</h3>
          <div className="platform-container">
            {" "}
            {/*need style */}
            {game.platforms.length > 0 && (
              <div className="platform2">
                {game.platforms.map((platform) => {
                  return (
                    <div className="plat-DIV"> {platform.platform.name} </div>
                  );
                })}
              </div>
            )}
          </div>
          <img
            className="bg-detailsGame"
            src={game.background_image}
            alt="game-image"
          />
          <div className="release-esrb-meta-DIV">
            <div>
              <h2>Release date: </h2>
              <p>{game.released}</p>
            </div>
            <div className="details-container">
              <div>
                <h2>ESRB Rating: </h2>
                <p>{game.esrb_rating && game.esrb_rating.name}</p>
              </div>
              <div>
                <h2>Metacritics: </h2>
              </div>
              <p>{game.metacritic}</p>
            </div>
            <div className="screenshot-container">
              {game.short_screenshots.length > 0 && (
                <div className="screenshots">
                  {game.short_screenshots.map((shot) => {
                    return (
                      <img
                        className="screenshot-IMG"
                        src={shot.image}
                        alt="screenshot"
                      />
                    );
                  })}
                </div>
              )}
            </div>
            {/* <div className="genre-container">
              {game.stores.length > 0 && (
                <div className="genre">
                  {game.stores.map((store) => {
                    return <p> {store.store.name} </p>;
                  })}
                </div>
              )}
            </div> */}

            <div className="platform-container">
              {" "}
              {/*requirements*/}
              {game.platforms.length > 0 && (
                <div className="platform">
                  {game.platforms.map((platform) =>
                    platform.platform.name === "PC" &&
                    platform["requirements_en"] ? (
                      <>
                        <h3>Requirement</h3>
                        {/* <p> {platform.platform.name} </p>{" "} */}
                        <div
                          dangerouslySetInnerHTML={{
                            __html: platform["requirements_en"].minimum,
                          }}
                        ></div>
                      </>
                    ) : (
                      <p></p>
                    )
                  )}
                </div>
              )}
            </div>
            {/* <div className="requirement-container">
            {game.platforms.length > 0 && (
              <div className="platform">
                {game.platforms.map((platform) => {
                  return (
                  <p> {platform.platform.name} </p>)
                })}
              </div>
            )}
          </div> */}
            <h3>Store</h3>
            <div className="stores-container">
              {game.stores.length > 0 && (
                <div className="stores">
                  {game.stores.map((store) => {
                    return <div className="store-DIV">{store.store.name}</div>;
                  })}
                </div>
              )}
            </div>
            <h3>Tags</h3>
            <div className="tags-container">
              {game.tags.length > 0 && (
                <div className="tags">
                  {game.tags.map((tag) => {
                    return (
                      <div className="AllTags">
                        <div className="tags1">
                          <div className="tagFace front">
                            <img
                              className="IMG-tag"
                              src={coverTAGS}
                              alt="game-image"
                            />
                            <p> {tag.name} </p>;
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {/* <p>{game.platform.name}</p> //map? DONE*/}
            {/* <p>{game.genres.name}</p> //map? */}
            {/* <p>{game.short_screenshots}</p> //map? DONE*/}
            {/* <p>{game.stores.name}</p> //map? DONE*/}
          </div>
          <div className="FormDIV">
            <FormGameReview gameId={game.id} setReviews={setReviews} />
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                // <p>{review.rating}</p> &&
                <div className="reviews-space">
                  <p>{review.review} </p>
                  <p>rating: {review.rating}</p>
                  <p>{review.date}</p>
                  <p>
                    <span>
                      <CiEdit onClick={() => setIsEditing(review.id)} />
                    </span>{" "}
                    <span>
                      <MdDeleteForever
                        onClick={() => deleteReview(review.id)}
                      />
                    </span>
                  </p>
                  <br />
                  {review.isEditing && (
                    <form onSubmit={(e) => handleReviewUpdate(e, review.id)}>
                      <label>
                        Edit Review
                        <input
                          name="review"
                          onChange={handleReviewChange}
                          value={reviewToUpdate.review}
                          type="text"
                          style={{ width: "20vw" }}
                        />
                      </label>
                      <label>
                        Rating
                        <select
                          name="program"
                          onChange={(e) =>
                            setReviewToUpdate((prev) => ({
                              ...prev,
                              ["rating"]: e.target.value,
                            }))
                          }
                        >
                          <option value="rating"></option>
                          <option value="⭐">⭐</option>
                          <option value="⭐⭐">⭐⭐</option>
                          <option value="⭐⭐⭐">⭐⭐⭐</option>
                          <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
                          <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
                        </select>
                      </label>
                      <button  type="submit">Submit</button>
                    </form>
                  )}
                </div>
              ))
            ) : (
              <p>No reviews yet</p>
            )}
          </div>
        </div>
      )}
      <div className="buttonDetailsEND">
        <Link to="/games">
          <button className="button-back"></button>
        </Link>
      </div>
      <div></div>
    </div>
  );
}

export default GameDetailsPage;

//FIX THIS PAGE

//map?

// {const platform = games.map((v) => {
//       return(
//         <p>{game.platform.name}</p>
//               )

// });}
// {const platform = games.map((v) => {
//   return(
//     <p>{game.genres.name}</p>
//   )
// })}
// {const platform = games.map((v) => {
//     return(
//       <p>{game.short_screenshots}</p>
//     )
//   })
//     }
// {const platform = games.map((v) => {
//     return(
//       <p>{game.genres.stores}</p>
//     )
//   })
// }
// </div>

// </div>
