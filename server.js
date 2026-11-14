// CodeBreaker Chrome - tiny local server. Run: node server.js  ->  http://localhost:8092
const http=require('http'),fs=require('fs'),path=require('path');
const PORT=process.env.PORT||8092,ROOT=__dirname;
const TYPES={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml','.json':'application/json'};
http.createServer((req,res)=>{
  let p=decodeURIComponent(req.url.split('?')[0]);if(p==='/')p='/index.html';
  const f=path.join(ROOT,path.normalize(p));
  if(!f.startsWith(ROOT)){res.writeHead(403);return res.end();}
  fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);return res.end('not found');}
    res.writeHead(200,{'Content-Type':TYPES[path.extname(f)]||'application/octet-stream'});res.end(d);});
}).listen(PORT,()=>console.log("CodeBreaker Chrome running at http://localhost:"+PORT));
