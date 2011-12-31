function knockoutEntity(object){
    var KoEntity = function(){
        this._properties = [];
        for(entry in object){
            this[entry] = object[entry];
            this._properties.push(entry);
        }
        this.toJS = function(){
            var json = {};
            for(var i=0; i<this._properties.length; i++){
                var property = this[this._properties[i]];
                if(typeof(property) === "function")
                    json[this._properties[i]] = property();
                else
                    json[this._properties[i]] = property;
            }

            return json;
        }
    }
    KoEntity.addExtraProperty = function(property){
        for(entry in property){
            KoEntity.prototype[entry] = property[entry];
        }
    };
    return KoEntity;
}
