const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: "",
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
    });


    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.on("closed", () => (mainWindow = null));

    function UpsertKeyValue(obj, keyToChange, value) {
        const keyToChangeLower = keyToChange.toLowerCase();
        for (const key of Object.keys(obj)) {
            if (key.toLowerCase() === keyToChangeLower) {
                // Reassign old key
                obj[key] = value;
                // Done
                return;
            }
        }
        // Insert at end instead
        obj[keyToChange] = value;
    }

    mainWindow.webContents.session.webRequest.onBeforeSendHeaders(
        (details, callback) => {
            const { requestHeaders } = details;
            UpsertKeyValue(requestHeaders, 'Access-Control-Allow-Origin', ['*']);
            callback({ requestHeaders });
        },
    );

    mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
        const { responseHeaders } = details;
        UpsertKeyValue(responseHeaders, 'Access-Control-Allow-Origin', ['*']);
        UpsertKeyValue(responseHeaders, 'Access-Control-Allow-Headers', ['*']);
        callback({
            responseHeaders,
        });
    });
}



app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});
