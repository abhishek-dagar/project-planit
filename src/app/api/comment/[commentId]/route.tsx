import Comment from "@/lib/mongoose/models/comment.model";
import { connectToDB } from "@/lib/mongoose/mongoose";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export const GET = async (req: NextRequest, context: { params: "string" }) => {
  try {
    const { commentId }: any = context.params;
    const comment = await Comment.findById(commentId);
    if (!comment)
      return NextResponse.json(
        {
          message: "Comment created Successfully",
          success: true,
          comment: { ...comment._doc, id: comment._id },
        },
        { status: 201 }
      );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
