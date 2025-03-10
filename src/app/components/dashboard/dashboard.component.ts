import { Component } from '@angular/core';
import { Task } from '../../models/task.model';
import { Chart, registerables } from 'chart.js'; // ✅ Import Chart.js properly

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

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

  ngAfterViewInit() {
    this.loadCharts();
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

  loadCharts() {
    new Chart('priorityChart', {
      type: 'pie',
      data: {
        labels: ['High Priority', 'Medium Priority', 'Low Priority'],
        datasets: [{
          data: [this.highPriorityTasks, this.mediumPriorityTasks, this.lowPriorityTasks],
          backgroundColor: ['#ff5252', '#ffa726', '#66bb6a']
        }]
      }
    });

    new Chart('completionChart', {
      type: 'bar',
      data: {
        labels: ['Completed', 'Pending'],
        datasets: [{
          data: [this.completedTasks, this.pendingTasks],
          backgroundColor: ['#4caf50', '#f44336']
        }]
      }
    });
  }

}
