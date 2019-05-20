export class Comment {
    id: number;
    level: number;
    author: string;
    time: number;
    timeAgo: string;
    content: string;
    deleted: boolean;
    comments: Comment[];
}
