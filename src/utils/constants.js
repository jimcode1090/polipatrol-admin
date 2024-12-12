const SERVER_IP = "192.168.35.221:3977";
const SERVER_IP_PRODUCTION = "polipatrol-backend-1.onrender.com";

export const ENV = {
  BASE_PATH: `https://${SERVER_IP_PRODUCTION}`,
  BASE_API: `https://${SERVER_IP_PRODUCTION}/api`,
  SOCKET_URL: `https://${SERVER_IP_PRODUCTION}`,
  API_ROUTES: {
    REGISTER: "auth/register",
    LOGIN: "auth/login",
    REFRESH_ACCESS_TOKEN: "auth/refresh_access_token",
    USER_ME: "user/me",
    USER: "user",
    USERS: "users",
    ALERTS: "alerts",
    ATTEND_ALERT: "alerts/attend_alert",
    MENU: "menu",
    COURSE: "course",
    NEWSLETTER: "newsletter",
    POST: "post",
    CHAT: "chat",
    CHAT_MESSAGE: "chat/message",
    CHAT_MESSAGE_IMAGE: "chat/message/image",
    CHAT_MESSAGE_LAST: "chat/message/last",
    CHAT_MESSAGE_TOTAL: "chat/message/total",
  },
  JWT: {
    ACCESS: "access",
    REFRESH: "refresh",
  },
};
