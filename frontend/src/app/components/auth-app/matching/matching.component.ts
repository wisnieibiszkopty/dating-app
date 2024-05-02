import {Component, OnInit} from '@angular/core';
import {MatchingService} from "../../../shared/services/matching.service";
import {Queue} from "../../../shared/models/Queue";
import {MatchingUser} from "../../../shared/models/MatchingUser";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-matching',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule
  ],
  templateUrl: './matching.component.html',
  styleUrl: './matching.component.css'
})
export class MatchingComponent implements OnInit{
  matchesQueue: Queue<MatchingUser> = new Queue<MatchingUser>();
  match: MatchingUser | undefined;

  constructor(private matchingService: MatchingService) {}

  ngOnInit(): void {
    if(this.matchesQueue.size() === 0){
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

  onAccept(){

  }

  onReject(){

  }

}
