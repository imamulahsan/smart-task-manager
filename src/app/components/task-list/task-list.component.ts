import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{

  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  taskToEdit: Task | null = null;
  selectedPriority: string = '';
  selectedStatus: string = '';

  constructor() {}

  ngOnInit() {
    this.loadTasks();
  }

  addTask(newTask: Task) {
    this.tasks.push(newTask);
    this.saveTasks();
    this.filterTasks(); // Re-filter tasks after adding
  }

  editTask(task: Task) {
    this.taskToEdit = { ...task };
  }

  updateTask(updatedTask: Task) {
    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
    this.taskToEdit = null;
    this.saveTasks();
    this.filterTasks();
  }

  toggleCompletion(task: Task) {
    task.completed = !task.completed;
    this.saveTasks();
    this.filterTasks();
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks();
    this.filterTasks();
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
    this.filterTasks();
  }

  /*** 📌 Filter Tasks Based on User Selection ***/
  filterTasks() {
    this.filteredTasks = this.tasks.filter(task => {
      const priorityMatch = this.selectedPriority ? task.priority === this.selectedPriority : true;
      const statusMatch =
        this.selectedStatus === 'completed' ? task.completed :
        this.selectedStatus === 'notCompleted' ? !task.completed :
        true;
      return priorityMatch && statusMatch;
    });
  }

  /*** 📌 Sort Tasks by Due Date ***/
  sortByDueDate() {
    this.filteredTasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }

  getPriorityClass(priority: string) {
    return {
      'high-priority': priority === 'High',
      'medium-priority': priority === 'Medium',
      'low-priority': priority === 'Low'
    };
  }
}
