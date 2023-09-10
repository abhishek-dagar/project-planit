import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateTeam = ({ team, handleTeamName, handleTeamIcon }: any) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Team Name
        </Label>
        <Input
          id="name"
          value={team.name}
          className="col-span-3 bg-secondary-background"
          onChange={handleTeamName}
        />
      </div>
      {/* <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="icon" className="text-right">
          Icon
        </Label>
        <Input
          id="icon"
          value={team.icon}
          className="col-span-1 bg-secondary-background"
          onChange={handleTeamIcon}
          disabled
        />
      </div> */}
    </div>
  );
};

export default CreateTeam;