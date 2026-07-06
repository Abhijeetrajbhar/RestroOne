import { createContext, useEffect, useState } from "react";
import { menu_list } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext({
    url: "",
    food_list: [],
    foodListError: "",
    menu_list: [],
    cartItems: {},
    addToCart: () => {},
    removeFromCart: () => {},
    getTotalCartAmount: () => 0,
    token: "",
    setToken: () => {},
    refreshFoodList: () => {},
    loadCartData: () => {},
    setCartItems: () => {}
});

const StoreContextProvider = (props) => {

    const productionApiUrl = "https://restroone-wtu6.onrender.com"
    const fallbackApiUrl = import.meta.env.PROD ? productionApiUrl : "http://localhost:4000"
    const configuredApiUrl = (import.meta.env.VITE_API_URL || "").trim()
    const hasPlaceholderApiUrl = configuredApiUrl.includes("your-backend-domain")
    const url = (hasPlaceholderApiUrl || !configuredApiUrl ? fallbackApiUrl : configuredApiUrl).replace(/\/$/, "")
    const [food_list, setFoodList] = useState([]);
    const [foodListError, setFoodListError] = useState("");
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("")


    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            if (response?.data?.success) {
                setFoodList(response.data.data ?? []);
                setFoodListError("");
            }
            else {
                setFoodList([]);
                setFoodListError(response?.data?.message || "Unable to load menu items.");
            }
        } catch (error) {
            setFoodList([]);
            setFoodListError("Unable to load menu items. Please check the backend URL and CORS settings.");
            console.error("Food list fetch failed:", error);
        }
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: token });
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData({ token: localStorage.getItem("token") })
            }
        }
        loadData()
        const refreshOnFocus = () => fetchFoodList();
        window.addEventListener("focus", refreshOnFocus);
        return () => window.removeEventListener("focus", refreshOnFocus);
    }, [])

    const contextValue = {
        url,
        food_list,
        foodListError,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        refreshFoodList: fetchFoodList,
        loadCartData,
        setCartItems
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;
