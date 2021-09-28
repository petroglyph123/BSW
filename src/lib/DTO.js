'use strict'

import moment from 'moment';

export class Name {
    constructor() {
        this.first = "";
        this.last = "";
    }
    assign(src) {
        this.first = src.first;
        this.last = src.last;
    }
}

export class Staff {
    constructor() {
        this.id = null;
        this.dept = "";
        this.name = new Name();
        this.pager = "";
    }
    assign(src) {
        this.id = src.id;
        this.dept = src.dept;
        this.name.assign(src.name);
        this.pager = src.pager || "";
    }
}

export class DateFormat {
    constructor() {
        this.date = new moment();
        this.fmt = "YYYY-MM-DD";
        this.color = "";
    }
    assign(src) {
        this.date = new moment(src.date);
        this.fmt = src.fmt;
        this.color = src.color;
    }
    get text() {
        return this.date.format(this.fmt);
    }
    set text(s) {
        this.date = new moment(s);
        return this;
    }
}

export class DateTimeFormat extends DateFormat {
    constructor() {
        super();
        this.fmt = "YYYY-MM-DDTHH:mm"
    }
    assign(src) {
        super.assign(src);
    }
}

export class Patient {
    constructor() {
        this.gender = "";
        this.name = new Name();
        this.dob = new DateFormat();
        this.adm = new DateTimeFormat();
        this.disc = new DateTimeFormat();
        this.disc.date.add(1, 'days');
        this.ao = "";
        this.hlm = 1; // 1
        this.rrs = "l"; // low
        this.staffs = {
            DR: new Staff(),
            RN: new Staff(),
            H: new Staff(),
        }
        this.glyphs = {
            ANC: [],
            BARRIER: [],
            DC: [],
            EDU: [],
        }
    }
    assign(src) {
        this.gender = src.gender;
        this.name.assign(src.name);
        this.dob.assign(src.dob)
        this.adm.assign(src.adm)
        this.disc.assign(src.disc)
        this.ao = src.ao;
        this.hlm = src.hlm;
        this.rrs = src.rrs;
        Object.assign(this.staffs, src.staffs);
        Object.assign(this.glyphs, src.glyphs);
    }
    get elos() {
        return this.disc.diff(this.adm, 'days');
    }
}

export class Room {
    constructor(src) {
        this.id = null;
        this.name = "";
        this.color = "white";
        this.patient = new Patient();
        if (typeof src !== 'undefined')
            this.assign(src);
    }
    assign(src) {
        this.id = src.id;
        this.name = src.name;
        this.color = src.color;
        this.patient.assign(src.patient);
    }

}

export class Glyph {
    constructor() {
        this.type = '';
        this.text = '';
        this.fg = 'black';
        this.bg = 'white';
    }
}