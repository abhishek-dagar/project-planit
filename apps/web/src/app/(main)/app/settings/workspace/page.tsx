import { redirect } from "next/navigation";

const Page = async () => {
  redirect("/app/settings/workspace/general");
};

export default Page;
