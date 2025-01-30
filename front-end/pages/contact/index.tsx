import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Contact: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <main className="mx-2 my-6">
                <article className="flex flex-col border border-gray-300 shadow-lg rounded-lg p-8 bg-white w-full">
                    <section id="title" className="mb-4">
                        <h1 className="text-2xl text-center font-bold text-gray-800">
                            {t("contact.title")}
                        </h1>
                    </section>
                    <hr className="border-gray-300 my-4" />
                    <section>
                        <p className="text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim arcu mauris, eu posuere mi commodo nec. Vestibulum feugiat felis ut felis elementum, ut bibendum odio finibus. Donec dolor augue, dignissim vitae enim sit amet, dignissim bibendum massa. Mauris elit purus, hendrerit vitae cursus id, porttitor id ante. Quisque eget eros sit amet ex bibendum vulputate. Aliquam nec tortor vitae nibh pharetra posuere. Praesent tempor pretium turpis, ac convallis ex malesuada vitae. Praesent accumsan convallis efficitur.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim arcu mauris, eu posuere mi commodo nec. Vestibulum feugiat felis ut felis elementum, ut bibendum odio finibus. Donec dolor augue, dignissim vitae enim sit amet, dignissim bibendum massa. Mauris elit purus, hendrerit vitae cursus id, porttitor id ante. Quisque eget eros sit amet ex bibendum vulputate. Aliquam nec tortor vitae nibh pharetra posuere. Praesent tempor pretium turpis, ac convallis ex malesuada vitae. Praesent accumsan convallis efficitur.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim arcu mauris, eu posuere mi commodo nec. Vestibulum feugiat felis ut felis elementum, ut bibendum odio finibus. Donec dolor augue, dignissim vitae enim sit amet, dignissim bibendum massa. Mauris elit purus, hendrerit vitae cursus id, porttitor id ante. Quisque eget eros sit amet ex bibendum vulputate. Aliquam nec tortor vitae nibh pharetra posuere. Praesent tempor pretium turpis, ac convallis ex malesuada vitae. Praesent accumsan convallis efficitur.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim arcu mauris, eu posuere mi commodo nec. Vestibulum feugiat felis ut felis elementum, ut bibendum odio finibus. Donec dolor augue, dignissim vitae enim sit amet, dignissim bibendum massa. Mauris elit purus, hendrerit vitae cursus id, porttitor id ante. Quisque eget eros sit amet ex bibendum vulputate. Aliquam nec tortor vitae nibh pharetra posuere. Praesent tempor pretium turpis, ac convallis ex malesuada vitae. Praesent accumsan convallis efficitur.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim arcu mauris, eu posuere mi commodo nec. Vestibulum feugiat felis ut felis elementum, ut bibendum odio finibus. Donec dolor augue, dignissim vitae enim sit amet, dignissim bibendum massa. Mauris elit purus, hendrerit vitae cursus id, porttitor id ante. Quisque eget eros sit amet ex bibendum vulputate. Aliquam nec tortor vitae nibh pharetra posuere. Praesent tempor pretium turpis, ac convallis ex malesuada vitae. Praesent accumsan convallis efficitur.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim arcu mauris, eu posuere mi commodo nec. Vestibulum feugiat felis ut felis elementum, ut bibendum odio finibus. Donec dolor augue, dignissim vitae enim sit amet, dignissim bibendum massa. Mauris elit purus, hendrerit vitae cursus id, porttitor id ante. Quisque eget eros sit amet ex bibendum vulputate. Aliquam nec tortor vitae nibh pharetra posuere. Praesent tempor pretium turpis, ac convallis ex malesuada vitae. Praesent accumsan convallis efficitur.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim arcu mauris, eu posuere mi commodo nec. Vestibulum feugiat felis ut felis elementum, ut bibendum odio finibus. Donec dolor augue, dignissim vitae enim sit amet, dignissim bibendum massa. Mauris elit purus, hendrerit vitae cursus id, porttitor id ante. Quisque eget eros sit amet ex bibendum vulputate. Aliquam nec tortor vitae nibh pharetra posuere. Praesent tempor pretium turpis, ac convallis ex malesuada vitae. Praesent accumsan convallis efficitur.
                        </p>
                    </section>
                </article>
            </main>
        </>
    );
}

export default Contact;
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "nl", ["common"])),
        }
    };
};