import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {

  stars: number[] = [1,2,3,4,5];
  selectedRating = 0;


  starRating: number[] = [1,2,3,4,5]
  selectedStar = 0;
  previousSelection = 0;
  totalRating = 0;
  numberOfUsers = 0;
  finalRating: any;

  faStar=faStar;
  @Input() rating: number = 0;
  @Input() readOnly: boolean = false;


  updateRatingValue(val) {
    this.selectedRating = val;
  }

  handleMouseEnter(i) {
    this.selectedStar = i;
   // this.selectedStar = i + 1;
  //  if (this.selectedStar === 0) {
  //   this.selectedStar = i;
  // }
  //  if (this.selectedStar < i) {
  //   this.selectedStar = i;
  // }
    console.log('selectedStar', this.selectedStar);
    console.log('i', i);
  }

  handleMouseLeave() {
   // console.log('previousSelection', this.previousSelection);
    if(this.previousSelection !== 0) {
      this.selectedStar = this.previousSelection; 
    } else {
      this.selectedStar = 0;
    }
  //   if (this.previousSelection !== 0 && this.previousSelection >= this.selectedStar) {
  //     this.selectedStar = this.previousSelection; // Maintain the active state
  // } else {
  //     this.selectedStar = 0; // Remove the active state
  // }
   // console.log('selectedStar-2', this.selectedStar);
   
  }

  getRatingNumber(i) {
    this.selectedStar = i;
   this.previousSelection = this.selectedStar;

   this.totalRating += this.selectedStar;
   console.log('totalRating::::', this.totalRating);
   this.numberOfUsers++;
   console.log('numberOfUsers::::', this.numberOfUsers);
   this.finalRating = (this.totalRating/this.numberOfUsers).toFixed(2);
   console.log('finalRating::::', this.finalRating);
  }


  setRating(val) {
    if(this.readOnly) return;
      this.rating = val;
  }

}
