import { product } from './../data-type';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchResult: undefined | product[];

  constructor(private activeRoute: ActivatedRoute, private router: Router, private product: ProductService) {

  }

  ngOnInit(): void {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.ngOnInit();
    });

    let query = this.activeRoute.snapshot.paramMap.get('query');
    query && this.product.searchProducts(query).subscribe((result) => {
      this.searchResult = result
    });
    
  }  


}
