import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {

  @Output() taskAdded = new EventEmitter<Task>(); // Event to send new task to parent component

  task: Task = {
    id: Math.floor(Math.random() * 1000), // Temporary unique ID
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    completed: false
  };

  submitTask() {
    this.taskAdded.emit(this.task); // Emit event to parent
    this.resetForm();
  }

  resetForm() {
    this.task = {
      id: Math.floor(Math.random() * 1000),
      title: '',
      description: '',
      dueDate: '',
      priority: 'Medium',
      completed: false
    };
  }

}
