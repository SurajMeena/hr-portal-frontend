import { Component } from '@angular/core';
import { Task } from '../hr-personnel/hr-personnel.component';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.css',
})
export class ViewTaskComponent {
  task: Task = {
    name: 'Upload your AADHAR',
    type: 'File upload',
    status: 'completed',
    details: '',
  };
}
