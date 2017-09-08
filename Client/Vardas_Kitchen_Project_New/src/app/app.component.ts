import { Component , OnInit} from '@angular/core';
import { RouterLinkActive, ActivatedRoute,Router,NavigationStart} from '@angular/router';
import { NgClass } from '@angular/common';
import { HttpModule } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit{

  title = 'app';
  isSmallHeader = false;



  constructor(private router: Router, private route:ActivatedRoute ) {

    // ------------ on each router changing:
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        // console.log(event.url, this.i++);
        // console.log(event.url.includes("/search"), "for search");
        // console.log(event.url.includes("/specific-recepies"), "for specific-recepie");
        if(event.url.includes("/search")|| event.url.includes("/specificRecipe") ){
          this.isSmallHeader = true;
        }
        else {
          this.isSmallHeader = false;
        }
      }
    })
  }

  ngOnInit() {


  }


}
