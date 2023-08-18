import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { items } from './invoice.model';
import { ArtisansService } from 'src/app/service/artisans.service';

export interface InvoiceObject {
  personName: string;
  invoiceDate: string;
  invoiceNo: string;
  invoiceTotal: number;
  orderId: number;
  jobDescription: string;
  artisanCharge: number;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  mainProduct: Product;
  suggestedProductOne: Product;
  suggestedProductTwo: Product;
}

export interface Product {
  name: string;
  price: number;
  quantity: number;
  total: number;
  id: number;
  marketPlaceProductId: number;
  model: number;
  type: number;
  size: string;
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  ngOnInit(): void {
    this.artisanurl.getAllProduct().subscribe((res) => {
      this.suggestedProducts = res;
    });
  }
  constructor(private artisanurl: ArtisansService) {}
  invoice: InvoiceObject = {
    personName: '',
    invoiceDate: '',
    invoiceNo: '',
    invoiceTotal: 0,
    orderId: 0,
    jobDescription: '',
    artisanCharge: 0,
    items: [],
  };

  addItem() {
    const newItem: InvoiceItem = {
      mainProduct: {
        name: '',
        price: 0,
        quantity: 0,
        total: 0,
        id: 0,
        marketPlaceProductId: 0,
        model: 0,
        type: 0,
        size: '',
      },
      suggestedProductOne: {
        name: '',
        price: 0,
        quantity: 0,
        total: 0,
        id: 0,
        marketPlaceProductId: 0,
        model: 0,
        type: 0,
        size: '',
      },
      suggestedProductTwo: {
        name: '',
        price: 0,
        quantity: 0,
        total: 0,
        id: 0,
        marketPlaceProductId: 0,
        model: 0,
        type: 0,
        size: '',
      },
    };

    this.invoice.items.push(newItem);
  }
  sendInvoice() {
    // Assuming you have an API endpoint to send the invoice data
    // const apiUrl = 'https://example.com/api/invoices';
    const uploadObserver = {
      next: (event: any) => {},
      error: (err: any) => {
        if (err.error && err.error.message) {
        } else {
          // this.message = 'Could not upload the file!';
        }
      },
    };

    this.artisanurl.generateInvoice(this.invoice).subscribe(uploadObserver);
  }
  suggestedProducts: Product[] = [];

  updateProductProperties(item: InvoiceItem, index: number) {
    const selectedProduct = this.suggestedProducts.find(

      (product) => {product.name === item.mainProduct.name, product.price === item.mainProduct.price}
    );
    if (selectedProduct) {
      item.mainProduct = { ...selectedProduct };
      console.log(item.mainProduct);
      
      item.mainProduct.price = selectedProduct.price;
      console.log(item.mainProduct.price);
      
      item.suggestedProductOne = { ...selectedProduct };
      item.suggestedProductTwo = { ...selectedProduct };
    }
    // const product = this.suggestedProducts.find(p => p.name === selectedProduct.name);

   
  }

  
  onMainProductSelected(selectedProduct: InvoiceItem, index: number) {
    console.log(selectedProduct.mainProduct);
    
    // When an item name is selected, find the corresponding product object from suggestedProducts
    const product = this.suggestedProducts.find(p => p.name === selectedProduct.mainProduct.name);

    if (product) {
      console.log(product);
      
      // If the product is found, update the item properties based on the selected product
      this.invoice.items[index].mainProduct.price = product.price;
      this.invoice.items[index].mainProduct.price = product.price;
      // this.itemsArray[index].quantity = 1; // You can set an initial quantity value if needed
      this.calculateTotal(index); // Optionally calculate and update the total based on the price and quantity
    }
  }
  onSuggestedItem1Selected(selectedProduct: InvoiceItem, index: number) {
    console.log(selectedProduct.mainProduct);
    
    // When an item name is selected, find the corresponding product object from suggestedProducts
    const product = this.suggestedProducts.find(p => p.name === selectedProduct.suggestedProductOne.name);

    if (product) {
      console.log(product);
      
      // If the product is found, update the item properties based on the selected product
      this.invoice.items[index].suggestedProductOne.price = product.price;
      this.invoice.items[index].suggestedProductOne.price = product.price;
      // this.itemsArray[index].quantity = 1; // You can set an initial quantity value if needed
      this.calculateTotal(index); // Optionally calculate and update the total based on the price and quantity
    }
  }
  onSuggestedItem2Selected(selectedProduct: InvoiceItem, index: number) {
    console.log(selectedProduct.suggestedProductTwo);
    
    // When an item name is selected, find the corresponding product object from suggestedProducts
    const product = this.suggestedProducts.find(p => p.name === selectedProduct.suggestedProductTwo.name);

    if (product) {
      console.log(product);
      
      // If the product is found, update the item properties based on the selected product
      this.invoice.items[index].suggestedProductTwo.price = product.price;
      this.invoice.items[index].suggestedProductTwo.price = product.price;
      // this.itemsArray[index].quantity = 1; // You can set an initial quantity value if needed
      this.calculateTotal(index); // Optionally calculate and update the total based on the price and quantity
    }
  }
  removeItem(index: number) {
    this.invoice.items.splice(index, 1);
  }

  updateTotalInItemsArray(item: Product) {
    item.total = item.quantity && item.price ? item.quantity * item.price : 0;
    console.log(item.total);
    
    return item.total;
  }
  calculateTotal(index: number) {
    const item = this.invoice.items[index].mainProduct;
    // item.total = item.price * item.quantity;
    item.total = item.quantity && item.price ? item.quantity * item.price : 0;
    return item.total;
  }
}
