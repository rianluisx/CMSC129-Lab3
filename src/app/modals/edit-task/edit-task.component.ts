import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
} from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  imports: [MatDialogContent, ReactiveFormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
})
export class EditTaskComponent {
  editTaskForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
    private taskService: TaskService
  ) {
    this.editTaskForm = this.formBuilder.group({
      title: [data.task.title, Validators.required],
      priority: [data.task.priority, Validators.required],
      dueDate: [data.task.dueDate, Validators.required],
      dueTime: [data.task.dueTime, Validators.required],
      dateAdded: [data.task.dateAdded, Validators.required],
    });
  }

  get title() {
    return this.editTaskForm.get('title');
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSave(): void {
    console.log('test');
    this.submitted = true;

    if (this.editTaskForm.valid) {
      const updatedTask = {
        ...this.data.task,
        ...this.editTaskForm.value,
        dateAdded: new Date().toISOString(),
      };

      this.taskService.editTask(updatedTask).subscribe({
        next: (task) => {
          console.log('Task updated successfully:', task);
          this.dialogRef.close(task);
        },
        error: (err) => console.error('Error updating task:', err),
      });
    } else {
      this.editTaskForm.markAllAsTouched();

    }
  }
}
