const URL = "127.0.0.1:8080";

describe("Pruebas Memotest", () => {
  beforeEach(() => {
    cy.visit(URL);
    });

  it("Hay 24 cartas al iniciar el juego", () => {
    cy.get("#tablero").find(".carta").should("have.length", 24);
  });

  describe("Resuelve el juego", () => {
    it("Las imágenes de las cartas se ocultan al elegir una combinación errónea", () => {
      cy.get("#jugar").click();
      cy.get("#tablero")
        .find(".reverso")
        .then((imagenes) => {
          const paresCartas = obtenerParesCartas(imagenes);
          const listaParesCartas = Object.values(paresCartas);

          listaParesCartas[0][0].click();
          listaParesCartas[1][0].click();

          cy.get(listaParesCartas[0][0]).should("not.be.visible");
          cy.get(listaParesCartas[1][0]).should("not.be.visible");
        });
    });
    it("Aparece mensaje final al ganar el juego", () => {
      cy.get("#jugar").click();
      cy.get("#tablero")
        .find(".reverso")
        .then((imagenes) => {
          const paresCartas = obtenerParesCartas(imagenes);
          const listaParesCartas = Object.values(paresCartas);

          listaParesCartas.forEach(par => {
            par[0].click();
            par[1].click();
          });

          cy.wait(5000).then(() => {
            cy.get('#modal-juego-ganado').should('be.visible');
          });
        });
    });
  });
});

function obtenerParesCartas(imagenes) {
  const pares = {};

  imagenes.each((i, imagen) => {
    const referenciaImagen = imagen
      .getAttribute("src")
      .replace("src/img/", "")
      .replace(".png", "");

    if (pares[referenciaImagen]) {
      pares[referenciaImagen].push(imagen);
    } else {
      pares[referenciaImagen] = [imagen];
    }
  });

  return pares;
}
