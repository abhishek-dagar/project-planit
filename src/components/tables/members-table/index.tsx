import { Team } from "@/lib/interfacesOrEnum/teams-group";
import React from "react";

interface Props {
  team: Team | undefined;
}

const MembersTable = ({ team }: Props) => {
  return <div>MembersTable</div>;
};

export default MembersTable;
