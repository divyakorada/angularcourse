import { Component } from '@angular/core';

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.scss']
})
export class PasswordGeneratorComponent {

  passwordLength: any;
  numberCheck = false;
  letterCheck = false;
  symbolCheck = false;

  numbers = "123456789";
  letters = "QWERTYUIOPASDFGHJKLŞZXCVBNMÖÇ";
  symbols = "!'^+%&/()=";
  password: any = '';
  passwordVisible =false;

  generate() {
    let x = '';
    let final = '';
    this.password = '';

    if(this.numberCheck) {
      x += this.numbers;
    }
    if(this.letterCheck) {
      x += this.letters;
    }
    if(this.symbolCheck) {
      x += this.symbols;
    }
    console.log('x', x);

  //   let index =  Math.floor(Math.random() * x.length);
  //   let final = x[index];
  //  console.log('index', index); 
  //  console.log('final', final); 
  //  this.password += final;

    for(let i=0; i < this.passwordLength; i++) {
      let index =  Math.floor(Math.random() * x.length);
        final += x[index];
    }
    this.password += final;
  }

  pwdLength(value: string) {
    const parsedval = parseInt(value);
    console.log('a:', parsedval);
    if(isNaN(parsedval)) {
      alert('Please enter numberic value')
    } else {
      this.passwordLength = parsedval;
    }
  }

}
