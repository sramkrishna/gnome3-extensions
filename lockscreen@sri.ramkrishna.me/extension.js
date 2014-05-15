/* -*- mode: js2; js2-basic-offset: 4; indent-tabs-mode: nil -*- */

/*
 * Copyright © 2014 Sriram Ramkrishna
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2 of the licence, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library. If not, see <http://www.gnu.org/licenses/>.
 *
 * Author: Sriram Ramkrishna <sri@ramkrishna.me>
 */

/*
 * Simple extension to lock the screen from an icon on the panel.
 */

const Gio = imports.gi.Gio;
const Lang = imports.lang;
const Shell = imports.gi.Shell;
const St = imports.gi.St;

/*const ScreenSaver = imports.misc.screenSaver;*/
const Main = imports.ui.main;
let _lockScreenButton = null;

function init() {

	_lockScreenButton = new St.Bin({ style_class: 'panel-button', 
								reactive: true,
								can_focus: true,
								x_fill: true,
								y_fill: false,
								track_hover: true });
	let icon = new St.Icon ({ icon_name: 'changes-prevent-symbolic',
								style_class: 'system-status-icon'});
	_lockScreenButton.set_child(icon);
	_lockScreenButton.connect('button-press-event', _LockScreenActivate);
}

function _LockScreenActivate () {
	Main.overview.hide();
/*	screenSaverProxy = new ScreenSaver.ScreenSaverProxy();
	screenSaverProxy.LockRemote();*/
	Main.screenShield.lock(true)
}


function enable () {
	Main.panel._rightBox.insert_child_at_index(_lockScreenButton,0);
}

function disable () {
	Main.panel._rightBox.remove_actor(_lockScreenButton);
}
