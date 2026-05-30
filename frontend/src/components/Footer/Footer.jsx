import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <div className="footer-brand">
                <img src={assets.logo} alt="RestroOne Logo" className="footer-logo" />
            </div>
            <p>RestroOne brings fresh meals from one trusted kitchen straight to your doorstep. Browse the menu, order quickly, and enjoy reliable delivery for breakfast, lunch, dinner, or late-night cravings.</p>
            <div className="footer-highlights">
                <span>Fresh daily</span>
                <span>Fast delivery</span>
                <span>Secure orders</span>
            </div>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>123456789</li>
                <li>contact@restroOne.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2026 (c) RestroOne.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer
