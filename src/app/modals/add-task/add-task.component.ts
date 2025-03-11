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
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  addTaskForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddTaskComponent>,
    private taskService: TaskService
  ) {
    this.addTaskForm = this.formBuilder.group({
      title: ['', Validators.required],
      priority: ['Medium', Validators.required],
      dueDate: ['', Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onAdd(): void {
    if (this.addTaskForm.valid) {
      const newTask = {
        ...this.addTaskForm.value,
        dateAdded: new Date().toISOString(), 
      };

      this.taskService.addTask(newTask).subscribe({
        next: (task) => {
          console.log('Task added successfully:', task);
          this.dialogRef.close(task);
        },
        error: (err) => console.error('Error adding task:', err),
      });
    }
  }
}
