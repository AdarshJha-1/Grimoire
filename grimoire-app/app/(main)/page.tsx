import Dashboard from "@/components/Dashboard";
import { getServerSession } from "@/lib/getServerSession";
import { redirect } from "next/navigation";

export default async function Home() {

    const session = await getServerSession();
    const user = session?.user;
    if (!user) redirect("/auth")

    return (
        <main className="w-full flex relative">
            <Dashboard />
        </main >
    )
}