import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import UserService from "@/services/UserService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Settings: React.FC = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [visibleDisplay, setVisibleDisplay] = useState<string>("privacy");
    const [isDeleting, setIsDeleting] = useState<boolean>(false); // To manage loading state during deletion
    const [error, setError] = useState<string | null>(null); // For error handling

    useEffect(() => {
        const handleDisplay = () => {
            const hash = window.location.hash.slice(1);
            setVisibleDisplay(hash || "privacy");
        };
        handleDisplay();
        window.addEventListener("hashchange", handleDisplay);
        return () => {
            window.removeEventListener("hashchange", handleDisplay);
        };
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (isDeleting) return;
        setIsDeleting(true);
        setError(null);

        try {
            const response = await UserService.fetchWithToken(`${process.env.NEXT_PUBLIC_API_URL}/user/token`);
            const user = await response.json();
            if (confirm("Are you sure you want to delete your account?")) {
                const deleteResponse = await UserService.deleteUser(user.username);
                if (deleteResponse.ok) {
                    router.push("/home");
                } else {
                    setError("Failed to delete account. Please try again.");
                }
            }
        } catch (error) {
            console.error(error);
            setError("An error occurred while trying to delete your account.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <article className="w-full max-w-4xl flex flex-col border border-gray-300 shadow-md rounded-xl p-8 bg-white">
                <header className="mb-6 text-center">
                    <h1 className="text-3xl font-semibold text-gray-800">Settings</h1>
                </header>

                <div className="flex flex-col md:flex-row gap-8">
                    <nav className="w-full md:w-1/4 border-r border-gray-300 pr-4">
                        <ul className="space-y-4 text-lg text-blue-700">
                            <li>
                                <a href="#privacy" className={`hover:underline ${visibleDisplay === "privacy" ? "font-bold" : ""}`}>
                                    Privacy
                                </a>
                            </li>
                            <li>
                                <a href="#delete" className={`hover:underline ${visibleDisplay === "delete" ? "font-bold" : ""}`}>
                                    Delete user
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <section className="w-full md:w-3/4">
                        {visibleDisplay === "delete" && (
                            <div id="delete">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <p className="text-gray-700 mb-2">We're sorry to see you go.</p>
                                        <p className="text-sm text-gray-600">
                                            You are about to permanently delete your account. This action is
                                            <strong> irreversible</strong> and will result in the loss of all your data,
                                            including purchase history, saved settings, and content.
                                            <br />
                                            If you're experiencing issues or have feedback, please email us at{" "}
                                            <a href="mailto:brahimbelmouhand@gmail.com" className="text-blue-600 underline">
                                                brahimbelmouhand@gmail.com
                                            </a>.
                                        </p>
                                    </div>

                                    {error && (
                                        <div className="text-red-600 font-semibold">
                                            {error}
                                        </div>
                                    )}

                                    <div className="flex gap-4">
                                        <input
                                            type="submit"
                                            value={isDeleting ? "Deleting..." : "Delete"}
                                            className={`bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-lg cursor-pointer ${isDeleting ? "cursor-wait" : ""}`}
                                            disabled={isDeleting}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => router.push("/")}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-lg"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {visibleDisplay === "privacy" && (
                            <div id="privacy" className="text-gray-700 text-base">
                                <p>Privacy is important. We are committed to protecting your personal data and maintaining transparency about how it is used.</p>
                            </div>
                        )}
                    </section>
                </div>
            </article>
        </main>
    );
};

export default Settings;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "nl", ["common"])),
        },
    };
};
