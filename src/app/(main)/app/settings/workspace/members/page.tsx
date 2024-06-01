import SettingsSubSection from "@/components/common/settings-sub-section";
import React from "react";
import MembersTable from "./_components/members";
import { currentUser } from "@/lib/helpers/getTokenData";

const Members = async () => {
  const user = await currentUser();
  return (
    <div className="flex flex-col items-center py-4 gap-4 relative">
      <SettingsSubSection
        heading="Members"
        subheading="Mange your members here"
      />
      <SettingsSubSection>
        <MembersTable user={user} />
      </SettingsSubSection>
    </div>
  );
};

export default Members;
