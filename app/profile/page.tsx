
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import MyPosts from "./MyPosts";

export default async function page() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin');
    }
    return (
        <div>
            <h1 className="text-2xl font-bold">
                Welcome 🙋🏻‍♂️ , &nbsp;{session?.user?.name}
            </h1>
            <MyPosts />
        </div>
    )
}
