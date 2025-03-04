import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, Renderer2, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';

@Component({
  selector: 'app-quiz-improved',
  templateUrl: './quiz-improved.component.html',
  styleUrls: ['./quiz-improved.component.scss']
})
export class QuizImprovedComponent implements OnInit, AfterViewInit {

  questionList: any[] = [];
 timer: any;
  remainingTime: number = 15;
  currentQuestion: number = 0;
  checkClass: boolean = false;
  showQuizBox: boolean = true;
  continueQuiz: boolean = false;
  private answered: boolean = false;
  items = ['item1', 'item2', 'item3'];

  @ViewChild('inputValue') nameInput: ElementRef;
  @ViewChildren('allOptions') totalOptions: QueryList<ElementRef>;

  @ViewChildren('sample') abc: QueryList<ElementRef>;
  constructor(private http: HttpClient, private renderer: Renderer2) {}

  ngOnInit() {
  this.http.get<any>("../../assets/question.json").subscribe((res:any) => {
    this.questionList = res.questions;
    console.log('questionList', this.questionList);
  });

  this.timer = interval(1000).subscribe(t => {
      this.remainingTime--;
 })
 setTimeout(() => this.timer.unsubscribe(), 15000);
 localStorage.getItem("inputValue");

}

ngAfterViewInit() {
    // console.log('allOptions::::', this.allOptions);
    // if (!this.answered && this.allOptions) {
    //   //  const options = this.allOptions.nativeElement.querySelectorAll('.option');
    //   this.allOptions.forEach((option:any) => {
    //     console.log('option::::', option);
    //       this.renderer.addClass(option, 'disabled');
    //     });
    //   }
    //   this.answered = true;
    // console.log('allOptions::::', this.allOptions);
    // this.allOptions.forEach(e => {
    //   console.log('hello', e.nativeElement);
    // })

    // console.log('allOptions1', this.totalOptions);
    // console.log(this.totalOptions.forEach(e => {
    //   console.log('allOptions3', e.nativeElement);
    // }));
    this.totalOptions.changes.subscribe((changes: QueryList<ElementRef>) => {
      console.log('Total options changed:', changes.forEach(element => {
        console.log('changed', element.nativeElement);
      //  this.renderer.addClass(element.nativeElement, 'disabled'); 
      }));
    });
    console.log('new', this.abc)
    console.log('new1', this.abc.forEach(element => {
      console.log('element', element.nativeElement);
    }));
}

  next() {
    console.log('this.currentQuestion', this.currentQuestion);
    if(this.currentQuestion  < this.questionList.length - 1) {
      this.currentQuestion++;
    }
  }


  continueTheQuiz() {
    this.continueQuiz = true;
    this.showQuizBox = false;
    localStorage.setItem('inputValue', this.nameInput.nativeElement.value);
  }

}


  

