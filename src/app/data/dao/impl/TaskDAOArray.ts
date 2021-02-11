import {TaskDAO} from '../interface/TaskDAO';
import {Observable, of} from 'rxjs';
import { Task } from 'src/app/model/Task';
import {Category} from '../../../model/Category';
import { Priority } from 'src/app/model/Priority';
import {TestData} from '../../TestData';

export class TaskDAOArray implements TaskDAO{
  add(T): Observable<Task> {
    return undefined;
  }

  delete(id: number): Observable<Task> {
    return undefined;
  }

  get(id: number): Observable<Task> {
    return of(TestData.tasks.find(todo => todo.id === id));
  }

  getAll(): Observable<Task[]> {
    return of(TestData.tasks); // of - спец.метод, который оборачивает в контейнер Observable
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getTotalCount(): Observable<number> {
    return undefined;
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return of(this.searchTasks(category, searchText, status, priority));
  }

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Task[] {

    let allTasks = TestData.tasks;

    if (category != null) {
      allTasks = allTasks.filter(todo => todo.category === category);
    }

    return allTasks;
  }


  update(task: Task): Observable<Task> {
    const taskTmp = TestData.tasks.find( t => t.id === task.id); // обновляем по id
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, task);
    return of(task);
  }

}
