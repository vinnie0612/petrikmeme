import type { RecordModel } from 'pocketbase';
import type { Vote } from './vote';

export interface Post extends RecordModel {
  title: string;
  image: string;
  votes: Vote[];
  upvotes: Vote[];
  downvotes: Vote[];
  score: number;
}

export const upvotePost = async () => {};
