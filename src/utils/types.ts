export interface SignUpType {
  name?: string;
  email?: string;
  image?: FileList;
}

export interface SignInType {
  email?: string;
}

export interface Image_PostType {
  image_post_id: string;
  post_id: string;
  user_id: string;
  image: string;
  created_at: Date;
  updated_at: Date;
}

export interface GetPostType {
  post_id: string;
  user_id: string;
  content: string;
  type: string;
  created_at: Date;
  updated_at: Date;
  images: Image_PostType[];
  number_of_comment: number;
  user_name: string;
  email: string;
  photo_profile: string;
}

export interface UserType {
  user_id: string;
  user_name: string;
  email: string;
  photo_profile: string;
}

export interface VerifyResType {
  status: string;
  token: string;
  user: UserType;
}

export interface UserFriendType {
  user_id: string;
  user_name: string;
  email: string;
  photo_profile: string;
  user_friend_id: string;
}

export interface CommentType {
  comment_id: string;
  post_id: string;
  comment_post_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface NotificationType {
  notification_id: string;
  issuer: string;
  issuer_name: string;
  notifier: string;
  notifier_name: string;
  status: string;
  accept: string;
  post_id: string;
  type: string;
  created_at: Date;
  updated_at: Date;
}

export interface RoomTypeRes {
  room_id: string;
  name_room: string;
  created_at: Date;
  updated_at: Date;
  unread_message: number;
}

export interface ClientType {
  client_id: string;
  room_id: string;
  user_id: string;
  user_name: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export interface MessageType {
  message_id: string;
  room_id: string;
  user_id: string;
  user_name: string;
  photo_profile: string;
  client_id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  type?: "recv" | "self";
}

export interface LogType {
  log_id: string;
  client_id: string;
  user_id: string;
  status_log: string;
  created_at: Date;
}
