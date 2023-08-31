import { Pipe, PipeTransform } from '@angular/core';
import { parseISO, formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(timestamp: string): unknown {
    let timeAgo = '';

    if (timestamp) {
      const date = parseISO(timestamp);
      const timePeriod = formatDistanceToNow(date);
      timeAgo = `${timePeriod} ago`;
    }

    return timeAgo;
  }
}
