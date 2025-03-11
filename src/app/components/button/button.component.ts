import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() isDisabled: boolean = false;
  @Output() handleClick = new EventEmitter();
  @Input() btnClass: string = '';
  @Input() icon: any;


  onClick() {
    this.handleClick.emit();
  }
}
