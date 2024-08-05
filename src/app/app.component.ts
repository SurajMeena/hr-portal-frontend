import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import {
  Employee,
  HrPersonnelComponent,
} from './hr-personnel/hr-personnel.component';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HrPersonnelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  currentUserId?: number;
  currentEmployee?: Employee;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private websocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.sendMessage();
    this.route.firstChild?.params.subscribe((params) => {
      console.log("params", params);
      this.currentUserId = params['employeeId'];
    });
    const baseUrl = 'http://localhost:8000/portal/';
    this.http
      .get(baseUrl + `new-hires/${this.currentUserId}`)
      .subscribe((user: any) => {
        this.currentEmployee = this.mapApiResponseToEmployee(user);
      });
  }
  sendMessage() {
    this.websocketService.sendMessage('Hello from Angular');
  }

  mapApiResponseToEmployee(user: any): Employee {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      position: user.position,
      dateOfJoining: user.start_date,
      contactNo: user.phone,
      tasksAssigned: user.totalTasks,
      status: {
        completed: user.completedTasks,
        total: user.totalTasks,
      },
      expanded: false, // Default value, can be modified as needed
      tasks: user.tasks,
      company: user.company,
    };
  }
}
