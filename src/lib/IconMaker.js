'use strict'

import { defined_icons } from "../assets/icons";

// {type:'ANC', text: 'PM&R', fg:'white', bg: '#7030A0'}

export const draw = (id, icon) => {
  let a = (2 * Math.PI) / 6;

  const canvas = document.getElementById(id);
  const ctx = canvas.getContext("2d");

  ctx.font = `900 30px Helvetica`;
  let length = icon.length = Math.floor(ctx.measureText(icon.text).width);
  icon.width = length > 100 ? length + 10 : 100;

  canvas.width = icon.width;
  ctx.clearRect(0, 0, icon.width, 100);

  ctx.fillStyle = icon.bg;
  ctx.beginPath();
  if (icon.type === "ANC") {
    ctx.rect(icon.width / 2 - 50, 0, 100, 100);
  } else if (icon.type === "DC") {
    ctx.moveTo(icon.width / 2, 0);
    ctx.lineTo(icon.width / 2 + 50, 100);
    ctx.lineTo(icon.width / 2 - 50, 100);
    ctx.lineTo(icon.width / 2, 0);
  } else if (icon.type === "BARRIER") {
    ctx.arc(icon.width / 2, 50, 50, 0, 2 * Math.PI);
  } else if (icon.type === "EDU") {
    for (var n = 0; n < 6; n++) {
      ctx.lineTo( icon.width / 2 + (100 / 2) * Math.cos(a * n), 50 + 50 * Math.sin(a * n));
    }
  }
  ctx.fill();
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.font = `900 30px Helvetica`;
  ctx.fillStyle = icon.fg;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(icon.text, icon.width / 2, 50);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.strokeText(icon.text, icon.width / 2, 50);
  ctx.closePath();
  icon.src = canvas.toDataURL("image/png");
  return icon;
};
