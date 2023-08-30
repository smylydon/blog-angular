import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Post, Reactions, UpdateObject } from '../+state/post/post.model';

@Component({
  selector: 'lib-reaction-buttons',
  templateUrl: './reaction-buttons.component.html',
  styleUrls: ['./reaction-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactionButtonsComponent {
  @Input() post: Post = {
    id: '',
    title: '',
    userId: '',
    body: '',
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
  public reactionEmoji: any = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕',
  };
  constructor() {}

  public increment(emoji: string) {
    this.newPost.emit({
      post: this.post,
      value: emoji as Reactions,
    });
  }

  public trackBy(index: number) {
    return index;
  }
}
