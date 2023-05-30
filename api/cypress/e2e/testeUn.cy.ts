describe("CriarEstacoes", () => {
  it("deve enviar o formulário com sucesso", () => {
    cy.visit("http://localhost:3000/criar-estacoes");

    cy.intercept("POST", "**/estacao/cadastro").as("cadastroRequest");

    cy.get('input[name="nome"]').type("Estação de Teste");
    cy.get('input[name="latitude"]').type("123,456");
    cy.get('input[name="longitude"]').type("789,012");
    cy.get('input[name="uid"]').type("test-uid");
    cy.get('input[name="utc"]').type("test-utc");
    cy.get('div[class="create-station-button"] button[type="submit"]').click();

    cy.wait("@cadastroRequest").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);

      // Lida com a resposta da API
      cy.wrap(interception.response.body).then((responseBody) => {
        // Verifique os dados de resposta ou quaisquer outras expectativas
        // ...

        cy.get('.swal2-title').should('contain.text', 'Estação cadastrada!');
        cy.get('.swal2-content').should('contain.text', 'A estação Estação de Teste foi cadastrada com sucesso!');
        cy.get('.swal2-icon').should('have.class', 'swal2-success');
        cy.get('.swal2-confirm').click();
      });
    }).catch((error) => {
      // Trata o erro de promessa rejeitada
      throw error;
    });
  });
});
