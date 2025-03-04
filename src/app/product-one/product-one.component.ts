import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

interface Todo {
  task: string;
  editing: boolean;
  isChecked?: boolean;
}

@Component({
  selector: 'app-product-one',
  templateUrl: './product-one.component.html',
  styleUrls: ['./product-one.component.scss']
})
export class ProductOneComponent implements OnInit{
  newTodo = '';
  todos: Todo[] = [];
  repeatedListItem = false;
  // showRemainingList: Boolean = true;
  totalListLength: number = 0;
  uncompletedTask: any;
  singleCheckbox: any;
  selectAll = false;
  showSelectedListItemCount: any;
  selectAllDisabled: any = false;

  ngOnInit(): void {
    const storedTodos = localStorage.getItem('todos');
    if(storedTodos) {
      this.todos = JSON.parse(storedTodos);
      this.updateList();
    }
  }

 
   addList(): void {
    if (this.newTodo.trim() !== '') {
      if (!this.todos.find(todo => todo.task === this.newTodo)) {
        this.todos.push({ task: this.newTodo, editing: false });
        this.newTodo = '';
        this.repeatedListItem = false;
        this.totalListLength = this.todos.length;
        localStorage.setItem('todos', JSON.stringify(this.todos));
        this.updateList();
      
      } else {
        this.repeatedListItem = true;
      }
    }
  }

  
  edit(index: number): void {
    this.todos[index].editing = !this.todos[index].editing;
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  delete(index: number): void {
    this.todos.splice(index, 1);
    this.totalListLength = this.todos.length;
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.updateList();
  }

  selectSingleListItem(checkUncheck?: any) {
   this.updateList();
   this.singleCheckbox = checkUncheck;
   this.showSelectedListItemCount = this.todos.filter(x => x.isChecked);
  }

  clearCompletedTasks() {
  this.todos = this.todos.filter(todo => !todo.isChecked);
 // this.updateList();
  this.singleCheckbox = false;
  this.selectAll = false;
  }

  updateList() {
    this.uncompletedTask = this.todos.filter(e => !e.isChecked);
    //this.showRemainingList = this.uncompletedTask.length > 0;
    
   if(!this.todos.length) {
    this.selectAllDisabled = true;
   } else {
    this.selectAllDisabled = false;
   }
  }

  selectAllListItems() {
   this.todos.forEach(e => e.isChecked = this.selectAll);
   this.singleCheckbox = false;
  this.selectSingleListItem();
  }

}






















// if(this.uncompletedTask.length > 0) {
      //  this.showRemainingList = !this.showRemainingList;
      // }

// getVal(val:string) {
//   if(val) {
//   }
// }

  // addList() {
  //   if (this.newTodo.trim() === '') {
  //     // Show a message or handle as needed
  //     return;
  //   }
  //   console.log('hihi')
  //   let showMsg = this.todos.some(e => e === this.newTodo);
   
  //   if(showMsg) {
  //     this.repeatedListItem = true;
  //     this.newTodo = '';
    
  //   } else {
  //     this.todos.push(this.newTodo);
  //     this.newTodo = '';
  //     this.repeatedListItem = false;
  //   //  this.originalListItem = true;
  //   }
  // }

  // edit(index:any) {
  //  // this.nameInput.setValue('John Doe');
  // // this.editTodoValue = this.todos[this.selectedTodoIndex];
  // // this.divya1.nativeElement.style.display = 'none';
  //   this.divya2.nativeElement.style.display = 'block';
  //   this.editing = false;
  //   this.editButton = false;
  //   this.saveButton = true;
  // //  this.item = this.todos;
  //  // this.originalListItem = false;
  //  // this.afterEditedItem = false;
  //   this.item = this.todos[index];
    
  // }

  // save(index:any) {
  //   this.divya2.nativeElement.style.display = 'none';
  //   this.editButton = true;
  //   this.saveButton = false;
  // //  this.item =
  //  // this.originalListItem = false;
  // //  this.afterEditedItem = true;
  // }

  // saveEdit() {
  //   // Update the todo item with the edited value
  //   this.todos[this.selectedTodoIndex] = this.editTodoValue;
    
  //   // Reset the selectedTodoIndex and editTodoValue
  //   this.selectedTodoIndex = -1;
  //   this.editTodoValue = '';
  // }

  // myFunction(event:any) {
  //   //  console.log('$target::::',this.divya.nativeElement.event);
   
      
  //     if(event.target.value === '') {
  //      // this.addList();
  
  //     // this.divya.nativeElement.event.preventDefault();
  //     //  console.log('!this.isValueCheck;::::',this.isValueCheck);
  //     //  this.isValueCheck = true;
  //     //  this.addBtn = false;
  //     // this.divya.nativeElement.classList.add('mypointer');
  //     // $event.preventDefault();
  //     } else {
  //     //  !this.isValueCheck;
  //      // this.addBtn = true;
  //      // this.divya.nativeElement.classList.remove('mypointer');
  //     }
  
  //   }
  