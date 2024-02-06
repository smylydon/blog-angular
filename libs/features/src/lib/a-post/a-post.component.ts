import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Post, UpdateObject } from '../+state/post/post.model';
import { ReactionButtonsComponent } from '../reaction-buttons/reaction-buttons.component';
import { TimeAgoComponent } from '../time-ago/time-ago.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-a-post',
  templateUrl: './a-post.component.html',
  styleUrls: ['./a-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, TimeAgoComponent, ReactionButtonsComponent],
})
export class APostComponent {
  @Input() post: Post | null | undefined = undefined;
  @Input() isSingle = true;
  @Output() update: EventEmitter<UpdateObject> = new EventEmitter();

  public emitPost(updateObject: UpdateObject) {
    this.update.emit(updateObject);
  }
}
