import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  myData: any[] = [];
  myDataList: any;
  totalRecordLength: number;
  recordsPerPage: number = 4;
  selectedPage: number = 1;
  configUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(this.configUrl).subscribe(res => {
      this.myDataList = res;
      this.totalRecordLength = this.myDataList.length;
      let pageIndex = (this.selectedPage - 1) * this.recordsPerPage;
      this.myData = this.myDataList.slice(pageIndex, this.recordsPerPage);
    });
  }

  setPageNumbers() {
      const page_count = Math.ceil(this.totalRecordLength / this.recordsPerPage);
      return Array.from({length: page_count}, (_, i) => i+1);

        /* without using Array.from*/
        // const pageNumbers = [];
        // for (let i = 1; i <= page_num; i++) {
        //   pageNumbers.push(i);
        // }
        // return pageNumbers;
  }

  changePageSize(e:Event) {
    const newSize = (e.target as HTMLInputElement).value;
    this.recordsPerPage = Number(newSize);
    this.onPageChange(1);
  }

  onPageChange(page: number) {
    this.selectedPage = page;
   
    let startIndex = (page - 1) * this.recordsPerPage;
    let endIndex = (page - 1) * this.recordsPerPage +  this.recordsPerPage;
    if((startIndex && endIndex)  <= this.myDataList.length) {
      this.myData = this.myDataList.slice(startIndex, endIndex);
    }
    // this.myData = this.myDataList.slice(startIndex, endIndex);
    // console.log('myData::::', this.myData);
  }

}
