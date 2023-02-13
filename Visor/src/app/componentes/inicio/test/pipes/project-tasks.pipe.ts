import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lateTasks',
})
export class LateTasksPipe implements PipeTransform {
  transform(value: number, totalTasks: number, lateTasks: number): number {
    if (totalTasks == 0 && lateTasks == 0) {
      return 0;
    }
    if (totalTasks == 0) {
      return 100;
    }
    return Math.round((100 * lateTasks) / totalTasks);
  }
}

@Pipe({
  name: 'onTimeTasks',
})
export class OnTimeTasksPipe implements PipeTransform {
  transform(value: number, totalTasks: number, lateTasks: number): number {
    if (totalTasks == 0 && lateTasks == 0) {
      return 0;
    }
    if (lateTasks == 0) {
      return 100;
    }
    return Math.round(((totalTasks - lateTasks) * 100) / totalTasks);
  }
}
