import { Component } from '@angular/core';
import { DoService } from './Index'
import { BusinessProvider } from './business/index';
import { DoHttpService } from './services/index';
import { ServiceContext } from './BuildMotionJS/service/index';
import { ServiceMessage } from './BuildMotionJS/service/index';
import { MessageType } from './BuildMotionJS/service/index';

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
    providers: [ServiceContext, DoService, BusinessProvider, DoHttpService],
    styleUrls: ['app.component.css']
})
export class AppComponent {
    title = 'app works!';
    result: boolean;

    constructor(
        private businessProvider: BusinessProvider,
        private doService: DoService) {

        this.result = this.doService.doSomething('Doing something from the app component...wow!!');
        if (this.doService.serviceContext.isGood()) {
            console.log(`Result: ${this.result} from the doService.`);
        } else {
            // programmatically add a new service message;
            this.doService.serviceContext.addMessage(
                new ServiceMessage('PoopyPants', 'Service errors exist.')
                    .WithDisplayToUser(true)
                    .WithMessageType(MessageType.Error)
                    .WithSource('app.component')
            );

            // show the error messages
            this.doService.serviceContext.ErrorMessages.filter(f => f.DisplayToUser)
                .forEach(e => console.log(e.toString()));
        }
    }
}
