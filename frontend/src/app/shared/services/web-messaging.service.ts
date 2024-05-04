import {Injectable} from "@angular/core";
import {RxStomp} from "@stomp/rx-stomp";


@Injectable({providedIn: 'root'})
export class WebMessagingService extends RxStomp{

  // private stompClient: Client;
  // private notificationSubject: Subject<Notification> = new Subject<Notification>();

  constructor() {
    super();
  }
  //
  // connect(id: string): void {
  //   console.log("Initializing stomp");
  //
  //   this.stompClient = new Client({
  //     brokerURL: this.url,
  //     debug: (msg) => {
  //       console.log(msg);
  //     }
  //   });
  //
  //   this.stompClient.onConnect = (frame) => {
  //     this.stompClient.subscribe("/queue/notification/" + id, (notification) => {
  //       console.log("Otrzymano wiadomosc");
  //       console.log(notification);
  //     });
  //   };
  //
  //   this.stompClient.onWebSocketError = (error) => {
  //     console.error('Error with websocket', error);
  //   };
  //
  //   this.stompClient.onStompError = (frame) => {
  //     console.error('Broker reported error: ' + frame.headers['message']);
  //     console.error('Additional details: ' + frame.body);
  //   };
  //   // stompClient.subscribe("/queue/notification", (notification: Notification) => {
  //   //   console.log("Sending notification");
  //   //   this.notificationSubject.next(notification);
  //   // });
  // }
  //
  // sendNotification(id: string, notification: String){
  //   console.log("sending notification");
  //
  //   this.stompClient.publish({
  //     destination: "/app/notification/" + id,
  //     body: JSON.stringify(notification)
  //   });
  // }
  //
  // getNotification(): Subject<Notification>{
  //   return this.notificationSubject;
  // }

}
