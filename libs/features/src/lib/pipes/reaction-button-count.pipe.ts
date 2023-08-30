import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../+state/post/post.model';

@Pipe({
  name: 'reactionCount',
})
export class ReactionButtonCountPipe implements PipeTransform {
  transform(post: Post, name: string): string {
    const value: number[] | undefined = Object.entries(post.reactions)
      .filter(([a]) => {
        return name == a;
      })
      .map(([, b]) => {
        return b;
      });
    return Array.isArray(value) && value.length > 0 ? String(value[0]) : '0';
  }
}
