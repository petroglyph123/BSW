'use strict'

const { spawn } = require('child_process');

const monitor = () => {
    console.log('monitoring osk')
    let child = spawn(process.env.comspec, ['/c', 'osk', '-arg1', '-arg2']);

    child.on('error', (error) => {
        console.error('error', error)
    })

    child.on('close', (code) => {
        console.log('child process exited with code', code)
        monitor();
    })
}

monitor();
