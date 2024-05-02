import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Project, StatusColor } from "@/lib/interfacesOrEnum/teams-group";
import React from "react";

const ProjectDescCard = ({ project }: { project: Project }) => {
  return (
    <Card className="mb-1 bg-secondary-background scale-x-[.98] hover:scale-x-100 border hover:border-primary transition-all">
      <CardContent className="py-2 flex justify-between">
        <span className="uppercase font-bold">{project.name}</span>
        <span
          className="text-[14px] px-2 py-1 rounded-md"
          style={{ backgroundColor: StatusColor[project.status] }}
        >
          {project.status}
        </span>
      </CardContent>
    </Card>
  );
};
export const ProjectDescCardSkeleton = () => {
  return <Skeleton className="h-[50px] w-full" />;
};

export default ProjectDescCard;
