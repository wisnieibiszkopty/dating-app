import {WebMessagingService} from "../services/web-messaging.service";
import {appRxStompConfig} from "./app.stomp.config";

export function rxStompServiceFactory(): WebMessagingService{
  const rxStomp: WebMessagingService = new WebMessagingService();
  rxStomp.configure(appRxStompConfig);
  rxStomp.activate();
  return rxStomp;
}
