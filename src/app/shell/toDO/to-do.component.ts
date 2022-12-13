import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Guid } from "guid-typescript";
import { NgForm } from '@angular/forms';
import { ToDo } from '../model';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit, OnDestroy{

  @Input() isMobileView: boolean | undefined;

  todos: ToDo[] = [];
  activeTodos: ToDo[] = []
  completeTodos: ToDo[] = []
  menuLists = ['All', 'Active', 'Completed']
  selectedList: any;
  constructor() { }

  ngOnInit(): void {
    this.selectedList = this.menuLists[0];
    console.log(this.isMobileView)
  }

  openMenuList(menuList: any) {
    this.selectedList = menuList;
  }

  onSubmit(form: NgForm): void {
    let todo = new ToDo(Guid.create(), form.value.title, false);
    this.todos.push(todo);
    this.activeTodos.push(todo);
    form.resetForm();
  }

  onDelete(id: Guid): void {
    let todo = this.todos.filter(x => x.id === id)[0];
    let index = this.todos.indexOf(todo, 0);
      if (index > -1) {
        this.todos.splice(index,1)
    }
  }

  onComplete(id: Guid): void {
    let todo = this.todos.filter(x => x.id === id)[0];
    todo.isComplete = true;
    this.completeTodos.push(todo);
    console.log(this.completeTodos)
    let difference = this.todos.filter(x => !this.completeTodos.includes(x)).concat(this.completeTodos.filter(x => !this.todos.includes(x)));
    this.activeTodos = difference;
    console.log(this.activeTodos)
  }

  onClearComplete(): void {
    let difference = this.todos.filter(x => !this.completeTodos.includes(x)).concat(this.completeTodos.filter(x => !this.todos.includes(x)));
    this.todos = difference;
    this.completeTodos = [];
  }

  ngOnDestroy(): void {}
}
