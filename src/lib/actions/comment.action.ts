import axios from "axios";
import axiosClient from "../axios-functions/client";

const url = "/api/comment";

const commentEndpoints = {
  comment: url,
};

export async function addNewComment(comment: any) {
  try {
    const response = await axios.post(commentEndpoints.comment, comment);
    return { response: response.data };
  } catch (err) {
    return { err };
  }
}
