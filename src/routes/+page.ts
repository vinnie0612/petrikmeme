import { PostSorting, getPosts } from '$lib/types/post';
import { pb } from '$lib/util/pocketbase';

export const load = async () => {
  return { result: await getPosts(1, 50, '', '-created', PostSorting.Top) };
};
