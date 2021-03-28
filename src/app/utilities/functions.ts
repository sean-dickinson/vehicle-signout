import { formatDate } from "@angular/common";


export function compareByProp(prop1: string, prop2: string): Function{
  return (o1: any, o2: any) => o1[prop1] === o2[prop2]
}

export const compareUID = compareByProp('uid','uid');

export function combineDateTime(date: Date, time: string): Date {
  const resultDate = new Date(date);
  const hours = parseInt(time.substr(0, 2), 10);
  const minutes = parseInt(time.substr(3, 2), 10);
  resultDate.setHours(hours);
  resultDate.setMinutes(minutes);
  resultDate.setSeconds(0, 0);
  return resultDate;
}

export function getTimestring(date: Date): string {
    return formatDate(date, 'HH:MM', 'en');
}

