import { pb } from '$lib/util/pocketbase';

export const load = async () => {
  const getPosts = async () => {
    const posts = await pb
      .collection('posts')
      .getList(1, 50, { requestKey: null });
    for (const post of posts.items) {
      if (post.upvotes && post.downvotes) {
        post.score = post.upvotes.length - post.downvotes.length;
      }
      post.image = pb.files.getUrl(post, post.image);
    }
    return posts.items;
  };

  return { result: getPosts() };
};
