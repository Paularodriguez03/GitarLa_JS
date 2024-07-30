import { Header } from "./components/Header";
import { Gitar } from "./components/Gitar";
import { useState, useEffect } from "react";
import { db } from "./data/db";



function App() {

    const InitialState = () => {
        const local = localStorage.getItem("cart")
        return local ? JSON.parse(localStorage.getItem("cart")) : [];
    }

    const [data] = useState(db);
    const [cart, setCart] = useState(InitialState);

    const maxItems = 5;
    const minItems = 1;

    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const AddToCart = (item) => {
        const itemExist = cart.findIndex(itemCart => itemCart.id === item.id);
        if (itemExist >= 0 ) {
            if (cart[itemExist].quantity >= maxItems) return; 
            const updatedCart = [...cart];
            updatedCart[itemExist].quantity += 1;
            setCart(updatedCart);
        } else {
            item.quantity = 1;
            setCart([...cart, item]);
        }
    }

    const RemoveToCart = (id) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== id));
    };

    const IncremetQuantity = (id) => {
        const find = cart.find(item => item.id === id && item.quantity < maxItems);
        if (find) {
            find.quantity += 1;
            setCart([...cart]);
        }
    }

    const DecrementQuantity = (id) => {
        const find = cart.find(item => item.id === id && item.quantity > minItems);
        if (find) {
            find.quantity -= 1;
            setCart([...cart]);
        }
    }

    const ClearCart = () => {
        setCart([]);
    };

    return (
        <>
            <Header
                cart={cart}
                RemoveToCart={RemoveToCart}
                IncremetQuantity={IncremetQuantity}
                DecrementQuantity={DecrementQuantity}
                ClearCart={ClearCart} />
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {
                        data.map(item => (
                            <Gitar
                                key={item.id}
                                gitar={item}
                                AddToCart={AddToCart}
                            />
                        ))
                    }

                </div>
            </main>
            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>
        </>
    )
}

export default App
