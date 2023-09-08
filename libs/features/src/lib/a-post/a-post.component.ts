import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Post, UpdateObject } from '../+state/post/post.model';

@Component({
  selector: 'lib-a-post',
  templateUrl: './a-post.component.html',
  styleUrls: ['./a-post.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class APostComponent {
  // eslint-disable-line
  @Input() post: Post | null | undefined = undefined;
  @Input() isSingle = true;
  @Output() update: EventEmitter<UpdateObject> = new EventEmitter();

  public emitPost(updateObject: UpdateObject) {
    this.update.emit(updateObject);
  }
}
