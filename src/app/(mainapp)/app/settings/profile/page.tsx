import { UserDetailsForm } from "@/components/forms/user-details-form";
import React from "react";

const Profile = () => {
  return (
    <div className="flex flex-col md:flex-row w-full py-5 px-4 md:py-16 md:px-10 gap-10">
      <div className="w-[220px]">
        <p className="text-[20px]">Profile</p>
        <span className="text-[12px] text-muted-foreground">
          Your personal information and account security settings.
        </span>
      </div>
      <div className="flex-1">
        <UserDetailsForm />
      </div>
    </div>
  );
};

export default Profile;
