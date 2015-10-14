var fs = require('fs');
var redis = require('redis');
var client = redis.createClient();

exports.appendJsonTofile = function (file, query, callback){
		if ( Object.keys(query).length !== 0){
       
        fs.readFile(file, 'utf8', function(err, data){
            
            if(err){
                return callback(err);
            }

            var json;
        
            if(data !== "" && data !==null ){
                try{
            	
                    json = JSON.parse(data);
            
                } catch(e){
                    return callback(null);
                }
            }else{
        	   json = [];
            }

            json.push(query);

            fs.writeFile(file, JSON.stringify(json,null,4), function (err,reply) {

                if(err){
                    return callback(err);
                }

                fs.readFile(file, function (err, data) {
                    if (err) {
                    return console.error(err);
                 }
                    callback(data.toString());
                });
  
            });
        });
    }
}



exports.incrIfParamHasCount = function(query,callback){
	for(i in query){
		if(i === 'count'){
			if(isNaN(query[i])){
                callback('This is not a number');
			
			}else{
				client.incrby('count', query[i], function(err,reply){
				callback(reply);    
			 });
			}
		}
	}
}




