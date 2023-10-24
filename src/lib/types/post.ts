import type { RecordModel } from 'pocketbase';
import { pb } from '$lib/util/pocketbase';

export interface Post extends RecordModel {
  title: string;
  image: string;
  upvotes: string[];
  downvotes: string[];
  score: number;
  isVoted: 'up' | 'down' | 'none';
}

export const upvotePost = async (post: Post, cuid: string) => {
  if (post.downvotes.includes(cuid)) {
    post.downvotes = post.downvotes.filter((u) => u !== cuid);
  }
  if (!post.upvotes.includes(cuid)) {
    post.upvotes.push(cuid);
  } else {
    post.upvotes = post.upvotes.filter((u) => u !== cuid);
  }
  pb.collection('posts').update(post.id, { upvotes: post.upvotes, downvotes: post.downvotes });
  post.isVoted = post.upvotes.includes(cuid)
    ? 'up'
    : post.downvotes.includes(cuid)
    ? 'down'
    : 'none';
  post.score = post.upvotes.length - post.downvotes.length;

  return post;
};

export const downvotePost = async (post: Post, cuid: string) => {
  if (post.upvotes.includes(cuid)) {
    post.upvotes = post.upvotes.filter((u) => u !== cuid);
  }
  if (!post.downvotes.includes(cuid)) {
    post.downvotes.push(cuid);
  } else {
    post.downvotes = post.downvotes.filter((u) => u !== cuid);
  }
  await pb
    .collection('posts')
    .update(post.id, { upvotes: post.upvotes, downvotes: post.downvotes });
  post.isVoted = post.upvotes.includes(cuid)
    ? 'up'
    : post.downvotes.includes(cuid)
    ? 'down'
    : 'none';
  post.score = post.upvotes.length - post.downvotes.length;

  return post;
};
