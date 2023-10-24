import type { RecordModel } from 'pocketbase';
import type { Vote } from './vote';
import { pb } from '$lib/util/pocketbase';

export interface Post extends RecordModel {
  title: string;
  image: string;
  votes: Vote[];
  upvotes: Vote[];
  downvotes: Vote[];
  score: number;
}

export const upvotePost = async (postId: string, cuid: string) => {
  const vote = await pb.collection('votes').create({
    isUpvote: true,
    post: postId,
    user: cuid,
  });

  await pb.collection('posts').update(postId, {
    votes: [vote.id]
  });
};