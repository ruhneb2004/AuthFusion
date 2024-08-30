"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <div>
      <div>{JSON.stringify(session.data)}</div>
    </div>
  );
}
