import { Pipe, PipeTransform } from '@angular/core';
import { isValid, parseISO, formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(timestamp: string): unknown {
    const date = parseISO(timestamp);
    let timeAgo = '';

    if (timestamp && isValid(date)) {
      const timePeriod = formatDistanceToNow(date);
      timeAgo = `${timePeriod} ago`;
    }

    return timeAgo;
  }
}
