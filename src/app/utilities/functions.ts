import { formatDate } from "@angular/common";
import { SimpleEntity } from "app/models/simple-entity";

export function compareUID(o1: SimpleEntity, o2: SimpleEntity): boolean {
  return o1.uid === o2.uid;
}

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
