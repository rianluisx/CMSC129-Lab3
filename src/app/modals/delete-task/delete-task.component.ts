  import { Component, Inject } from '@angular/core';
  import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent} from '@angular/material/dialog';
  import { ButtonComponent } from '../../components/button/button.component';
  import { TaskService } from '../../services/task.service';
  import { Task } from '../../interfaces/task';

  @Component({
    selector: 'app-delete-task-modal',
    templateUrl: './delete-task.component.html',
    styleUrl: './delete-task.component.css',
    imports: [MatDialogContent, ButtonComponent],
  })
  export class DeleteTaskComponent {

    constructor(
      public dialogRef: MatDialogRef<DeleteTaskComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { title: string, task: Task },
      private taskService: TaskService
    ) {}

    onCancel(): void {
      this.dialogRef.close(false);
    }

    onConfirm(): void {
      this.taskService.deleteTask(this.data.task).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error deleting task:', err);
        },
      });
    }
  }
