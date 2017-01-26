import { Component, OnInit } from '@angular/core';
import { OneSentence } from './one-sentence';
import { OneSentenceService } from './one-sentence.service';

@Component({
  moduleId: module.id,
  selector: 'film-one-sentence',
  templateUrl: 'one-sentence.component.html',
  styleUrls: ['one-sentence.component.css'],
  providers: [OneSentenceService]
})

export class OneSentenceComponent implements OnInit {
  oneSentence: OneSentence;

  constructor (
    private oneSentenceService: OneSentenceService
  ) {
    this.oneSentence = new OneSentence();
    this.oneSentence.content = "Loading";
    this.oneSentence.film = "Loading";
  }

  getOneSentence(): void {
    this.oneSentenceService.getOneSentence()
        .then(res => {this.oneSentence = res});
  }

  ngOnInit(): void {
    this.getOneSentence();
  }
}
