Experimento simples com knockout.js
===================================

Procurei separar os ViewModels dos Models (aka POJOs) o máximo possível. Ficou
um pouco mais verboso que de costume, mas ficou mais bem separado.

Uma das principais vantagens da abordagem adotada aqui diz respeito à
persistência dos dados. O fato de ter os POJOs isolados me permite converte-los
facilmente em JSON, sem me preocupar com propiedades computadas no JSON serializado.

