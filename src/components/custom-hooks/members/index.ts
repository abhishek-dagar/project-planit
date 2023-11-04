"use client";

import { useDispatch, useSelector } from "react-redux";

interface Props {
  configs?: {};
}

const useMembers = ({ configs = {} }: Props) => {
  const { members } = useSelector((state: any) => state.members);
  const dispatch = useDispatch();

  const fetchMembers = (memberIds: any) => {
    return members.filter((member: any) => memberIds.includes(member.id));
  };

  return [members, { fetchMembers }];
};

export default useMembers;
