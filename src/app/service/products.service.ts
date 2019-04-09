import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Shops } from '../shops';
import { Product } from '../product.model';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Injectable({
  providedIn: 'root'
})
export class ProductsService{

  formData  : Product;

  private shopUrl = 'http://localhost:3005/api';

  constructor(private http: HttpClient) { }

  getShops(){
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json', //<- To SEND XML
            'Accept':  'application/json',       //<- To ask for XML
            'Access-Control-Allow-Origin':'*'
          })
      };
      let apiurl = this.shopUrl;
      return this.http.get<any>(apiurl,httpOptions).pipe(map(products => {
        console.log(products);
            return products.data;
        }));
  }

  postShops(formData : Product){
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json', //<- To SEND XML
            'Accept':  'application/json',       //<- To ask for XML
            'Access-Control-Allow-Origin':'*'
          })
      };
      let apiurl = this.shopUrl+'/create-product';
      return this.http.post<any>(apiurl,formData).pipe(map(products => {
        console.log(products);
            return products.data;
        }));
  }

  /** GET heroes from the server */
  // getShopsdd (): Observable<Shops[]> {
  //   return this.http.get<Shops[]>(this.shopUrl)
  //     .pipe((map(res => {
  //   console.log(url);
  //
  // })))
  //       //tap(_ => this.log('fetched heroes')),
  //       //catchError(this.handleError<Shops[]>('getShops', []))
  //     };
  //
  //     // this.http.get(this.shopUrl).subscribe((res : any[])=>{
  //     //       console.log(res);
  //     //       //this.products = res;
  //     //   });
  //}

}
