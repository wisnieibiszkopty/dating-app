import {RxStompConfig} from "@stomp/rx-stomp";
import {environment} from "../../../environment";

export const appRxStompConfig: RxStompConfig = {
  brokerURL: environment.websocketUrl,
  connectHeaders: {
    // empty for now
  },
  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,
  reconnectDelay: 200,
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  }
};
