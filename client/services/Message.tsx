import axios from "axios";
import { IMessage } from "@backend/src/types";

const baseUrl = 'http://localhost:4000';

export const createMessage = async (userID:string, postId: string, content: string) => {
  return axios.post(`${baseUrl}/messages`, {from: userID, content: content, postId: postId});
};

// export const patchJob = (postID: string, job: IJob) => {
//   return axios.patch(`/job/${jobID}`, job);
// };


export const getMessages = async (postId: string) => {
  return axios.get(`${baseUrl}/messages/${postId}`);
};
