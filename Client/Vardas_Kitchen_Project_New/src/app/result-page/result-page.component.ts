import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from './../rest.service';
import { HttpModule } from '@angular/http';
import { NgFor } from '@angular/common';
import { SharedStatesService } from './../shared-states.service';
// import { SidebarFilterPipe } from './sidebar-filter.pipe';

@Component({
  // selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css'],
  providers: [RestService],
  // pipes: [SidebarFilterPipe]
})

export class ResultPageComponent implements OnInit {

  private searchResults = [];


  constructor(private route:ActivatedRoute , private rest:RestService, private searchType:SharedStatesService) {
  //   this.router.events.subscribe(event => {
  //     if(event instanceof NavigationStart) {
  //       console.log(event.url);
  }

  ngOnInit() {
    // this.route.params.subscribe((data) => {
    // console.log(data);
    // })

    this.rest.getSearchResults(this.searchType.isGeneralSearch)
    .subscribe((resSearchResults) =>{
      this.searchResults = resSearchResults;
      console.log("open result-page component");
      this.searchType.isGeneralSearch = false;
    });

  }

  filterListBy(property){

  }
}
