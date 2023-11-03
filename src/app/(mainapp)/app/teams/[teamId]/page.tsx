import dynamic from "next/dynamic";

const TeamPage = dynamic(() => import("@/components/pages/teams/team/page"), {
  ssr: false,
});

const SingleTeamProjects = ({ params }: { params: { teamId: string } }) => {
  return (
    <>
      <TeamPage teamId={params.teamId} />
    </>
  );
};

export default SingleTeamProjects;
