import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const ForgotPassword: React.FC = () => {
    const { t } = useTranslation();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Reset email sent");
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <article className="w-full max-w-md bg-white border border-gray-300 shadow-md rounded-xl p-8">
                <section id="title" className="mb-6">
                    <h1 className="text-2xl font-bold text-center text-gray-800">
                        Forgot your password?
                    </h1>
                    <hr className="border-gray-300 my-4" />
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <p className="text-gray-700 mb-4">
                            Enter your email address below, and we'll send you instructions to reset your password.
                        </p>
                        <input
                            type="email"
                            placeholder="Email address"
                            className="border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="submit"
                            value="Send Reset Email"
                            className="bg-blue-500 hover:bg-blue-600 text-white text-lg rounded px-4 py-2 cursor-pointer"
                        />
                    </form>
                </section>
            </article>
        </main>
    );
};

export default ForgotPassword;
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "nl", ["common"])),
        }
    };
};