/* -*- mode: js2; js2-basic-offset: 4; indent-tabs-mode: nil -*- */


const Gio = imports.gi.Gio;
const Lang = imports.lang;
const Shell = imports.gi.Shell;
const St = imports.gi.St;

const Main = imports.ui.main;
const AppFavorites = imports.ui.appFavorites;

LockScreenLauncher() {
    this._init();
}

LockScreenLauncher.prototype = {
    _init: function() {
	this._screenSaverProxy = new ScreenSaver.ScreenSaverProxy();

        this.actor = new St.Button({ style_class: 'panel-launcher',
                                     reactive: true });
        let icon = app.create_icon_texture(24);
        this.actor.set_child(icon);
        this.actor._delegate = this;
        let text = app.get_name();
        if ( app.get_description() ) {
            text += '\n' + app.get_description();
        }
        this.actor.set_tooltip_text(text);
        this._app = app;
        this.actor.connect('clicked', Lang.bind(this, function() {
            this._LockScreenActivate()
        }));
    },
   _LockScreenActivate: function () {
	Main.overview.hide()
	this._screenSaverProxy.LockRemote()
    }
};

function LockScreen () {
    this._init();
}


LockScreen.prototype = {
    _init: function() {
	this.actor = new St.BoxLayout({name: 'lockbox',style_class: 'lock-box'})
	this._display ()
	Shell.AppSystem.get_default().connect('installed-changed', Lang.bind(this, this._redisplay));
    },

    _redisplay: function() {
	this._buttons.actor.destroy();
	this._display();
    },

    _display: function() {
            this._buttons = new LockScreenLauncher();
            this.actor.add(this._buttons.actor);
        }
    },

    enable: function() {
        Main.panel._leftBox.insert_actor(this.actor, 1);
    },

    disable: function() {
        Main.panel._leftBox.remove_actor(this.actor);
    }
};

function init() {
    return new LockScreen();
}
