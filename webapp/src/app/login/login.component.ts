import { Component, OnInit } from '@angular/core';

import {FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import {LoginService} from '../../app/login/login.service';


/** FormControl – Tracks the value and validation status of an individual form control.
    FormGroup  – Tracks the value and validity state of a group of FormControl instances.
    A FormGroup combines the values of each child control FormControl into single object, with each control name as the key.
    FormBuilder – A service that is used to build FormGroups easily. Creating form control instances manually can become repetitive when dealing with multiple forms. 
    The FormBuilder service provides convenient methods for generating controls.
    The FormBuilder service has three methods: control(), group(), and array().
     These are factory methods for generating instances in your component classes including form controls, form groups, and form arrays.  
 */



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  countriesList: Array<any> = [];
  genderList: Array<any> = [null ,'Male', 'Female'];


  constructor(private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {

  	this.getListOfCountries();
    this.loginForm = this.fb.group({
      firstName: new FormControl('My NaMe', [Validators.required, Validators.maxLength(15)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      userName: new FormControl('', Validators.required),
      emailId: new FormControl('', [Validators.required, Validators.pattern('[a-zA-z0-9_\.]+@[a-zA-Z]+\.[a-zA-Z]+')]),
      pwd:  new FormGroup({ 
        password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$')]),
        confirmPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$')])
      }),
      dob: new FormControl(),
      country: new FormControl(),
      genders: new FormControl('')
    });
    
  }


  /*

  */
  getListOfCountries(){
  	const httpResponse = this.loginService.getAllCountries();
  	httpResponse.subscribe(
  		data => {
  			this.countriesList = Object.values(data); // The data is like = {BD : "Bangladesh", IN : "India", AF : "Africa"}
  			//To convert this to list of  Values in array, then use Object.Values() fn.
  		},
  		err => {

  		});

  }

  //FormGroup Object 
  

  onSubmit(){
    console.log(this.loginForm);

  }


}





//Tutorial 1:

/* ANGULAR Where do we need to provide providers in component level? 
   Where to provide the same providers in the Module level?
Here is an example of how we defined our services at the component level:

A simple pizza booking form using angular reactive forms. 

@Component({
  selector: 'app-pizza-form-container',
  templateUrl: './pizza-form-container.component.html',
  styleUrls: ['./pizza-form-container.component.scss'],
  providers: [
    PizzaFormService,
    PizzaFormValidatorsService,
    PizzaLoaderService
  ]
})
export class PizzaFormContainerComponent implements OnInit {

}

Explanation:

When providing a service in the component a new instance of the service will be created,
when the component bootstraps and the service will be destructed when the component destroyed. 
This is very helpful since we want that every time a customer will enter the order page,
a new order will be created as opposed to providing the service in our AppModule where 
a single instance of the service will be created for the entire lifecycle of our app.

*/

//Tutorial 2:

/* Angular Forms :

Angular provides two approaches, template-driven forms and model-driven or reactive forms, for working with forms:

The template driven approach makes use of built-in directives to build forms such as ngModel, ngModelGroup, and ngForm available from the FormsModule module.

The model driven approach of creating forms in Angular 6 makes use of FormControl, FormGroup and FormBuilder available from the ReactiveFormsModule module.

*/  
