import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Category} from 'src/app/model/Category';
import {Task} from 'src/app/model/Task';
import {DataHandlerService} from '../../service/data-handler.service';
import {Priority} from '../../model/Priority';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  priorities: Priority[];
  categories: Category[];
  dialogTitle: string;
  task: Task; // задача для редактирования/создания
  tmpTitle: string;
  tmpCategory: Category;
  tmpPriority: Priority;
  tmpDate: Date;

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>, // для возможности работы с д.окном
    @Inject(MAT_DIALOG_DATA) private data: [Task, string], // данные, которые передали в д.окно
    private dataHandler: DataHandlerService, // ссылка на сервис для работы с данными
    private dialog: MatDialog, // для открытия нового диалогового окна(из текущего) - например для потв.удаления
  ) {
  }


  ngOnInit(): void {
    this.task = this.data[0];
    this.dialogTitle = this.data[1]; // текст для д.окна
    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category;
    this.tmpPriority = this.task.priority;
    this.tmpDate = this.task.date;

    this.dataHandler.getAllCategories().subscribe(c => this.categories = c);
    this.dataHandler.getAllPriorities().subscribe(p => this.priorities = p);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onConfirm(): void {
    // то что ввел пользователь записываем в task
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    this.task.date = this.tmpDate;
    // закрываем окно и перадаем измененную/новую задачу в компонент откуда вызван д.окно
    this.dialogRef.close(this.task);

  }

  delete(): void {
    // открытие диалового окна
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '30%',
      data: {
        dialogTitle: 'Подтвердите удаление',
        message: `Вы действительно хотите удалить задачу: "${this.task.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      // обработка результатов
      if (result) {
        this.dialogRef.close('delete'); // нажали удалить
      }
    });
  }
  active(): void {
    this.dialogRef.close( 'activate');
  }
  complete(): void {
    this.dialogRef.close( 'complete');
  }

}
