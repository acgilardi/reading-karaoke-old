import {Component} from 'angular2/core'

@Component({
    selector: 'book',
    //template: ''
    templateUrl: './components/read/book.html'
})
export class BookComponent {
    constructor (public name:string = 'N/A') {};

    public words: Array = "This is the book text".split(' ');

    clickWord(e) : void {
        let bookRef = new Firebase("https://yayday.firebaseio.com/");

        

        console.log('clicked');
        console.log(e.target);
    }

}


