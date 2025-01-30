type CartListProps = {
    cartList: Game[],
    setCartList: React.Dispatch<React.SetStateAction<Game[]>>
}

const CartList: React.FC<CartListProps> = ({ cartList, setCartList }) => {
    const handleAlert = (cartItem: Game) => {
        setCartList(cartList.filter(item => item !== cartItem))
    }

    return (
        <>
            {cartList.map((cartItem) => (
                <div key={cartItem.id} className="border border-gray-300 shadow-lg rounded-md p-4 mb-4 bg-white">
                    <div className="flex justify-end mb-2">
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white rounded-md p-2 flex items-center justify-center"
                            onClick={() => handleAlert(cartItem)}
                        >
                            <img
                                src="/svg/cart/close.svg"
                                alt="Close button"
                                className="w-4 h-4"
                            />
                        </button>
                    </div>
                    <div className="flex flex-row justify-between items-center ">
                        <div className="flex flex-col">
                            <p className="font-semibold text-lg">{cartItem.gameName}</p>
                            <p className="text-green-400 font-semibold">€{cartItem.price.toFixed(2)}</p>
                        </div>
                        <img
                            src={cartItem.imageUrl}
                            alt={cartItem.gameName}
                            className="w-32 h-32 object-cover rounded-md"
                        />

                    </div>
                </div>
            ))}
            <div className="flex justify-center">
                <button className="bg-green-400 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-md border border-green-500">
                    Purchase
                </button>
            </div>
        </>
    );
}

export default CartList;