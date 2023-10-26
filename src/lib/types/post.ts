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

export const deletePost = async (post: Post) => {
  await pb.collection('posts').delete(post.id);
};

export enum PostSorting {
  Top,
  Bottom,
  New,
  Old
}

export const getPosts = async (
  page: number,
  perPage: number,
  filter: string,
  pbsort: string,
  sorting: PostSorting
) => {
  // Get the posts
  const posts = await pb
    .collection('posts')
    .getFullList({ filter, page, perPage, sort: pbsort, requestKey: null });

  // Add score and image to each post
  for (const post of posts) {
    if (post.upvotes && post.downvotes) {
      post.score = post.upvotes.length - post.downvotes.length;
    }
    post.image = pb.files.getUrl(post, post.image);
  }

  // Sort posts according to the sorting param
  if (sorting == PostSorting.Top) {
    posts.sort((a, b) => b.score - a.score);
  } else if (sorting == PostSorting.Bottom) {
    posts.sort((a, b) => a.score - b.score);
  } else if (sorting == PostSorting.New) {
    posts.sort((a, b) => b.createdAt - a.createdAt);
  } else if (sorting == PostSorting.Old) {
    posts.sort((a, b) => a.createdAt - b.createdAt);
  }

  return posts;
};
