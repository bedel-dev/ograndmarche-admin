import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth';
import { UserServiceService } from 'src/app/services/users/user-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-servicetransport',
  templateUrl: './servicetransport.component.html',
  styleUrls: ['./servicetransport.component.scss']
})
export class ServicetransportComponent implements OnInit {

  defaultLocalisation: string = 'null';
  defaultRole: string = 'gpublic';
  constructor(private route: ActivatedRoute, private router: Router,private authService: AuthService,private cdr: ChangeDetectorRef,private fb: FormBuilder,private userService:UserServiceService,) {
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
      montant:new FormControl(),
      flotte:new FormControl()
    })
    this.AddAutorisationForm = new FormGroup({
      autorisation:new FormControl()
    })

     ///this.AddUserForm.controls['localisation'].setValue(this.defaultLocalisation, {onlySelf: true});
    // this.AddUserForm.controls['role'].setValue(this.defaultRole, {onlySelf: true});

    const loadingSubscr = this.isLoading$
    .asObservable()
    .subscribe((res:any) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
   }
  ngOnInit(): void {
    var hauth =  localStorage.getItem(this.authLocalStorageToken)
    this.userconnected = JSON.parse(hauth!)
    this.GetAllUser()
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

  Vente:any[]=[]
  User:any[]=[]
  GetAllVente(){
    this.userService.GetAllCategorie().subscribe((rep:any)=>{
      rep.data.forEach((element:any) => {
        this.Vente.push(element)
      });
      this.cdr.detectChanges()
    },error=>{

    },
    ()=>{
      console.log(this.Vente)
      console.log(this.Vente)
    })
  }

  GetAllUser(){
    this.userService.GetAlluser().subscribe((user:any) =>{
      user.data.forEach((element:any) => {
         //console.log(element)
         if(element.role == "Transporteur"){
          this.User.push(element)
         }
      })
      this.cdr.detectChanges()
    },error =>{

    },()=>{
      //this.GetAllVente()
    })
  }
  file_data:any=''
  file:any
  namefile:string = ""

  autorisation:any[]=[];
   getAutorisation(){
    this.userService.getAllautorisation().subscribe((res:any)=>{
      console.log(res.status)
      if(res.status ==  true){
        for(let r of res.data){
          this.autorisation.push(r)
        }
        this.cdr.detectChanges();

      }else{

      }
    },error=>{
     // this.authService.logout()
    })
  }
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  userconnected:any
  onFileChange(event:any) {
    var hauth =  localStorage.getItem(this.authLocalStorageToken)
     this.userconnected = JSON.parse(hauth!)
     console.log(this.userconnected.data.role)
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      this.file = image;
      console.log('finfo',image.name,image.size,image.type);
      this.namefile = event.target.files[0].name;
     // this.namefile = image.size+"_"+String(Math.floor(100000 + Math.random() * 900000))+"."+image.type.split("/")[1]
     // console.log(image.name)
    // console.log("this.namefile :",this.namefile)
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
 errorfeildDescription = false;
 errorfeilddelai = false;
 errorfeilmontant = false;
 errorfeilcoop = false;


 saveSettings() {
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  this.userconnected = JSON.parse(hauth!)
    //console.log("vente :"+this.f.loc.value)
   this.isLoading$.next(true);
   var statework = true;
   if(this.f.localisation.value == null){
    statework= false
    this.errorfeildpays = true
    this.isLoading$.next(false);
  }else{
    this.errorfeildpays = false
    statework= true
  }

   if(this.f.email.value == null){
     statework= false
     this.errorfeildDescription = true
     this.isLoading$.next(false);
   }else{
     this.errorfeildDescription = false
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

  if(this.userconnected.data.role =="admin"){
    if(this.f.flotte.value == null){
      statework= false
      this.errorfeilcoop = true
      this.isLoading$.next(false);
    }else{
      this.errorfeilcoop = false
      statework= true
    }
  }else{
   this.errorfeilcoop = false
   statework= true
 }

   this.cdr.detectChanges();
 if(
   !this.errorfeildpays
   &&!this.errorfeildDescription
   &&!this.errorfeildPhone
   &&!this.errorfeilcoop)
  {
    var hauth =  localStorage.getItem(this.authLocalStorageToken)
     this.userconnected = JSON.parse(hauth!)
     console.log(this.userconnected.data.id)

    var id = null
    if(this.userconnected.data.role =='admin'){
      id = this.f.flotte.value;
    }else{
      id = this.userconnected.data.id
    }

    this.userService.AddServiceTransport(this.f,this.namefile,id).subscribe((rep:any)=>{
    console.log(rep)
     if(rep.response.code=="402"){
     this.cdr.detectChanges();
     this.isLoading$.next(false);
     this.message = "information deja enregistré changez le numero"
     this.stateinfo = true
   // this.allreadyexiste = true;
     this.cdr.detectChanges();
     }else if(rep.response.code=="200"){
       this.isLoading$.next(false);
       this.message = "Service enregistré"
       this.success = true
       this.allreadyexiste = true;
       this.router.navigate(['/apps/chat/list-service']);
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


 datalistOptions:any[]=[]
 onSearchChange(searchValue: any): void {
   var sessionToken = String(Math.floor(100000 + Math.random() * 900000))
 // this.Lieulivraison = searchValue.target.value
   this.userService.getloc(searchValue.target.value,sessionToken).subscribe((localite:any)=>{
     this.datalistOptions= []
     this.cdr.detectChanges()
     localite.predictions.forEach((element: any) => {
       this.datalistOptions.push(element)
       console.log(element.description)
       this.cdr.detectChanges()

     });
   })
 }
}
