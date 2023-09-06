import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
  
} from "ngx-intl-tel-input";
import { UserServiceService } from 'src/app/services/users/user-service.service';
enum ErrorStates {
  NotSubmitted,
  HasError,
  NoError,
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  errorState: ErrorStates = ErrorStates.NotSubmitted;
  errorStates = ErrorStates;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef,private authService: AuthService,public userServices:UserServiceService,) {
    this.isLoading$ = this.authService.isLoading$;
  }
  selectedCountryISO:any
  ngOnInit(): void {
    this.selectedCountryISO = 'CI';
    this.initForm();
  }
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
 
  preferredCountries: CountryISO[] = [CountryISO.CôteDIvoire, 
   CountryISO.France];
  // convenience getter for easy access to form fields
  get f() {
    return this.forgotPasswordForm.controls;
  }

  initForm() {
    this.forgotPasswordForm = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          // Validators.email,
          Validators.minLength(10),
          Validators.maxLength(10), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      code: [
        '',
        Validators.compose([
          Validators.required,
          // Validators.email,
          // Validators.minLength(10),
          // Validators.maxLength(10),
           // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
    });
  }
  code="";
  message="";
  ErrorSubmitted = "false";

  validate(){
    console.log("go")
    if(this.code ===this.f.code.value){
      this.message = "code validé"
      this.ErrorSubmitted = "valide"
      this.cdr.detectChanges()
    }else{
      this.ErrorSubmitted = "notvalide"
      this.message = "ce code n est pas valide"
      this.cdr.detectChanges()

    }
  }
  submit() {
    this.code = String(Math.floor(100000 + Math.random() * 900000));
    var num =this.f.email.value.dialCode+" "+this.f.email.value.number;
    console.log(num);
    this.userServices.forgetpassword(num,this.code).subscribe((data:any) => {


      if(data.response.code ==="200"){
        this.ErrorSubmitted = "good";
        this.cdr.detectChanges();
      }else if(data.response.code =="404"){ 
        this.message  = data.response.message
        this.ErrorSubmitted = "true";
        this.cdr.detectChanges();
      }else{


      }
      console.log(data);    

    })
    //  console.log("Submit");  
    // 
    // const forgotPasswordSubscr = this.authService
    //   .forgotPassword(this.f.email.value)
    //   .pipe(first())
    //   .subscribe((result: boolean) => {
    //     this.errorState = result ? ErrorStates.NoError : ErrorStates.HasError;
    //   });
    // this.unsubscribe.push(forgotPasswordSubscr);

  }
}
