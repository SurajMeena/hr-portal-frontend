import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Task } from '../hr-personnel/hr-personnel.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
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
  @Input() edit: boolean = false;

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }
  onDrop(event: DragEvent): void {
    event.preventDefault();
    console.log('Dropped');
  }

  onDragLeave(event: DragEvent): void {
    console.log('Drag left');
  }
}
