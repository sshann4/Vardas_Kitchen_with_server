import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from './../rest.service';
import { HttpModule } from '@angular/http';
import { NgFor } from '@angular/common';

@Component({
  // selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css'],
  providers: [RestService]
})

export class ResultPageComponent implements OnInit {

  private searchResults = [];

  constructor(private route:ActivatedRoute , private rest:RestService) {
  //   this.router.events.subscribe(event => {
  //     if(event instanceof NavigationStart) {
  //       console.log(event.url);
  }

  ngOnInit() {
    this.route.params.subscribe((data) => {
    console.log(data);
    })

    this.rest.getSearchResults().subscribe((resSearchResults) =>{
      this.searchResults = resSearchResults;
      console.log("search Results: ",this.searchResults);
    })

  }
}
