/*	Teste de usuario corrigido			*/
/// <reference types="cypress" />

describe("Funcionalidade do Login", () => {
  it("Efetuar o login corretamente", () => {
    cy.visit("http://localhost:8000");
    cy.get('[name="email"]').type("usuario1@theAchievers.com");
    cy.get('[name="password"]').type("secret");
    cy.get("form").submit();
  });
});

/* describe("Funcionalidades da Estação", () => {
  const randomNameEstation = Math.floor(Math.random() * 100000);

  it("Testando a funcionalidade da estação", () => {
    cy.visit("https://api-2023-1-front-end-i5qddbtpf-theachievers.vercel.app/");
    cy.get('[name="email"]').type("usuario1@theAchievers.com");
    cy.get('[name="password"]').type("secret");
    cy.get("form").submit();
    cy.visit("https://api-2023-1-front-end-i5qddbtpf-theachievers.vercel.app/estacoes");
    // Cadastro da nova estação
    cy.get(".button-new").click();
    cy.get('[name="nome"]').type(`Estação de Teste ${randomNameEstation}`);
    cy.get('[name="latitude"]').type("-25265.5465");
    cy.get('[name="longitude"]').type("25265.5465");
    cy.get('[name="uid"]').type("6564564564");
    cy.get('[name="utc"]').type("-3");
    cy.get(".css-b62m3t-container").type("vento{enter}");
    cy.get("form").submit();
    // Get da nova estação
    cy.visit("https://api-2023-1-front-end-i5qddbtpf-theachievers.vercel.app/estacoes");
    cy.get(".input-search").type(`Estação de Teste ${randomNameEstation}`);
    cy.get(".bt-view").click();
    cy.get(".btn-close").click();
    // Inativar a estação
    cy.get(".bt-delete").click();
    cy.get(".swal2-confirm").click();
    cy.get('[aria-selected="false"]').click();
    cy.get(".input-search").type(`Estação de Teste ${randomNameEstation}`);
    // Editar a estação
    cy.get(".bt-edit").click();
    cy.get('[name="nome"]').type(
      `{selectAll}{backspace}Estação de Teste ${randomNameEstation + 42}`
    );
    cy.get("form").submit();
    // Ver Estação editada
    cy.visit("https://api-2023-1-front-end-i5qddbtpf-theachievers.vercel.app/estacoes");
    cy.get('[aria-selected="false"]').click();
    cy.get(".input-search").type(`Estação de Teste ${randomNameEstation + 42}`);
  });
}); */