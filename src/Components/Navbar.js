import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='navbar'>
            <h2>Hodowla Yorkland</h2>
            <div className='links'>
                <Link to='/'> Główna </Link>
                <Link to='/Dogs'>Twoje Psy</Link>
                <Link to='/NewDog'>Dodaj</Link>
            </div>
        </div>
    );
}

export default Navbar;