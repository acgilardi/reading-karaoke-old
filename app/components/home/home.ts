import {Component} from 'angular2/core';
import {AudioHandler} from '../../services/AudioHandler'

@Component({
    selector: 'home',
    templateUrl: './components/home/home.html',
    styleUrls: ['./components/home/home.css']
})
export class HomeComponent {
    static audioHandler = new AudioHandler();

    startBeat():void {
        HomeComponent.audioHandler.init();
    }

    stopBeat():void {
        HomeComponent.audioHandler.stopSound();
    }
}
