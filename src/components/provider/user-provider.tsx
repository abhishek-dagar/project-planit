"use client";
import React, { useEffect } from "react";
import useUser from "../custom-hooks/user";

const UserProvider = ({
  user,
  children,
}: {
  user: any;
  children: React.ReactNode;
}) => {
  const [_, { setCurrentUser }] = useUser({});
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return <>{children}</>;
};

export default UserProvider;
