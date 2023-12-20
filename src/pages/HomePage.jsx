import GameCard from "../components/GameCardList"
import logo from '../assets/logo1.png';
import { Link } from "react-router-dom";
import FormGameReview from "../components/FormGameReview";


const HomePage = () => {
  return (
    
    <div className="top-homepage">
      <div className="HomePage">
      <h1>Games Review <img src={logo} alt="Logo" className="img-homepage" /></h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas arcu sed blandit tincidunt. Pellentesque a elit porttitor, semper nibh in, tempor libero. Ut viverra non mauris eu ultricies. Duis aliquet vitae nunc ac molestie. Morbi viverra lectus sed velit finibus, a blandit velit pulvinar. Donec enim diam, suscipit ut erat id, laoreet semper nisl. Quisque vitae feugiat nibh.</p> 
      <br />
      <Link to='/games'><button className="button-homepage" ></button></Link> {/*DONT WORK*/}
        {/* {GameCard} */}
      </div>
      <div className="HomePage">

      </div>
    </div>
  )
}

export default HomePage

//Aqui van los reviews.
//Quiero tambien unas tarjetas con los video games

//Check the homepage button.