import ShopGrid from "@/components/shopGrid";
import gameService from "@/services/GameService";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";


const Store: React.FC = () => {
    const { t } = useTranslation();
    const [gameList, setGameList] = useState<Game[]>([]);

    useEffect(() => {
        setGames()
    }, []);

    const setGames = async () => {
        const data = await gameService.getAllGames();
        setGameList(data);
    }

    return (
        <>
            <main className="mx-2 my-6">
                <article className="flex flex-col border border-gray-300 shadow-lg rounded-lg p-8 bg-white w-full">
                    <section id="title" className="mb-4">
                        <h1 className="text-2xl text-center font-bold text-gray-800">
                            {t("store.title")}
                        </h1>
                    </section>
                    <hr className="border-gray-300 my-4" />
                    <ShopGrid gameList={gameList}></ShopGrid>
                </article>
            </main >
        </>
    );
}
export default Store;
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "nl", ["common"])),
        }
    };
};