import { Injectable } from '@angular/core';
import { TestData } from '../data/TestData';
import {Category} from '../model/Category';
import {Task} from '../model/Task';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  constructor() {
  }
  getCategories(): Category[] {
    return TestData.categories;
  }
  getTasks(): Task[] {
    return TestData.tasks;
  }
  getTasksByCategory(category: Category): Task[] {
    const tasks = TestData.tasks.filter(t => t.category === category);
    console.log(tasks);
    return tasks;
  }
}
