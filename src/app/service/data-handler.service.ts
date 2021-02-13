import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDAOArray } from '../data/dao/impl/CategoryDAOArray';
import { TaskDAOArray } from '../data/dao/impl/TaskDAOArray';
import { Category } from '../model/Category';
import { Priority } from '../model/Priority';
import {Task} from '../model/Task';
import {PriorityDAOArray} from '../data/dao/impl/PriorityDAOArray';



// класс реализовывает методы, которые нужны frontend'у, т.е. для удобной работы представлений
// напоминает паттер Фасад (Facade) - выдает только то, что нужно для функционала
// сервис не реализовывает напрямую интерфейсы DAO, а использует их реализации (в данном случае массивы)
// может использовать не все методы DAO, а только нужные

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  // релизации работы с данными с помощью массива
  // (можно подставлять любые релизации, в том числе с БД. Главное - соблюдать интерфейсы)
  private taskDaoArray = new TaskDAOArray();
  private categoryDaoArray = new CategoryDAOArray();
  private priorityDaoArray = new PriorityDAOArray();

  constructor() {
  }

  getAllTasks(): Observable<Task[]> {
    return this.taskDaoArray.getAll();
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryDaoArray.getAll();
  }
  getAllPriorities(): Observable<Priority[]> {
    return this.priorityDaoArray.getAll();
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskDaoArray.update(task);
  }
  deleteTask(id: number): Observable<Task> {
    return this.taskDaoArray.delete(id);
  }

  // поиск задач по параметрам
  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDaoArray.search(category, searchText, status, priority);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoryDaoArray.update(category);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.categoryDaoArray.delete(id);
  }
  addCategory(title: string): Observable<Category> {
    return this.categoryDaoArray.add(new Category(null, title));
  }

  addTask(task: Task): Observable<Task> {
    return this.taskDaoArray.add(task);
  }
  searchCategories(title: string): Observable<Category[]> {
    return this.categoryDaoArray.search(title);
  }

}
