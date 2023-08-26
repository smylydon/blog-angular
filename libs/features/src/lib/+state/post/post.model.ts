/**
 * Interface for the 'Post' data
 */
export interface PostEntity {
  id: string;
  title: string;
  content: string;
  date?: string;
  userId: string;
  reactions?: {
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
  };
}
