import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const LanguageDropDown: React.FC = () => {
    const router = useRouter();
    const { locale, pathname, asPath, query } = router;
    const { t } = useTranslation();

    const handleLanguageChange = (event: { target: { value: string } }) => {
        const newLocale = event.target.value;
        router.push({ pathname, query }, asPath, { locale: newLocale });
    }

    return (
        <>
            <div className="flex flex-row">
                <label className="mr-2">
                    {t("header.languages")}:
                </label>
                <select
                    className="text-black font-sans"
                    value={locale}
                    onChange={handleLanguageChange}>
                    <option value="nl">{t("languages.dutch")}</option>
                    <option value="en">{t("languages.english")}</option>
                    <option value="de">{t("languages.german")}</option>
                    <option value="fr">{t("languages.french")}</option>
                    <option value="jp">{t("languages.japanese")}</option>
                </select>
            </div>
        </>
    );
}

export default LanguageDropDown;