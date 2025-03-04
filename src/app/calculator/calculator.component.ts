import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
    result: any;
    expression: string = '';
    lastValidResult: any = null;

    getNumber(val: any) {
        // if (this.operationSing === '') {
        //     // If no operator is selected, input the first value
        //     this.valueOne += val.toString();
        //     console.log('valueOne::::', this.valueOne);
        // } else {
        //     // If an operator is selected, input the second value
        //     this.valueTwo += val.toString();
        //     console.log('valueTwo::::', this.valueTwo);
        //     this.calculateResult();
        // }
        if (val === 'AC') {
            // Clear the entire expression
            this.expression = '';
        } else if (val === '=') {
            // Evaluate the expression and update the expression with the result
            if (this.expression.trim() !== '') {
            this.expression = this.calculateResult();
            }
        } else {
            // Check if the last character is an operator
            const lastChar = String(this.expression).charAt(this.expression.length - 1);
            console.log('lastChar', lastChar);
            console.log('val', val);
            if (['+', '-', '*', '/', '%'].includes(lastChar) && ['+', '-', '*', '/', '%'].includes(val)) {
                // If the last character and the new character are both operators,
                // replace the last character with the new character
                this.expression = this.expression.slice(0, -1) + val;
            } else {
                // Append the value or operator to the expression
                this.expression += val.toString();
            }
        }
    }

    removeLast() {
        // Remove the last character from the expression
        this.expression = this.expression.slice(0, -1);
    }
    calculateResult(): any {
        try {
            // Split the expression into numbers and operators
            const parts = String(this.expression).split(/([+\-*\/%])/);
            let result = Number(parts[0]); // Initialize result with the first operand
    
            // Perform the calculation
            for (let i = 1; i < parts.length; i += 2) {
                const operator = parts[i];
                const operand = Number(parts[i + 1]);
                switch (operator) {
                    case '+':
                        result += operand;
                        break;
                    case '-':
                        result -= operand;
                        break;
                    case '*':
                        result *= operand;
                        break;
                    case '/':
                        result /= operand;
                        break;
                    case '%':
                        result %= operand;
                        break;
                }
            }
    
            if (isNaN(result) || !isFinite(result)) {
                // If the result is NaN or Infinity, return the last valid result
                return this.lastValidResult;
            } else {
                // Update the last valid result
                this.lastValidResult = result;
                return result;
            }
        } catch (error) {
            console.error('Error evaluating expression:', error);
            return '';
        }
    }

  //  ----------------------------------------------------------------------------------------------------------

  currentValue:string = '';

  getValue(val:string) {
    console.log('val', val);
    // const lastChar = String(this.x).charAt(this.x.length - 1);
    // if(['+', '-', '*', '/', '%'].includes(lastChar)) {

    // }
    this.currentValue = this.currentValue + val;
    console.log('x', this.currentValue);
  }

  calculateRes() {
    // if(this.x.charAt(0) === '0') {
    //     this.x = this.x.slice(2);
    // }
    if(this.currentValue !== ''){
        this.currentValue = eval(this.currentValue);
        console.log('eval', eval(this.currentValue));
    }
  }

  clearAll() {
    this.currentValue = '';
  }

  back() {
    console.log('type', typeof this.currentValue);
    this.currentValue = String(this.currentValue).slice(0, -1);
  }
    
}

// The getNumber() method handles the logic for inputting numbers, operators, clearing the expression, and evaluating the expression when "=" is clicked.
//The removeLast() method removes the last character from the expression.
//The calculateResult() method performs the calculation based on the expression provided and returns the result. If the result is NaN or Infinity, it returns the last valid result.

//  @ViewChild('one') one!: ElementRef;
//  btnText: any;
// yes() {
//   this.btnText = this.one.nativeElement.innerText;
//   console.log('btnText::::', this.btnText);
//   this.multi();
// }
// multi() {
//   let result;
//   result = this.btnText * this.btnText;
//   console.log('result::::', result);
//  return result;
// }



