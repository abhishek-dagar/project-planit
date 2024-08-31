import SettingsSubSection from "@/components/common/settings-sub-section";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/helpers/getTokenData";
import { redirect } from "next/navigation";
import React from "react";
import { ProfileForm } from "./_components/profile-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Props = {};

const ProfileSettings = async (props: Props) => {
  const user = await currentUser();
  if (!user) redirect("/signin");
  return (
    <div className="flex flex-col items-center py-4 gap-4 relative">
      <SettingsSubSection heading="Profile" subheading="Mange your profile" />
      <SettingsSubSection className="gap-4">
        <div className="flex gap-2">
          <div className="flex-1 flex items-center justify-center">
            <Avatar className="h-40 w-40">
              <AvatarFallback className="text-4xl">
                {user.name?.split("")[0] || "NA"}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <ProfileForm user={user} />
          </div>
        </div>
      </SettingsSubSection>
    </div>
  );
};

export default ProfileSettings;
