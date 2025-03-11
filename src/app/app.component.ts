import { Component, inject } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [HomeComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = '';

  constructor() {}

  ngOnInit(): void {}
}
