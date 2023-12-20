import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../services/external_urls";


// const [isEditing, setIsEditing] = useState(false);  //New for editing
const FormGameReview = ({ gameId, setReviews }) => {
  const [review, setReview] = useState({review: "", rating: 0, date: new Date(Date.now()).toLocaleString(), isEditing: false});
  // const handle

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(BACKEND_URL + "/reviews", { ...review, gameId});

      if(response.status === 200 || response.status === 201){
       setReviews(prev => [...prev, response.data ])
       document.reviewForm.reset()
      }
    } catch (error) {
      console.log(error);
    }

// //edit
//   const editReview = () => {
//     let thisReview = [...review];
//     thisReview[index] = newReview;

//     setTasks(thisRevie);
//     setIsEditing(false);
    
//     //delete
//     const deleteReview = (deleteReview) => {
//       const deleteReview = reviews.filter(review => {
//         return review.review !== deleteReview;
//       });
  
//       setTasks(deleteTasks);
//     };
    
  }
  return (
    <div className="formBOX">
    <div className="form-container">
      <h2>REVIEWS</h2>
      
      <form name="reviewForm" onSubmit={handleSubmit}>
        <label>
          Gamer said your opinion
          <textarea
          onChange={(e) => setReview(prev => ({...prev, review: e.target.value}))}
            className="Game-review"
            name="review"
            rows="4"
            cols="50"
          ></textarea>
        </label>

        <div className="reviewBOX">
          <label>
            Rating
            <select name="program" onChange={(e) => setReview(prev =>( {...prev, rating: e.target.value}))}>
              <option value="⭐">⭐</option>
              <option value="⭐⭐">⭐⭐</option>
              <option value="⭐⭐⭐">⭐⭐⭐</option>
              <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
              <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
            </select>
          </label>
        </div>

        <button type="submit" value="Submit">
          level UP
        </button>
      </form>
    </div>
   </div>
  );
};

export default FormGameReview;
