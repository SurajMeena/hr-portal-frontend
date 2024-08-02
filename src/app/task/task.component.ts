import { Component } from '@angular/core';
import { Task } from '../hr-personnel/hr-personnel.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  task: Task = {
    name: 'Upload your AADHAR',
    type: 'File upload',
    status: 'completed',
    details: '',
  };
}
