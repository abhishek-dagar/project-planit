import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateProject = ({ project, handleProjectName, error }: any) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right text-[14px]">
          Project Name
        </Label>
        <div className="col-span-3 ">
          <Input
            id="name"
            value={project.name}
            className={
              "bg-secondary-background " +
              (error.isError
                ? "ring-2 ring-red-600 focus-visible:ring-red-600"
                : "")
            }
            onChange={handleProjectName}
          />
          {error.isError && (
            <p className="text-[12px] text-red-600 font-light">
              {error.errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
