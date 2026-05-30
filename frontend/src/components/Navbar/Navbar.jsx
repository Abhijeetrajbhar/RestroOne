import { useContext, useEffect, useRef, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({ setShowLogin, searchQuery = "", setSearchQuery = () => {} }) => {

  const [menu, setMenu] = useState("home");
  const [searchOpen, setSearchOpen] = useState(Boolean(searchQuery));
  const searchInputRef = useRef(null);
  const { getTotalCartAmount = () => 0, token = "", setToken = () => {} } = useContext(StoreContext) ?? {};
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/')
  }

  const submitSearch = (event) => {
    event.preventDefault();
    setSearchOpen(true);
    setMenu("dishes");
    navigate('/');
    window.setTimeout(() => {
      document.getElementById('food-display')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }

  const clearSearch = () => {
    setSearchQuery("");
    searchInputRef.current?.focus();
  }

  return (
    <div className='navbar'>
      <Link to='/'><img className='logo' src={assets.logo} alt="" /></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={`${menu === "home" ? "active" : ""}`}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={`${menu === "menu" ? "active" : ""}`}>menu</a>
        <a href='#food-display' onClick={() => setMenu("dishes")} className={`${menu === "dishes" ? "active" : ""}`}>dishes</a>
        <a href='#footer' onClick={() => setMenu("contact")} className={`${menu === "contact" ? "active" : ""}`}>contact us</a>
      </ul>
      <div className="navbar-right">
        <form className={`navbar-search ${searchOpen ? "search-open" : ""}`} onSubmit={submitSearch}>
          <button
            type={searchOpen ? "submit" : "button"}
            className="navbar-icon-button"
            aria-label={searchOpen ? "Search dishes" : "Open search"}
            onClick={() => !searchOpen && setSearchOpen(true)}
          >
            <img src={assets.search_icon} alt="" />
          </button>
          <input
            ref={searchInputRef}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search dishes"
            aria-label="Search dishes"
          />
          {searchQuery ? (
            <button type="button" className="navbar-search-clear" aria-label="Clear search" onClick={clearSearch}>x</button>
          ) : null}
        </form>
        <Link to='/cart' className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="Cart" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>
        {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='navbar-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}> <img src={assets.bag_icon} alt="" /> <p>Orders</p></li>
              <hr />
              <li onClick={logout}> <img src={assets.logout_icon} alt="" /> <p>Logout</p></li> 
            </ul>
          </div>
        }

      </div>
    </div>
  )
}

export default Navbar
