'use strict'

export const url = "http://localhost:3000/";

export const get = (index) =>
    fetch(url + index).then((o) => o.json());

export const post = (index, object) =>
    fetch(url + index, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
    }).then((o) => o.json());

export const put = (index, object) =>
    fetch(url + index + `/${object.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
    }).then((o) => o.json());

export const del = (index, object) =>
    fetch(url + index + `/${object.id}`, {
        method: "DELETE",
    }).then((o) => o.json());
