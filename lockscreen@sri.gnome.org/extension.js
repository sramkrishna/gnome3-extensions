/* -*- mode: js2; js2-basic-offset: 4; indent-tabs-mode: nil -*- */


const Gio = imports.gi.Gio;
const Lang = imports.lang;
const Shell = imports.gi.Shell;
const St = imports.gi.St;
const AppFavorites = imports.ui.appFavorites;
const ScreenSaver = imports.misc.screenSaver;

const Main = imports.ui.main;

function LockScreenLauncher() {
    this._init();
}

LockScreenLauncher.prototype = {
    _init: function() {
	this._screenSaverProxy = new ScreenSaver.ScreenSaverProxy();

	global.log("hello");

//	this.buttonlabel = new St.Label({ style_class: 'lock-label', text: _("Lock screen")});
        this.actor = new St.Button({ style_class: 'panel-launcher',
                                     reactive: true });
	global.log("hello2");
//	this.actor.add (this.buttonlabel);
        this.actor._delegate = this;
        this.actor.connect('clicked', Lang.bind(this, function() {
            this._LockScreenActivate();
        }));
	global.log("hello3");
    },
};

function LockScreen () {
    this._init();
    global.log("hello6");
}

LockScreen.prototype = {
    _init: function() {
	global.log("hello7")
	this.actor = new St.BoxLayout({name: 'lockbox',style_class: 'lock-box'});
        this.mybutton = new St.Button({ style_class: 'panel-launcher',
                                     reactive: true });
	this.mybutton.connect('clicked', Lang.bind(this,function () {
							this._LockScreenActivate();
	}));
	this.actor.add (this.mybutton);
	global.log("hello8");
	this._display ();
	global.log("hello9");
    },
    _LockScreenActivate: function () {
	global.log("hello4")
	Main.overview.hide();
	global.log("hello5")
	this._screenSaverProxy.LockRemote();
    }

    _redisplay: function() {
	global.log("hello10");
	this._buttons.actor.destroy();
	global.log("hello11");
	this._display();
    },

    _display: function() {
	global.log("hello12");
            this._buttons = new LockScreenLauncher();
	global.log("hello13");
            this.actor.add(this._buttons.actor);
	global.log("hello14");
    },

    enable: function() {
	global.log("hello15");
        Main.panel._leftBox.insert_actor(this.actor, 1);
	global.log("hello16");
    },

    disable: function() {
	global.log("hello17");
        Main.panel._leftBox.remove_actor(this.actor);
	global.log("hello18");
    }
};

function init() {
	global.log("hello19");
    return new LockScreen();
	global.log("hello20");
};
