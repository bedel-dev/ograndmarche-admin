import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserServiceService } from 'src/app/services/users/user-service.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss']
})
export class CreateuserComponent implements OnInit {

  defaultLocalisation: string = 'CI';
  defaultRole: string = 'gpublic';
  constructor(private auth:AuthService, private authService: AuthService,private cdr: ChangeDetectorRef,private fb: FormBuilder,private userService:UserServiceService,private route: ActivatedRoute,private router: Router,)
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

    const loadingSubscr = this.isLoading$
    .asObservable()
    .subscribe((res:any) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }


  ngOnInit(): void {
    this.getAutorisation()
    this.getAllFournisseur()
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
    // this.userService.getAllautorisation().subscribe((res:any)=>{
    //   console.log(res.status)
    //   if(res.status ==  true){
    //     for(let r of res.data){
    //       //console.log(r)
    //       this.autorisation.push(r)
    //     }
    //     this.cdr.detectChanges();

    //   }else{

    //   }
    // },error=>{
    // //  this.authService.logout()
    // })

   // console.log(this.autorisation)
  }

  AllFournisseur:any[]=[]
  getAllFournisseur(){
    this.userService.GetAlldemandeFournisseur().subscribe((res:any)=>{
      console.log(res)

      res.data.forEach((element: any) => {

        if(element.statut_demande == "accepter"){
          this.AllFournisseur.push(element);
          this.cdr.detectChanges()
        }

      });
      console.log(this.AllFournisseur)
    })
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
  isten:boolean=false
  saveSettings() {
    this.isLoading$.next(true);
    var statework = true;

    if(this.f.phone.value == null){
      statework= false
      this.errorfeildPhone = true
      this.isLoading$.next(true);
    }else{
      var p
            if(this.f.phone.value.includes(" ")){
              if(this.f.phone.value.split(" ")[0] == "+225"){
                p = this.f.phone.value.split(" ")[1]
              }
            }else{
              p  = this.f.phone.value;
            }

      if(p.length == 10){
        this.isLoading$.next(true);
        this.errorfeildPhone = false
        statework= true
        this.isten = true
      }else{
        this.message = "le contact doit contenir de 10 chiffres"
        this.stateinfo = true;
        statework= false
        this.isten = false
      //  this.errorfeildPhone = true
        this.isLoading$.next(false);
      }
    }
    if(this.f.pass1.value == null){
      statework= false
      this.errorfeildpass1 = true
      this.isLoading$.next(false);
    }else{
      this.errorfeildpass1 = false
      statework= true
      this.isLoading$.next(true);

    }
    if(this.f.pass2.value == null){
      statework= false
      this.errorfeildpass2 = true
      this.isLoading$.next(false);
    }else{
      this.errorfeildpass2 = false
      statework= true
      this.isLoading$.next(true);

    }
    if(this.f.pass1.value !== this.f.pass2.value){
      statework= false
      this.passewordgood = true
      this.isLoading$.next(false);
    }else if(this.f.pass1.value == null || this.f.pass2.value == null){
      statework= false
      this.passewordgood = true
      this.isLoading$.next(true);

    }else if(this.f.pass1.value == null && this.f.pass2.value == null){
      statework= false
      this.passewordgood = true
      this.isLoading$.next(true);

    }else{
      statework= true
      this.passewordgood = false
      this.isLoading$.next(false);

    }
    console.log(this.isten)
    this.cdr.detectChanges();
  if(
    !this.errorfeildPhone
    &&!this.errorfeildpass1
    &&!this.errorfeildpass2
    &&!this.passewordgood
    &&this.isten==true
    )
    {
      this.isLoading$.next(true);
      this.cdr.detectChanges()
      var filterfournisseur = this.AllFournisseur.filter(item => {
        return item.numero == this.f.phone.value && item.statut_demande =="accepter"
      })
      this.namefile = "avatar.png"
     // console.log("fiel :",this.f)

      console.log(filterfournisseur)
      if(filterfournisseur.length > 0){
        var newuser = filterfournisseur[0]
            newuser.pass1 = this.f.pass1.value
            newuser.username = this.f.username.value
            console.log("new user: " , newuser)
    this.userService.AddUserFournisseur(newuser,this.namefile).subscribe((rep:any)=>{
      console.log("rep: ",rep)
      if(rep.response.code=="402"){
      this.cdr.detectChanges();
      this.isLoading$.next(false);
      this.message = "information deja enregistré changez le numero"
      this.stateinfo = true
    // this.allreadyexiste = true;

      this.cdr.detectChanges();
      }else if(rep.response.code=="200"){
    // this.userService.UplaodIamge(this.file).subscribe((res)=>{
    //   console.log(res)
    // })
    //this.userved = rep.response.data.id;

      // this.accesautorisation= true;
       // this.isLoading$.next(false);

        this.userved = rep.response.data.id;
        console.log(this.userved)
        var tp = {
          "id":1,
          "libelle":"transport",
        }
        var re = {
          "id":7,
          "libelle":"recclamation",
        }

        if(newuser.typeDemande =="Transporteur"){
          this.autorisationListe.push(tp);
          this.autorisationListe.push(re);
        }
        if(newuser.typeDemande =="fournisseur"){
          // this.autorisationListe.push(tp);
          // this.autorisationListe.push(re);
        }
        console.log(this.autorisationListe)
        this.userService.AddUserautorisationfournisseur(this.autorisationListe,this.userved).subscribe(userautorisation =>{

        },error=>{
          this.message = "impossible d'attribuer une autorisation"
        },()=>{
          this.message = "information enregistré"
          this.success = true
          this.isLoading$.next(false);
          this.cdr.detectChanges();
          this.router.navigate(['/auth/login'])
        })
      //this.isLoading$.next(false);
     //this.auth.logout()
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
      this.cdr.detectChanges();

      //this.authService.logout()
    },
    ()=>{

      setTimeout(() => {
        this.success = false
        this.stateinfo = false
        this.cdr.detectChanges();
      }, 2500);
    })
      }else{
        this.message = "votre numero n'est pas reconnue";
        this.stateinfo = true;
        this.isLoading$.next(false);
        this.cdr.detectChanges();
        setTimeout(() => {
          this.isLoading$.next(false);
          this.stateinfo = false;
          this.cdr.detectChanges();
        }, 1500);
      }
  }else{
    setTimeout(() => {
      this.success = false
      this.stateinfo = false
      this.isten = false
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, 2500);
    this.isLoading$.next(false);
    this.cdr.detectChanges();
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
