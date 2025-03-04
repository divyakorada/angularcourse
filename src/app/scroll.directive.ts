import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {

  constructor(private eleRef: ElementRef) { }

 // @HostListener('window:scroll')
 @HostListener('window:scroll', ['$event'])
  onWindowScroll($event: any) {
      console.log("scrolling...");
  }
  @HostListener('click') clicked() {
    let elementDiv =  this.eleRef.nativeElement
  //  let elementDiv =  this.eleRef.nativeElement.classList.add('kishi');
     console.log('elementDiv::::', elementDiv);
     let headerOffset = 100;
     let elementPosition = elementDiv.getBoundingClientRect().top;
     console.log('elementPosition::::',  window.scrollY);
     let offsetPosition = elementPosition + window.scrollY - headerOffset;
   
   window.scrollTo({
       top: offsetPosition,
       behavior: "smooth"
   })
  }

}
