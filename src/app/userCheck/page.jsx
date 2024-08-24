"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
export default function UserCheck() {
  const { data: session } = useSession();
  const [userDetails, setUserDetails] = useState("");
  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session.user.email }),
      });
      const email = session.user.email;
      const data = await response.json(email);

      setUserDetails(data.user);
    };
    if (session) {
      fetchUserDetails();
    }
  }, [session]);
  return (
    <div>
      <h1 className="text-3xl font-bold">{userDetails?.name}</h1>
      <h1 className="text-3xl font-bold">{userDetails?.surname}</h1>
      <h1 className="text-3xl font-bold">{userDetails?.email}</h1>
      <br />
      <h1 className="text-3xl font-bold">{session.user?.email}</h1>
      <h1 className="text-3xl font-bold">{session.user?.image}</h1>
    </div>
  );
}
