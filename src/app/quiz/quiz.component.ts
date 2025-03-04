import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {

   questions = [
    {
    numb: 1,
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language"
    ]
  },
    {
    numb: 2,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet"
    ]
  },
    {
    numb: 3,
    question: "What does PHP stand for?",
    answer: "Hypertext Preprocessor",
    options: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor"
    ]
  },
    {
    numb: 4,
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language"
    ]
  },
    {
    numb: 5,
    question: "What does XML stand for?",
    answer: "eXtensible Markup Language",
    options: [
      "eXtensible Markup Language",
      "eXecutable Multiple Language",
      "eXTra Multi-Program Language",
      "eXamine Multiple Language"
    ]
  },
]


 intervalId: any;
 counter: number = 15;
 totalTime: number = 0;
 timelineWidth: number = 0;
 selectedIndex: number = 0;
 currentQuestionIndex: number = 0;
 showflag:Boolean = false;
 questionCount: number = 1;
 selectedAnswer: any;
 showTick: boolean = false;
 showTimer: string = '';
 //answered: boolean = false;
 showResultBox: boolean =false;
 showQuizBox: boolean =true;
 showStartQuiz: boolean =false;
 continueQuiz: boolean =true;

constructor() {}


ngOnInit() {
  this.showProgress(); 
}

 showProgress() { // questionSection: HTMLElement
  this.counter = 15;
  const step = 100 / 15; // Calculate the width increment per second
  this.intervalId = setInterval(() => {
    if (this.counter > 0) {
      this.timelineWidth += step; // Increment timeline width
     // this.counter--; // Decrement counter
     this.showTimer = String('0' + this.counter--).slice(-2);
    } else {
      clearInterval(this.intervalId);
      this.showflag = true;
      // Trigger selection of the correct answer once timer finishes
      const currentQuestion = this.questions[this.currentQuestionIndex];
      const correctAnswerIndex = currentQuestion.options.findIndex((option: string) => option === currentQuestion.answer);
    
      const questionSec = document.querySelector('.a-' + this.currentQuestionIndex) as HTMLElement;
      const correctOption = questionSec.querySelectorAll('.option')[correctAnswerIndex] as HTMLElement;
      const correctOptionInnerText = correctOption.innerText; // Get the correct answer text
    
      this.selectAnswer({ target: correctOption, innerText: correctOptionInnerText }, currentQuestion, questionSec);
      // if (!this.answered) {
      //   this.showCorrectAnswer();
      // }
      }
    }, 1000)
  }


  next() {
    // Reset answered flag for the next question
    //this.answered = false;
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
    console.log('this.questionCount::::', this.questionCount);
    if(this.questionCount >= this.questions.length) {
      this.showResultBox = true;
      this.showQuizBox = true;
      clearInterval(this.intervalId);
    }
 
    if(this.questionCount < this.questions.length) {
      this.questionCount++;
      this.showProgress();
    
    }
    this.showflag = false;
    this.timelineWidth = 0;
  }

  replayQuiz() {
    console.log('hi')
    this.showQuizBox = false;
    this.showResultBox = false;
   this.currentQuestionIndex = 0; 
   this.questionCount = 1;

   // Clear any visual indications from previous quiz attempts
   const allIcons = document.querySelectorAll('.icon');
   const allFas = document.querySelectorAll('.fas');
   const allOptions = document.querySelectorAll('.option');

   allIcons.forEach(icon => icon.classList.remove('tick', 'cross'));
   allFas.forEach(fas => fas.classList.remove('fa-check', 'fa-times'));
   allOptions.forEach(option => option.classList.remove('correct', 'incorrect', 'disabled'));

   this.showProgress(); 
  //this.clearVisualIndications();
    }

    // clearVisualIndications() {
    //   // Logic to clear any visual indications from previous quiz attempts
    //   // For example, you might loop through questions and reset their state
    //   for (let question of this.questions) {
    //     question.options.forEach((option: any) => {
    //      option.disabled = false;
    //       option.correct = false;
    //       option.incorrect = false;
    //     });
    //   }
    // }

  startQuiz() {
    this.showStartQuiz = true;
    this.continueQuiz = false;
  }

  continueTheQuiz() {
    this.showQuizBox = false;
    this.continueQuiz = true;
  }

  exitQuiz() {
    this.showStartQuiz = false;
  }

  selectAnswer(evt: any, question: any, questionSection: HTMLElement) {
      const selectedAnswer = evt.target.innerText; // Get the selected option text
      if (question.answer === selectedAnswer) {
        const optionIndex = question.options.indexOf(selectedAnswer);
        questionSection.querySelectorAll('.icon')[optionIndex].classList.add('tick');
        questionSection.querySelectorAll('.fas')[optionIndex].classList.add('fa-check');
        questionSection.querySelectorAll('.option')[optionIndex].classList.add('correct');
    } else {
        const optionIndex = question.options.indexOf(selectedAnswer);
      
        questionSection.querySelectorAll('.icon')[optionIndex].classList.add('cross');
        questionSection.querySelectorAll('.fas')[optionIndex].classList.add('fa-times');
        questionSection.querySelectorAll('.option')[optionIndex].classList.add('incorrect');

        const correctAnswerOptionIndex = question.options.findIndex((e:any) => e === question.answer);
        questionSection.querySelectorAll('.icon')[correctAnswerOptionIndex].classList.add('tick');
        questionSection.querySelectorAll('.fas')[correctAnswerOptionIndex].classList.add('fa-check');
        questionSection.querySelectorAll('.option')[correctAnswerOptionIndex].classList.add('correct');
    }

     // Clear timer & show next buttton
        this.showflag = true;
        clearInterval(this.intervalId);

      // Disable options after selection
      questionSection.querySelectorAll('.option').forEach((option: Element) => {
        (option as HTMLElement).classList.add('disabled');
      });
      
  }


  // showCorrectAnswer() {
  //   const question = this.questions[this.currentQuestionIndex];
  //   const correctAnswerOptionIndex = question.options.findIndex((e: any) => e === question.answer);
  //   // const questionSection = document.querySelector('.option_list'); // Assuming this is the container for questions
  //   const questionSection = document.querySelector('.question-section-' + this.currentQuestionIndex);
  //     console.log('showCorrectAnswer', questionSection);
  
  //   questionSection?.querySelectorAll('.icon')[correctAnswerOptionIndex].classList.add('tick');
  //   questionSection?.querySelectorAll('.fas')[correctAnswerOptionIndex].classList.add('fa-check');
  //   questionSection?.querySelectorAll('.option')[correctAnswerOptionIndex].classList.add('correct');
  // }
}








// // document.querySelectorAll('.option')[index].classList.add('disabled');

// const optionElement = document.querySelectorAll('.option')[index];
// optionElement.classList.add('disabled');

//  // Remove tick and cross classes
//  const iconElement1 = optionElement.querySelector('.icon');
//  const iconElement2 = optionElement.querySelector('.icon');
// if (iconElement1) {
//   iconElement1.classList.remove('tick', 'cross');
//   if(iconElement2) {
//     iconElement2.classList.remove('fa-check', 'fa-times');
//   }
// }

/*Count start from 0-15
counter: number = 0;
totalTime: number = 15;
showProgress() {
  this.counter = 0; // Reset counter to 0
        this.intervalId = setInterval(() => {
          if (this.counter < this.totalTime) {
            this.counter++;
            const percentage = (this.counter / 15) * 100;
            console.log(this.counter);
            this.timelineWidth = percentage;
          } else {
            clearInterval(this.intervalId);
            this.showflag = true;
          }
        }, 1000);
}*/


/* Element width is reducing from 100% - 0%
counter: number = 15;
totalTime: number = 0;
showProgress() {
this.intervalId =   setInterval(() => {
  if (this.counter > 0) {
    const percentage = ((this.counter - 1) / 15) * 100; // Adjust percentage calculation
    console.log(this.counter);
    this.timelineWidth = percentage;
    this.counter--; // Decrement counter
  } else {
          clearInterval(this.intervalId);
          this.showflag = true;
        //  this.timelineWidth = 100;
        }
    }, 1000)
}
  resetOptions() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
      option.classList.remove('tick', 'cross', 'disabled');
      option.querySelector('.icon')?.classList.remove('fa-check', 'fa-times');
    });
  }


*/