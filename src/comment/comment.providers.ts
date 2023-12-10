import { Comment } from './../models/comment.model';

export const CommentProviders = [
    {
        provide: 'COMMENT_REPOSITORY',
        useValue: Comment
    }
]