const http = require('node:http');
const {parse} = require('querystring');
const host = "127.0.0.2";
const port = 5505

const users = {user_agent: 0};


const server = http.createServer((req, res)=>{
    if(req.url === "/"){
        res.status = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end("HI");
    }else if(req.url === "/stats"){
        if (req.method === "GET"){
            res.statuse = 200;
            users.user_agent++;
            res.setHeader("Content-Type", "text/html");
            res.end(`<table>
            <tr><th>User-agent:</th><th>Request:</th></tr>
            <tr><td>${req.headers['user-agent']}</td><td>${users.user_agent}</td></tr>
            </table>`);
        }else{
        res.status = 404;
        res.setHeader("Content-Type", "text/plain");   
        res.end("400 Bad Request");
        }  
    }else if(req.url === "/comments"){
        if (req.method === "POST"){
            let body = "";
            req.on("data", (chunk) =>{
                body += chunk.toString();
            })
            req.on("end", ()=>{
             res.end(body);
            })
        }else{
        res.status = 404;
        res.setHeader("Content-Type", "text/plain");   
        res.end("400 Bad Request");
        }   
    }else{
        res.status = 404;
        res.setHeader("Content-Type", "text/plain");   
        res.end("400 Bad Request");
    }

});

server.on("connection", ()=>{
    console.log("новое подключение");
});

server.listen(port, host, () => {
    console.log(`Server is on. http://${host}:${port}`);
})