var Setting = function(data){
    if( data.value === undefined ){ data.value = ""; }
    var self = this;
    self.name = ko.observable( typeof data.name == "string" ? data.name : '' );
    self.value = ko.observable(  String( data.value ) );
    self.type = ko.observable( typeof data.type == "string" ? data.type : '' );
    self.original = ko.observable(   String( data.value ) );
    self.changed = ko.observable(false);
    self.syncData = function( data ){
        
    }
    self.value.subscribe(
        function(){
            console.log(self.value() );
            if( self.value() != self.original() ){
                if( self.changed() == false ){
                    settingsManager.changes(settingsManager.changes() + 1 );
                }
                self.changed(true);
            } else {
                if( self.changed() == true ){
                    settingsManager.changes(settingsManager.changes() - 1 );
                }
                self.changed(false);
            }
        }    
    );
}
var Server = function(data){
    if( typeof data.settings == "undefined" ){
        data.settings = [];
    }
    var self = this;
    self.name = ko.observable(data.name);
    self.active = ko.observable( data.active == true ? true : false );
    self.description = ko.observable( typeof data.description == "string" ? data.description : '' );
    self.onSelect = function(){
        ko.utils.arrayForEach(settingsManager.servers(), function (server) {
            //For efficency, I dont wan't subscribers to active to get hit if there will be no change
            if( server.active() === true ){ server.active(false); }
        });
        self.active( true );
    }
    self.syncData = function(newData){
        
    }
    self.settings = ko.observableArray( [] );
    $.each( data.settings , function(key,val){
        self.settings.push( new Setting( val ) );
    });
}

var settingsManager = {
    servers : ko.observableArray([]),
    syncServerData : function( data ){
        var match = ko.utils.arrayFirst(settingsManager.servers(), function(server) {
            return server.name() === data.name;
        });
        if (!match) {
          settingsManager.servers.push(new Server(data));
        } else {
            match.syncData( data );
        }
    },
    changes : ko.observable(0)
}

settingsManager.servers.push( new Server({ name : 'Mic Processing' , settings: [
            { name : 'Other Stuff' , value : 100 , type : 'int' },
            { name : 'Another Value' , value : 0   , type : 'int' },
            { name : 'Test' , value : 'somevalue' , type : 'string' }
        ] }));
settingsManager.servers.push( new Server(
    { 
        name : 'Level Shifting' , 
        active : true , 
        description : 'This is the level shifting server. It does a bunch of cool things like shift levels and stuff',
        settings: [
            { name : 'Max Level' , value : 100 , type : 'int' },
            { name : 'Min Level' , value : 0   , type : 'int' },
            { name : 'Error Email' , value : 'test@gmail.com' , type : 'string' }
        ] 
    }));
ko.applyBindings( settingsManager );