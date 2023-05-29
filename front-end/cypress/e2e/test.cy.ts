describe('template spec', () => {
  it('passes', () => {
    
    cy.visit('http://localhost:3000/cadastro-usuario')
    cy.get('[name="nome"]').type("usuario")
    cy.get('[name="email"]').type("usuario@gmail.com")
    cy.get('[name="senha"]').type("usuario")
    cy.get("form").submit();

    cy.get('[name="email"]').type("usuario@gmail.com")
    cy.get('[name="senha"]').type("usuario")
    cy.get("form").submit();

    cy.visit('http://localhost:3000/home')
    cy.get('[name="cadastrarParametro"]').click()
    cy.get('[name="tipo"]').type("umidade")
    cy.get('[name="descricao"]').type("umidade em porcentagem")
    cy.get('[name="unidade_medida"]').type("%")
    cy.get('[name="fator_conversao"]').type("10")
    cy.get('[name="offset"]').type("2")
    cy.get("form").submit();

    cy.visit('http://localhost:3000/cadastro-estacao')
    cy.get('[name="nome"]').type("teste1")
    cy.get('[name="uid"]').type("123456789")
    cy.get('[name="latitude"]').type("-23.16317")
    cy.get('[name="longitude"]').type("-45.79434")
    cy.get("form").submit();

    cy.visit('http://localhost:3000/cadastro-estacao')
    cy.get('[name="nome"]').type("teste1")
    cy.get('[name="uid"]').type("123456789")
    cy.get('[name="latitude"]').type("-23.16317")
    cy.get('[name="longitude"]').type("-45.79434")
    cy.get("form").submit(); 

    cy.visit('http://localhost:3000/cadastro-alerta')
    cy.get('[name="nome"]').type("Umidade alta")
    cy.get('[name="mensagem"]').type("Vai chover para caramba")
    cy.get('[name="tipo"]').type("acima")
    cy.get('[name="valor"]').type("10")
    cy.get("form").submit(); 

    cy.visit('http://localhost:3000/visualizacao-estacao/1')
    cy.get('[name="excluirEstacao"]').click()
    cy.get('[aria-label="Yes"]').click()

    cy.visit('http://localhost:3000/listagem-parametros')
    cy.get('[aria-label="Select 1"]').click()
    cy.get('[aria-label="Excluir"]').click()
    cy.get('[aria-label="Yes"]').click()

    cy.visit('http://localhost:3000/listagem-alertas')
    cy.get('[aria-label="Select 1"]').click()
    cy.get('[aria-label="Excluir"]').click()
    cy.get('[aria-label="Yes"]').click()
  })
})