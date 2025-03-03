import { Component } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  tasks: Task[] = [
    { id: 1, title: "Complete Angular Project", description: "Finish UI and backend integration", dueDate: "2025-03-10", priority: "High", completed: false },
    { id: 2, title: "Read a Book", description: "Finish reading 'Atomic Habits'", dueDate: "2025-03-12", priority: "Medium", completed: false },
    { id: 3, title: "Workout", description: "Morning Yoga and Strength Training", dueDate: "2025-03-15", priority: "Low", completed: true }
  ];

  toggleCompletion(task: Task) {
    task.completed = !task.completed;
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  getPriorityClass(priority: string) {
    return {
      'high-priority': priority === 'High',
      'medium-priority': priority === 'Medium',
      'low-priority': priority === 'Low'
    };
  }

}
