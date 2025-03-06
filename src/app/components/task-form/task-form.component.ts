import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {

  @Output() taskAdded = new EventEmitter<Task>();
  @Output() taskUpdated = new EventEmitter<Task>();
  @Input() taskToEdit: Task | null = null;

  task: Task = {
    id: Math.floor(Math.random() * 1000),
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    completed: false
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['taskToEdit'] && this.taskToEdit) {
      this.task = { ...this.taskToEdit }; // Pre-fill the form for editing
    }
  }

  submitTask() {
    if (this.taskToEdit) {
      this.taskUpdated.emit(this.task); // Emit event when updating
    } else {
      this.taskAdded.emit(this.task); // Emit event when adding a new task
    }
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
