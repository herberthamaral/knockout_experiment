describe("knockoutEntity",function(){
    it("should create proper observables based on object argument",function(){
        var Person = knockoutEntity({name:ko.observable('Herp'), last_name:ko.observable('Derp')});
        var person = new Person();
        expect(person.name()).toBe('Herp');
        expect(person.last_name()).toBe('Derp');
    });
    it("should create more properties on demand",function(){
        var Person = knockoutEntity({name:ko.observable('Herp'), last_name:ko.observable('Derp')});
        Person.addExtraProperty({should_display_on_screen: ko.observable(false)});
        expect(new Person().should_display_on_screen()).toBe(false);
    });
    it("should only export properties to json",function(){
        var Person = knockoutEntity({name:ko.observable('Herp'), last_name:ko.observable('Derp')});
        Person.addExtraProperty({should_display_on_screen: ko.observable(false)});
        var p = new Person();
        var json = p.toJS();
        expect(json.name).toBe("Herp");
        expect(json.last_name).toBe("Derp");
        expect(json.should_display_on_screen).toBe(undefined);
    });
    it("should export non-observable properties to json",function(){
        var Person = knockoutEntity({name:'Herp'});
        var p = new Person();
        var json = p.toJS();
        expect(json.name).toBe("Herp");
    });
});
