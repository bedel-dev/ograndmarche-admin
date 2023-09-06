import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/modules/auth';
import { UserServiceService } from 'src/app/services/users/user-service.service';

@Component({
  selector: 'app-addfournisseur',
  templateUrl: './addfournisseur.component.html',
  styleUrls: ['./addfournisseur.component.scss']
})
export class AddfournisseurComponent implements OnInit {
  defaultLocalisation: string = 'CI';
  defaultRole: string = 'fournisseur';
  constructor(private router: ActivatedRoute,public userServices:UserServiceService,
    private cdr: ChangeDetectorRef,private authService: AuthService,
    private fb: FormBuilder,private userService:UserServiceService) {
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

  ngOnInit(): void {
        console.log(this.router.snapshot.params.id)
        this.GetUser(this.router.snapshot.params.id);
        this.getAutorisation()
  }

  User:any;
  saveAutorisation: boolean = false;
  GetUser(userId: string){
    this.userServices.GetAlldemandeFournisseur().subscribe((res:any)=>{


       this.User = res.data.filter((item: any) => {
         return  item.id.toString() == userId
       // console.log( item.id.toString(),userId)
       })
      //this.userved = res.response.data.id;

     // console.log(this.User[0])
      // if(this.User.autorisation.length == 0){
      //   this.saveAutorisation = true
      //   this.cdr.detectChanges();
      // }
      //  var n = res.response.data.name.split(" ");
      //  var nom = n[0]
      //  var prenom = n[1]
      //  if(res.response.data.email == "defaulmail@gmail.com"){
      //   res.response.data.email = ""
      //  }
      // this.namefile = res.response.data.urlprofile;
       this.AddUserForm.controls['email'].setValue(this.User[0].email, {onlySelf: true})
       this.AddUserForm.controls['phone'].setValue(this.User[0].numero, {onlySelf: true});
       this.AddUserForm.controls['username'].setValue('', {onlySelf: true});
       this.AddUserForm.controls['localisation'].setValue(this.defaultLocalisation, {onlySelf: true});
       this.AddUserForm.controls['loc'].setValue(this.User[0].ville, {onlySelf: true});
       this.AddUserForm.controls['role'].setValue(this.defaultRole, {onlySelf: true});
       this.AddUserForm.controls['pass1'].setValue('', {onlySelf: true});
       this.AddUserForm.controls['pass2'].setValue('', {onlySelf: true});
       this.AddUserForm.controls['nom'].setValue(this.User[0].nom, {onlySelf: true});
       this.AddUserForm.controls['prenom'].setValue(this.User[0].prenom, {onlySelf: true});
       this.cdr.detectChanges();
    },
    error=>{
    //  this.authService.logout()
    },
    ()=>{
     // this.getAutorisation();
    });

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
   if(this.f.username.value == null){
     statework= false
     this.errorfeildusername = true
     this.isLoading$.next(false);
   }else{
     this.errorfeildusername = false
     statework= true

   }
   if(this.f.pass1.value == null){
     statework= false
     this.errorfeildpass1 = true
     this.isLoading$.next(false);
   }else{
     this.errorfeildpass1 = false
     statework= true

   }
   if(this.f.pass2.value == null){
     statework= false
     this.errorfeildpass2 = true
     this.isLoading$.next(false);
   }else{
     this.errorfeildpass2 = false
     statework= true

   }
   if(this.f.pass1.value !== this.f.pass2.value){
     statework= false
     this.passewordgood = true
     this.isLoading$.next(false);
   }else if(this.f.pass1.value == null || this.f.pass2.value == null){
     statework= false
     this.passewordgood = true

   }else if(this.f.pass1.value == null && this.f.pass2.value == null){
     statework= false
     this.passewordgood = true
   }else{
     statework= true
     this.passewordgood = false
   }
   console.log(statework)
   this.cdr.detectChanges();
 if(
   !this.errorfeildfile
   &&!this.errorfeildName
   &&!this.errorfeildPrenom
   &&!this.errorfeildlocalite
   &&!this.errorfeildPhone
   &&!this.errorfeildusername
   &&!this.errorfeildpass1
   &&!this.errorfeildpass2
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
       var n = rep.response.data.name.split(" ");
       var nom = n[0]
       var prenom = n[1]
       this.AddUserForm.controls['email'].setValue(rep.response.data.email, {onlySelf: true})
       this.AddUserForm.controls['email'].disable();
       this.AddUserForm.controls['phone'].setValue(rep.response.data.contact, {onlySelf: true});
       this.AddUserForm.controls['phone'].disable();
       this.AddUserForm.controls['username'].setValue(rep.response.data.username, {onlySelf: true});
       this.AddUserForm.controls['username'].disable();
       this.AddUserForm.controls['localisation'].setValue(rep.response.data.localisation, {onlySelf: true});
       this.AddUserForm.controls['localisation'].disable();
       this.AddUserForm.controls['role'].setValue(rep.response.data.role, {onlySelf: true});
       this.AddUserForm.controls['role'].disable();
       this.AddUserForm.controls['pass1'].setValue('********************', {onlySelf: true});
       this.AddUserForm.controls['pass1'].disable();
       this.AddUserForm.controls['pass2'].setValue('********************', {onlySelf: true});
       this.AddUserForm.controls['pass2'].disable();
       this.AddUserForm.controls['nom'].setValue(nom, {onlySelf: true});
       this.AddUserForm.controls['nom'].disable();
       this.AddUserForm.controls['prenom'].setValue(prenom, {onlySelf: true});
       this.AddUserForm.controls['prenom'].disable();
       this.AddUserForm.controls['image'].disable();
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
    this.UpdateStatutFournisseur()
     setTimeout(() => {
       this.success = false
       this.stateinfo = false
       this.cdr.detectChanges();
     }, 2500);
   })

 }

 }

 UpdateStatutFournisseur(){
  this.userService.UpdateStateFournisseur(this.User[0].id).subscribe((rep:any)=>{
    console.log(rep.response);
  })


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
