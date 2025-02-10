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

import St from 'gi://St';
import GObject from 'gi://GObject';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';

import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

export default class LockScreenExtension extends Extension {
    constructor(metadata) {
        super(metadata);
    }

    enable() {
        this._button = new LockScreenButton();
        Main.panel.addToStatusArea(this.metadata.uuid, this._button);
    }

    disable() {
        this._button?.destroy();
        this._button = null;
    }
}

class LockScreenButton extends PanelMenu.Button {
    static {
        GObject.registerClass(this);
    }

    constructor() {
        super(0.0, null, true);

        this._icon = new St.Icon ({
            icon_name: 'changes-prevent-symbolic',
            style_class: 'system-status-icon'
        });

        this.add_child(this._icon);

        this.connect('button-press-event', this.#lockScreen);
    }

    #lockScreen() {
        Main.overview.hide();
        Main.screenShield.lock(true);
    }
}
