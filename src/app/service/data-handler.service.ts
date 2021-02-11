import {Injectable} from '@angular/core';
import {TestData} from '../data/TestData';
import {Category} from '../model/Category';
import {Task} from '../model/Task';
import {BehaviorSubject, Observable} from 'rxjs';
import {TaskDAOArray} from '../data/dao/impl/TaskDAOArray';
import {CategoryDAOArray} from '../data/dao/impl/CategoryDAOArray';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  taskSubject = new BehaviorSubject<Task[]>(TestData.tasks);

  private taskDaoArray = new TaskDAOArray();
  private categoryDaoArray = new CategoryDAOArray(); // создание экземпляра класса для работы с категориями

  constructor() {
    // this.fillTasks();
  }

//   fillTasks(): void {
//     this.taskSubject.next(TestData.tasks);
//   }
//
  fillTasksByCategory(category: Category): void {
    const tasks = TestData.tasks.filter(t => t.category === category);
    this.taskSubject.next(tasks);
  }
  getAllTasks(): Observable<Task[]> {
    return this.taskDaoArray.getAll();
  }
  getAllCategories(): Observable<Category[]> {
    return this.categoryDaoArray.getAll();
  }

}
