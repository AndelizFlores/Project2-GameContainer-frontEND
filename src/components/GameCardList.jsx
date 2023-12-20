
const GameCardList = ({game}) =>{

          return (
            <div className='AllOverCardList'>
            <div className='CardList'>
            <div className='face front'>
            <img className= 'IMG-gameList'src={game.background_image} alt="game-image"/>
            <h3>{game.name}</h3>
            </div>
            <div className='face back'>
            <h3>{game.name}</h3>
            <p>release date: {game.released}</p>
            <p>metacritic: {game.metacritic}</p>
            <div className='CardLinkDetails'>
              <a href="#">Details</a>
              </div>
            </div>
           </div>
        </div>
                //  <h2>{game.name}</h2>
                //Why cant use GameCardList?
                )
          }
   
  export default GameCardList
  
  
//   return (
//     <div className='GameCard'>
//           <img src={game.background_image} alt="game-image"/>
//           <h3>{game.name}</h3>
//           <p>{game.released}</p>
//           <p>{game.metacritic}</p>
//     </div>
//   )
// }


//ul platform y el platform.name
//short_screenshots y short_screenshots.image
//          <ul></ul>
//<div></div>
//new


          //  <h2>{game.name}</h2>
          //Why cant use GameCardList?