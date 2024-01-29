import { fetchUserFullname } from "@/lib/actions";
import { displayUserAttendance } from "@/lib/actions";
import { fetchUserId } from "@/lib/actions";
import { fetchUserEmail } from "@/lib/actions";
import { userInfo } from "os";

export default async function Mypage() {
  const userAllAttendance = await displayUserAttendance()
  if (userAllAttendance) {
    userAllAttendance.forEach(attendance => {
      // ここで各要素に対して何か操作を行う
      console.log(`Date: ${attendance.date}`);
      console.log(`Start Time: ${attendance.startTime}`);
      console.log(`End Time: ${attendance.endTime}`);
      console.log(`User ID: ${attendance.userId}`);
  });
        return (
      <div>
        {userAllAttendance.length >= 1 ? (
                <div>
                    <h2>DATA HAS BEEN FETCHED</h2>
                    {userAllAttendance.map((attendance, index) => (
                        <div key={index}>
                            <p>Date: {attendance.date.toString()}</p>
                            <p>Start Time: {attendance.startTime.toString()}</p>
                            <p>End Time: {attendance.endTime ? attendance.endTime.toString() : 'N/A'}</p>
                            <p>User ID: {attendance.userId}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No attendance data available.</p>
            )}
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
  