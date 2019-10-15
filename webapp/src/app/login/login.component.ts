import { Component, OnInit } from '@angular/core';

import {FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import {LoginService} from '../../app/login/login.service';

import {Utility} from '../util/utility';


/** FormControl – Tracks the value and validation status of an individual form control.
    FormGroup  – Tracks the value and validity state of a group of FormControl instances.
    A FormGroup combines the values of each child control FormControl into single object, with each control name as the key.
    FormBuilder – A service that is used to build FormGroups easily. Creating form control instances manually can become repetitive when dealing with multiple forms. 
    The FormBuilder service provides convenient methods for generating controls.
    The FormBuilder service has three methods: control(), group(), and array().
    These are factory methods for generating instances in your component classes including form controls, form groups, and form arrays.  
    ControlValueAccessor: It creates the bridge between Angular FormControl instances and native DOM elements.
 
     */



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signupForm: FormGroup;
  loginForm : FormGroup;
  countriesList: Array<any> = [];
  genderList: Array<any> = ['Male', 'Female'];
  showHideSignupSection:boolean ;
  showForm: boolean;
  submitted : boolean = false;


  constructor(private fb: FormBuilder, private loginService: LoginService) { 
  }

  ngOnInit() {
    this.showHideSignupSection = true;
    this.showForm = false;

    this.getListOfCountries();
    this.loginForm = this.fb.group({
      userID: new FormControl('', Validators.required),
      pwd: new FormControl('', Validators.required)
    })


    this.signupForm = this.fb.group({
      // firstName: new FormControl('', [Validators.required, Validators.maxLength(15)]), Note - this is alternate declaration.
      // name: ['', Validators.required, Validators.maxLength(25)],
      emailId: ['', Validators.required, Validators.pattern('[a-zA-z0-9_\.]+@[a-zA-Z]+\.[a-zA-Z]+')],
      userID: ['', Validators.required],
      password:  new FormGroup({ 
        pwd: new FormControl('', [Validators.required, Validators.minLength(6), 
                    Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$')]),
        confirmPwd: new FormControl('', [Validators.required, Validators.minLength(6),
               this.validateAreEqual.bind(this)]
      )}),
      dob:  ['', Validators.required],
      genders: ['', Validators.required]
    }, {
    });
    
    console.log(this.signupForm.value)
  }


  private validateAreEqual(fieldControl: FormControl) {
    return (!Utility.isNullOrEmpty(fieldControl.value) 
      && !Utility.isNullOrEmpty(this.signupForm.controls.password.get('pwd').value) 
      &&  fieldControl.value === this.signupForm.controls.password.get('pwd').value) ? null : {
        mismatch: true
    };
}

  get f() { return this.signupForm.controls; }

  triggerSignUp(event){
    this.showHideSignupSection = false;
    this.showForm = true;
  }

  onChangeGender(event : any){
    this.signupForm.controls.genders.setValue(event.target.value, 
      {onlySelf: true});
  }



  onSignUp(){

    this.submitted = true;
    console.log(this.signupForm);
    //If the validations are not successful, then do nothing
    if(!this.signupForm.valid){
      return;
    }
    else{
      alert("Account created successfully");
    }
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
    console.log(this.signupForm);

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
