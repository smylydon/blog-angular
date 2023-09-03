import { TimeAgoPipe } from './time-ago.pipe';

describe('TimeAgoPipe', () => {
  const MINUTE = 60 * 1000;
  const TWO_HOURS = 2 * 60 * MINUTE;
  const ONE_DAY = 12 * TWO_HOURS;
  let pipe: TimeAgoPipe;
  const getISOStringDate = (period: number) => {
    const time = new Date().getTime() - period;
    return new Date(time).toISOString();
  };

  beforeEach(() => {
    pipe = new TimeAgoPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string', () => {
    expect(pipe.transform('')).toEqual('');
  });

  it('should return empty string when jibberish is passed', () => {
    expect(pipe.transform('asdfasd')).toEqual('');
  });

  it('should return - less than a minute ago', () => {
    expect(pipe.transform(getISOStringDate(0))).toMatch(
      /less than a minute ago/
    );
  });

  it('should return - 1 minute ago', () => {
    expect(pipe.transform(getISOStringDate(MINUTE))).toMatch(/1 minute ago/);
  });

  it('should return - 2 hour ago', () => {
    expect(pipe.transform(getISOStringDate(TWO_HOURS))).toMatch(
      /2\s+hours\s+ago/
    );
  });

  it('should return - 1 day ago', () => {
    expect(pipe.transform(getISOStringDate(ONE_DAY))).toMatch(/1\s+day\s+ago/);
  });
});
