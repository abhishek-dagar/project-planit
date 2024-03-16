import { Team } from "@/lib/interfacesOrEnum/teams-group";
import React, { useEffect, useState } from "react";
import { columns } from "./components/column";
import { Member } from "./components/member-Schema";
import { MemberTable } from "./components/data-table";

interface Props {
  team: Team | undefined;
}

const MembersTable = ({ team }: Props) => {
  const [members, setMembers] = useState<any>(team?.members);

  return (
    <div>
      <MemberTable data={members} columns={columns} team={team} />
    </div>
  );
};

export default MembersTable;
