import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HrPersonnelComponent } from './hr-personnel/hr-personnel.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HrPersonnelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // TODO: add the header for whole app
  title = 'hr-portal';
}
