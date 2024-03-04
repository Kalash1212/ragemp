const cameraRotator = require("freeroam/cam.js");
let camera = mp.cameras.new("utils.cam.0", new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 60);
let loginBrowser;

mp.events.add('showLogin', () => {
    loginBrowser = mp.browsers.new('package://freeroam/cef/index.html'); 
    loginBrowser.execute(`mp.invoke('focus', true)`);
    mp.gui.chat.activate(false); 
});

mp.events.add('closeLogin', () => {
    loginBrowser.execute(`mp.invoke('focus', false)`);
    mp.gui.chat.activate(true); 
});

mp.events.add('loginActive', (data) => {
    mp.console.logWarning(data, true, true);
    mp.events.callRemote('loginProcess', data);
});

mp.events.add('registrationActive', (data) => {
    mp.console.logWarning(data, true, true);
    mp.events.callRemote('RegistrationProcess', data);
});

mp.events.add('mailVerify', (data) => {
    mp.console.logWarning(data, true, true);
    mp.events.callRemote('VerifyProcess', data);
});

mp.events.add('AuthenticationError', (err) => {
    mp.console.logWarning(err, true, true);
    loginBrowser.execute(`authErr(${err})`);
});

mp.events.add('startCreation', () => {
    let position = mp.players.local.position;
    cameraRotator.start(camera, position, position, new mp.Vector3(-1.0, 1.5, 0.5), 180);
    cameraRotator.setZBound(-0.8, 1.8);
    cameraRotator.setZUpMultipler(5);
    cameraRotator.pause(false);
    mp.game.cam.renderScriptCams(true, false, 3000, true, false); 
});

mp.events.add('changeBody', (data) => {
    let id = JSON.parse(data);
    mp.players.local.setComponentVariation(11, Number(id.itemId), 0, 1);
});

mp.events.add('changeLeg', (data) => {
    let id = JSON.parse(data);
    mp.players.local.setComponentVariation(4, Number(id.itemId), 0, 1);
});

mp.events.add('changeFoot', (data) => {
    let id = JSON.parse(data);
    mp.players.local.setComponentVariation(6, Number(id.itemId), 0, 1);
});

mp.events.add('changeHead', (data) => {
    let id = JSON.parse(data);
    mp.players.local.setComponentVariation(2, Number(id.itemId), 0, 1);
});

mp.events.add('test', (data) => {
    mp.console.logWarning(data, true, true);
});

mp.events.add('stopCreation', () => {
    cameraRotator.stop();
    camera.setActive(false);
    mp.game.cam.renderScriptCams(false, false, 0, true, false);  
});

mp.players.local.setComponentVariation(4, 76, 0, 1);
mp.players.local.setComponentVariation(6, 12, 0, 1);
mp.players.local.setComponentVariation(8, 15, 0, 1);
mp.players.local.setComponentVariation(2, 46, 0, 1);

