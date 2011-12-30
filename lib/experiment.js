var PessoaRepository = ko.observableArray();

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
        PessoaRepository.remove(self.pessoa);
        PessoaListViewModel.list.remove(self);
    }

    this.nome_completo = ko.computed({
        read:function(){
            return this.pessoa.nome()+" "+this.pessoa.sobrenome();
        },
        owner:this
    });
}

var PessoaListViewModel = { 
    list : ko.observableArray()
}

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
        PessoaRepository.push(pessoa);
        PessoaListViewModel.list.push(pessoaView);
    }

}
