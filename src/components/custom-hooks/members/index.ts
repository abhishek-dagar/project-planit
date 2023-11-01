"use client";

import { useDispatch, useSelector } from "react-redux";

interface Props {
  configs?: {};
}

const useMembers = ({ configs = {} }: Props) => {
  const { members } = useSelector((state: any) => state.members);
  const dispatch = useDispatch();

  return [members];
};

export default useMembers;
