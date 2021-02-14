import {Component, OnInit} from '@angular/core';
import {Category} from './model/Category';
import {Task} from './model/Task';
import {DataHandlerService} from './service/data-handler.service';
import {Priority} from './model/Priority';
import {zip} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

  title = 'angular-todo';
  tasks: Task[];
  categories: Category[];
  priorities: Priority[];
  selectedCategory: Category = null;

// статистика
  totalTasksCountInCategory: number;
  completedCountInCategory: number;
  uncompletedCountInCategory: number;
  uncompletedTotalTasksCount: number;

  searchTaskText = ''; // текущее значение для поиска задач
  searchCategoryText = ''; // текущее значение для поиска категорий
  showStat = true; // показать/скрыть статистику

  // фильтрация
  priorityFilter: Priority;
  statusFilter: boolean;

  constructor(
    private dataHandler: DataHandlerService
  ) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    this.onSelectCategory(null);
  }

  // изменение категории
  onSelectCategory(category: Category): void {

    this.selectedCategory = category;
    this.updateTasksAndStat();
  }

  onUpdateTask(task: Task): void {

    this.dataHandler.updateTask(task).subscribe(cat => {
      this.updateTasksAndStat();
    });
  }

  onDeleteTask(task: Task): void {

    this.dataHandler.deleteTask(task.id).subscribe(cat => {
      this.updateTasksAndStat();
    });
  }
  // удаление категории
  onDeleteCategory(category: Category): void {
    this.dataHandler.deleteCategory(category.id).subscribe(cat => {
      this.selectedCategory = null; // открываем категорию "Все"
      this.onSelectCategory(null);
    });
  }

  // обновлении категории
  onUpdateCategory(category: Category): void {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSelectCategory(this.selectedCategory);
    });
  }

  // поиск задач
  onSearchTasks(searchString: string): void  {
    this.searchTaskText = searchString;
    this.updateTasks();
  }

  // фильтрация задач по статусу (все, решенные, нерешенные)
  onFilterTasksByStatus(status: boolean): void  {
    this.statusFilter = status;
    this.updateTasks();
  }

  // фильтрация задач по приоритету
  onFilterTasksByPriority(priority: Priority): void  {
    this.priorityFilter = priority;
    this.updateTasks();
  }

  updateTasks(): void  {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  // добавление задачи
  onAddTask(task: Task): void {

    this.dataHandler.addTask(task).subscribe(result => {

      this.updateTasksAndStat();

    });

  }

  // добавление категории
  onAddCategory(title: string): void {
    this.dataHandler.addCategory(title).subscribe(() => this.updateCategories());
  }

  updateCategories(): void {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }

  // поиск категории
  onSearchCategory(title: string): void {

    this.searchCategoryText = title;

    this.dataHandler.searchCategories(title).subscribe(categories => {
      this.categories = categories;
    });
  }
  // показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
  updateTasksAndStat(): void {

    this.updateTasks(); // обновить список задач

    // обновить переменные для статистики
    this.updateStat();

  }

  // обновить статистику
  updateStat(): void {
    zip(
      this.dataHandler.getTotalCountInCategory(this.selectedCategory),
      this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedTotalCount())

      .subscribe(array => {
        this.totalTasksCountInCategory = array[0];
        this.completedCountInCategory = array[1];
        this.uncompletedCountInCategory = array[2];
        this.uncompletedTotalTasksCount = array[3]; // нужно для категории Все
      });
  }

  // показать-скрыть статистику
  toggleStat(showStat: boolean): void {
    this.showStat = showStat;
  }

}


