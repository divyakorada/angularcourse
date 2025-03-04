import { Component, ElementRef, ViewChild, AfterViewInit, HostListener, Renderer2, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  // @ViewChild('header', { static: false }) hello!: ElementRef;


  // @HostListener('window:scroll')  
  // onScroll() {
  //   console.log('Window scrolled!', window.scrollY);
  //   if( window.scrollY > 100) {
  //     this.hello.nativeElement.classList.add('divya');
  //   } else {
  //     this.hello.nativeElement.classList.remove('divya');
  //   }
  // }
  


  constructor(private renderer: Renderer2, private router: Router) {}
  ngOnInit() {
    this.isPrime(7);
    this.duplicate();
    this.secondlar(this.array1);
    this.getData();
    this.unique();
    this.maxFunction(this.arrNumber);
    this.prime(7);
    this.checkPrime(7);
   }

  // @HostListener('document:scroll')
  // onScroll() {
  //   console.log('document scrolled!', document.documentElement.scrollTop);
  //   if( document.documentElement.scrollTop > 100) {
  //     this.hello.nativeElement.classList.add('divya');
  //   } else {
  //     this.hello.nativeElement.classList.remove('divya');
  //   }
  // }


  /* 1st approch */
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

  /* 2nd approch but no smooth scroll(its kind a jumping)*/
  goToPart(fragment: any) {
      this.router.navigateByUrl('#'+fragment);
     console.log('window hi:::::', window.scrollTo(100, 400)); 
  }

/*  // Remove top header height
  scrollToTargetAdjusted() {
    let elementDiv = document.getElementById('about');
    let headerOffset = 45;
    let elementPosition = elementDiv?.getBoundingClientRect().top;
    let offsetPosition = elementPosition? + window.scrollY - headerOffset;
  
  window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
  });   
}*/

 isPrime(num) { 

  if (num <= 1) return false; 

  for (let i = 2; i <= Math.sqrt(num); i++) { 

    if (num % i === 0) return false; 

  } 
  return true; 
}

 duplicate() {
  let arr = [1,2,2,3,4,4,5,6,6];
  let unique = arr.filter(e => { 
    console.log('index::::', arr.indexOf(e));
    console.log('last::::', arr.lastIndexOf(e));
    return arr.indexOf(e) !== arr.lastIndexOf(e);
    
  });
console.log('unique', unique);
}

array1 = [3,4,5,2,6];

 secondlar(arr) {
  let largest = arr[0];
  let secondlargest = arr[0];
  for(let i=1; i<=arr.length; i++) {
      if(arr[i] > largest) {
          secondlargest = largest;
          largest = arr[i];
      } else if(arr[i] > secondlargest) {
          secondlargest = arr[i]
      }
  }
  return secondlargest;
}

getData() {
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then(e => {
    console.log('response', e)
    if (!e.ok) {
      throw new Error('Network response was not ok');
    }
    return e.json(); // Parse JSON response
  })
  .then(data => {
    // Do something with the data
    console.log('data', data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}

unique() {
  let arr = [1,2,2,3,4,4,5,6,6,7]

let x = arr.filter(e => { 
  arr.indexOf(e) === arr.lastIndexOf(e)
});
return x;

}
arrNumber=[1,9,87,65,655];
maxFunction(arr) {
 
 // const x = (arr) => {
    return arr.reduce((pre,cur) => {
      return pre > cur ? pre : cur;
    });
  //}
}

 prime (n) {
  let result;
    if(n == 1) {
      console.log(`${n} is not prime neither composite`)
    }
    else if(n < 1) {
      console.log(`prime number of ${n} is not possible`)
    } else {
      for(let i=2; i<n; i++) {
        if(n%i == 0) {
           result = `${n} is not a prime number`;
           break;
        } else {
           result = `${n} is a prime number`;
        }
      }
      console.log(result);
    }

}

 checkPrime(n) {
  if (n === 1) {
    console.log(`${n} is neither prime nor composite.`);
    return;
  }
  if (n < 1) {
    console.log(`Prime number of ${n} is not possible.`);
    return;
  }

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      console.log(`${n} is not a prime number.`);
      return;
    }
  }

  console.log(`${n} is a prime number.`);
}

  
}
