import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router,NavigationStart,ActivatedRoute } from '@angular/router';
import { RestService } from './../rest.service';
import { HttpModule } from '@angular/http';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-top-part',
  templateUrl: './top-part.component.html',
  styleUrls: ['./top-part.component.css'],
  providers: [RestService]
})

export class TopPartComponent implements OnInit {
  //variable to hold boolean value to style top-part size
   isSmallHeader = false;

  constructor(private router: Router, private route:ActivatedRoute) {

    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        // console.log("bla bla bla ",event.url);
        // console.log(event.url.includes("/search"), "for search");
        // console.log(event.url.includes("/specific-recepies"), "for specific-recepie");
        if(event.url.includes("/search")|| event.url.includes("/specificRecipe")||
        event.url.includes("/about") ) {
          this.isSmallHeader = true;
          console.log("is small header:",this.isSmallHeader);
        }
        else {
          this.isSmallHeader = false;
          // console.log(this.isSmallHeader);
        }
      }
    })
  }

  ngOnInit() {

      // console.log(this.router.isActive('/search/:id',false));

  }

  // search() {
  //   console.log('value after button click' + searchValue);
  //   this.rest.getGeneralSearchResults();
  // }

  public searchFor(searchValue) {
    console.log("hello");
    console.log("seraching for: ",searchValue);
    console.log("route to: ","/generalSearch/" , searchValue);
    // this.router.navigate(['/generalSearch/' + searchValue]);
  }
    // this.router.navigate('/search/'+ searchValue.toString());

}
