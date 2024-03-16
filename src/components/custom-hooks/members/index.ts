"use client";

import { setMembers } from "@/redux/features/memberSlice";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  configs?: {};
}

const useMembers = ({ configs = {} }: Props) => {
  const { members } = useSelector((state: any) => state.members);
  const dispatch = useDispatch();

  const fetchMembers = (memberIds: any) => {
    return members.filter((member: any) => memberIds?.includes(member.id));
  };
  const updateMember = (member: any) => {
    const copyMembers = [...members];
    const updatedMembers = copyMembers.map((mem: any) => {
      if (mem.id === member.id) return member;
      return mem;
    });
    dispatch(setMembers(updatedMembers));
  };

  return [members, { fetchMembers }];
};

export default useMembers;
