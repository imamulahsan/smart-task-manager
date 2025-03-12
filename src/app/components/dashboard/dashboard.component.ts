import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { Chart, registerables } from 'chart.js'; // ✅ Import Chart.js properly

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
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
    Chart.register(...registerables); // ✅ Register Chart.js modules
  }

  ngOnInit() {
    this.loadTasks();
    this.generateReports();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loadCharts(); // ✅ Ensure charts load after view initialization
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
    // ✅ Destroy existing chart instances before creating new ones
    if (this.priorityChart) {
      this.priorityChart.destroy();
    }
    if (this.completionChart) {
      this.completionChart.destroy();
    }

    // ✅ Pie Chart for Task Priority
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

    // ✅ Bar Chart for Task Completion Status
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
