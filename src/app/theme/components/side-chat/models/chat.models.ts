
 interface  ChatroomDetail {
    contact_id?: number;
    contact_name?: string;
    contact_img?: string;
    contact_sub_id?: number;
    last_message?: string;
    last_message_sub_id?: number;
    last_message_time?: string;
    is_seen?: string;
    is_group?: string;
    type?: string;
    un_read?: number;
    contact_status?: string;
    onlineStatus?:any;
}
export interface ChatroomDetails extends Array<ChatroomDetail> { }

export interface CONVERSATION {
    from?: string;
    groupId?: string;
    message?: string;
    messageImage?: string;
    profileimageurl?: string;
    receiverId?: string;
    seen?: string;
    senderId?: string;
    sendername?: string;
    timestamp?: string;
    type?: string;
}

export interface User {
    Date?: string;
    Day?: string;
    Status?: string;
    Time?: string;
    UserEmail?: string;
    UserId?: string;
    UserName?: string;
}
