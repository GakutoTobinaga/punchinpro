import { fetchUserFullname } from "@/lib/actions";
import UserDashboard from "@/components/UserDashboard";
export default async function Home() {
  const fullname = await fetchUserFullname()
  let fixedFullname = "NEED TO LOGIN TO ATTENDANCE"
  if (fullname) {
  fixedFullname = fullname.firstname +" "+fullname.lastname
  }
  return (
    <div>
      <UserDashboard username={fixedFullname}/>
    </div>
  );
}
