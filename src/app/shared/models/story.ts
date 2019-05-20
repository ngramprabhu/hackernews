import { Comment } from './comment';
import { FeedType } from './feed-type.type';
import { PollResult } from './poll-result';

export class Story {
    id: number;
    title: string;
    points: number;
    author: string;
    time: number;
    timeAgo: number;
    url: string;
    domain: string;
    commentsCount: number;
    upVote: boolean;
    hide: boolean;
}
