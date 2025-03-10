import { Component } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

  tasks: Task[] = [];

  totalTasks: number = 0;
  completedTasks: number = 0;
  pendingTasks: number = 0;
  highPriorityTasks: number = 0;
  mediumPriorityTasks: number = 0;
  lowPriorityTasks: number = 0;

  ngOnInit() {
    this.loadTasks();
    this.generateReports();
  }

  loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  generateReports() {
    this.totalTasks = this.tasks.length;
    this.completedTasks = this.tasks.filter(task => task.completed).length;
    this.pendingTasks = this.tasks.filter(task => !task.completed).length;
    this.highPriorityTasks = this.tasks.filter(task => task.priority === 'High').length;
    this.mediumPriorityTasks = this.tasks.filter(task => task.priority === 'Medium').length;
    this.lowPriorityTasks = this.tasks.filter(task => task.priority === 'Low').length;
  }

}
