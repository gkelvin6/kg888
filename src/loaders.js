import apiRequest from "./apiRequest";

export const betLoader = async () => {
 const betPosts = await apiRequest("/posts");
 return betPosts.data
}
