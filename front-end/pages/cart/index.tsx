import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation, UseTranslation } from "next-i18next";
import CartList from "@/components/cartList";
import { useEffect, useState } from "react";
import purchaseService from "@/services/PurchaseService";
import gameService from "@/services/GameService";
const Cart: React.FC = () => {
    const { t } = useTranslation();
    const [cartList, setCartList] = useState<Game[]>([]);

    useEffect(() => {
        setCart();
    }, []);

    const setCart = async () => {
        setCartList(await gameService.getAllGames());
    }

    return (
        <>
            <main className="mx-2 my-6">
                <article className="flex flex-col border border-gray-300 shadow-lg rounded-lg p-8 bg-white w-full">
                    <section id="title" className="mb-4">
                        <h1 className="text-2xl text-center font-bold text-gray-800">
                            {t("shoppingCart.title")}
                        </h1>

                    </section>
                    <hr className="border-gray-300 my-4" />
                    <section>
                        <CartList cartList={cartList} setCartList={setCartList}></CartList>
                    </section>
                </article>
            </main>
        </>
    );
}

export default Cart;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "nl", ["common"])),
        }
    };
};