import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from '../../account/settings/settings.component';
import { AddconseilComponent } from './addconseil/addconseil.component';
import { AddfournisseurComponent } from './addfournisseur/addfournisseur.component';
import { AddprixmarcherComponent } from './addprixmarcher/addprixmarcher.component';
import { AddproduitComponent } from './addproduit/addproduit.component';
import { AddpubliciteComponent } from './addpublicite/addpublicite.component';
import { AddventeComponent } from './addvente/addvente.component';
import { AutorisationComponent } from './autorisation/autorisation.component';
import { CcourselistComponent } from './ccourselist/ccourselist.component';
import { ChatComponent } from './chat.component';
import { CommandelistComponent } from './commandelist/commandelist.component';
import { DrawerChatComponent } from './drawer-chat/drawer-chat.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { ListautorisationComponent } from './listautorisation/listautorisation.component';
import { ListconseilComponent } from './listconseil/listconseil.component';
import { ListeventeComponent } from './listevente/listevente.component';
import { ListfournisseursComponent } from './listfournisseurs/listfournisseurs.component';
import { ListprixmarcherComponent } from './listprixmarcher/listprixmarcher.component';
import { ListproduitComponent } from './listproduit/listproduit.component';
import { ListpubliciteComponent } from './listpublicite/listpublicite.component';
import { PrivateChatComponent } from './private-chat/private-chat.component';
import { UpdateeventeComponent } from './updateevente/updateevente.component';
import { UpdateproduitComponent } from './updateproduit/updateproduit.component';
import { UpdatepubliciteComponent } from './updatepublicite/updatepublicite.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { UsergestionsComponent } from './usergestions/usergestions.component';
import { UsergestionslistComponent } from './usergestionslist/usergestionslist.component';
import { AddcoursemontantComponent } from './addcoursemontant/addcoursemontant.component';
import { ListcoursemontantComponent } from './listcoursemontant/listcoursemontant.component';
import { ListconseillerComponent } from './listconseiller/listconseiller.component';
import { AddconseillerComponent } from './addconseiller/addconseiller.component';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AddchauffeurComponent } from './addchauffeur/addchauffeur.component';
import { ListchauffeurComponent } from './listchauffeur/listchauffeur.component';
import { AddvehiculeComponent } from './addvehicule/addvehicule.component';
import { ListvehiculeComponent } from './listvehicule/listvehicule.component';
import { ListcourseComponent } from './listcourse/listcourse.component';
import { ServicetransportComponent } from './servicetransport/servicetransport.component';
import { ListservicetransportComponent } from './listservicetransport/listservicetransport.component';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    children: [
      {
        path: 'liste-user',
        component: UsergestionslistComponent,
      },
      {
        path: 'adduser',
        component: UsergestionsComponent,
      },
      {
        path: 'addautorisation',
        component: AutorisationComponent,
      },
      {
        path: 'listeAutorisation',
        component: ListautorisationComponent,
      },
      {
        path: 'drawer-chat',
        component: DrawerChatComponent,
      },
      {
        path: 'update-user/:id',
        component: UpdateuserComponent,
      },
      {
        path: 'profile',
        component: SettingsComponent,
      },
      {
        path: 'list-fournisseur',
        component: ListfournisseursComponent,
      },
      {
        path: 'activate-fournisseur/:id',
        component: AddfournisseurComponent,
      },
      {
        path: 'add-publicite',
        component: AddpubliciteComponent,
      },
      {
        path: 'list-publicite',
        component: ListpubliciteComponent,
      },
      {
        path: 'update-publicite/:id',
        component: UpdatepubliciteComponent,
      },
      {
        path: 'add-produit',
        component: AddproduitComponent,
      },
      {
        path: 'list-produit',
        component: ListproduitComponent,
      },
      {
        path: 'add-vente/:id',
        component: AddventeComponent,
      },
      {
        path: 'list-vente',
        component: ListeventeComponent,
      },
      {
        path: 'update-vente/:id',
        component: UpdateeventeComponent,
      },
      {
        path: 'update-produit/:id',
        component: UpdateproduitComponent,
      },
      {
        path: 'list-commande',
        component: CommandelistComponent,
      },
      {
        path: 'addprixdumarcher',
        component: AddprixmarcherComponent,
      },
      {
        path: 'conseil',
        component: ListconseilComponent,
      },
      {
        path: 'addconseil',
        component: AddconseilComponent,
      },
      {
        path: 'add-coursemontnant',
        component: AddcoursemontantComponent  ,
      },
      {
        path: 'list-montantcourses',
        component: ListcoursemontantComponent,
      },
      {
        path: 'list-prix-du-marcher',
        component: ListprixmarcherComponent,
      },
      {
        path: 'list-courses/:id',
        component: CcourselistComponent,
      },
      {
        path: 'list-conseiller',
        component: ListconseillerComponent,
      },
      {
        path: 'add-conseiller',
        component: AddconseillerComponent,
      },
      {
        path: 'add-chauffeur',
        component: AddchauffeurComponent,
      },
      {
        path:"list-chauffeur",
        component:ListchauffeurComponent
      },
      {
        path:"add-vehicule",
        component:AddvehiculeComponent
      },
      {
        path:"list-vehicule",
        component:ListvehiculeComponent
      }
      ,
      {
        path:"list-course",
        component:ListcourseComponent
      },
      {
        path:"add-service",
        component:ServicetransportComponent
      },
      {
        path:"list-service",
        component:ListservicetransportComponent
      },
      { path: '', redirectTo: 'private-chat', pathMatch: 'full' }, 
      { path: '**', redirectTo: 'private-chat', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    
    NotificationService   
  ],
})
export class ChatRoutingModule {}
