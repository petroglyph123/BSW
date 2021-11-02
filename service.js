'use strict'

const { spawn } = require('child_process');

const osk = () => {
    console.log('monitoring osk')
    let child = spawn(process.env.comspec, ['/c', 'osk', '-arg1', '-arg2']);

    child.stderr.pipe(process.stderr);
    child.stdout.pipe(process.stdout);

    child.on('error', (error) => {
        console.error('error', error)
    })

    child.on('close', (code) => {
        console.log('child process exited with code', code)
        osk();
    })
}

osk();

const db = () => {
    console.log('monitoring db')
    let child = spawn(process.env.comspec, ['/c', 'npm', 'run', 'db']);

    child.stderr.pipe(process.stderr);
    child.stdout.pipe(process.stdout);

    child.on('error', (error) => {
        console.error('error', error)
    })

    child.on('close', (code) => {
        console.log('child process exited with code', code)
        db();
    })

}

db();

const vite = () => {
    console.log('monitoring vite')
    let child = spawn(process.env.comspec, ['/c', 'npm', 'run', 'dev']);

    child.stderr.pipe(process.stderr);
    child.stdout.pipe(process.stdout);

    child.on('error', (error) => {
        console.error('error', error)
    })

    child.on('close', (code) => {
        console.log('child process exited with code', code)
        vite();
    })

}

vite();

const ui = () => {
    let exe = 'C:\\Program Files\\Google\\Chrome\\application\\chrome.exe';
        exe = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
        exe = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
    console.log('monitoring UI', process.env.comspec)
    let child = spawn( process.env.comspec, ['/c', exe, 'http://localhost:8080']);

    child.on('error', (error) => {
        console.error('error', error)
    })

    child.on('data', (data) => { console.log('ui data', data)})

    child.on('close', (code) => {
        console.log('child process exited with code', code)
        if (code == 1)
             ui();
    })

}

// ui()