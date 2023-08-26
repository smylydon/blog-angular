/**
 * Interface for the 'User' data
 */
export interface UserEntity {
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
