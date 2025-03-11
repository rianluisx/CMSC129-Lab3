import { Component, inject } from '@angular/core';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from '../button/button.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteTaskComponent } from '../../modals/delete-task/delete-task.component';
import { EditTaskComponent } from '../../modals/edit-task/edit-task.component';
import { AddTaskComponent } from '../../modals/add-task/add-task.component';

@Component({
  selector: 'app-tasks',
  imports: [FontAwesomeModule, ButtonComponent, MatDialogModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  isFetching: boolean = true;
  tasks: Task[] = [];

  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;

  sortBy: string = 'dateAdded';

  readonly dialog = inject(MatDialog);

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTask().subscribe((tasks) => (this.tasks = tasks));
  }

  get sortedTasks(): Task[] {
    return [...this.tasks].sort((a, b) => {
      if (this.sortBy === 'dateAdded') {
        return (
          new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
        );
      } else if (this.sortBy === 'dueDate') {
        const dateA = new Date(`${a.dueDate} ${a.dueTime}`);
        const dateB = new Date(`${b.dueDate} ${b.dueTime}`);
        return dateA.getTime() - dateB.getTime();
      } else if (this.sortBy === 'priority') {
        const priorityOrder: Record<'High' | 'Medium' | 'Low', number> = {
          High: 1,
          Medium: 2,
          Low: 3,
        };

        return (
          priorityOrder[a.priority as 'High' | 'Medium' | 'Low'] -
          priorityOrder[b.priority as 'High' | 'Medium' | 'Low']
        );
      }
      return 0;
    });
  }

  toggleTaskDone(task: Task) {
    task.status = !task.status;

    this.taskService.updateToggle(task).subscribe({
      next: (updatedTask) => {
        console.log('Task updated successfully:', updatedTask);
      },
      error: (err) => {
        console.error('Error updating task:', err);
        task.status = !task.status;
      },
    });
  }

  changeSorting(criteria: string) {
    this.sortBy = criteria;
  }

  openEditDialog(task: Task) {
    console.log('Editing Task ', task);
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: { task },
    });

    dialogRef.afterClosed().subscribe((wasEdited) => {
      if (wasEdited) {
        this.tasks = this.tasks.map((t) =>
          t.id === wasEdited.id ? wasEdited : t
        );
      }
    });
  }

  openDeleteDialog(task: Task) {
    console.log('Deleting Task:', task);
    const dialogRef = this.dialog.open(DeleteTaskComponent, {
      data: { task: task },
    });

    dialogRef.afterClosed().subscribe((wasDeleted) => {
      if (wasDeleted) {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
      } else {
        console.log('Cancelled deleting');
      }
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddTaskComponent);

    dialogRef.afterClosed().subscribe((newTaskAdded) => {
      if (newTaskAdded) {
        this.tasks.push(newTaskAdded);
      }
    });
  }
}
