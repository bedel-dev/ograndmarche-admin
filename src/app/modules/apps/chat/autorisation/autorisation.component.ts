import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserServiceService } from 'src/app/services/users/user-service.service';

@Component({
  selector: 'app-autorisation',
  templateUrl: './autorisation.component.html',
  styleUrls: ['./autorisation.component.scss']
})
export class AutorisationComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService,private cdr: ChangeDetectorRef,private fb: FormBuilder,private userService:UserServiceService) {
    this.AddUserForm = new FormGroup({
      libelle: new FormControl(),
    })
    const loadingSubscr = this.isLoading$
    .asObservable()
    .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    this.getAutorisation()
  }
  showChangeEmailForm: boolean = false;
  showChangePasswordForm: boolean = false;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];

  AddUserForm: FormGroup;
  AddAutorisationForm: FormGroup;

  get f() {
    return this.AddUserForm.controls;
  }
  namefile:string = ""
  file_data:any=''
  file:any
  autorisation:any[]=[];
  getAutorisation(){
    this.userService.getAllautorisation().subscribe((res:any)=>{
      console.log(res.status)
      if(res.status ==  true){
        for(let r of res.data){
          //console.log(r)
          this.autorisation.push(r)
        }
        this.cdr.detectChanges();

      }else{

      }
    },error=>{
      this.authService.logout()
    })

   // console.log(this.autorisation)
  }


  userved:any;
 user:any
 message:string;
 stateinfo = false;
 allreadyexiste = false
 success = false;
 errorfeildName = false;
 public accesautorisation:boolean = false;
 saveSettings() {
  this.isLoading$.next(true);
  var statework = true;

  if(this.f.libelle.value == null){
    statework= false
    this.errorfeildName = true
    this.isLoading$.next(false);
  }else{
    this.errorfeildName = false
    statework= true
  }
  console.log(statework)
  this.cdr.detectChanges();
if(!this.errorfeildName)
  {

  this.userService.AddAutorisation(this.f).subscribe((rep:any)=>{

    if(rep.response.code=="402"){
    this.cdr.detectChanges();
    this.isLoading$.next(false);
    this.message = "information deja enregistré changez le numero"
    this.stateinfo = true
  // this.allreadyexiste = true;
    this.cdr.detectChanges();
    }else if(rep.response.code=="200"){
      this.accesautorisation= true;
      this.isLoading$.next(false);
      this.message = "information enregistré"
      this.success = true
      this.allreadyexiste = true;
      this.cdr.detectChanges();
    }
    else{
      //console.log(rep.response.message)
      this.message = "errer lors de l'enregistrément"
      this.stateinfo = true
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }
  },
  error=>{
    this.message = "errer lors de l'enregistrément"
    this.stateinfo = true
    this.isLoading$.next(false);
    //this.authService.logout()
  },
  ()=>{

    setTimeout(() => {
      this.success = false
      this.stateinfo = false
      this.cdr.detectChanges();
    }, 2500);
  })

}

}
ngOnDestroy() {
  this.unsubscribe.forEach((sb) => sb.unsubscribe());
}
}
