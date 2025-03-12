import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit, AfterViewInit {
  tasks: Task[] = [];

  totalTasks: number = 0;
  completedTasks: number = 0;
  pendingTasks: number = 0;
  highPriorityTasks: number = 0;
  mediumPriorityTasks: number = 0;
  lowPriorityTasks: number = 0;

  priorityChart: any;
  completionChart: any;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.loadTasks();
    this.generateReports();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loadCharts();
    }, 500);
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
    if (this.priorityChart) {
      this.priorityChart.destroy();
    }
    if (this.completionChart) {
      this.completionChart.destroy();
    }

    const priorityCanvas = document.getElementById('priorityChart') as HTMLCanvasElement;
    if (priorityCanvas) {
      this.priorityChart = new Chart(priorityCanvas, {
        type: 'pie',
        data: {
          labels: ['High Priority', 'Medium Priority', 'Low Priority'],
          datasets: [{
            data: [this.highPriorityTasks, this.mediumPriorityTasks, this.lowPriorityTasks],
            backgroundColor: ['#ff5252', '#ffa726', '#66bb6a']
          }]
        }
      });
    }

    const completionCanvas = document.getElementById('completionChart') as HTMLCanvasElement;
    if (completionCanvas) {
      this.completionChart = new Chart(completionCanvas, {
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
}
