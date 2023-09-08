import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lib-time-ago',
  templateUrl: './time-ago.component.html',
  styleUrls: ['./time-ago.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeAgoComponent {
  @Input() set timestamp(timestamp: any) {
    this.currentTimestamp = timestamp ?? '';
  }
  currentTimestamp = '';
}
