import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {ProductType} from "../../../types/product.type";
import {OrderResponseType} from "../../../types/order-response.type";
import {OrderType} from "../../../types/order.type";

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private productSubject = new BehaviorSubject<ProductType | null>(null);

  constructor(private http: HttpClient) {
    const savedProduct = localStorage.getItem('selectedProduct');
    if (savedProduct) {
      this.productSubject.next(JSON.parse(savedProduct));
    }
  }

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>('https://testologia.ru/tea');
  }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`https://testologia.ru/tea?id=${id}`)
  }

  sendOrder(formData: OrderType ): Observable<OrderResponseType> {
    return this.http.post<OrderResponseType>('https://testologia.ru/order-tea', formData);
  }

  saveProduct(product: ProductType): void {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    this.productSubject.next(product);
  }

  getSavedProduct(): Observable<ProductType | null> {
    return this.productSubject.asObservable();
  }

  clearSavedProduct(): void {
    localStorage.removeItem('selectedProduct');
    this.productSubject.next(null);
  }

}
