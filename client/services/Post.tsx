import axios from "axios";
import { IPost } from "@backend/src/types";

const baseUrl = 'http://localhost:4000';

export const createPost = (post: IPost) => {
  return axios.post(`${baseUrl}/post`, post);
};

// export const patchJob = (postID: string, job: IJob) => {
//   return axios.patch(`/job/${jobID}`, job);
// };

export const deletePost = async (postID: string) => {
  return axios.delete(`${baseUrl}/post/${postID}`);
};

export const getPosts = async () => {
  return axios.get(`${baseUrl}/post`);
};

export const getUserPosts = async (userID: string) => {
  return axios.get(`${baseUrl}/post/mine/${userID}`);
};

export const getAcceptedPosts = async (userID: string) => {
  return axios.get(`${baseUrl}/post/theirs/${userID}`);
};