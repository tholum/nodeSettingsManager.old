var Server = function(data){
    var self = this;
    self.name = ko.observable(data.name);
    self.active = ko.observable( data.active == true ? true : false );
    self.onSelect = function(){
        ko.utils.arrayForEach(settingsManager.servers(), function (server) {
            //For efficency, I dont wan't subscribers to active to get hit if there will be no change
            if( server.active() === true ){ server.active(false); }
        });
        self.active( true );
    }
    self.settings = ko.observableArray( typeof data.settings == "object" ? data.settings : [] );
}

var settingsManager = {
    servers : ko.observableArray([])
}
settingsManager.servers.push( new Server({ name : 'Mic Processing'}));
settingsManager.servers.push( new Server(
    { 
        name : 'Level Shifting' , 
        active : true , 
        settings: [
            { name : 'Max Level' , value : 100 , type : 'int' },
            { name : 'Min Level' , value : 0   , type : 'int' },
            { name : 'Error Email' , value : 'test@gmail.com' , type : 'string' }
        ] 
    }));
ko.applyBindings( settingsManager );