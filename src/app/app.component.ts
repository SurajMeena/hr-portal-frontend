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
  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.sendMessage();
  }
  sendMessage() {
    this.websocketService.sendMessage('Hello from Angular');
  }
}
