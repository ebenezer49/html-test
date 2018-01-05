window.onload = function() {
    let webSocket = new WebSocket('ws://echo.websocket.org');
    webSocket.onopen = function() {
        console.log('webSocket is open.');
        document.getElementById('recv').innerText = 'Connect.';
    }
    webSocket.onclose = function() {
        console.log('webSocket is close');
    }
    webSocket.onmessage = function(e) {
        console.log(e);
        let pDom = document.createElement('p');
        pDom.style.color = '#A2BB35';
        pDom.innerText = e.data;
        document.getElementById('recv').appendChild(pDom);
    }
    webSocket.onerror = function(e) {
        console.error(`webSocket err: ${err}`);
    }
    
    document.getElementById('send-btn').onclick = function() {
        let data = document.getElementById('input-text').value;
        webSocket.send(data);
    }
}
