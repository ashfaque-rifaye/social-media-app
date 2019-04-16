
import { Component, OnInit } from '@angular/core';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { HomepageService } from '../homepage/homepage.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {

  showDatePicker: boolean = false;
  dateValue: string;

  constructor(private homePageService: HomepageService) { }

  ngOnInit() {
    this.getAllPosts();
  }

  public showCalendar($event: any){
    this.showDatePicker = true;
  }
  
  private daveValueGetter(date){
    this.dateValue = date;
  } 

   private getAllPosts(){
    this.homePageService.getAllPosts().subscribe(
      data =>
      {
        alert(data);
      },
      err =>{

        }
      );
   }
      
}
