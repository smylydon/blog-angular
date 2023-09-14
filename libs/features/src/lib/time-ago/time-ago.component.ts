import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TimeAgoPipe } from '../pipes/time-ago.pipe';
import { NgIf } from '@angular/common';

@Component({
    selector: 'lib-time-ago',
    templateUrl: './time-ago.component.html',
    styleUrls: ['./time-ago.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, TimeAgoPipe],
})
export class TimeAgoComponent {
  @Input() set timestamp(timestamp: any) {
    this.currentTimestamp = timestamp ?? '';
  }
  currentTimestamp = '';
}
