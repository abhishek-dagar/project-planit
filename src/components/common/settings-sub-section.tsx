import React from "react";
import { Separator } from "../ui/separator";

interface SettingsSubSectionProps {
  heading?: string;
  subheading?: string;
  className?: string;
  children?: React.ReactNode;
}
const SettingsSubSection = ({
  heading,
  subheading,
  className,
  children,
}: SettingsSubSectionProps) => {
  return (
    <div className={"w-3/4 flex flex-col " + className}>
      {heading && <h1 className="text-3xl flex gap-2 items-end">{heading}</h1>}
      {subheading && <p className="text-muted-foreground">{subheading}</p>}
      {children}
      <Separator className="mt-2" />
    </div>
  );
};

export default SettingsSubSection;
