import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TimeAgoPipe } from '../pipes/time-ago.pipe';

@Component({
  selector: 'lib-time-ago',
  templateUrl: './time-ago.component.html',
  styleUrls: ['./time-ago.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TimeAgoPipe],
})
export class TimeAgoComponent {
  @Input() set timestamp(timestamp: unknown) {
    this.currentTimestamp = <string>timestamp ?? '';
  }
  currentTimestamp = '';
}
