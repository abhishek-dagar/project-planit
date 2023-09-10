"use client";
import { Button } from "@/components/ui/button";
import { fetchUser, logoutAction } from "@/lib/actions/user.actions";
import { setUser } from "@/redux/features/userSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const fetchUserDetails: () => void = async () => {
    const { response }: any = await fetchUser();
    if (response?.success) {
      dispatch(setUser(response.user));
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div>
      <Button onClick={logoutAction}>Logout</Button>
    </div>
  );
};

export default Home;
