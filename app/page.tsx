
import { fetchUserFullname } from "@/lib/actions";
import Link from "next/link";
import UserDashboard from "@/components/UserDashboard";
export default async function Home() {
  const fullname = await fetchUserFullname()
  let fixedFullname = "NEED TO LOGIN TO ATTENDANCE"
  if (fullname) {
  console.log(fullname.firstname)
  console.log(fullname.lastname)
  fixedFullname = fullname.firstname +" "+fullname.lastname
  }
  return (
    <div>
      <UserDashboard username={fixedFullname}/>
    </div>
  );
}
