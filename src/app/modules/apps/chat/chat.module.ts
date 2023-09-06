import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from '../chat/chat.component';
import { PrivateChatComponent } from './private-chat/private-chat.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { DrawerChatComponent } from './drawer-chat/drawer-chat.component';
import {
  DropdownMenusModule,
  ChatInnerModule,
  CardsModule,
} from '../../../_metronic/partials';
import { UsergestionsComponent } from './usergestions/usergestions.component';
import { UsergestionslistComponent } from './usergestionslist/usergestionslist.component';
//import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { AutorisationComponent } from './autorisation/autorisation.component';
import { ListautorisationComponent } from './listautorisation/listautorisation.component';
import { ListfournisseursComponent } from './listfournisseurs/listfournisseurs.component';
import { AddfournisseurComponent } from './addfournisseur/addfournisseur.component';
import { AddpubliciteComponent } from './addpublicite/addpublicite.component';
import { ListpubliciteComponent } from './listpublicite/listpublicite.component';
import { UpdatepubliciteComponent } from './updatepublicite/updatepublicite.component';
import { AddproduitComponent } from './addproduit/addproduit.component';
import { ListproduitComponent } from './listproduit/listproduit.component';
import { UpdateproduitComponent } from './updateproduit/updateproduit.component';
import { AddventeComponent } from './addvente/addvente.component';
import { ListeventeComponent } from './listevente/listevente.component';
import { UpdateeventeComponent } from './updateevente/updateevente.component';
import { CommandelistComponent } from './commandelist/commandelist.component';
import { SpinnerlaodComponent } from './spinnerlaod/spinnerlaod.component';
import { NgbModule }
from '@ng-bootstrap/ng-bootstrap';
import { CcourselistComponent } from './ccourselist/ccourselist.component';
import { AddprixmarcherComponent } from './addprixmarcher/addprixmarcher.component';
import { ListprixmarcherComponent } from './listprixmarcher/listprixmarcher.component';
import { ListconseilComponent } from './listconseil/listconseil.component';
import { AddconseilComponent } from './addconseil/addconseil.component';
import { AddcoursemontantComponent } from './addcoursemontant/addcoursemontant.component';
import { ListcoursemontantComponent } from './listcoursemontant/listcoursemontant.component';
import { ListconseillerComponent } from './listconseiller/listconseiller.component';
import { AddconseillerComponent } from './addconseiller/addconseiller.component';
import { NotificationComponent } from '../../../notification/notification.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { AddchauffeurComponent } from './addchauffeur/addchauffeur.component';
import { ListchauffeurComponent } from './listchauffeur/listchauffeur.component';
import { AddvehiculeComponent } from './addvehicule/addvehicule.component';
import { ListvehiculeComponent } from './listvehicule/listvehicule.component';
import { ListcourseComponent } from './listcourse/listcourse.component';
import { ServicetransportComponent } from './servicetransport/servicetransport.component';
import { ListservicetransportComponent } from './listservicetransport/listservicetransport.component';

@NgModule({
  declarations: [
    ChatComponent,
    PrivateChatComponent,
    GroupChatComponent,
    DrawerChatComponent,
    UsergestionsComponent,
    UsergestionslistComponent,
    UpdateuserComponent,
    AutorisationComponent,
    ListautorisationComponent,
    ListfournisseursComponent,
    AddfournisseurComponent,
    AddpubliciteComponent,
    ListpubliciteComponent,
    UpdatepubliciteComponent,
    AddproduitComponent,
    ListproduitComponent,
    UpdateproduitComponent,
    AddventeComponent,
    ListeventeComponent,
    UpdateeventeComponent,
    CommandelistComponent,
    SpinnerlaodComponent,
    CcourselistComponent,
    AddprixmarcherComponent,
    ListprixmarcherComponent,
    ListconseilComponent,
    AddconseilComponent,
    AddcoursemontantComponent,
    ListcoursemontantComponent,
    ListconseillerComponent,
    AddconseillerComponent,
    AddchauffeurComponent,
    ListchauffeurComponent,
    AddvehiculeComponent,
    ListvehiculeComponent,
    ListcourseComponent,
    ServicetransportComponent,
    ListservicetransportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxIntlTelInputModule,  
    ChatRoutingModule,
    DropdownMenusModule,
    ChatInnerModule,
    CardsModule,
    InlineSVGModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule

  ],
})
export class ChatModule {}
