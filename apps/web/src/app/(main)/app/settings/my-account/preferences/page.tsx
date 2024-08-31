import SettingsSubSection from "@/components/common/settings-sub-section";
import { currentUser } from "@/lib/helpers/getTokenData";
import { redirect } from "next/navigation";
import React from "react";
import { ThemeModeToggle } from "./_components/theme-dropdown";

const Preferences = async () => {
  const user = await currentUser();
  if (!user) redirect("/signin");
  return (
    <div className="flex flex-col items-center py-4 gap-4 relative">
      <SettingsSubSection
        heading="Preferences"
        subheading="Manage your preferences here"
      />
      <SettingsSubSection className="gap-4">
        <>
          <h1 className="text-2xl">Theme</h1>
          <div className="flex justify-between">
            <div>
              <h1 className="text-lg">Interface them</h1>
              <p className="text-sm text-muted-foreground">Interface them</p>
            </div>
            <ThemeModeToggle />
          </div>
        </>
      </SettingsSubSection>
    </div>
  );
};

export default Preferences;
