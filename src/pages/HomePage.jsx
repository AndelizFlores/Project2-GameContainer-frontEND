import GameCard from "../components/GameCardList"
import logo from '../assets/logo1.png';
import { Link } from "react-router-dom";
import FormGameReview from "../components/FormGameReview";


const HomePage = () => {
  return (
    
    <div className="top-homepage">
      <div className="HomePage">
      <h1>GG Reviews <img src={logo} alt="Logo" className="img-homepage" /></h1>
      <h2><span>vid·e·o game</span></h2>
      <h3>/ˈvidēō ˌɡām/</h3>
      <h4><i>noun</i></h4>
      <h4><i>plural noun: videogames</i></h4>
      <p>Any of various interactive games played using a specialized electronic gaming device or a computer or mobile device and a television or other display screen, along with a means to control graphic images. Any of various games played using a microchip-controlled device, as an arcade machine or handheld toy.</p> 
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