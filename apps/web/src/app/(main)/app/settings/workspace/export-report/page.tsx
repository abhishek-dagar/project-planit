import SettingsSubSection from "@/components/common/settings-sub-section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { currentUser } from "@/lib/helpers/getTokenData";
import { redirect } from "next/navigation";
import React from "react";
import ExportCsvButton from "./_component/export-csv-button";

const ExportReport = async () => {
  const user = await currentUser();
  if (!user) redirect("/signin");

  return (
    <div className="flex flex-col items-center py-4 gap-4 relative">
      <SettingsSubSection heading="Export" />
      <SettingsSubSection>
        <Card className="w-full bg-muted">
          <CardHeader>
            <CardTitle>Export</CardTitle>
            <CardDescription>
              You can export your issue data in CSV format.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <ExportCsvButton user={user} />
          </CardFooter>
        </Card>
      </SettingsSubSection>
    </div>
  );
};

export default ExportReport;
