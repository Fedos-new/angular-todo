import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Task} from 'src/app/model/Task';
import {DataHandlerService} from '../../service/data-handler.service';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>, // для возможности работы с д.окном
    @Inject(MAT_DIALOG_DATA) private data: [Task, string], // данные, которые передали в д.окно
    private dataHandler: DataHandlerService, // ссылка на сервис для работы с данными
    private dialog: MatDialog, // для открытия нового диалогового окна(из текущего) - например для потв.удаления
  ) {
  }

  dialogTitle: string;
  task: Task; // задача для редактирования/создания
  tmpTitle: string;

  ngOnInit(): void {
    this.task = this.data[0];
    this.dialogTitle = this.data[1]; // текст для д.окна
    this.tmpTitle = this.task.title;
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onConfirm(): void {
    this.task.title = this.tmpTitle;
    // закрываем окно и перадаем измененную/новую задачу в компонент откуда вызван д.окно
    this.dialogRef.close(this.task);
  }

}
