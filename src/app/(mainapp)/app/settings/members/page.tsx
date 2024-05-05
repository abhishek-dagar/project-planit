"use client";
import useUser from "@/components/custom-hooks/user";
import { AllMembersTable } from "@/components/tables/members-table/all-members-components/all-Members-data-table";
import { columns } from "@/components/tables/members-table/all-members-components/column";
import React, { useEffect, useState } from "react";

const Members = () => {
  const [user] = useUser({});
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (user?.members.length > 0) {
      setMembers(user?.members);
    }
  }, [user]);
  return (
    <div className="flex-1 px-8 py-10 flex flex-col gap-4 h-screen overflow-auto">
      <div>
        <p className="text-title-md">Manage members</p>
      </div>
      <div className="relative">
        <AllMembersTable data={members} columns={columns} team={{}} />
      </div>
    </div>
  );
};

export default Members;
