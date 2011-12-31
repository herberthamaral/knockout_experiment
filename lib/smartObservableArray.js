ko.smartObservableArray = function (initialValues) {
    if (arguments.length == 0) {
        // Zero-parameter constructor initializes to empty array
        initialValues = [];
    }
    if ((initialValues !== null) && (initialValues !== undefined) && !('length' in initialValues))
        throw new Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");
        
    var result = new ko.observable(initialValues);
    ko.utils.extend(result, ko.smartObservableArray['fn']);
    
    ko.exportProperty(result, "remove", result.remove);
    ko.exportProperty(result, "removeAll", result.removeAll);
    ko.exportProperty(result, "destroy", result.destroy);
    ko.exportProperty(result, "destroyAll", result.destroyAll);
    ko.exportProperty(result, "indexOf", result.indexOf);
    ko.exportProperty(result, "replace", result.replace);
    
    return result;
}

ko.smartObservableArray['fn'] = {
    remove: function (valueOrPredicate) {
        var underlyingArray = this();
        var removedValues = [];
        var predicate = typeof valueOrPredicate == "function" ? valueOrPredicate : function (value) { return value === valueOrPredicate; };
        for (var i = 0; i < underlyingArray.length; i++) {
            var value = underlyingArray[i];
            if (predicate(value)) {
                if (removedValues.length === 0) {
                    this.valueWillMutate();
                }
                removedValues.push(value);
                underlyingArray.splice(i, 1);
                i--;
            }
        }
        if (removedValues.length) {
            this.valueHasMutated();
            this.notifySubscribers(removedValues, "smartRemoved");
        }
        return removedValues;
    },

    removeAll: function (arrayOfValues) {
        // If you passed zero args, we remove everything
        if (arrayOfValues === undefined) {
            var underlyingArray = this();
            var allValues = underlyingArray.slice(0);
            this.valueWillMutate();
            underlyingArray.splice(0, underlyingArray.length);
            this.valueHasMutated();
            this.notifySubscribers(allValues, "smartRemoved");
            return allValues;
        }
        // If you passed an arg, we interpret it as an array of entries to remove
        if (!arrayOfValues)
            return [];
        return this.remove(function (value) {
            return ko.utils.arrayIndexOf(arrayOfValues, value) >= 0;
        });
    },
    
    destroy: function (valueOrPredicate) {
        var underlyingArray = this();
        var predicate = typeof valueOrPredicate == "function" ? valueOrPredicate : function (value) { return value === valueOrPredicate; };
        this.valueWillMutate();
        for (var i = underlyingArray.length - 1; i >= 0; i--) {
            var value = underlyingArray[i];
            if (predicate(value))
                underlyingArray[i]["_destroy"] = true;
        }
        this.valueHasMutated();
        this.notifySubscribers(valueOrPredicate, "smartDestroyed");
    },
        
    destroyAll: function (arrayOfValues) {
        // If you passed zero args, we destroy everything
        if (arrayOfValues === undefined)
            return this.destroy(function() { return true });
                
        // If you passed an arg, we interpret it as an array of entries to destroy
        if (!arrayOfValues)
            return [];
        return this.destroy(function (value) {
            return ko.utils.arrayIndexOf(arrayOfValues, value) >= 0;
        });             
    },

    indexOf: function (item) {
        var underlyingArray = this();
        return ko.utils.arrayIndexOf(underlyingArray, item);
    },
    
    replace: function(oldItem, newItem) {
        var index = this.indexOf(oldItem);
        if (index >= 0) {
            this.valueWillMutate();
            this()[index] = newItem;
            this.valueHasMutated();
            this.notifySubscribers(arguments, "smartReplaced");
        }
    }    
}

// Populate ko.smartObservableArray.fn with read/write functions from native arrays
ko.utils.arrayForEach(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (methodName) {
    ko.smartObservableArray['fn'][methodName] = function () { 
        var underlyingArray = this();
        this.valueWillMutate();
        var methodCallResult = underlyingArray[methodName].apply(underlyingArray, arguments);
        this.valueHasMutated();
        switch(methodName){
            case "pop":
            case "shift":
                this.notifySubscribers([methodCallResult], "smartRemoved");
                break;
            case "push":
            case "unshift":
                this.notifySubscribers(arguments[0], "smartAdded");
                break;
        }
        return methodCallResult;
    };
});

// Populate ko.smartObservableArray.fn with read-only functions from native arrays
ko.utils.arrayForEach(["slice"], function (methodName) {
    ko.smartObservableArray['fn'][methodName] = function () {
        var underlyingArray = this();
        return underlyingArray[methodName].apply(underlyingArray, arguments);
    };
});

ko.exportSymbol('ko.smartObservableArray', ko.smartObservableArray);
