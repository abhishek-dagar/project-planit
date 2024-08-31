"use client";
import {
  AlignStartHorizontalIcon,
  AlignStartVerticalIcon,
  LayoutDashboardIcon, UsersIcon
} from "lucide-react";
import { motion } from "framer-motion";
const FeaturesSection = () => {
  return (
    <div className="py-14">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <h2 className="text-center text-4xl font-semibold text-gray-600">
          Features
        </h2>
        <div className="mt-6">
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16 [&amp;_path]:fill-for">
            <motion.li
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              className="flex items-center"
            >
              <AlignStartVerticalIcon className="h-8 w-20 px-2 text-foreground" />
              <span>List view</span>
            </motion.li>
            <motion.li initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5 }} className="flex items-center">
              <AlignStartHorizontalIcon className="h-8 w-20 px-2 text-foreground" />
              <span>Board view</span>
            </motion.li>
            <motion.li initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5 }} className="flex items-center">
              <UsersIcon className="h-8 w-20 px-2 text-foreground" />
              <span>Teams</span>
            </motion.li>
            <motion.li initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5 }} className="flex items-center">
              <LayoutDashboardIcon className="h-8 w-20 px-2 text-foreground" />
              <span>Workspaces</span>
            </motion.li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
