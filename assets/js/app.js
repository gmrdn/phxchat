import "phoenix_html"
import socket from "./socket"

let channel = socket.channel('room:lobby', {});

channel.on('shout', function(payload) {
    let li = document.createElement("li");
    let name = payload.name || 'guest';
    li.innerHTML = '<b>' + name + '</b>: ' + payload.message;

    ul.appendChild(li);
    updateScroll();
});

channel.join();

let ul = document.getElementById('msg-list');
let name = document.getElementById('name');
let msg = document.getElementById('msg');

msg.addEventListener('keypress', function (event){
    if (event.keyCode == 13 && msg.value.length > 0) {
        channel.push('shout', {
            name: name.value,
            message: msg.value
        });
        msg.value = '';
    }
});

function updateScroll(){
    var element = document.getElementById("msg-list");
    element.scrollTop = element.scrollHeight;
}

