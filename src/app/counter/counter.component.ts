import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {

  counter: number = 0;


  ngOnInit() {
      // Retrieve counter value from localStorage on component initialization
    const storedCounter  = localStorage.getItem('counter');
    if(storedCounter !== null) {
      this.counter = parseInt(storedCounter);
    }
  }


  increment() {
    this.counter++;
    localStorage.setItem('counter', this.counter.toString());
    this.saveCounter();
  }
  decrement() {
    this.counter--;
    localStorage.setItem('counter', this.counter.toString());
    this.saveCounter();
  }
  reset() {
    this.counter = 0;
    this.saveCounter();
  }
  saveCounter() {
    // Save counter value to localStorage
    localStorage.setItem('counter', this.counter.toString());
  }
}
