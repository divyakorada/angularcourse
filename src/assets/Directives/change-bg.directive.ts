import { AfterViewInit, Directive, ElementRef, HostListener, Input, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective implements AfterViewInit{

  @Input() isCorrect: boolean =false;
  @Input() doneAnswered: boolean = false;
//  @ViewChild ('icon') iconElement!: ElementRef;
 // @ViewChildren('icon', {}) iconElements: QueryList<ElementRef>;
 iconElement!: HTMLElement;
 private answered: boolean = false;

// allOptions!: HTMLElement;

 

  constructor(private eleRef: ElementRef, private renderer: Renderer2) { }
  ngOnChanges() {
    if (!this.doneAnswered) {
      console.log('hi');
    //  this.renderer.addClass(this.eleRef.nativeElement, 'disabled');
    }
    
  }

  ngAfterViewInit() {
    /*  @viewChild approch didn't work */
      // setTimeout(() => {
      //   if(this.iconElement) {
      //     console.log('native', this.iconElement?.nativeElement);
      //     this.renderer.addClass(this.iconElement?.nativeElement, 'tick');
      //     this.renderer.addClass(this.iconElement?.nativeElement?.querySelector('.fas'), 'fa-check'); 
      // } else {
      //     this.renderer.removeClass(this.iconElement.nativeElement, 'tick');
      //     this.renderer.removeClass(this.iconElement.nativeElement.querySelector('.fas'), 'fa-check'); 
      // }
      // }, 2000)
    // /*  @viewChildren approch didn't work */
      // setTimeout(() => {
      //   console.log('hi', this.iconElements);
      //   this.iconElements?.forEach(iconElement => {
      //     if (this.isCorrect) {
      //       this.renderer.addClass(iconElement.nativeElement, 'tick');
      //       this.renderer.addClass(iconElement.nativeElement.querySelector('.fas'), 'fa-check');
      //     }
      //   });
      // }, 0);
  
    this.iconElement = this.eleRef.nativeElement.querySelector('.icon');
  }

   @HostListener('click') answer() {
    
    if (!this.answered) {
      const allOptions = document.querySelectorAll('.option');
      allOptions.forEach(option => {
        this.renderer.addClass(option, 'disabled');
      });
  
  
    if(this.isCorrect) {
      this.renderer.setStyle(this.eleRef.nativeElement, 'background', '#d4edda');
      this.renderer.setStyle(this.eleRef.nativeElement, 'color', '#155724');
      this.renderer.setStyle(this.eleRef.nativeElement, 'border', '2px solid #c3e6cb');
      this.renderer.addClass(this.iconElement, 'tick');
      this.renderer.addClass(this.iconElement?.querySelector('.fas'), 'fa-check');
      
    } else {
      this.renderer.setStyle(this.eleRef.nativeElement, 'background', '#f8d7da');
      this.renderer.setStyle(this.eleRef.nativeElement, 'color', '#721c24');
      this.renderer.setStyle(this.eleRef.nativeElement, 'border', '2px solid #f5c6cb');
       this.renderer.removeClass(this.iconElement, 'tick');
       this.renderer.removeClass(this.iconElement.querySelector('.fas'), 'fa-check');
       this.renderer.addClass(this.iconElement, 'cross');
       this.renderer.addClass(this.iconElement.querySelector('.fas'), 'fa-times');
    }
    this.answered = true;
  
  }
    
  }



/* using event delegation 
  @HostListener('click', ['$event']) answer(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const optionElement = clickedElement.closest('.option');
    const iconElement = optionElement?.querySelector('.icon');
    const fasElement = iconElement?.querySelector('.fas');
    if (this.isCorrect) {
      this.renderer.addClass(iconElement, 'tick');
      this.renderer.addClass(fasElement, 'fa-check');
    } else {
      this.renderer.removeClass(iconElement, 'tick');
      this.renderer.removeClass(fasElement, 'fa-check');
    }
  }
  */
}


// https://stackblitz.com/edit/angular-sqarxd-aayyv1?file=src%2Fapp%2Fapp.component.ts,src%2Fapp%2Fapp.component.html