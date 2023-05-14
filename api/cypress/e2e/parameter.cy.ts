import axios from "axios";

describe("Funcionalidade do Login", () => {
  it("Efetuar o login corretamente", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[name="email"]').type("usuario1@theAchievers.com");
    cy.get('[name="password"]').type("secret");
    cy.get("form").submit();
    cy.url().should("eq", "http://localhost:3000/home");
    cy.wait(1000);
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
      const response = interception.response.body;
      expect(interception.response.statusCode).to.eq(404);
      expect(response.message).to.eq("Senha incorreta");
    });
    cy.wait(1000);
    cy.url().should("eq", "http://localhost:3000/");
  });
});

describe("Funcionalidades do Parâmetro", () => {
  const novoParametro = "Aceleração do Vento";
  it("Criar o parâmetro", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[name="email"]').type("usuario1@theAchievers.com");
    cy.get('[name="password"]').type("secret");
    cy.get("form").submit();
    cy.visit("http://localhost:3000/parametros");
    cy.get(".button-new").click();
    cy.get('[name="nome"]').type(`Parâmetro Teste ${novoParametro}`);
    cy.get('[name="formula"]').type("Formula do parâmetro teste! 2 + 2 = 4");
    cy.get('.css-b62m3t-container:eq(0)').type(`${novoParametro}{enter}`);
    cy.get('.css-b62m3t-container:eq(1)').type("m/s²{enter}");
    cy.get('[name="fator"]').type("-2");
    cy.get('[name="offset"]').type("1");
    cy.wait(1000);
    cy.get("form").submit();
    cy.wait(1000);
  });
   it("Selecionar o parâmetro", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[name="email"]').type("usuario1@theAchievers.com");
    cy.get('[name="password"]').type("secret");
    cy.get("form").submit();
    cy.visit("http://localhost:3000/parametros");
    cy.get(".input-search").type(`Parâmetro Teste ${novoParametro}`);
    cy.get(".bt-view:eq(0)").click();
    cy.wait(1000);
    cy.get(".btn-close").click();
    cy.wait(1000);
  });
  it("Inativar parâmetro", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[name="email"]').type("usuario1@theAchievers.com");
    cy.get('[name="password"]').type("secret");
    cy.get("form").submit();
    cy.visit("http://localhost:3000/parametros");
    cy.get(".input-search").type(`Parâmetro Teste ${novoParametro}`);
    cy.get(".bt-delete").click();
    cy.wait(1000);
    cy.get(".swal2-confirm").click();
    cy.get('[aria-selected="false"]').click();
    cy.get(".input-search").type(`Parâmetro Teste ${novoParametro}`);
    cy.get(".bt-view").click();
    cy.wait(1000);
    cy.get(".btn-close").click();
    cy.wait(1000);
  });
  it("Editar o parâmetro", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[name="email"]').type("usuario1@theAchievers.com");
    cy.get('[name="password"]').type("secret");
    cy.get("form").submit();
    cy.visit("http://localhost:3000/parametros");
    cy.wait(1000);
    cy.get('[aria-selected="false"]').click();
    cy.get(".input-search").type(`Parâmetro Teste ${novoParametro}`);
    cy.get(".bt-edit").click();
    cy.get('[name="nome"]').type(
      `{selectAll}{backspace}Teste Parâmetro ${novoParametro}`
    );
    cy.get('.css-b62m3t-container:eq(1)').type("km/h²{enter}");
    cy.wait(1000);
    cy.get("form").submit();
    cy.wait(1000);
  });
  it("Selecionar o parâmetro editado", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[name="email"]').type("usuario1@theAchievers.com");
    cy.get('[name="password"]').type("secret");
    cy.get("form").submit();
    cy.visit("http://localhost:3000/parametros");
    cy.wait(1000);
    cy.get('[aria-selected="false"]').click();
    cy.get(".input-search").type(`Teste Parâmetro ${novoParametro}`);
    cy.get(".bt-view").click();
    cy.wait(1500);
  });
  it("Reativar o parâmetro", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[name="email"]').type("usuario1@theAchievers.com");
    cy.get('[name="password"]').type("secret");
    cy.get("form").submit();
    cy.visit("http://localhost:3000/parametros");
    cy.wait(1000);
    cy.get('[aria-selected="false"]').click();
    cy.get(".input-search").type(`Teste Parâmetro ${novoParametro}`);
    cy.get(".bt-active").click();
    cy.wait(1000);
    cy.get(".swal2-confirm").click();
    cy.visit("http://localhost:3000/parametros");
    cy.get(".input-search").type(`Teste Parâmetro ${novoParametro}`);
    });
});
