import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Shops } from './shops';
import { ProductsService } from './service/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'task';

  //this.formData = Shops;

  formData : Shops;
  shopes: Shops[];
  shopes_temp: Shops[];


  constructor(private ProductsService: ProductsService,private toastr: ToastrService) { }

  ngOnInit() {
    this.getShops();
    this.resetForm();
  }

  getShops() {
    this.ProductsService.getShops().subscribe(shopes => this.shopes = this.shopes_temp = shopes);//
  }

  resetForm(form?: NgForm) {
    this.formData = {
      username: '',
      shop_name: '',
      status: ''
    }
  }

  onSubmit(form: NgForm) {
    this.ProductsService.postShops(form.value).subscribe(res => {
      this.toastr.success('Inserted successfully', 'Shop. Register');
      this.resetForm(form);
      this.getShops();
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    const regexp = new RegExp(filterValue,'gi');
    //console.log(regexp);
    this.shopes  = this.shopes_temp.filter(x => regexp.test(x.username || x.status || x.shop_name));
    //this.shopes  = this.shopes_temp.filter(x => (x.username.match(/filterValue/i) || x.shop_name.match(/filterValue/i) || x.status.match(/filterValue/i) ) );
  }

}
