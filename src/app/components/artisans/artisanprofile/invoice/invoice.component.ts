import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Invoice, Services, Client, MainProduct } from "./invoice.model";
import { ArtisansService } from 'src/app/service/artisans.service';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  orderForm!: FormGroup;
  items: any[] = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      items: this.formBuilder.array([]),
      artisanCharge: [0, Validators.required],
      jobDescription: ['', Validators.required],
      orderId: [0, Validators.required]
    });

    this.addItem(); // Add an initial item
  }

  // Getter for easier access to the form array
  // get itemForms() {
  //   // return this.orderForm.get('items') as FormGroup[];
  // }
  get itemForms(): any {
    return this.orderForm.get("items") as FormArray;
  }

  addItem(): void {
    const itemGroup = this.formBuilder.group({
      mainProduct: this.formBuilder.group({
        name: ['', Validators.required],
        quantity: [0, Validators.required],
        price: [0, Validators.required],
        marketPlaceProductId: [0, Validators.required],
        model: ['', Validators.required],
        type: [0, Validators.required],
        size: ['', Validators.required]
      }),
      suggestedProductOne: this.formBuilder.group({
        name: ['', Validators.required],
        quantity: [0, Validators.required],
        price: [0, Validators.required],
        marketPlaceProductId: [0, Validators.required],
        model: ['', Validators.required],
        type: [0, Validators.required],
        size: ['', Validators.required]
      }),
      suggestedProductTwo: this.formBuilder.group({
        name: ['', Validators.required],
        quantity: [0, Validators.required],
        price: [0, Validators.required],
        marketPlaceProductId: [0, Validators.required],
        model: ['', Validators.required],
        type: [0, Validators.required],
        size: ['', Validators.required]
      })
    });

    this.itemForms.push(itemGroup);
  }

  removeItem(index: number): void {
    this.itemForms.splice(index, 1);
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      console.log(this.orderForm.value);
      // Here you can make an API request to send the order data to the backend
    } else {
      // Handle form validation errors
      this.markAllFieldsAsTouched();
    }
  }

  markAllFieldsAsTouched(): void {
    for (const control of Object.values(this.orderForm.controls)) {
      control.markAsTouched();
    }

    for (const itemGroup of this.itemForms) {
      for (const control of Object.values(itemGroup.controls)) {
        control.markAsTouched();
      }
    }
  }
}
