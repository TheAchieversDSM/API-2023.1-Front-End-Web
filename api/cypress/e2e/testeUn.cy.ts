describe("CriarEstacoes", () => {
    it("deve enviar o formulário com sucesso", () => {
      cy.visit("/criar-estacoes"); // Substitua "/sua-pagina" pela URL real da página que contém o componente CriarEstacoes
  
      // Simula a requisição da API
      cy.intercept("POST", "**/estacao/cadastro").as("cadastroRequest");
  
      // Preenche os campos do formulário
      cy.get('input[name="nome"]').type("Estação de Teste");
      cy.get('input[name="latitude"]').type("123,456");
      cy.get('input[name="longitude"]').type("789,012");
      cy.get('input[name="uid"]').type("test-uid");
      cy.get('input[name="utc"]').type("test-utc");
      cy.get('div[class="create-station-button"] button[type="submit"]').click();
  
      // Aguarda a conclusão da requisição da API
      cy.wait("@cadastroRequest").then((interception) => {
        // Verifica se a requisição foi bem-sucedida
        expect(interception.response.statusCode).to.equal(200);
  
        // Verifique os dados de resposta ou quaisquer outras expectativas
        // ...
  
        // Verifica a mensagem de sucesso
        cy.get('.swal2-title').should('contain.text', 'Estação cadastrada!');
        cy.get('.swal2-content').should('contain.text', 'A estação Estação de Teste foi cadastrada com sucesso!');
        cy.get('.swal2-icon').should('have.class', 'swal2-success');
        cy.get('.swal2-confirm').click();
      });
    });
  });
  