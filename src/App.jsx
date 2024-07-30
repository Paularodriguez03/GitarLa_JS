import { Header } from "./components/Header";
import { Gitar } from "./components/Gitar";
import useCart from "./hooks/useCart";


function App() {

    const {data, cart, AddToCart, RemoveToCart, IncremetQuantity, DecrementQuantity, ClearCart, isEmpty, cartTotal} = useCart();

    return (
        <>
            <Header
                cart={cart}
                RemoveToCart={RemoveToCart}
                IncremetQuantity={IncremetQuantity}
                DecrementQuantity={DecrementQuantity}
                ClearCart={ClearCart} 
                isEmpty={isEmpty}
                cartTotal={cartTotal}/>
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
