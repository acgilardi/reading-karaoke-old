import * as connectLivereload from 'connect-livereload';
import * as express from 'express';
import * as tinylrFn from 'tiny-lr';
import * as openResource from 'open';
import * as serveStatic from 'serve-static';
import * as util from 'gulp-util';
import * as chalk from 'chalk';
import {resolve} from 'path';
import {APP_BASE, APP_DEST, DOCS_DEST, LIVE_RELOAD_PORT, DOCS_PORT, PORT, ENV} from '../config';

let tinylr = tinylrFn();


export function serveSPA() {
    let server = express();
    tinylr.listen(LIVE_RELOAD_PORT);

    var usePort = PORT;
    if(process.env.PORT) {
        usePort = process.env.PORT;
    }

    let servePath = '';
    let listenUrl = '';
    switch(ENV) {
        case 'dev':
            servePath = process.cwd();
            listenUrl = 'http://localhost:' + usePort + APP_BASE + APP_DEST;
            break;

        case 'prod':
            servePath = process.cwd() + '/' + APP_DEST;
            listenUrl = 'http://localhost:' + usePort + '/';
            break;

        default:
            util.log('Invalid Environment: ', chalk.red('ENV', ENV));
            return false;
    }

    server.use(
        APP_BASE,
        connectLivereload({port: LIVE_RELOAD_PORT}),
        express.static(servePath)
    );

    server.listen(usePort, function() {
        util.log('Listening: ', chalk.green('port', usePort));
        openResource(listenUrl);
    });
}

export function notifyLiveReload(e) {
    let fileName = e.path;
    tinylr.changed({
        body: {files: [fileName]}
    });
}

export function serveDocs() {
    let server = express();

    server.use(
        APP_BASE,
        serveStatic(resolve(process.cwd(), DOCS_DEST))
    );

    server.listen(DOCS_PORT, () =>
        openResource('http://localhost:' + DOCS_PORT + APP_BASE)
    );
}
