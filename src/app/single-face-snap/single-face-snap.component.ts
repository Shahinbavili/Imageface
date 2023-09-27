import {Component, OnInit} from '@angular/core';
import {FaceSnap} from "../models/face-snap.model";
import {FaceSnapsService} from "../services/face-snaps.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit{
  faceSnap$!: Observable<FaceSnap>;
  buttonText!: string;

  constructor(
    private faceSnapsService: FaceSnapsService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.buttonText = "Oh Snap!";
    const faceSnapId = +this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }

  onClickSnap(id: number) {
    if (this.buttonText === "Oh Snap!") {
      this.faceSnapsService.snapFaceSnapById(id, 'snap');
      this.buttonText = "Oops unSnap!";
    } else {
      this.faceSnapsService.snapFaceSnapById(id, 'un snap');
      this.buttonText = "Oh Snap!"
    }
  }

}
