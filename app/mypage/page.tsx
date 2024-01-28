import { fetchUserFullname } from "@/lib/actions";
import { displayUserAttendance } from "@/lib/actions";
import { fetchUserId } from "@/lib/actions";
import { fetchUserEmail } from "@/lib/actions";
import { userInfo } from "os";

export default async function Mypage() {
  const userAllAttendance = await displayUserAttendance()
  if (userAllAttendance) {
        return (
      <div>
        Data fetched
      </div>
    );
  } else {
    return (
      <div>
        undefined
      </div>
    );
  }

  }
  