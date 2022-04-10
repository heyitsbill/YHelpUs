import axios from "axios";
import { IPost } from "@backend/src/types";

const baseUrl = 'http://localhost:4000';

export const createPost = async (post: IPost) => {
  try {
    const response = await axios.post(`${baseUrl}/post`, post);
    if (response.status === 200) {
      return response;
    }} catch (e) {
    // error
    return e.message;
  }
};

// export const patchJob = (postID: string, job: IJob) => {
//   return axios.patch(`/job/${jobID}`, job);
// };

export const patchPost = (postID: string, post: IPost) => {
  return axios.patch(`${baseUrl}/post/${postID}`, post);
};

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