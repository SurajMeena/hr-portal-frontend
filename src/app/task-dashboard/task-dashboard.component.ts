import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Employee, Task } from '../hr-personnel/hr-personnel.component';
import { ModalComponent } from '../modal/modal.component';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [CommonModule, ModalComponent, TaskComponent],
  templateUrl: './task-dashboard.component.html',
  styleUrl: './task-dashboard.component.css',
})
export class TaskDashboardComponent {
  @Input() tasks: Task[] = [];
  @Input() edit: boolean = false;
  isModalOpen = false;
  selectedTask: Task | null = null;

  openModal(task: Task): void {
    this.isModalOpen = true;
    this.selectedTask = task;
  }
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedTask = null;
  }
}
