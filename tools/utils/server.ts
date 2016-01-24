import * as connectLivereload from 'connect-livereload';
import * as express from 'express';
import * as tinylrFn from 'tiny-lr';
import * as openResource from 'open';
import * as serveStatic from 'serve-static';
import * as util from 'gulp-util';
import * as chalk from 'chalk';
import {resolve} from 'path';
import {APP_BASE, APP_DEST, DOCS_DEST, LIVE_RELOAD_PORT, DOCS_PORT, PORT} from '../config';

let tinylr = tinylrFn();


export function serveSPA() {
    let server = express();
    tinylr.listen(LIVE_RELOAD_PORT);

    server.use(
        APP_BASE,
        connectLivereload({port: LIVE_RELOAD_PORT}),
        express.static(process.cwd())
    );

    var usePort = PORT;
    if(process.env.PORT) {
      usePort = process.env.PORT;
    }
    server.listen(usePort, function() {
        util.log('Listening: ', chalk.green('port', usePort));
        openResource('http://localhost:' + usePort + APP_BASE + APP_DEST);
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
