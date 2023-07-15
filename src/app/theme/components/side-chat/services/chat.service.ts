import { Injectable, OnDestroy } from '@angular/core'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AppGlobal } from '../../../../shared/app.global';
import { ChatroomDetails } from '../models/chat.models';
import { CONVERSATION } from '../models/chat.models';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../../components/side-chat/models/chat.models';
import { Observable, BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs';
import { finalize } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';

@Injectable()
export class ChatService implements OnDestroy {

    private chatroom_details: ChatroomDetails = [];
    public chat: any = [];
    public subs: Subscription[] = [];
    Count: BehaviorSubject<number>;
    total_unread: number = 0;

    constructor(private config: AppGlobal,private http: HttpClient, private handler: HttpHandler,
        private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
        this.Count = new BehaviorSubject<number>(0);
        console.log(this.total_unread);
    }

    getUnreadCount() {
        return this.total_unread;
    }
    checkUser(user_id) {
        return this.db.list(`User/${user_id}`).valueChanges();
    }

    updateUserStatus(user_id, status) {
        const userRef = this.db.list(`Users`);
        return userRef.update(user_id, { Status: status }).then(success => {
            console.log('Success:Status Updated');
        }).catch(err => {
            console.log('Error:Status Update Failed');
        });

    }

    createUser(user_id, user: User) {
        return this.db.list(`User/${user_id}`).push(user).then(success => {
            console.log('SUCCESS:new user added');
        }).catch(err => {
            console.log('Error:User cannot be added');
        });
    }

        async markSeen(contact_id, last_message_status, last_message_senderid, user_id) {
            this.setCountValue(0);
        // const chatRef = this.db.list(`Chat/${contact_id}`);
        this.chat = await this.getChatKey(contact_id, last_message_status, last_message_senderid, user_id);

        // return this.db.list(`Chat/${contact_id}`).update('Seen', 'true');
    }

    getChatKey(contact_id, last_message_status, last_message_senderid, user_id) {
        let res;
        const chatRef = this.db.list(`Chat/${contact_id}`);
        chatRef.snapshotChanges().subscribe(Chat => {
            console.log(`User:${contact_id}'s keys:${Chat}`);
            for (let c of Chat) {
                console.log(`hello`);
                if (last_message_status !== 'true' && last_message_senderid !== user_id) {
                    res = chatRef.update(c.key, { seen: 'true' }).then(success => {
                        console.log(`SUCCESS:chat status for ${c.key} updated to seen`);
                    }).catch(err => {
                        console.log('Error:Status Update Failed');
                    });
                }
            }
        });
        return res;
    }

    public getContactDetails(contact_ids) {
        // console.log('2.contact_ids:', contact_ids);

        const conversations = [];
        let sub1: Subscription;
        let sub2: Subscription;
        let sub3: Subscription;
        let contacts = contact_ids;
        let temp = []
        let j = 0;
        //  console.log('ola', {contacts});
        for (let i = 0; i < contacts.length; i++) {
            //  sconsole.log(contacts[i].isGroup === 0);
            if (contacts[i].isGroup === 0) {
                //   console.log('inside single chat');
                sub1 = this.db.list(`Chat/${contacts[i].contact_id}`).valueChanges().subscribe((data) => {

                    //  contact_conversation
                    //  console.log('convos_of_' + contacts[i].contact_id + ':', data);
                    //  console.log('convos_length:', data.length);
                    //  console.log('last_message:' + data[data.length - 1]['message']);
                    if (data.length > 0) {
                        //  console.log('last_message:' + data[data.length - 1]['message']);
                        contacts[i]['last_message'] = data[data.length - 1]['message'];
                        contacts[i]['last_message_sender_id'] = data[data.length - 1]['senderId'];
                        contacts[i]['last_message_status'] = data[data.length - 1]['seen'];
                        contacts[i]['last_message_type'] = data[data.length - 1]['type'];
                        contacts[i]['chatroom_status'] = 'active';
                        //    console.log('updated_contacts:', contacts);
                    } else {
                        contacts[i]['last_message'] = '';
                        contacts[i]['last_message_sender_id'] = '';
                        contacts[i]['last_message_status'] = '';
                        contacts[i]['last_message_type'] = '';
                        contacts[i]['chatroom_status'] = 'unactive';
                        //    console.log('updated_contacts:', contacts);
                    }
                    if (contacts[i].chatroom_status === 'active') {
                        if (temp.length === 0) {
                            console.log('adding first active contact');
                            temp[0] = contacts[i];
                        } else {
                            console.log('checking for contact duplication');
                            for (let k = 0; k < temp.length; k++) {
                                console.log(temp[k].team_id === contacts[i].team_id);
                                console.log(temp[k].contact_id === contacts[i].contact_id);
                                if (temp[k].team_id === contacts[i].team_id) {
                                    console.log('team match at temp', k);

                                    temp[k] = contacts[i];
                                } else if (temp[k].contact_id === contacts[i].contact_id) {
                                    console.log('contact match at temp', k);
                                    temp[k] = contacts[i];
                                } else {
                                    temp[temp.length] = contacts[i];
                                }
                            }
                        }

                    }
                });
                sub2 = this.db.list(`Users/${contacts[i].contact_sub_id}`).valueChanges().subscribe((data) => {
                    //  contact_status
                    //  console.log('details_of_' + contacts[i].contact_id + ':', data);
                    //  console.log('user_status:' , data[2]);
                    if (data.length > 0) {
                        contacts[i]['contact_status'] = data[2];
                        contacts[i]['date'] = data[0];
                        contacts[i]['day'] = data[1];
                        contacts[i]['time'] = data[3];
                    }
                    //  console.log('updated_contacts:', contacts);
                });


            } else if (contacts[i].isGroup === 1) {
                // console.log('inside group chat');
                sub3 = this.subs['sub3'] = this.db.list(`GroupChat/${contacts[i].team_id}`).valueChanges().subscribe((data) => {
                    //  contact_conversation
                    //  console.log('convos_of_' + contacts[i].team_id + ':', data);
                    //  console.log('convos_length:', data.length);
                    //  console.log('last_message:' + data[data.length - 1]['message']);
                    if (data.length > 0) {
                        //  console.log('last_message:' + data[data.length - 1]['message']);
                        contacts[i]['last_message'] = data[data.length - 1]['message'];
                        contacts[i]['last_message_sender_id'] = data[data.length - 1]['senderId'];
                        contacts[i]['last_message_status'] = data[data.length - 1]['seen'];
                        contacts[i]['last_message_type'] = data[data.length - 1]['type'];
                        contacts[i]['chatroom_status'] = 'active';
                        //    console.log('updated_contacts:', contacts);
                    } else {
                        contacts[i]['last_message'] = '';
                        contacts[i]['last_message_sender_id'] = '';
                        contacts[i]['last_message_status'] = '';
                        contacts[i]['last_message_type'] = '';
                        contacts[i]['chatroom_status'] = 'unactive';
                        //    console.log('updated_contacts:', contacts);
                    }
                    if (contacts[i].chatroom_status === 'active') {
                        if (temp.length === 0) {
                            console.log('adding first active team contact');
                            temp[0] = contacts[i];
                        } else {
                            console.log('checking for team contact duplication');
                            for (let k = 0; k < temp.length; k++) {
                                console.log(temp[k].team_id === contacts[i].team_id);
                                console.log(temp[k].contact_id === contacts[i].contact_id);
                                if (temp[k].team_id === contacts[i].team_id) {
                                    console.log('team match at temp', k);
                                    temp[k] = contacts[i];
                                } else if (temp[k].contact_id === contacts[i].contact_id) {
                                    console.log('contact match at temp', k);
                                    temp[k] = contacts[i];
                                } else {
                                    console.log('adding 2nd active team contact');
                                    temp[temp.length] = contacts[i];
                                }
                            }
                        }
                    }
                });

            } else {
                console.log('isGroup is undefined');
            }
        }
        temp = contacts
        temp.filter(s => console.log(s.last_message === ''));
        console.log('temp', temp);

        const chatrooms = {
            contacts: contacts,
            chatrooms: temp,
        };
        // for(let i  = 0; i < this.subs.length;  i++){
        //     this.subs[i].uns
        // }

        return chatrooms;
    }

    public getChatrooms(contact_ids) {
        // console.log('2.contact_ids:', contact_ids);
        let con_conversations = [];
        let user = [];
        let team_conversations = [];
        let contacts = contact_ids;
        let temp = []
        let j = 0;
        //  console.log('ola', {contacts});
        for (let i = 0; i < contacts.length; i++) {
            //  sconsole.log(contacts[i].isGroup === 0);
            if (contacts[i].isGroup === 0) {
                //   console.log('inside single chat');
                this.db.list(`Chat/${contacts[i].contact_id}`).valueChanges().subscribe((data) => {
                    //  contact_conversation
                    // console.log('convos_of_' + contacts[i].contact_id + ':', data);
                    //  console.log('convos_length:', data.length);
                    //  console.log('last_message:' + data[data.length - 1]['message']);
                    console.log('new message is received  ');
                    con_conversations = data;
                    console.log('convos', con_conversations);
                    if (con_conversations.length > 0) {
                        //  console.log('last_message:' + data[data.length - 1]['message']);

                        this.chatroom_details[j] = {
                            contact_id: contacts[i].contact_id,
                            contact_img: contacts[i].sub_image,
                            contact_name: contacts[i].contact_name,
                            contact_sub_id: contacts[i].contact_sub_id,
                            last_message: con_conversations[con_conversations.length - 1]['message'],
                            last_message_sub_id: con_conversations[con_conversations.length - 1]['senderId'],
                            is_seen: con_conversations[con_conversations.length - 1]['seen'],
                            type: con_conversations[con_conversations.length - 1]['type'],
                            is_group: contacts[i].isGroup,
                            //    console.log('updated_contacts:', contacts);

                        }
                        j++;
                    }
                });



            } else if (contacts[i].isGroup === 1) {
                // console.log('inside group chat');
                this.db.list(`GroupChat/${contacts[i].team_id}`).valueChanges().subscribe((data) => {
                    //  contact_conversation
                    //  console.log('convos_of_' + contacts[i].team_id + ':', data);
                    //  console.log('convos_length:', data.length);
                    //  console.log('last_message:' + data[data.length - 1]['message']);
                    team_conversations = data;
                    if (team_conversations.length > 0) {
                        //  console.log('last_message:' + data[data.length - 1]['message']);
                        this.chatroom_details[j] = {
                            contact_id: contacts[i].team_id,
                            contact_img: contacts[i].org_img,
                            contact_name: contacts[i].team_name,
                            contact_sub_id: null,
                            last_message: team_conversations[team_conversations.length - 1]['message'],
                            last_message_sub_id: team_conversations[team_conversations.length - 1]['senderId'],
                            is_seen: team_conversations[team_conversations.length - 1]['seen'],
                            type: team_conversations[team_conversations.length - 1]['type'],
                            is_group: contacts[i].isGroup,
                            //    console.log('updated_contacts:', contacts);

                        }
                        j++;
                    }
                });



                //  console.log('updated_contacts:', contacts);
            }
        }
        // temp = contacts
        // temp.filter(s => console.log(s.last_message === ''));
        // console.log('temp', temp);

        // const chatrooms = {
        //     contacts: contacts,
        //     chatrooms: temp,
        // };
        // for(let i  = 0; i < this.subs.length;  i++){
        //     this.subs[i].uns
        // }

        return this.chatroom_details;
    }

    public getCoversation(contact_id, isTeam) {
        if (isTeam === 0) {
            console.log('getting convo of single chat');
            return this.db.list(`Chat/${contact_id}`).valueChanges();
        } else {
            console.log(`getting convo of group chat for ${contact_id}`);
            return this.db.list(`GroupChat/${contact_id}`).valueChanges();
        }

    }

    public setMessage(contact_id, message, isteam) {
        console.log('message:', message);
        if (isteam === 0) {
            this.db.list(`Chat/${contact_id}`).push(message);
        } else {
            this.db.list(`GroupChat/${contact_id}`).push(message);
        }

    }

    public getLastMessage(contact) {
        //  console.log(`listening to get_last_messages for ${contact.contact_id}`);
        if (contact.isGroup == 0) {
            return this.db.list(`Chat/${contact.contact_id}`).valueChanges();
        } else {
            return this.db.list(`GroupChat/${contact.team_id}`).valueChanges();
        }
    }
    public getChatRoom(contact, data) {
        this.db.list(`Users/${contact.contact_sub_id}`).valueChanges().subscribe((status: any) => {
            console.log('listening to onlinestatus for', status);
            // console.log('listening to getChatRoom for', contact);
            //  console.log(`listening to get_chat_rooms for ${contact.contact_id} with last message ${data[data.length - 1]['message']}`);
            const index = this.chatroom_details.findIndex(x => x.contact_id === parseInt(data[data.length - 1]['from']));
            const index2 = this.chatroom_details.findIndex(x => x.contact_sub_id === parseInt(status[5]));
            const unread = data.filter(x => x.seen == 'false' && (x.senderId == contact.contact_sub_id)).length;
            console.log({ unread });
            this.total_unread = this.total_unread + unread;
            console.log(this.total_unread);
            this.setCountValue(this.total_unread);
            if (index !== -1) {
                this.chatroom_details.splice(index, 1);
                this.chatroom_details.push({
                    contact_id: contact.isGroup === 0 ? contact.contact_id : contact.team_id,
                    contact_img: contact.isGroup === 0 ? contact.sub_image : contact.org_logo,
                    contact_name: contact.isGroup === 0 ? contact.contact_name : contact.team_name,
                    contact_sub_id: contact.contact_sub_id,
                    is_group: contact.isGroup,
                    last_message: data[data.length - 1]['message'],
                    last_message_sub_id: data[data.length - 1]['senderId'],
                    is_seen: data[data.length - 1]['seen'],
                    type: data[data.length - 1]['type'],
                    un_read: unread,
                    contact_status: contact.contact_status,
                    onlineStatus: status[2]
                });
                this.chatroom_details.reverse();
            } else if (index2 !== -1) {
                this.chatroom_details.splice(index2, 1);
                this.chatroom_details.push({
                    contact_id: contact.isGroup === 0 ? contact.contact_id : contact.team_id,
                    contact_img: contact.isGroup === 0 ? contact.sub_image : contact.org_logo,
                    contact_name: contact.isGroup === 0 ? contact.contact_name : contact.team_name,
                    contact_sub_id: contact.contact_sub_id,
                    is_group: contact.isGroup,
                    last_message: data[data.length - 1]['message'],
                    last_message_sub_id: data[data.length - 1]['senderId'],
                    is_seen: data[data.length - 1]['seen'],
                    type: data[data.length - 1]['type'],
                    un_read: unread,
                    contact_status: contact.contact_status,
                    onlineStatus: status[2]
                });

            } else {
                this.chatroom_details.push({
                    contact_id: contact.isGroup === 0 ? contact.contact_id : contact.team_id,
                    contact_img: contact.isGroup === 0 ? contact.sub_image : contact.org_logo,
                    contact_name: contact.isGroup === 0 ? contact.contact_name : contact.team_name,
                    contact_sub_id: contact.contact_sub_id,
                    is_group: contact.isGroup,
                    last_message: data[data.length - 1]['message'],
                    last_message_sub_id: data[data.length - 1]['senderId'],
                    is_seen: data[data.length - 1]['seen'],
                    type: data[data.length - 1]['type'],
                    un_read: unread,
                    contact_status: contact.contact_status,
                    onlineStatus: status[2]
                });
            }
        });
        //  console.log('index:', index);

        //  console.log('chatrooms for contact.contact_id:', this.chatroom_details);
        return this.chatroom_details;
    }
    setCountValue(value: number) {
        //  console.log('value:', value);
        this.Count.next(value);
        this.total_unread = value;
        //  console.log(this.total_unread);
    }
    getCountValue(): Observable<number> {
        return this.Count.asObservable();
    }
    getContactOnlineStatus(con_sub_id) {
        this.db.list(`Users/${con_sub_id}`).valueChanges().subscribe((status: any) => {
            return status;
        });
    }

    UploadImage(data) {

        const reqheader = new HttpHeaders();
        // const data = {
        //   process: this.config.UPLOAD_FIREBASE_MEDIA, file:file
        // //   userid: user_id, orgid: orgID, plattype: this.config.PLATFORM_TYPE
        // };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    getTeamsTree(token: string, user_id: any, orgID: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
        const data = {
          process: this.config.VIEW_TEAMS_TREE_LISTING,
          userid: user_id, orgid: orgID, plattype: this.config.PLATFORM_TYPE
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
      }
    public ngOnDestroy() {
        this.chatroom_details = [];
    }
}
