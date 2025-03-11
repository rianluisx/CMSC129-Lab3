import { Component} from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from '@coreui/angular';

@Component({
  selector: 'app-root',
  imports: [HomeComponent, ReactiveFormsModule, ToastModule],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = '';

  constructor() {}

  ngOnInit(): void {}
}
