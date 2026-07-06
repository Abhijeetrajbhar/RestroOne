import logo from './restroone-logo.svg'
import add_icon from './add_icon.png'
import order_icon from './order_icon.png'
import profile_image from './profile_image.png'
import upload_area from './upload_area.png'
import parcel_icon from './parcel_icon.png'

export const assets ={
    logo,
    add_icon,
    order_icon,
    profile_image,
    upload_area,
    parcel_icon
}

const productionApiUrl = 'https://restroone-wtu6.onrender.com'
const fallbackApiUrl = import.meta.env.PROD ? productionApiUrl : 'http://localhost:4000'

const configuredApiUrl = (import.meta.env.VITE_API_URL || '').trim()
const hasPlaceholderApiUrl = configuredApiUrl.includes('your-backend-domain')

export const url = (hasPlaceholderApiUrl || !configuredApiUrl ? fallbackApiUrl : configuredApiUrl).replace(/\/$/, '')
