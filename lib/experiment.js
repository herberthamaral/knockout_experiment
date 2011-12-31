var PessoaRepository = ko.smartObservableArray();

var Pessoa = function(nome, sobrenome){
    this.nome = ko.observable(nome);
    this.sobrenome = ko.observable(sobrenome);
}

var PessoaItemListViewModel = function(pessoa){
    this.pessoa = pessoa;
    this.view_mode = ko.observable(true);
    this.edit_mode = ko.computed({
        read:function(){
            return !this.view_mode();
        },
        owner:this
    });

    this.editar = function(self){
        self.view_mode(!self.view_mode());
    }

    this.remover = function(self){
        PessoasListViewModel.remove(self);
    }

    this.nome_completo = ko.computed({
        read:function(){
            return this.pessoa.nome()+" "+this.pessoa.sobrenome();
        },
        owner:this
    });
}


var PessoasListViewModel = { 
    list : ko.observableArray(),
    push: function(itemListViewModel){
        this.list.push(itemListViewModel);
        PessoaRepository.push(itemListViewModel.pessoa);
    },

    remove: function(itemListViewModel){
        this.list.remove(itemListViewModel);
        PessoaRepository.remove(itemListViewModel.pessoa);
    },
    pop: function(){
        var item = this.list.pop();
        PessoaRepository.remove(item.pessoa);
    }

}

PessoaRepository.subscribe(function(newValue){ 
    var pessoaItemList = new PessoaItemListViewModel(newValue);
    PessoasListViewModel.list.push(pessoaItemList);
}, null, "smartAdded");

PessoaRepository.subscribe(function(value){ 
    var len = PessoasListViewModel.length;
    for(var i=0; i<len; i++)
        if (PessoasListViewModel.list()[i].pessoa==value)
            PessoasListViewModel.list.remove(PessoasListViewModel.list()[i]);
}, null, "smartRemoved");


var PessoaFormViewModel = function(){
    this.habilitado = ko.observable(true);
    this.nome = ko.observable('Herp');
    this.sobrenome = ko.observable('Derp');
    this.nome_completo = ko.computed({
        read:function(){
            return this.nome()+" "+this.sobrenome();
        },
        owner:this
    });
    this.repository = PessoaRepository;

    this.adicionar = function(){
        var pessoa = new Pessoa(this.nome(), this.sobrenome());
        var pessoaView = new PessoaItemListViewModel(pessoa);
        PessoasListViewModel.push(pessoaView);
    }

}
