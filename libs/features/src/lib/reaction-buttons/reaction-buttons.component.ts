import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Post, Reactions, UpdateObject } from '../+state/post/post.model';
import { ReactionButtonCountPipe } from '../pipes/reaction-button-count.pipe';
import { NgFor } from '@angular/common';

@Component({
  selector: 'lib-reaction-buttons',
  templateUrl: './reaction-buttons.component.html',
  styleUrls: ['./reaction-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgFor, ReactionButtonCountPipe],
})
export class ReactionButtonsComponent {
  @Input() set post(post: Post) {
    this.aPost = post ? post : this.aPost;
  }
  aPost: Post = {
    id: 0,
    title: '',
    userId: 0,
    body: '',
    date: '',
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  };
  @Output() newPost: EventEmitter<UpdateObject> =
    new EventEmitter<UpdateObject>();
  public reactionNames = ['thumbsUp', 'wow', 'heart', 'rocket', 'coffee'];
  public reactionEmoji: Record<string, string> = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕',
  };

  public increment(emoji: string) {
    this.newPost.emit({
      post: this.aPost,
      value: emoji as Reactions,
    });
  }

  public trackBy(index: number) {
    return index;
  }
}
