/**
 * Created by xiaoqi on 2016/3/6.
 */
var http=require('http');
var fs=require('fs');
var path=require('path');
var mime=require('mime');
var cache={};

function send404(response){
    response.writeHead(404,{'Content-type':'text/plain'});
    response.write('Error 404: resource not found');
    response.end();
}

function sendFile(resonse,filePath,fileContents){
    resonse.writeHead(
        200,
        {'content-type':mime.lookup(path.basename(filePath))}
    );
    resonse.end(fileContents);
};
function serveStatic(response,cache,absPath){
   /* if(cache[absPath]){
        sendFile(response,absPath,cache[absPath]);
    }else{
        fs.exists(absPath,function(exists){
            if(exists){
                fs.readFile(absPath,function(err,data){
                    if(err){
                        send404(response);
                    }else{
                        cache[absPath]=data;
                        sendFile(response,absPath,data)
                    }
                })
            }else{
                send404(response);
            }
        })
    }*/
    fs.exists(absPath,function(exists){
        if(exists){
            fs.readFile(absPath,function(err,data){
                if(err){
                    send404(response);
                }else{
                    cache[absPath]=data;
                    sendFile(response,absPath,data)
                }
            })
        }else{
            send404(response);
        }
    })
};


var server=http.createServer(function(request,response){
    var filePath=false;
    if(request.url=='/'){
        filePath='/index.html';
    }else{
        var url=request.url;
        var queryLocation=request.url.indexOf('?');
        var sourceLocation="";
            if(queryLocation>-1){
                sourceLocation=url.substring(0,queryLocation)
            }else {
                sourceLocation=url;
            }
        //console.log(sourceLocation);
        //console.log(queryLocation);
       // console.log(request.url.length);
        filePath=sourceLocation;
    }
    var absPath='./build/'+filePath;
    serveStatic(response,cache,absPath);
});

server.listen(4000,function(){
    console.log('Server listening on port 4000.');
});