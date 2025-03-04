import { Component } from '@angular/core';

@Component({
  selector: 'app-note-pad-app',
  templateUrl: './note-pad-app.component.html',
  styleUrls: ['./note-pad-app.component.scss']
})
export class NotePadAppComponent {

  textareaValue = '';

  ngOnInit() {
   this.textareaValue =  localStorage.getItem('noteKey');
  }

  saveNote() {
    localStorage.setItem('noteKey', this.textareaValue);

  }

  removeNote() {
     localStorage.removeItem('noteKey');
     this.textareaValue = '';
  }

}
