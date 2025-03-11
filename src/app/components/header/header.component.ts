import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faNoteSticky } from '@fortawesome/free-regular-svg-icons';
import { ButtonComponent } from '../button/button.component';
import { faPlus, faPencil } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddTaskComponent } from '../../modals/add-task/add-task.component';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';




@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule, ButtonComponent, MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  text: string = '';
  faNoteSticky = faNoteSticky;
  faPlus = faPlus;
  faPencil = faPencil;

  tasks: Task[] = [];

  readonly dialog = inject(MatDialog);

  constructor(private taskService: TaskService) {}



  openDialog() {
    const dialogRef = this.dialog.open(AddTaskComponent);

    dialogRef.afterClosed().subscribe((newTaskAdded) => {
      if (newTaskAdded) {
        this.tasks.push(newTaskAdded);
      }
    });
  }
}
