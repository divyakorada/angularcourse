import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-url-shortner',
  templateUrl: './url-shortner.component.html',
  styleUrls: ['./url-shortner.component.scss']
})
export class URLShortnerComponent implements AfterViewInit{

  @ViewChild('longurl') long:ElementRef;
  yes;
  urlPath: string = 'https://medium.com/@thunderroid/angular-short-url-pipe-long-url-to-short-url-https-github-com-roid-9f6f9dac6696';
 

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    console.log('long', this.long);
    console.log('long-2', this.long.nativeElement);
    const longUrl = this.long.nativeElement;
    //const apiURL = `https://tinyurl.com/api-create.php?url=$`;
    this.http.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`).subscribe((res) => {
      console.log('res', res);
    });
   
  }

  getUrl() {
    this.long.nativeElement.value;
    console.log('btn', this.long.nativeElement.value);
    console.log('yes', this.yes);
  }
}
