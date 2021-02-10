import {Injectable} from '@angular/core';
import {TestData} from '../data/TestData';
import {Category} from '../model/Category';
import {Task} from '../model/Task';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  taskSubject = new BehaviorSubject<Task[]>(TestData.tasks);
  categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories);


  constructor() {
    this.fillTasks();
  }

  fillTasks(): void {
    this.taskSubject.next(TestData.tasks);
  }

  fillTasksByCategory(category: Category): void {
    const tasks = TestData.tasks.filter(t => t.category === category);
    this.taskSubject.next(tasks);
  }
}
