import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';


interface Category {
  categoryId: number;
  name: string;
}

interface Subcategory {
  id: number;
  name: string;
  subCategoryId: number;
  unitPrice: number;


}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {


  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  selectedCategory: Category | null = null;
  selectedSubcategory: Subcategory | null = null;
  name: string = '';
  unitPrice: number = 0;
  signupForm: any;
  invoiceData:any;


  orderId !: number;
  jobDescription !: string;
  artisanCharge !: number;
  mainProductName !: string;
  mainProductQuantity !: number;
  mainProductPrice !: number;
  mainProductModel !: string;
  mainProductSize !: string;
  suggestedProductOneName !: string;
  suggestedProductOneQuantity !: number;
  suggestedProductOnePrice !: number;
  suggestedProductOneModel !: string;
  suggestedProductOneSize !: string;
  suggestedProductTwoName !: string;
  suggestedProductTwoQuantity !: number;
  suggestedProductTwoPrice !: number;
  suggestedProductTwoModel !: string;
  suggestedProductTwoSize !: string;
  selectedItem !: string;
  items: any[] = []; // Array to hold the items obtained from the API
  firstSelect !: string;
  secondSelect !: any;
  firstSelectOptions: any;
  secondSelectOptions: string[] = [];



  constructor(private http: HttpClient, private formbuilder : FormBuilder) {}

  ngOnInit() {
    this.http.get<Category[]>('https://localhost:7130/api/ServiceCategory/all')
    .subscribe((res ) => {
      this.firstSelectOptions = res;
    });
  }

  submitInvoiceForm() {
    const requestData = {
      items: [
        {
          mainProduct: {
            name: this.mainProductName,
            quantity: this.mainProductQuantity,
            price: this.mainProductPrice,
            marketPlaceProductId: 0,
            model: this.mainProductModel,
            type: 0,
            size: this.mainProductSize
          },
          suggestedProductOne: {
            name: this.suggestedProductOneName,
            quantity: this.suggestedProductOneQuantity,
            price: this.suggestedProductOnePrice,
            marketPlaceProductId: 0,
            model: this.suggestedProductOneModel,
            type: 0,
            size: this.suggestedProductOneSize
          },
          suggestedProductTwo: {
            name: this.suggestedProductTwoName,
            quantity: this.suggestedProductTwoQuantity,
            price: this.suggestedProductTwoPrice,
            marketPlaceProductId: 0,
            model: this.suggestedProductTwoModel,
            type: 0,
            size: this.suggestedProductTwoSize
          }
        }
      ],
      artisanCharge: this.artisanCharge,
      jobDescription: this.jobDescription,
      orderId: this.orderId
    };

    // Make the POST request to the API to send the invoice data
    this.http.post('URL_TO_API_ENDPOINT', requestData).subscribe(data => {
      console.log('Invoice created successfully:', data);
      // Handle the API response as needed
    });
  }

   fetchSubcategories(categoryId: number) {
    this.http.get<Subcategory[]>(`https://localhost:7130/api/Product/products-category/${categoryId}`)
      .subscribe((subcategories: Subcategory[]) => {
        this.subcategories = subcategories;
      });
  }

  onCategoryChange() {
    if (this.selectedCategory) {
      // this.fetchSubcategories(this.selectedCategory.id);
    } else {
      this.subcategories = [];
      this.selectedSubcategory = null;
    }
  }
  populateMainProductFields() {
    // Find the selected item from the items array
    const selectedItem = this.items.find(item => item.name === this.selectedItem);

    // Populate the main product fields based on the selected item
    this.mainProductName = selectedItem?.mainProduct?.name;
    this.mainProductQuantity = selectedItem?.mainProduct?.quantity;
    this.mainProductPrice = selectedItem?.mainProduct?.price;
    this.mainProductModel = selectedItem?.mainProduct?.model;
    this.mainProductSize = selectedItem?.mainProduct?.size;
  }
  onFirstSelectChange() {
    // Reset the second select and its options
    this.secondSelect = null;
    this.secondSelectOptions = [];

    // Fetch the options for the second select based on the selection in the first select
    this.http.get('https://localhost:7130/api/Product/products-category/' + this.firstSelect).subscribe((response: any) => {
      this.secondSelectOptions = response.options;
    });
  }

  onSecondSelectChange() {
    // Fetch the main product fields based on the selected values from the first and second select
    this.http.get('URL_TO_MAIN_PRODUCT_API_ENDPOINT/' + this.firstSelect + '/' + this.secondSelect).subscribe((response: any) => {
      this.mainProductName = response.name;
      this.mainProductQuantity = response.quantity;
      this.mainProductPrice = response.price;
      this.mainProductModel = response.model;
      this.mainProductSize = response.size;
    });
  }

}