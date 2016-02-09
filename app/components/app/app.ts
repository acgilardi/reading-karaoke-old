import {Component, ViewEncapsulation} from 'angular2/core';
import {
    RouteConfig,
    ROUTER_DIRECTIVES
} from 'angular2/router';
// import {HTTP_PROVIDERS} from 'angular2/http';

import {HomeComponent} from '../home/home';
import {ReadComponent} from '../read/read';
import {AboutComponent} from '../about/about';
import {ViewComponent} from '../read/view';
import {NameList} from '../../services/name_list';

@Component({
    selector: 'app',
    viewProviders: [NameList],
    templateUrl: './components/app/app.html',
    styleUrls: ['./components/app/app.css'],
    encapsulation: ViewEncapsulation.None,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', component: HomeComponent, as: 'Home'},
    {path: '/about', component: AboutComponent, as: 'About'},
    {path: '/read', component: ReadComponent, as: 'Read'},
    {path: '/view', component: ViewComponent, as: 'View'}
])
export class AppComponent {
}
