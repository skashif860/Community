import { Component, OnInit, ViewEncapsulation, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { SideChatService } from './side-chat.service';
import { SideChat } from './side-chat.model';

// firebase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';
import { TokenService } from 'src/app/services/token-service';
import { AppGlobal } from 'src/app/shared/app.global';
import { UserOrg } from 'src/app/services/userorg.service';
import { ChatService } from './services/chat.service';
import { CONVERSATION, User, ChatroomDetails } from './models/chat.models';

import { NgxSpinnerService } from 'ngx-spinner';

import { saveAs } from 'file-saver';
import * as $ from 'jquery';
import * as moment from 'moment';
import { async } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-side-chat',
  templateUrl: './side-chat.component.html',
  styleUrls: ['./side-chat.component.scss'],
  providers: [SideChatService]
})
export class SideChatComponent implements OnInit, AfterViewInit, OnDestroy {
  public userId: any;
  public userMsisdn: any;
  public userEmail: any;
  public userType: any;
  public userImage: any;
  public orgName;
  public org_id;
  public token: any;

  public settings: Settings;
  public showHoverableChatItem: boolean = false;
  public showChatWindow: boolean = false;
  public showAddContactWindow: boolean = false;
  public showConfirmationNote: boolean;
  public showImageUploadWindow: boolean;
  public chats: Array<any>;
  public talks: Array<any>;
  public interlocutor: string;
  public searchText: string;
  public newChatText: string = '';
  contacts: any = [];
  chatrooms: ChatroomDetails = [];
  temp: any = [];
  chat: any = [];

  temp_chatroom: ChatroomDetails = [];
  temp_contacts: any = [];
  newContatForm;

  //  models
  message: CONVERSATION = {
    from: '',
    groupId: '',
    message: '',
    messageImage: '',
    profileimageurl: '',
    receiverId: '',
    seen: '',
    senderId: '',
    sendername: '',
    type: '',
    timestamp: '',
  };
  user: User = {
    Date: '',
    Day: '',
    Status: '',
    Time: '',
    UserEmail: '',
    UserId: '',
    UserName: '',
  };

  UploadImageModel = {
    ImageURL: '',
    Caption: ''
  };

  openedChatRoom = {
    rec_sub_id: '',
    contact_id: '',
    contact_name: '',
    contact_status: '',
    isGroup: '',
  };
  //  consts

  Dummy: string;
  outgoing_msg = 0;
  incoming_msg = 0;
  active_contact: any;

  onlineStatus;
  File: any;
  imageSrc: any;
  newContactForm: any;
  Count = 0;
  storageRef: any;

  constructor(public appSettings: AppSettings, private sideChatService: SideChatService, private fb: FormBuilder,
    public afAuth: AngularFireAuth, public db: AngularFireDatabase, public dbs: AngularFirestore,private toastr: ToastrService,
    private conService: ContactService, private tokenService: TokenService, private spinner: NgxSpinnerService,
    public userOrg: UserOrg, public config: AppGlobal, private chatService: ChatService, ) {

    this.settings = this.appSettings.settings;
    this.Dummy = this.config.DUMMY_USER;
    this.imageSrc = '../../../../assets/img/custom/Capture.png';

    this.getcontacts();
    this.chatService.getCountValue().subscribe((count: any) => {
      this.Count = count;
      console.log(this.Count);
    });
    // this.getCount();
  }

  ngOnInit() {
    this.getUserDetails();
    $('#OpenImgUpload').click(function () { $('#imgupload').trigger('click'); });
    this.newContactForm = this.fb.group({
      contact_no: ['', Validators.compose([Validators.required,
      Validators.pattern('^[9]{1}[2]{1}[3]{1}[0-9]{9}$|^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')])],
      contact_username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])]
    });
  }

  ngAfterViewInit() {
    // check user

    // current user
    this.user = {
      Date: new Date().getDate.toString(),
      Day: new Date().getDay.toString(),
      Status: 'Online',
      Time: new Date().getTime.toString(),
      UserEmail: this.userEmail,
      UserId: this.userId,
      UserName: this.userMsisdn,
    };
    //  console.log({this.user});
    this.chatService.checkUser(this.userId).subscribe(
      user => {
        if (user != null) {
          this.chatService.updateUserStatus(this.userId, 'Online');

        } else {
          this.chatService.createUser(this.userId, this.user);
        }

      },
      err => {
        console.log('user checking failed due to');
      }
    );
  }

  // get user details
  getUserDetails() {

    // get user org
    const orgID = this.userOrg.getOrg();
    this.org_id = orgID;

    // if active get userdata
    const userdata = this.tokenService.getToken();
    if (userdata != null) {
      const tokendata = userdata.split('|');
      this.userMsisdn = tokendata[0];
      this.userId = tokendata[1];
      this.token = tokendata[2];
      this.userType = tokendata[3];
      this.userEmail = tokendata[4];
      this.userImage = tokendata[8];
      //  console.log('userimage:', this.userImage);
    }
  }

  setCount() {
    this.Count = 0;
    this.chatService.setCountValue(0);
    this.getCount();
  }
  getCount() {
    this.chatService.getCountValue().subscribe((count: any) => {
      this.Count = count;
      console.log(this.Count);
    });
  }

  //  get all contacts
  getcontacts() {
    this.contacts = [];
    this.chatrooms = [];
    //  if (this.contacts.length === 0) {
    this.spinner.show();
    this.conService.getContacts(this.token, this.userId).subscribe((data: any) => {
      //  console.log('contacts:', data);
      if (data.rescode === this.config.SUCCESS_CODE) {
        // const contacts = data.data;
        this.contacts = data.data;
        this.temp_contacts = this.contacts;
        console.log('contacts:', this.contacts);

        // call chat service to get contact details
        // this.chatrooms = this.chatService.getChatrooms(data.data);
        //  console.log('chatrooms:', this.chatrooms);
        for (const contact of this.contacts) {
          this.chatService.getLastMessage(contact).subscribe((data) => {
            if (data.length > 0) {
              this.setCount();

              this.chatrooms = this.chatService.getChatRoom(contact, data);
              this.temp_chatroom = this.chatrooms;
              console.log('final chatroom:', this.chatrooms);
            }
          });
        }
        this.spinner.hide();

      }
    });
    // }
  }
  getChat(contact_id, contact_name, contact_img, contact_sub_id, last_message_status, contact_status,
    last_message_senderid, isTeam) {
    // console.log(contact_id, contact_name, contact_img, contact_sub_id, last_message_status, contact_status,
    //   last_message_senderid, isTeam);

    // show spinner
    this.spinner.show();

    //  make chat window visible
    this.showChatWindow = true;

    // set const
    this.openedChatRoom.contact_name = contact_name;
    this.openedChatRoom.contact_id = contact_id;
    this.openedChatRoom.isGroup = isTeam;
    this.openedChatRoom.contact_status = contact_status === 4 ? 'pending' : 'confirmed';
    this.showConfirmationNote = this.openedChatRoom.contact_status === 'pending' ? true : false;
    console.log("showConfirmationNote", this.showConfirmationNote);
    this.openedChatRoom.rec_sub_id = contact_sub_id ? contact_sub_id : '';

    // get the messages
    console.log(contact_id, isTeam);
    this.chatService.getCoversation(contact_id, isTeam).subscribe((data: any) => {
      this.chat = data;
      //  console.log({ data });
      // hide spinner=
      //  contact_conversation
      console.log('convos_of_' + contact_id + ':', data);
      //  console.log('convos_length:', data.length);
      //  console.log('con_status:', contact_status);
      //  console.log('last_message:' + data[data.length - 1]['message']);
      console.log((last_message_status !== 'true' && last_message_senderid !== this.userId));
      if (last_message_status !== 'true' && last_message_senderid !== this.userId) {
        this.chatService.markSeen(contact_id, last_message_status, last_message_senderid, this.userId);
      }
      if (this.chat.length > 0) {
        //  console.log('conversation:', conversation);
        for (let i = 0; i < this.chat.length; i++) {
          this.chat[i]['contact_name'] = contact_name;
          this.chat[i]['contact_img'] = contact_img;
          this.chat[i]['contact_status'] = contact_status === 4 ? 'pending' : 'confirmed';
          if (this.chat[i].senderId === this.userId) {
            //  console.log('sender message');
            this.chat[i]['side'] = 'outgoing_msg';
            this.outgoing_msg++;
          } else {
            //  console.log('reciever message');
            this.chat[i]['side'] = 'incoming_msg';
            //  console.log(this.chat[i].timestamp);
            this.incoming_msg++;
          }

        }
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }

      //  this.chat = conversation;
      console.log('updated_conversation:', this.chat);

    });
  }

  public addChatItem() {
    this.message.from = this.openedChatRoom.contact_id;
    this.message.groupId = '';
    this.message.message = this.newChatText;
    this.message.messageImage = '';
    this.message.profileimageurl = this.userImage;
    this.message.receiverId = this.openedChatRoom.rec_sub_id ? this.openedChatRoom.rec_sub_id : '';
    this.message.seen = 'false';
    this.message.senderId = this.userId;
    this.message.sendername = this.userMsisdn;
    this.message.type = 'text';
    this.message.timestamp = new Date().toString();
    console.log('sending message:', this.message);

    this.chatService.setMessage(this.openedChatRoom.contact_id, this.message, this.openedChatRoom.isGroup);
    this.newChatText = '';
    // get conversation
    // check data
    // console.log(this.active_contact[0].contact_id, this.active_contact[0].contact_name, this.active_contact[0].sub_image,
    //             this.userId, 'false', this.active_contact[0].contact_status, '', this.active_contact[0].isGroup);
  }

  async onConfirm(formValue) {
    this.spinner.show();
    //  console.log("formvalues:", formValue.value.contact_username, formValue.value.contact_no);

    this.conService.addContacts(this.token, this.userId, formValue.value.contact_username, formValue.value.contact_no)
      .subscribe((data: any) => {
        if (data.rescode === this.config.SUCCESS_CODE) {
          //  console.log({ 'showing newly added contact': data });

          this.conService.getContactById(this.token, this.userId, data.data).subscribe((contact: any) => {
            if (data.rescode === this.config.SUCCESS_CODE) {
              this.active_contact = contact.data;
              //  console.log('currently_active_contact:', this.active_contact);

              // set const
              this.openedChatRoom.contact_name = this.active_contact[0].contact_name;
              this.openedChatRoom.contact_id = this.active_contact[0].contact_id;
              this.openedChatRoom.rec_sub_id = this.active_contact[0].contact_sub_id ? this.active_contact.contact_sub_id : '';
              this.chat = [];

              //  make chat window visible
              this.getChat(this.active_contact[0].contact_id, this.active_contact[0].contact_name, this.active_contact[0].sub_image,
                '', 'false', this.active_contact[0].contact_status, this.userId, this.active_contact[0].isGroup);
              this.getcontacts();
              this.spinner.hide();
              this.showAddContactWindow = false;
              this.showChatWindow = true;
            }
          });
        }
      });

  }

  back() {
    this.showChatWindow = false;
    this.getcontacts();
  }

  newContact() {
    this.showAddContactWindow = true;
  }

  daleteContact(contact_id) {
    this.spinner.show();
    console.log(`deleting_contact for id ${contact_id}`);
    this.conService.deleteContactById(this.token, this.userId, contact_id).subscribe((data: any) => {
      if (data.rescode === this.config.SUCCESS_CODE) {
        console.log('success:', data);
        this.chatService.ngOnDestroy();
        this.getcontacts();
        this.toastr.success(data.message, 'Success');
        this.spinner.hide();
      }
    });
  }

  onCancel() {
    this.showAddContactWindow = false;
  }

  onConfirmContact() {
    this.spinner.show();
    console.log('confirming contact...');
    this.conService.confirmContact(this.token, this.userId, this.openedChatRoom.contact_id).subscribe((data: any) => {
      if (data.rescode === this.config.SUCCESS_CODE) {
        console.log('success:', data);
        this.toastr.success(data.message, 'Success');
        this.openedChatRoom.contact_status = 'confirmed';
        this.chatService.ngOnDestroy();
        this.getcontacts();
        this.spinner.hide();
        this.showConfirmationNote = false;
      } else {
        this.toastr.success(data.message, 'Alert');
        this.spinner.hide();
      }
    });

  }

  onCancelConfirmation() {
    console.log('canceling onfirmation...');
    this.showConfirmationNote = false;
  }

  onShowContactConfirmation() {
    console.log('showing onfirmation...');
    this.showConfirmationNote = true;
  }

  // Uplaod Image
  resetUploadImageForm() {
    this.newChatText = '';
    this.File = null;
    this.imageSrc = '../../../../assets/img/custom/Capture.png';
    this.UploadImageModel = {
      ImageURL: '',
      Caption: ''
    };
  }
  // handle image upload
  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.File = file;
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      console.log(`selected Image ${this.File.name}...`);
      reader.readAsDataURL(file);
      $('.file-select-icon').addClass('active');
      const filename = $('#chooseFile').val();
      $('#noFile').text(this.File.name);
    } else {
      this.imageSrc = '../../../../assets/img/custom/Capture.png';
      this.File = null;
    }
  }

  uploadImageToFireBaseStorage() {
    this.spinner.show();
    console.log(`uploading Image ${this.File.name}...`);
    // const fileURL = `/message_images/${this.File.name}`;
    // const file = this.File.name;
    // const fileRef = this.storage.ref(`/message_images/`).child(this.File.name);
    const data = new FormData();
    data.append('process', this.config.UPLOAD_FIREBASE_MEDIA);
    data.append('file', this.File);

    // this.storage.upload(fileURL, this.File).snapshotChanges().pipe(
    //   finalize(() => {
    //     fileRef.getDownloadURL().subscribe((url) => {
    //       console.log(`uploaded Image download link ${url}...`);
    //       this.UploadImageModel.ImageURL = url;
    //       this.UploadImageModel.Caption = this.newChatText;
    //       this.sendMediaMessage();
    //       this.resetUploadImageForm();
    //       this.spinner.hide();
    //       this.showImageUploadWindow = false;
    //     });
    //   }),
    // ).subscribe();
    this.chatService.UploadImage(data).subscribe((data: any) => {
      if (data.rescode === this.config.SUCCESS_CODE) {
        console.log('uploaded_img_url:', data.data);
        this.UploadImageModel.ImageURL = data.data;
        this.UploadImageModel.Caption = this.newChatText;
        this.sendMediaMessage();
        this.resetUploadImageForm();
        this.spinner.hide();
        this.showImageUploadWindow = false;
      }
    });

  }
  audio() {
    console.log("called");
    var audio = new Audio('https://firebasestorage.googleapis.com/v0/b/where-works.appspot.com/o/message_audio%2F-LsuJyWN4jKzk6O63zRD.mp3?alt=media&token=e9207acc-5944-48aa-8638-03bb901d24ee');
    //what src to be passed
    audio.play();
  }

  sendMediaMessage() {
    // console.log('opened Chat Room Details:', this.openedChatRoom);
    // console.log('caption:', this.UploadImageModel.Caption);
    // console.log('image detail:', this.UploadImageModel);
    this.message.from = this.openedChatRoom.contact_id;
    this.message.groupId = '';
    this.message.message = this.UploadImageModel.ImageURL;
    this.message.messageImage = this.UploadImageModel.Caption;
    this.message.profileimageurl = this.userImage;
    this.message.receiverId = this.openedChatRoom.rec_sub_id ? this.openedChatRoom.rec_sub_id : '';
    this.message.seen = 'false';
    this.message.senderId = this.userId;
    this.message.sendername = this.userMsisdn;
    this.message.type = 'image';
    this.message.timestamp = new Date().toString();
    // console.log('sending message:', this.message);
    this.chatService.setMessage(this.openedChatRoom.contact_id, this.message, this.openedChatRoom.isGroup);
    this.showImageUploadWindow = false;


  }

  onCancelMediaMessage() {
    this.File = null;
    this.imageSrc = '../../../../assets/img/custom/Capture.png';
    this.resetUploadImageForm();
    this.showImageUploadWindow = false;
  }

  openImageUploadWindow() {
    this.showImageUploadWindow = true;
  }

  downloadFile(url) {
    console.log('downloading file:', url)
    saveAs(url, 'file.png');
  }
  // downloadFile(url){
  //         console.log('downloading file:', url);
  //           var xhr = new XMLHttpRequest();
  //           xhr.open("GET", url, true);
  //           xhr.responseType = "blob";
  //           xhr.onload = function(){
  //               var urlCreator = window.URL || window.webkitURL;
  //               var imageUrl = urlCreator.createObjectURL(this.response);
  //               var tag = document.createElement('a');
  //               tag.href = imageUrl;
  //               tag.download = 'VmN49xl.jpg';
  //               document.body.appendChild(tag);
  //               tag.click();
  //               document.body.removeChild(tag);
  //           }
  //           xhr.send();

  //       }

  filterChatrooms(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp_chatroom.filter(function (d) {
      return d.contact_name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.chatrooms = temp;
  }
  filterContacts(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp_contacts.filter(function (d) {
      return ((d.contact_name.toLowerCase().indexOf(val) !== -1 || !val) || (d.team_name.toLowerCase().indexOf(val) !== -1 || !val));
    });
    this.contacts = temp;
  }
  @HostListener('window:unload', ['$event'])
  unloadHandler(event) {
    // ...
    this.chatService.updateUserStatus(this.userId, 'Offline');
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event) {
    // ...
    this.chatService.updateUserStatus(this.userId, 'Offline');
  }
  ngOnDestroy() {
    this.chatService.updateUserStatus(this.userId, 'Offline');
  }
}

