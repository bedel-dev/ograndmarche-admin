import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/modules/auth';
import { UserServiceService } from 'src/app/services/users/user-service.service';

@Component({
  selector: 'app-addconseiller',
  templateUrl: './addconseiller.component.html',
  styleUrls: ['./addconseiller.component.scss']
})
export class AddconseillerComponent implements OnInit {

  changeCity($event: Event) {
    // console.log($event.value)
 }
   defaultLocalisation: string = 'CI';
   defaultRole: string = 'conseiller';
   constructor(private authService: AuthService,private cdr: ChangeDetectorRef,private fb: FormBuilder,private userService:UserServiceService,)
   {
 
     this.AddUserForm = new FormGroup({
       image: new FormControl(),
       email: new FormControl(),
       phone: new FormControl(),
       username: new FormControl(),
       localisation: new FormControl(),
       role: new FormControl(),
       pass1: new FormControl(),
       pass2: new FormControl(),
       nom: new FormControl(),
       prenom: new FormControl(),
       loc:new FormControl(),
     })
     this.AddAutorisationForm = new FormGroup({
       autorisation:new FormControl()
     })
 
     this.AddUserForm.controls['localisation'].setValue(this.defaultLocalisation, {onlySelf: true});
     this.AddUserForm.controls['role'].setValue(this.defaultRole, {onlySelf: true});
 
     const loadingSubscr = this.isLoading$
     .asObservable()
     .subscribe((res:any) => (this.isLoading = res));
     this.unsubscribe.push(loadingSubscr);
   }
   separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
 
  preferredCountries: CountryISO[] = [CountryISO.CôteDIvoire, 
   CountryISO.France];
   
   selectedCountryISO:any
   ngOnInit(): void {
    this.selectedCountryISO = 'CI';
     this.getAutorisation()
   // this.initForm();
   //  this.user = JSON.parse(localStorage.getItem('recentUser')!)
   //  console.log(this.user)
   //  if(this.user){
   //   this.AddUserForm.controls['email'].setValue(this.user.email, {onlySelf: true})
   //   this.AddUserForm.controls['email'].disable();
   //   this.AddUserForm.controls['phone'].setValue(this.user.contact, {onlySelf: true});
   //   this.AddUserForm.controls['phone'].disable();
   //   this.AddUserForm.controls['username'].setValue(this.user.username, {onlySelf: true});
   //   this.AddUserForm.controls['username'].disable();
   //   this.AddUserForm.controls['localisation'].setValue(this.user.localisation, {onlySelf: true});
   //   this.AddUserForm.controls['localisation'].disable();
   //   this.AddUserForm.controls['role'].setValue(this.user.role, {onlySelf: true});
   //   this.AddUserForm.controls['role'].disable();
   //   this.AddUserForm.controls['pass1'].setValue('********************', {onlySelf: true});
   //   this.AddUserForm.controls['pass1'].disable();
   //   this.AddUserForm.controls['pass2'].setValue('********************', {onlySelf: true});
   //   this.AddUserForm.controls['pass2'].disable();
   //   this.AddUserForm.controls['nom'].setValue(this.user.name, {onlySelf: true});
   //   this.AddUserForm.controls['nom'].disable();
   //   this.AddUserForm.controls['prenom'].setValue(this.user.name, {onlySelf: true});
   //   this.AddUserForm.controls['prenom'].disable();
   //   this.AddUserForm.controls['file'].disable();
 
   //   this.cdr.detectChanges();
   //  }
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
   onFileChange(event:any) {
 
     if (event.target.files.length > 0) {
       const image = event.target.files[0];
       this.file = image;
       console.log('finfo',image.name,image.size,image.type);
       this.namefile = event.target.files[0].name;
 
       let formData = new FormData();
       let info={id:2,name:'raja'}
       formData.append('image', image, image.name);
       formData.append('id','2');
       formData.append('tz',new Date().toISOString())
       formData.append('update','2')
       formData.append('image',JSON.stringify(info))
       this.file_data=formData
 
 
      console.log(this.file_data)
 
       this.cdr.detectChanges()
       this.AddUserForm.patchValue({
         fileSource: image
       });
     this.cdr.markForCheck();
     }
   }
 
 
 
   // initForm() {
   //   this.AddUserForm = this.fb.group({
   //     email: [
   //        '',
   //         Validators.compose([
   //         Validators.required,
   //         //Validators.email,
   //         // Validators.minLength(10),
   //         // Validators.maxLength(10), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
   //       ]),
   //     ],
   //     phone: [
   //       '',
   //         Validators.compose([
   //         Validators.required,
   //         //Validators.minLength(3),
   //       //Validators.maxLength(4),
   //       ]),
   //     ],
   //     username: [
   //       '',
   //         Validators.compose([
   //         Validators.required,
   //         //Validators.minLength(3),
   //       //Validators.maxLength(4),
   //       ]),
   //     ],
   //     localisation: [
   //       '',
   //         Validators.compose([
   //         Validators.required,
   //         //Validators.minLength(3),
   //       //Validators.maxLength(4),
   //       ]),
   //     ],
   //     role: [
   //       '',
   //         Validators.compose([
   //         Validators.required,
   //         //Validators.minLength(3),
   //       //Validators.maxLength(4),
   //       ]),
   //     ],
   //     pass1: [
   //       '',
   //         Validators.compose([
   //         Validators.required,
   //         //Validators.minLength(3),
   //       //Validators.maxLength(4),
   //       ]),
   //     ],
   //     pass2: [
   //       '',
   //         Validators.compose([
   //         Validators.required,
   //         //Validators.minLength(3),
   //       //Validators.maxLength(4),
   //       ]),
   //     ],
   //     file: [
   //       '',
   //         Validators.compose([
   //         Validators.required,
   //         //Validators.minLength(3),
   //       //Validators.maxLength(4),
   //       ]),
   //     ],
   //      prenom: [
   //       '',
   //         Validators.compose([
   //         Validators.required,
   //         //Validators.minLength(3),
   //       //Validators.maxLength(4),
   //       ]),
   //     ],
   //     nom: [
   //       '',
   //         Validators.compose([
   //         Validators.required,
   //         //Validators.minLength(3),
   //       //Validators.maxLength(4),
   //       ]),
   //     ],
   //     loc: [
   //       '',
   //         Validators.compose([
   //         Validators.required,
   //         //Validators.minLength(3),
   //       //Validators.maxLength(4),
   //       ]),
   //     ],
   //   });
   // }
 
   userved:any;
    user:any
   message:string;
   stateinfo = false;
   allreadyexiste = false
   success = false;
   errorfeildfile = false;
   errorfeildName = false;
   passewordgood = false;
   errorfeildPrenom = false;
   errorfeildlocalite = false;
   errorfeildPhone = false
   errorfeildusername = false;
   errorfeildpays = false;
   errorfeildrole = false;
   errorfeildpass1 =false;
   errorfeildpass2 = false;
   saveSettings() {
     this.isLoading$.next(true);
     var statework = true;
     if(this.namefile == ""){
       statework= false
       this.errorfeildfile = true
       this.isLoading$.next(false);
     }else{
       statework= true
       this.errorfeildfile = false
 
     }
     if(this.f.nom.value == null){
       statework= false
       this.errorfeildName = true
       this.isLoading$.next(false);
     }else{
       this.errorfeildName = false
       statework= true
     }
     if(this.f.prenom.value == null){
       statework= false
       this.errorfeildPrenom = true
       this.isLoading$.next(false);
     }else{
       this.errorfeildPrenom = false
       statework= true
     }
     if(this.f.loc.value == null){
       statework= false
       this.errorfeildlocalite = true
       this.isLoading$.next(false);
     }else{
       this.errorfeildlocalite = false
       statework= true
     }
     if(this.f.phone.value == null){
       statework= false
       this.errorfeildPhone = true
       this.isLoading$.next(false);
     }else{
       this.errorfeildPhone = false
       statework= true
 
     }
     // if(this.f.username.value == null){
     //   statework= false
     //   this.errorfeildusername = true
     //   this.isLoading$.next(false);
     // }else{
     //   this.errorfeildusername = false
     //   statework= true
 
     // }
    //  if(this.f.pass1.value == null){
    //    statework= false
    //    this.errorfeildpass1 = true
    //    this.isLoading$.next(false);
    //  }else{
    //    this.errorfeildpass1 = false
    //    statework= true
 
    //  }
    //  if(this.f.pass2.value == null){
    //    statework= false
    //    this.errorfeildpass2 = true
    //    this.isLoading$.next(false);
    //  }else{
    //    this.errorfeildpass2 = false
    //    statework= true
    //  }
    //  if(this.f.pass1.value !== this.f.pass2.value){
    //    statework= false
    //    this.passewordgood = true
    //    this.isLoading$.next(false);
    //  }else if(this.f.pass1.value == null || this.f.pass2.value == null){
    //    statework= false
    //    this.passewordgood = true
 
    //  }else if(this.f.pass1.value == null && this.f.pass2.value == null){
    //    statework= false
    //    this.passewordgood = true
    //  }else{
    //    statework= true
    //    this.passewordgood = false
    //  }
     console.log(statework)
     this.cdr.detectChanges();
   if(
     !this.errorfeildfile
     &&!this.errorfeildName
     &&!this.errorfeildPrenom
     &&!this.errorfeildlocalite
     &&!this.errorfeildPhone
       // &&!this.errorfeildusername
    //&&!this.errorfeildpass1
    // &&!this.errorfeildpass2
     &&!this.passewordgood
     )
     {
 
     this.userService.AddUser(this.f,this.namefile).subscribe((rep:any)=>{
 
 
       if(rep.response.code=="402"){
       this.cdr.detectChanges();
       this.isLoading$.next(false);
       this.message = "information deja enregistré changez le numero"
       this.stateinfo = true
     // this.allreadyexiste = true;
       this.cdr.detectChanges();
       }else if(rep.response.code=="200"){
     this.userService.UplaodIamge(this.file).subscribe((res)=>{
       console.log(res)
     })
     this.userved = rep.response.data.id;
     console.log(this.userved)
       this.accesautorisation= true;
         this.isLoading$.next(false);
         this.message = "information enregistré"
         this.success = true
         this.allreadyexiste = true;
         var n = rep.response.data.name.split(" ");
         var nom = n[0]
         var prenom = n[1]
         this.AddUserForm.controls['email'].setValue(rep.response.data.email, {onlySelf: true})
         this.AddUserForm.controls['email'].disable();
         this.AddUserForm.controls['phone'].setValue(rep.response.data.contact, {onlySelf: true});
         this.AddUserForm.controls['phone'].disable();
         // this.AddUserForm.controls['username'].setValue(rep.response.data.username, {onlySelf: true});
         // this.AddUserForm.controls['username'].disable();
         this.AddUserForm.controls['localisation'].setValue(rep.response.data.localisation, {onlySelf: true});
         this.AddUserForm.controls['localisation'].disable();
         this.AddUserForm.controls['role'].setValue(rep.response.data.role, {onlySelf: true});
         this.AddUserForm.controls['role'].disable();
        //  this.AddUserForm.controls['pass1'].setValue('********************', {onlySelf: true});
        //  this.AddUserForm.controls['pass1'].disable();
        //  this.AddUserForm.controls['pass2'].setValue('********************', {onlySelf: true});
        //  this.AddUserForm.controls['pass2'].disable();
         this.AddUserForm.controls['nom'].setValue(nom, {onlySelf: true});
         this.AddUserForm.controls['nom'].disable();
         this.AddUserForm.controls['prenom'].setValue(prenom, {onlySelf: true});
         this.AddUserForm.controls['prenom'].disable();
         this.AddUserForm.controls['image'].disable();
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
   autorisationListe:any[]=[]
   autorisationempty = false
   sussesauto = false
   Saveautorisation(){
     this.isLoading$.next(true);
     console.log(this.autorisationListe.length)
     if(this.autorisationListe.length==0){
       this.autorisationempty = true
       this.isLoading$.next(false);
       this.cdr.detectChanges()
     }else{
       this.autorisationempty = false
       this.userService.AddUserautorisation(this.autorisationListe,this.userved).subscribe((res:any)=>{
 
         console.log(res)
         if(res.response.code=="200"){
           this.sussesauto =true
           this.cdr.detectChanges()
         }
       },erro=>{
         //this.authService.logout()
       },()=>{
 
       })
 
       this.isLoading$.next(false);
       this.cdr.detectChanges()
     }
   }
   choixAutorisation(choix:any){
     this.autorisationListe.push(choix)
     this.cdr.detectChanges();
   }
 
   toggleEmailForm(show: boolean) {
     this.showChangeEmailForm = show;
   }
 
   saveEmail() {
     this.isLoading$.next(true);
     setTimeout(() => {
       this.isLoading$.next(false);
       this.showChangeEmailForm = false;
       this.cdr.detectChanges();
     }, 1500);
   }
 
   togglePasswordForm(show: boolean) {
     this.showChangePasswordForm = show;
   }
 
   savePassword() {
     this.isLoading$.next(true);
     setTimeout(() => {
       this.isLoading$.next(false);
       this.showChangePasswordForm = false;
       this.cdr.detectChanges();
     }, 1500);
   }
 
   public saveUsername:boolean;
   public accesautorisation:boolean = false;
   AccesCompte(data:any){
     if(data == true&&this.accesautorisation==false){
       this.saveSettings()
 
     }
    // console.log(data)
   }
 
   ngOnDestroy() {
     this.unsubscribe.forEach((sb) => sb.unsubscribe());
   }
}
