import { useTranslation } from "next-i18next";
import Link from "next/link";

const Footer: React.FC<{ loggedInUser: User | null }> = ({ loggedInUser }) => {
    const { t } = useTranslation();

    return (
        <>
            <footer className="w-full bg-gray-900 shadow-md relative bottom-0 p-7">
                <div className="flex items-center justify-evenly text-white font-semibold mt-2">
                    <div className="flex flex-col">
                        <h2>Links:</h2>
                        <Link href="/" className="hover:underline">{t("home.title")}</Link>
                        <Link href="/news" className="hover:underline">{t("news.title")}</Link>
                        <Link href="/store" className="hover:underline">{t("store.title")}</Link>
                        {loggedInUser &&
                            <Link href="/purchaseHistory">{t("purchase_history.title")}</Link>
                        }
                    </div>
                    <div className="flex flex-col">
                        <h2>Extra Links:</h2>
                        <Link href="/about" className="hover:underline">{t("about.title")}</Link>
                        <Link href="/contact" className="hover:underline">{t("contact.title")}</Link>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;