import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EditDetailsComponent } from '../edit-details/edit-details.component';
import { ModalComponent } from '../modal/modal.component';
import { ViewTaskComponent } from '../view-task/view-task.component';

export interface Task {
  name: string;
  type: string;
  status: 'completed' | 'pending';
  details: string;
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  dateOfJoining: string;
  contactNo: number;
  tasksAssigned: number;
  status: {
    completed: number;
    total: number;
  };
  expanded: boolean;
  tasks: Task[];
}

@Component({
  selector: 'app-hr-personnel',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    EditDetailsComponent,
    ViewTaskComponent,
  ],
  templateUrl: './hr-personnel.component.html',
  styleUrl: './hr-personnel.component.css',
})
export class HrPersonnelComponent implements OnInit {
  isModalOpen = false;
  isEditDetailsClicked = false;
  isNewHire = false;
  selectedEmployee: Employee | null = null;
  employees: Employee[] = [
    {
      id: 1267,
      name: 'Courtney Henry',
      email: 'courtney.henry@gmail.com',
      dateOfJoining: '8/21/15',
      contactNo: 232324232,
      tasksAssigned: 10,
      status: { completed: 2, total: 10 },
      expanded: false,
      tasks: [
        {
          name: 'Upload your AADHAR',
          type: 'File upload',
          status: 'completed',
          details: '',
        },
        {
          name: 'Upload your PAN card',
          type: 'File upload',
          status: 'pending',
          details: 'Pending',
        },
        {
          name: 'Read the company policy documents',
          type: 'Text input | 1 Answer submitted',
          status: 'completed',
          details: '',
        },
        {
          name: 'Submit your feedback on Pre-onboard experience',
          type: 'Text input | 1 Answer submitted',
          status: 'completed',
          details: '',
        },
      ],
    },
    {
      id: 1316,
      name: 'Marvin McKinney',
      email: 'marvin.mckinney@gmail.com',
      dateOfJoining: '2/11/12',
      contactNo: 232324232,
      tasksAssigned: 5,
      status: { completed: 4, total: 5 },
      expanded: false,
      tasks: [
        {
          name: 'Upload your AADHAR',
          type: 'File upload',
          status: 'completed',
          details: '2 Files uploaded',
        },
        {
          name: 'Upload your PAN card',
          type: 'File upload',
          status: 'pending',
          details: 'Pending',
        },
        {
          name: 'Read the company policy documents',
          type: 'Text input',
          status: 'completed',
          details: '1 Answer submitted',
        },
        {
          name: 'Submit your feedback on Pre-onboard experience',
          type: 'Text input',
          status: 'completed',
          details: '1 Answer Submitted',
        },
      ],
    },
    {
      id: 2334,
      name: 'Brooklyn Simmons',
      email: 'brooklyn.simmons@gmail.com',
      dateOfJoining: '1/28/17',
      contactNo: 232324232,
      tasksAssigned: 5,
      status: { completed: 1, total: 5 },
      expanded: false,
      tasks: [
        {
          name: 'Upload your AADHAR',
          type: 'File upload',
          status: 'completed',
          details: '',
        },
        {
          name: 'Upload your PAN card',
          type: 'File upload',
          status: 'pending',
          details: 'Pending',
        },
        {
          name: 'Read the company policy documents',
          type: 'Text input',
          status: 'completed',
          details: '',
        },
        {
          name: 'Submit your feedback on Pre-onboard experience',
          type: 'Text input',
          status: 'completed',
          details: '',
        },
      ],
    },
    {
      id: 5657,
      name: 'Eleanor Pena',
      email: 'eleanor.pena@gmail.com',
      dateOfJoining: '7/27/13',
      contactNo: 232324232,
      tasksAssigned: 10,
      status: { completed: 2, total: 10 },
      expanded: false,
      tasks: [
        {
          name: 'Upload your AADHAR',
          type: 'File upload',
          status: 'completed',
          details: '',
        },
        {
          name: 'Upload your PAN card',
          type: 'File upload',
          status: 'pending',
          details: 'Pending',
        },
        {
          name: 'Read the company policy documents',
          type: 'Text input',
          status: 'completed',
          details: '',
        },
        {
          name: 'Submit your feedback on Pre-onboard experience',
          type: 'Text input',
          status: 'completed',
          details: '',
        },
      ],
    },
    {
      id: 8911,
      name: 'Guy Hawkins',
      email: 'guy.hawkins@gmail.com',
      dateOfJoining: '7/11/2019',
      contactNo: 232324232,
      tasksAssigned: 4,
      status: { completed: 3, total: 4 },
      expanded: false,
      tasks: [
        {
          name: 'Upload your AADHAR',
          type: 'File upload',
          status: 'completed',
          details: '',
        },
        {
          name: 'Upload your PAN card',
          type: 'File upload',
          status: 'pending',
          details: 'Pending',
        },
        {
          name: 'Read the company policy documents',
          type: 'Text input',
          status: 'completed',
          details: '',
        },
        {
          name: 'Submit your feedback on Pre-onboard experience',
          type: 'Text input',
          status: 'completed',
          details: '',
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  openModal(employee: Employee | null, isNewHire = false) {
    if (this.isEditDetailsClicked) {
      if (employee === null) this.selectedEmployee = {} as Employee;
      else this.selectedEmployee = employee;
      this.isNewHire = isNewHire;
    }
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedEmployee = null;
    this.isNewHire = false;
    this.isEditDetailsClicked = false;
  }
}
