import { useRouter } from "next/router";

type ShowGridProps = {
    gameList: Game[]
};

const ShopGrid: React.FC<ShowGridProps> = ({ gameList }) => {
    const router = useRouter();

    const handlePurchase = () => {
        router.push('/cart');
    };

    return (
        <>
            <section id="games" className="grid grid-cols-2 gap-4">
                {gameList.map((game, index) => (
                    <article key={index} className="border border-gray-300 shadow-lg rounded-lg p-4 bg-white">
                        <div className="flex flex-col items-center">
                            <p className="font-semibold text-lg mb-2">{game.gameName}</p>
                            <img
                                src={game.imageUrl}
                                alt={game.gameName}
                                className="border rounded-3xl mb-4 w-48 h-48 object-cover"
                            />
                            <div className="flex flex-col w-full">
                                <div className="flex flex-row justify-between mb-2">
                                    <p className="font-bold">Genres:</p>
                                    <p className="text-lg">{game.genres.join(', ')}</p>
                                </div>
                                <div className="flex justify-between">
                                    <button className=" bg-green-400 hover:bg-green-500 py-2 px-4 rounded-md border border-green-500"
                                        onClick={handlePurchase}>
                                        <img className="w-4 h-4" src="/svg/purchase/cart.svg" alt="Shopping cart" />
                                    </button>
                                    <p className=" text-green-400 font-semibold">€{game.price.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </section >
        </>
    );
};

export default ShopGrid;