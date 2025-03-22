import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderType} from "../../../types/order.type";
import {ProductService} from "../../shared/services/product.service";
import {CartService} from "../../shared/services/cart.service";


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private cartService: CartService, private productService: ProductService) { }

  signInForm = new FormGroup({
    product: new FormControl('', [Validators.required]),
    name: new FormControl('',[Validators.required, Validators.pattern('^[A-Za-zА-Яа-я]+$')]),
    last_name: new FormControl('',[Validators.required, Validators.pattern('^[A-Za-zА-Яа-я]+$')]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^\\+?(\\d{11})$')]),
    country: new FormControl(''),
    zip: new FormControl(''),
    address: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-я0-9 /-]+$')]),
    comment: new FormControl('')
  });

  get product() {
    return this.signInForm.get('product');
  }
  get name() {
    return this.signInForm.get('name');
  }
  get last_name() {
    return this.signInForm.get('last_name');
  }
  get phone() {
    return this.signInForm.get('phone');
  }
  get country() {
    return this.signInForm.get('country');
  }
  get zip() {
    return this.signInForm.get('zip');
  }
  get address() {
    return this.signInForm.get('address');
  }


  ngOnInit(): void {
    this.productService.getSavedProduct().subscribe(product => {
      if (product) {
        this.signInForm.patchValue( {
          product: product.title
        })
      }
    })
    // if (this.cartService.product) {
    //   this.signInForm.patchValue({
    //     product : this.cartService.product
    //   });
    // }
  }

  sendOrder():void {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }
      const orderData: OrderType = {
        product: this.cartService.product,
        name: this.signInForm.get('name')?.value || '',
        last_name: this.signInForm.get('last_name')?.value || '',
        phone: this.signInForm.get('phone')?.value || '',
        country: this.signInForm.get('country')?.value || '',
        zip: this.signInForm.get('zip')?.value || '',
        address: this.signInForm.get('address')?.value || '',
        comment: this.signInForm.get('comment')?.value || ''
      };
      this.productService.sendOrder(orderData)
        .subscribe(response => {
          if (response.success === 1) {
            this.successMessage = 'Спасибо за заказ. Мы свяжемся с вами в ближайшее время!';
            document.getElementById('form')?.classList.add('d-none');
            document.getElementById('test-popup')?.classList.remove('d-none');
            this.productService.clearSavedProduct();
          } else {
            this.errorMessage = "Произошла ошибка. Попробуйте еще раз.";
          }
        })

  }

}
