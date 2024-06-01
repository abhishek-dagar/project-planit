import SettingsSubSection from "@/components/common/settings-sub-section";
import { currentUser } from "@/lib/helpers/getTokenData";
import { redirect } from "next/navigation";
import React from "react";
import { ChangePasswordForm } from "./_components/change-password-form";

const ChangePassword = async () => {
  const user = await currentUser();
  if (!user) redirect("/signin");
  return (
    <div className="flex flex-col items-center py-4 gap-4 relative">
      <SettingsSubSection
        heading="Change password"
        subheading="update your password here"
      />
      <SettingsSubSection className="gap-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <ChangePasswordForm user={user} />
          </div>
        </div>
      </SettingsSubSection>
    </div>
  );
};

export default ChangePassword;
