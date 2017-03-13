import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { WebSocketService } from './websocket.service';


/**
 * Message Interface
 * text property represents the text of the message
 * reviewed property represents the message has been reviewed
 */
export interface Message {
    text: string;
    reviewed: boolean;
}

@Injectable()
export class SlackService {
    ws: WebSocketService;
    url = 'ws://localhost:8181/';
    http: Http;

    constructor(wsService: WebSocketService, _http: Http) {
        this.ws = wsService;
        this.http = _http;
    }
    /**
     * Retrieve Slack Messages by sending GET request to a given Slack URL then
     * retrieve the websocket url to initiate connection
     * The rate is limited to 20 messages per minute
     * Only responses with type 'message' will be consumed
    * @param url - slack URL whose response contain websocket URL
     * @param term - any message that contains the term
     */
    retrieve(url: string, term?: string) {
        return this.http.get(url)
            .switchMap((response: Response) => {
                this.url = response.json().url;
                return this.ws
                    .connect(this.url)
                    .filter((m: MessageEvent) => {
                        let data = JSON.parse(m.data);
                        return data.type === 'message' && data.text.match(term);
                    })
                    .map((response: MessageEvent): Message => {
                        let data = JSON.parse(response.data);
                        return { text: data.text, reviewed: false };
                    })
                    .windowCount(20).throttleTime(60000).switch();
            });
    }
}
