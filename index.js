var Twit = require('twit')

var T = new Twit(require('./sush.json'))


const { app, BrowserWindow } = require('electron')
app.on ('window-all-closed', function (e) {
})

app.on('ready', async () => {
    var stream = T.stream('statuses/filter', { follow: '2453287320' })
    stream.on('tweet', function ({text}) {
        if(text.toLowerCase().includes("finger") || text.toLowerCase().includes("fingers") || text.toLowerCase().includes("down")){
            show(tweet.text)
        }
    })
})

async function show(text) {
    let win = new BrowserWindow({
        focusable: false,
        autoHideMenuBar: true,
        width: 400,
        height: 50,
        focusable: false,
        alwaysOnTop: true,
        show: false,

    })
    win.setPosition(0, 0)
    win.loadURL('data:text/html;charset=UTF-8,' + encodeURIComponent("<html style='padding:0px;margin:0px; overflow:hidden; background-color:black;color:white;'><body style='padding:0px;margin:0px;'><h1 id='text' style='padding:8px'>" + text + "</h1></body></html>"), {
        baseURLForDataURL: `file://${__dirname}/`
    })
    win.webContents.openDevTools()
    win.webContents.executeJavaScript("document.getElementById('text').clientHeight;", true, (resp) => {
        win.setSize(400, resp)
        win.show()
    })
    await sleep(10000)
    win.close()
}
function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), time)
    })
}