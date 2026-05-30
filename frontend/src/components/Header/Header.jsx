import './Header.css'
import { assets } from '../../assets/assets'

const Header = () => {
    return (
        <div className='header'>
            <img className='header-image' src={assets.header_img} alt="Fresh RestroOne dishes" />
            <div className="header-shade"></div>
            <div className='header-contents'>
                <span className="header-kicker">Fresh from our kitchen</span>
                <h2>Fresh meals from RestroOne, delivered fast</h2>
                <p>Choose from a curated single-vendor menu crafted with fresh ingredients, reliable preparation, and quick doorstep delivery for every craving.</p>
                <div className="header-actions">
                    <a href="#explore-menu" className="header-action">View Menu</a>
                    <span className="header-note">30 min delivery</span>
                </div>
            </div>
        </div>
    )
}

export default Header
