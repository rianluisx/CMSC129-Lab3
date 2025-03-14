import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  imports: [MatDialogContent, ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  addTaskForm: FormGroup;

  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddTaskComponent>,
    private taskService: TaskService
  ) {
    this.addTaskForm = this.formBuilder.group({
      title: ['', Validators.required],
      priority: ['Medium', Validators.required],
      dueDate: ['', Validators.required],
      dueTime: ['', Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  get title() {
    return this.addTaskForm.get('title');
  }

  onAdd(): void {
    this.submitted = true;

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
    } else {
      this.addTaskForm.markAllAsTouched();
    }
  }
}
