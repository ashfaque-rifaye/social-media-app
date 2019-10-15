

import { Component, OnInit, Directive, Input, Output, OnChanges, EventEmitter, HostBinding, HostListener,ChangeDetectionStrategy } from '@angular/core';

import { Pipe, PipeTransform } from '@angular/core';
import { Utility } from '../util/utility';
import { DatePipe } from '@angular/common';

import { ElementRef } from '@angular/core';
import { Renderer2, RendererFactory2, RendererType2 } from '@angular/core';
import { DatePickerInterface } from './date-picker-interface';
//The ElementRef gives the directive direct access to the DOM element upon which it’s attached.
//ElementRef itself is a wrapper for the actual DOM element which we can access via the property nativeElement,

//Angular has been built from the ground up to work in a number of different environments, including server side via node and on a native mobile device. So the Angular team has provided a platform independent way of setting properties on our elements via something called a Renderer.


@Directive({
  selector: "[ccMonthYearChangeReflector]",
})
export class MonthYearChangeReflectorDirective implements OnChanges{ 

  @Input('dateValSelected') dateValSel : Date; 

  @HostListener('click', ['$event'])
  onClick(btn) {
    if(!this.el.nativeElement.classList.contains('attach-date-class')){
      this.rendererEl.destroy
      this.rendererEl.addClass(this.el.nativeElement, 'attach-date-class');  
    }
    else{
      this.rendererEl.removeClass(this.el.nativeElement, 'attach-date-class');

    }// this.rendererEl.setStyle(this.el.nativeElement,'background-color','red');
 }

  
  private rendererEl : Renderer2;
  private rendererType: RendererType2;
  constructor(private el: ElementRef,
              private renderer: RendererFactory2, 
              ) {
    this.rendererEl = this.renderer.createRenderer(this.el, this.rendererType);
  }

  ngOnChanges(){
    // this.rendererEl.setStyle(this.el.nativeElement, 'background', 'blue'); 

  }
}

@Directive({
  selector: "[ccDateValueGenerator]",
})
export class DateValueGenerator implements OnChanges{ 
  
  private rendererEl : Renderer2;
  private rendererType: RendererType2;
  constructor(private el: ElementRef,
              private renderer: RendererFactory2, 
              ) {
    this.rendererEl = this.renderer.createRenderer(this.el, this.rendererType);
  }

  ngOnChanges(){
    this.rendererEl.setStyle(this.el.nativeElement, 'background', 'blue'); 

  }
}



@Pipe({name: 'monthValue'})
export class MonthValueGenerator implements PipeTransform {
  transform(value, year: number, month: number) : any {
    const noOfDays = new Date(year, month+1, 0).getDate();
    let day = new Date(year, month, 1).getDay();
    let res : Array<any> = [];
    
    res = Array(noOfDays).fill(noOfDays)
            .map((x,i)=> i+1);

    for (var i =  0; i < day; i++) {
        res.unshift(null);               
    }        
    return res;
  }
}

/* Note: This pipe definition reveals the following key points:

1.A pipe is a class decorated with pipe metadata.
2.The pipe class implements the PipeTransform interface's transform method that accepts an input value followed by optional parameters and returns the transformed value.
3.There will be one additional argument to the transform method for each parameter passed to the pipe. Your pipe has one such parameter: the exponent. 
4.You must include your pipe in the declarations array of the AppModule.

The PipeTransform interface:
  The transform method is essential to a pipe.
  The PipeTransform interface defines that method and guides both tooling and the compiler.
  Technically, it's optional; Angular looks for and executes the transform method regardless.

*/


@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class DatePickerComponent implements OnInit {

  @Input() options: DatePickerInterface;	
  day: Array<string> =  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
  month: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  year = new Date().getFullYear();
  monthVal =  new Date().getMonth();
  date: Array<number> = [];
  sampleDate = new Date();
  displayFormat: string;


  @Output() dateSelected = new EventEmitter<string>();

  constructor(private datePipe: DatePipe) {
    // this.date[1] = (((this.year % 4 == 0) && (this.year % 100 != 0)) || (this.year % 400 == 0)) ? 29 : 28 ;

  }


  ngOnInit() {
    // this.findLeapYear(this.year);
  }

  setDate($event: any){
  	let date = new Date(this.year,this.monthVal,$event);
  	if(!Utility.isNullOrEmpty(this.options) &&
  			!Utility.isNullOrEmpty(this.options.displayFormat)){
  		this.dateSelected.emit(this.formatDate(date, this.options.displayFormat));
  	}else{
  		this.dateSelected.emit(this.formatDate(date, 'dd-MMM-yyyy')); //Default format - 'DD-MMM-YYYY'
  	}
  }

  private formatDate(date: Date, format: string): string{
  	let stringDateVal = '';
  	stringDateVal = this.datePipe.transform(date, format);
  	return stringDateVal;
  }

  changeMonth(event, action){
    if(action === "NEXT MONTH"){
       this.monthVal = this.monthVal== 11 ? 0 : this.monthVal+1;      
    }else if(action === "PREVIOUS MONTH"){
      this.monthVal = this.monthVal== 11 ? 0 : this.monthVal-1;
    }else if(action === "NEXT YEAR"){
      this.year = this.year + 1;
    }else if(action === "PREVIOUS YEAR"){
      this.year = this.year - 1;
    }
  }

 
  	


}



