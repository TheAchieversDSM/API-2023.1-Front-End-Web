/* /*	Teste de usuario corrigido			*/
/// <reference types="cypress" />

describe("Funcionalidade do Login", () => {
  it("Efetuar o login corretamente", () => {
    cy.visit("http://localhost:3000");
    cy.get('[name="email"]').type("usuario1@theAchievers.com");
    cy.get('[name="password"]').type("secret");
    cy.get("form").submit();
    cy.url().should("eq", "http://localhost:3000");
  });
});

/*describe("Funcionalidade do Login", () => {
  it("Efetuar o login corretamente", () => {
    cy.visit("https://api-2023-1-front-end-i5qddbtpf-theachievers.vercel.app/");
    cy.get('[name="email"]').type("usuario1@theAchievers.com");
    cy.get('[name="password"]').type("secret");
    cy.get("form").submit();
    cy.url().should("eq", "http://localhost:3000/home");
  });
  it("Efetuar o login com senha incorreta", () => {
    cy.intercept("POST", "http://localhost:5000/login", (req) => {
      req.reply((res) => {
        res.send({
          message: "Senha incorreta",
        });
      });
    }).as("loginRequest");

    cy.visit("http://localhost:3000/");
    cy.get('[name="email"]').type("usuario1@theAchievers.com");
    cy.get('[name="password"]').type("senha_errada");
    cy.get("form").submit();
    cy.wait("@loginRequest").then((interception) => {
      const response = interception.response?.body;
      expect(interception.response?.statusCode).to.eq(404);
      expect(response.message).to.eq("Senha incorreta");
    });
    cy.url().should("eq", "http://localhost:3000/");
  });
});

describe("Funcionalidades da Estação", () => {
  const randomNameEstation = Math.floor(Math.random() * 100000);

  it("Testando a funcionalidade da estação", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[name="email"]').type("usuario1@theAchievers.com");
    cy.get('[name="password"]').type("secret");
    cy.get("form").submit();
    cy.visit("http://localhost:3000/estacoes");
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
    cy.visit("http://localhost:3000/estacoes");
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
    cy.visit("http://localhost:3000/estacoes");
    cy.get('[aria-selected="false"]').click();
    cy.get(".input-search").type(`Estação de Teste ${randomNameEstation + 42}`);
  });
}); */