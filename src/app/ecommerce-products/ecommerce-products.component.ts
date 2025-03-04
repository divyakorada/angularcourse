import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-ecommerce-products',
  templateUrl: './ecommerce-products.component.html',
  styleUrls: ['./ecommerce-products.component.scss']
})
export class EcommerceProductsComponent {
  categories: string[] = ['all', 'office', 'living room', 'kitchen', 'bedroom', 'dining', 'kids'];
  companies: string[] = ['all', 'marcos', 'liddy', 'ikea', 'caressa'];
  sorting: string[] = ['Price (Lowest)', 'Price (Highest)', 'Name (A - Z)', 'Name (Z - A)'];
  configUrl = 'https://course-api.com/react-store-products';
  selectedCategory: string = 'all'; // Selected category
  selectedCompany: string = 'all'; // Selected company
  products: any;
  originalProducts: any;
  selectedIndex: number = 0;
  company: string = 'all';
  searchString: any = '';
  price: any = 309999;
  freeShipping: Boolean = false;
  sortBy: string = 'Price (Lowest)';
  typeActive: Boolean = false;

  size: NzButtonSize = 'large';
  visible = false;
  cartItems: any[] = [];
  NoDuplicate: any;
  cartTotal: number =  0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get(this.configUrl).subscribe(
      (res) => {
        console.log('res', res);
        this.products = res;
        this.originalProducts = [...this.products];
        this.sortByProducts();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  sortByProducts() {
    if(this.sortBy === 'Price (Lowest)') {
      this.products = this.originalProducts.sort((a:any,b:any) => {
          return a.price - b.price;
      });
    } else if(this.sortBy === 'Price (Highest)'){
      this.products = this.originalProducts.sort((a:any,b:any) => {
        return b.price - a.price;
    });
    } else if(this.sortBy === 'Name (A - Z)') {
      this.products = this.originalProducts.sort((a:any, b:any) => {
        let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();
    
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
    } else if(this.sortBy === 'Name (Z - A)'){
      this.products = this.originalProducts.sort((a:any, b:any) => {
        let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();
    
        if (fa < fb) {
            return 1;
        }
        if (fa > fb) {
            return -1;
        }
        return 0;
    });
    }
  }


  searchProduct() {
      if (this.searchString.trim()) {
          this.products = this.products.filter((e: any) => {
            return e.name.toLowerCase().includes(this.searchString.toLowerCase());
          });
      } else {
       this.applyFilters();
      }
  }
    

  clearFliters() {
    this.selectedIndex = 0;
    this.company = 'all';
    this.price = 309999;
    this.freeShipping = false;
    this.products = this.originalProducts;
  }

  changePrice(price:any) {
    this.applyFilters();
    if(price !== null && price !== undefined) {
      this.products = this.products.filter((s: any) => {
          return s.price <= price;
      });
    } 
  }
   /* shippingFree(evt:any) {
  //   this.applyFilters();
  //       console.log('normal', evt.target.value);
  //        this.price = evt.target.value;
  //        if(this.price !== null && this.price !== undefined) {
  //         this.products = this.products.filter((s: any) => {
  //             return s.price <= this.price;
  //         });
  //       } 
   } */

  checkFreeShipping(val:any) {
    this.applyFilters();
    if(val) {
      this.products = this.products.filter((s: any) => {
          return s.shipping;
      });
    } 
  }

  getCategoryName(category: string, index: number): void {
    this.selectedIndex = index;
    this.selectedCategory = category;
    this.applyFilters();
    console.log(this.searchString);
  }

  selectCompany(company: string): void {
    this.selectedCompany = company;
    this.applyFilters();
  }

  applyFilters(): void {
    if (this.selectedCategory === 'all' && this.selectedCompany === 'all') {
      this.products = [...this.originalProducts];
      this.sortByProducts();
    } 
    else {
      const filteredProducts  = this.originalProducts.filter((product: any) => {
        const categoryMatch = this.selectedCategory === 'all' || product.category === this.selectedCategory;
        const companyMatch = this.selectedCompany === 'all' || product.company === this.selectedCompany;
        console.log('categoryMatch::::', categoryMatch);
        return categoryMatch && companyMatch;
      });
      console.log('filteredProducts', filteredProducts);
      console.log('filteredProducts length', filteredProducts.length === 0);
      if(filteredProducts.length === 0) {
        this.products = [];
        console.log('Sorry no products')
      } else {
        this.products = filteredProducts;
      }
    } 
    // else  if (this.selectedCategory !== 'all' && this.selectedCompany !== 'all'){
    //   this.products = this.originalProducts.filter((product: any) => {
    //   return product.category === this.selectedCategory && product.company === this.selectedCompany;
    // });
    // } else if(this.selectedCategory === 'all' && this.selectedCompany !== 'all') {
    //   this.products = this.originalProducts.filter((product: any) => {
    //     return product.company === this.selectedCompany;
    //   });
    // } else if(this.selectedCategory !== 'all' && this.selectedCompany === 'all'){
    //   this.products = this.originalProducts.filter((product: any) => {
    //    return product.category === this.selectedCategory;
    //   });
    // }
  }

  clearAllCartItems() {
    this.cartItems.splice(0);
    this.cartTotal = 0;
  }

  openDrawer(item:any,index: any) {
    this.visible = true;
    this.NoDuplicate = this.cartItems.find(e => e.name === item.name);
    if(!this.NoDuplicate) {
      item.count = 1;
      this.cartItems.push(item);
      console.log('cart-Items::::', this.cartItems);
      this.cartTotal += item.price;
    } else {
      this.NoDuplicate.count++;
      console.log('cartItems', this.cartItems);
    }
  }

  close(): void {
    this.visible = false;
  }

  cartItemIncrement(index:number) {
    console.log('increment index', index);
    this.cartItems[index].count++;
    this.cartTotal += this.cartItems[index].price;
    console.log('increment::::', this.cartItems);
  }

  cartItemdecrement(index:any){
    console.log('dec index--::::', index);
    this.cartTotal -= this.cartItems[index].price;
    if (this.cartItems[index].count > 0) {
        this.cartItems[index].count--;
        if(this.cartItems[index].count === 0) {
              this.cartItems.splice(index, 1);
          }
    }
  }

  removeCartItem(index:any) {
    console.log('remove index::::', index);
    this.cartTotal -= (this.cartItems[index].price * this.cartItems[index].count);
    this.cartItems.splice(index, 1);
    console.log('remove card Item::::', this.cartItems);
  }

  toggleView(isList: boolean) {
    this.typeActive = isList;
  }

}
