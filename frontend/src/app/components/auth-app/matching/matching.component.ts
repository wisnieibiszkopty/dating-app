import {Component, OnInit} from '@angular/core';
import {MatchingService} from "../../../shared/services/matching.service";
import {Queue} from "../../../shared/models/Queue";
import {MatchingUser} from "../../../shared/models/MatchingUser";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {RippleModule} from "primeng/ripple";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-matching',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    ToastModule,
    RippleModule
  ],
  templateUrl: './matching.component.html',
  styleUrl: './matching.component.css',
  providers: [MessageService]
})
export class MatchingComponent implements OnInit{
  matchesQueue: Queue<MatchingUser> = new Queue<MatchingUser>();
  match: MatchingUser | undefined;

  constructor(
    private matchingService: MatchingService,
    // MessageService is form primeng, allows component showing toasts
    private messagingService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadMatches();
  }

  onAccept(){
    // send request with invitation
    this.matchingService.acceptMatch(this.match?.id!).subscribe({
      next: (res) => {
        this.messagingService.add({
          severity: "success",
          summary: "Invitation send",
          detail: "bottom text"
        });

        this.handleQueue();
      },
      error: err => {
        console.error(err);
        // for now it always gives error :<
        this.messagingService.add({
          severity: "danger",
          summary: "Cannot send invitation!",
          detail: "bottom text"
        });
      }
    });
  }

  onReject(){
    // send request with rejection

    this.messagingService.add({
      severity: "error",
      summary: "Match rejected",
      detail: "bottom text"
    });

    this.handleQueue();
  }

  handleQueue(){
    // don't work - async
    // for now it loads same users, add pagination
    this.loadMatches();

    // queue is empty -> there is no more potential matches in database
    if(this.matchesQueue.isEmpty()){
      // show error
      console.log("No more new matches");
    }

    this.match = this.matchesQueue.take();
    console.log(this.matchesQueue);
  }

  loadMatches(){
    if(this.matchesQueue.isEmpty()){
      this.matchingService.loadMatchingUsers().subscribe({
        next: (res: any) => {
          this.matchesQueue = new Queue<MatchingUser>(res);
          console.log(this.matchesQueue);

          // peeking first match in queue and removing it from it
          this.match = this.matchesQueue.take();
          console.log(this.matchesQueue);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

}
