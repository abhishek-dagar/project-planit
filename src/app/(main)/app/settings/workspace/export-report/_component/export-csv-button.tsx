"use client";
import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  user: any;
};

const ExportCsvButton = ({ user }: Props) => {
  const downloadCsv = async () => {
    const userDetails =
      "ID,Name,Email,role,Create At, Last updated\n" +
      `${user.id},${user.name},${user.email},${user?.role?.name},${user.createdAt},${user.updatedAt}`;
    const workspaces =
      "Name,Description,Created At, Last updated\n" +
      user.workspaces.map((workspace: any) => {
        return `${workspace.name},${workspace.description},${workspace.createdAt},${workspace.updatedAt}\n`;
      });
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Sheet: User-details\n" +
      userDetails +
      "\n\n" +
      "Sheet: workspaces\n" +
      workspaces;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "user-details.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return <Button onClick={downloadCsv}>Export CSV</Button>;
};

export default ExportCsvButton;
