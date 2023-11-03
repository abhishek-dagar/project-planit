import dynamic from "next/dynamic";
const TeamsPage = dynamic(() => import("@/components/pages/teams/page"), {
  ssr: false,
});

const Teams = () => {
  return <TeamsPage />;
};

export default Teams;
