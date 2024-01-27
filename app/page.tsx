import { fetchUserEmail } from "@/lib/actions";
import { fetchUserFullname } from "@/lib/actions";

export default async function Home() {
  const email : string | null | undefined = await fetchUserEmail()
  const fullname = await fetchUserFullname()
  console.log(fullname.firstname)
  console.log(fullname.lastname)
  return (
    <div>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {fullname ? <div>{fullname.firstname} {fullname.lastname}</div> : <div>no session.</div>}
    </main>
    </div>
  );
}
