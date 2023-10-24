import { pb } from '$lib/util/pocketbase';

import type { Vote } from '$lib/types/vote';

export const load = async () => {
  const getPosts = async () => {
    const posts = await pb
      .collection('posts')
      .getList(1, 50, { expand: 'votes', requestKey: null });
    for (const post of posts.items) {
      post.votes = post.expand?.votes;
      post.upvotes = post.votes?.filter((v: Vote) => v.isUpvote);
      post.downvotes = post.votes?.filter((v: Vote) => !v.isUpvote);
      post.score = post.upvotes.length - post.downvotes.length;
      post.image = pb.files.getUrl(post, post.image);
    }
    return posts.items;
  };

  return { result: getPosts() };
};
