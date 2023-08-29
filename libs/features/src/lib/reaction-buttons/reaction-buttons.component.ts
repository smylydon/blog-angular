import { Component, Input } from '@angular/core';
import { PostEntity } from '../+state/post/post.model';

@Component({
  selector: 'lib-reaction-buttons',
  templateUrl: './reaction-buttons.component.html',
  styleUrls: ['./reaction-buttons.component.scss'],
})
export class ReactionButtonsComponent {
  public reactionNames = ['thumbsUp', 'wow', 'heart', 'rocket', 'coffee'];
  public reactionEmoji: any = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕',
  };
  constructor() {}
}