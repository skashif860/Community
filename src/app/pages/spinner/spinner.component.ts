import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { shallowEqual } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-blank',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  providers:[NgxSpinnerService],
})
export class SpinnerComponent implements OnInit {

  constructor( public spinner: NgxSpinnerService) { }

  ngOnInit() { 
   this.showSpinner();
   }

   showSpinner(){
     console.log('hello')
    this.spinner.show();
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 5000);
   }
}
