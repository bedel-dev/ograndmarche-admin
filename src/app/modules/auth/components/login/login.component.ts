import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { AuthService} from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthModel } from '../../models/auth.model';
// import intlTelInput from 'intl-tel-input';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
  
} from "ngx-intl-tel-input";
import intlTelInput from 'intl-tel-input';
export type UserType = UserModel | undefined;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  // defaultAuth: any = {
  //   email: 'admin@demo.com',
  //   password: 'demo',
  // };
  defaultAuth: any = {
    email: '',
    password: '',
  };
  loginForm: FormGroup;
  hasErrors: boolean = false;
  returnUrl: string;
  isLoading: boolean = false;

   // private fields
   private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
   private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

   // public fields
   currentUser$: Observable<UserType>;
   isLoading$: Observable<boolean>;
   currentUserSubject: BehaviorSubject<UserType>;
   isLoadingSubject: BehaviorSubject<boolean>;

   get currentUserValue(): UserType {
     return this.currentUserSubject.value;
   }

   set currentUserValue(user: UserType) {
     this.currentUserSubject.next(user);
   }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private  http: HttpClient,
    private changeDetector: ChangeDetectorRef
  ) {
   // this.currentUser$ = this.currentUserSubject.asObservable();
   // this.isLoading$ = this.authService.isLoading$;
  //  this.isLoadingSubject = new BehaviorSubject<boolean>(false);
  //  this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
  //  this.currentUser$ = this.currentUserSubject.asObservable();
  //  this.isLoading$ = this.isLoadingSubject.asObservable();
  // const subscr = this.getUserByToken().subscribe();
  // this.unsubscribe.push(subscr);
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }
  selectedCountryISO:any
  ngOnInit(): void {
  //  this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.initForm();
     console.log(this.f.email.value);
     this.selectedCountryISO = 'CI';
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';


  } 
 // @ViewChild('#phone') telInput: { nativeElement: Element; };
  ngAfterViewInit(){
    // const input = document.querySelector("#phone");
    // console.log(input);
    //   intlTelInput(this.telInput, {
    //   utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@14.0.3/build/js/utils.js",
    //   customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
    //     return "e.g. " + selectedCountryPlaceholder;
    //   },
    // });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
         '',
          Validators.compose([
          Validators.required,
          //Validators.email,
           Validators.minLength(10),
          Validators.maxLength(10), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        '',
          Validators.compose([
          Validators.required,
          Validators.minLength(3),
        //Validators.maxLength(4),
        ]),
      ],
    });
  }
test :boolean;
 localUser:any;



user: UserType
  submit() {
  // this.currentUserSubject.next(this.user)
  // this.router.navigate([this.returnUrl]);
  // console.log(user$)
  //  this.router.navigate([this.returnUrl]);
  // this.currentUserSubject.next([]);


  //
  //   const headers = new HttpHeaders()
  //   .append(
  //     'Content-Type',
  //     'application/json'
  //   );

  //   // let user = {
  //   //   "contact":"+225 0769424374",
  //   //   "password":"123"
  //   // }

  //   let user = {
  //     "contact":this.f.email.value,
  //     "password":this.f.password.value
  //   }
  //   const body=JSON.stringify(user);

  //   this.http.post(GlobalConstants.api_auth+'/login.json', body, {
  //     headers: headers,
  //   }).subscribe((users: any)=>{
  //    // this.currentUserValue?.setAuth(users)
  //     this.currentUserSubject.next(users);
  //     if(users['status'] =="not connected"){
  //       this.localUser = {};
  //     }else if(users['status']=="Connected"){
  //       this.localUser = users;
  //     }else{
  //       this.localUser = null;
  //     }
  //     this.router.navigate(['/']);
  //   },next =>{
  //     // console.log("next :"+next)
  //     // this.hasErrors = true;
  //   },() =>{
  //     if(this.localUser!== null){
  //       console.log("this.localUser :"+this.localUser)
  //       this.hasErrors = false;
  //       this.isLoading = false
  //       this.setAuthFromLocalStorage(this.localUser)
  //       let d = localStorage.getItem('user')
  //
  //       this.router.navigate(['/']);
  //      // console.log("hasError 1 egal :"+this.router.navigate([this.returnUrl]))
  //     }else{
  //       this.isLoading = false
  //       this.hasErrors = true;
  //       this.state
  //       this.changeDetector.detectChanges();
  //       console.log("hasError error egal :"+this.hasErrors)
  //      // this.state
  //     }
  //   });
    var  v = this.f.email.value.number
    var number = this.f.email.value.dialCode+" "+v;

    console.log(this.f.email)
    this.isLoading = true
    const loginSubscr = this.authService.login(number, this.f.password.value).subscribe((user:any) => {
        if(user){
          this.hasErrors = false;
          this.isLoading = false
          this.changeDetector.detectChanges();
          this.router.navigate([this.returnUrl]);
          console.log(user)
        }else{
        this.isLoading = false
        this.hasErrors = true;
        this.changeDetector.detectChanges();
        }
      });
     this.unsubscribe.push(loginSubscr);

}



   public get state(){
    console.log('get state :'+this.hasErrors)
     return this.hasErrors
    }



    setAuthFromLocalStorage(user:any): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (user) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(user));
      return true;
    }
    return false;
  }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
    //this.iti.destroy();
  }


  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
 
  preferredCountries: CountryISO[] = [CountryISO.CôteDIvoire, 
   CountryISO.France];

    


  
  // onInputKeyPress = (event: KeyboardEvent) =>{
  //   const allowedChars = /[0-9\+\-\ ]/;
  // const allowedCtrlChars = /[axcv]/; // Allows copy-pasting
  // const allowedOtherKeys = [
  // 'ArrowLeft',
  // 'ArrowUp',
  // 'ArrowRight',
  // 'ArrowDown',
  // 'Home',
  // 'End',
  // 'Insert',
  // 'Delete',
  // 'Backspace',
  // ];
  
  // if (
  // !allowedChars.test(event.key) &&
  // !(event.ctrlKey && allowedCtrlChars.test(event.key)) &&
  // !allowedOtherKeys.includes(event.key)
  // ) {
  // event.preventDefault();
  // }
  // }
  
//   formatIntlTelInput() {
//     if (typeof intlTelInputUtils !== 'undefined') { // utils are lazy loaded, so must check
//         var currentText = this.iti.getNumber(intlTelInputUtils.numberFormat.E164);
//         if (typeof currentText === 'string') { // sometimes the currentText is an object :)
//             this.iti.setNumber(currentText); // will autoformat because of formatOnDisplay=true
//         }
//     }
//   }
  
//   onPhoneNumberChange = () =>{
//     this.selectedCountryCode = this.iti.getSelectedCountryData().dialCode;
//     // this.formatIntlTelInput();
//     this.phoneNumberChange.emit(this.phoneNumber);
//   }

// onFocus = () =>{
//   if(this.phoneNumber == undefined || this.phoneNumber == ""){
//       var getCode = this.iti.getSelectedCountryData().dialCode;
//      // this.phoneNumber = "+" + getCode;
//       this.phoneNumber = "";

//   }
// }



  // iti: any;
  // selectedCountryCode: any;
  // @ViewChild('telInput') telInput: { nativeElement: Element; };
  // @Input() phoneNumber = '';
  // @Input() cssClass = 'form-control';
  // @Output() phoneNumberChange = new EventEmitter<string>();
//   ngAfterViewInit(){
//     // const input = document.querySelector("#" + this.inputId);
//     this.iti = intlTelInput(this.telInput.nativeElement, {
//         utilsScript: "assets/scripts/utils.js",
//         // initialCountry: "auto",
//         nationalMode: false,
//         formatOnDisplay: true,
//         initialCountry:'ci',
//         separateDialCode:true


//     });
//     this.selectedCountryCode = this.iti.getSelectedCountryData().dialCode;
// }
}
