import { Link } from 'react-router-dom'
import logo from '../assets/logo1.png';

const Navbar = () => {
  return (
    <nav className="Navbar">
       <div className="info-nav">
       <div className="button-nav">

        <button className="button-img">
          <a href='./'>
          <img src={logo} alt="Logo" className="img-logo" />
          </a>
         </button>
       </div>

       <div className="text-nav">
          <span className="text-xl">
          <ul className='list-Nav'>
            <li><Link className="Link1-nav" to='/' >Home</Link></li>
            <li><Link className="Link2-nav" to='/games'>Games</Link></li>
            <li><Link className="Link2-nav" to='/review'>Review</Link></li>
          </ul>
            </span>
       </div>

      </div>
    </nav>
  )
}

export default Navbar

//Darle stylish