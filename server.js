//подключаем модуль для WebSocket
const WebSocket = require('ws');
//создадим WebSocket сервер котрый будет слушать на порту 8080
const wss = new WebSocket.Server({port: 8080});

const connections = []
//сообщение возникает каждый раз когда новый клиент подключается к серверу
wss.on('connection', (ws) => {
    connections.push(ws)
    console.log('All connections:', connections);

    console.log('Новое соединение установлено')
    //это сообщение возникает каждый раз когда сервер получает сообщение от клиента
    ws.on('message', (message) => {
        console.log('All connections:', connections);
        console.log(`Получено сообщение от клиента: ${message}`)
        //отправка ответа клиенту

        connections.forEach(otherUserWs => {
            otherUserWs.send(`Клиент[${connections.indexOf(ws)}]: ${message}`)
        })
    })
    //приветствие когда клиент будет подключаться
    ws.send('Добро пожаловать на WebSocket сервер');

    ws.on('close', () => {
        connections.splice(connections.indexOf(ws), 1)
        console.log('client disconnected')
    });
})

console.log('WebSocket сервер запущен на localhost:8080')
