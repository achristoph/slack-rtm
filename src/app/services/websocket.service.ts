import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs/Rx';

/**
 * WebSocket Service
 */
@Injectable()
export class WebSocketService {
    private subject: Subject<MessageEvent>;
    /**
     * Create a new Subject if it does not exist, reuse otherwise
     * @param url - Websocket URL to connect
     */
    public connect(url: string): Subject<MessageEvent> {
        if (!this.subject) {
            this.subject = this.create(url);
        }
        return this.subject;
    }

    private create(url: string): Subject<MessageEvent> {
        let ws = new WebSocket(url);

        let observable = Observable.create((obs: Observer<MessageEvent>) => {
            ws.onmessage = obs.next.bind(obs);
            ws.onerror = obs.error.bind(obs);
            ws.onclose = obs.complete.bind(obs);

            return ws.close.bind(ws);
        });

        let observer = {
            next: (data: Object) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            },
        };

        return Subject.create(observer, observable);
    }

}