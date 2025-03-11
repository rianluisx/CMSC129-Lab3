import { Component } from '@angular/core';
import { HeaderComponent } from "../components/header/header.component";
import { TasksComponent } from "../components/tasks/tasks.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, TasksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

}
