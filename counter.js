var fs = require("fs");

exports.getCounter = function()

{
    fs.readFile('./counterFile',function(err,file){
    if(err){
        console.log(err);
            }
    return file.toString('UTF-8').split(':')[1];
});
}

exports.getCounterSync = function(){
    var file =fs.readFileSync('./counterFile');
    var lines=file.toString('UTF-8').split('\n');
    return lines[lines.length-1].split(':')[1];
}

exports.setCounterSync = function(username,increment,currentCounterValue){
    var val = currentCounterValue;
    console.log(val);
    val+=increment;
    console.log(val);
    var data = '\n'+username+":"+val;
    fs.appendFileSync('./counterFile',data,'UTF-8');
    return val;
    
}


