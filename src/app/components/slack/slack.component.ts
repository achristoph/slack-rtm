import { Component } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Message, SlackService } from '../../services/slack.service';

@Component({
	templateUrl: './slack.component.html',
	styleUrls: ['./slack.component.css']
})

export class SlackComponent {
	private messages: Message[] = [];
	private MAX_MESSAGE = 100;
	private SLACK_URL: string = process.env.SLACK_URL;

	constructor(private route: ActivatedRoute, private slackService: SlackService) {

	}

	connect() {
		const url: Observable<string> = this.route.url.map(segments => segments.join(''));
		let s: Observable<Message> = url.switchMap((p) => this.slackService.retrieve(this.SLACK_URL, p));
		s.subscribe((message) => {
			if (this.messages.length == this.MAX_MESSAGE) {
				this.messages.shift();
			}
			this.messages = [...this.messages,message];
		});
	}
}
