import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { readFile } from "node:fs/promises";

function getTypeVarMaj(row) {
  return row.match("[A-z]*")[0];
}

function getQuantiteVarChange(row) {
  let res = "";
  let detected = false;

  for (let i = 0; i < row.length; i++) {
    if (row[i] == "+" || row[i] == "-" || detected) {
      res += row[i];
      detected = true;
    }
  }

  return parseInt(res);
}

function getCondition(txt) {
  return getIdDestActionArg(txt, "(", ")");
}

function getIdDestActionArg(txt, caracStart = "[", caracEnd = "]") {
  let debut = txt.indexOf(caracStart);
  let fin = txt.indexOf(caracEnd);

  if (debut === -1 || fin === -1 || debut >= fin) {
    return null;
  }

  let id = txt.substring(debut + 1, fin);

  return id;
}
function getLabelActionArg(txt) {
  let debut = txt.indexOf("[");
  let fin = txt.indexOf("]");

  if (debut === -1 || fin === -1 || debut >= fin) {
    return null;
  }

  return txt.split("[")[0];
}

async function main() {
  let data;
  try {
    data = await readFile("./prisma/histoire.txt", {
      encoding: "utf8",
    });
  } catch (err) {
    console.log(err);
  }

  let parsed = [];

  let actionTab = [];

  let simpleTab = [];
  let deTab = [];
  let combatTab = [];
  let enigmesTab = [];
  let conditionTab = [];

  let variableMaj = [];

  let sections = data.split("#");
  sections.shift();

  sections.map((e) => {
    let lines = e.split("\r\n");
    let sectiontitle = lines[0];
    let id = sectiontitle.split(" ")[0];
    let title = sectiontitle.split(" ").slice(1).join(" ");
    lines.shift(); //titre

    let reste = lines.join("\n");

    let aftercontent = reste.split("---");
    let text = aftercontent[0];

    let actionArgs = aftercontent[1];
    if (aftercontent[2]) {
      let varChange = aftercontent[2];
      let varChangeArr = varChange.split("\n");
      varChangeArr = varChangeArr.filter((v) => v != "");
      varChangeArr.map((c) => {
        let varChangeRow = {
          numeroSection: id,
          idVariable: 0,
          quantite: getQuantiteVarChange(c),
          type: getTypeVarMaj(c),
        };
        variableMaj.push(varChangeRow);
      });
    }
    let actionArgsArr = [];
    let action_type = "";

    if (actionArgs) {
      actionArgsArr = actionArgs.split("\n");
      action_type = actionArgsArr[0];
      actionArgsArr.shift();
    }

    actionArgsArr = actionArgsArr.filter((a) => a != "");

    let actionRow;

    if (actionArgsArr.length > 0) {
      if (action_type === "COMBAT") {
        actionRow = {
          label: "",
          nom_ennemi: actionArgsArr[0],
          idOrigine: id,
          idDestination: getIdDestActionArg(actionArgsArr[1]),
          idDestinationEchec: getIdDestActionArg(actionArgsArr[2]),
        };

        combatTab.push(actionRow);
      } else if (action_type === "DE") {
        actionRow = {
          label: "",
          idOrigine: id,
          seuil: getCondition(actionArgsArr[0]).slice(3),
          idDestination: getIdDestActionArg(actionArgsArr[0]),
          idDestinationEchec: getIdDestActionArg(actionArgsArr[1]),
        };
        deTab.push(actionRow);
      }

      actionArgsArr.forEach((a) => {
        actionRow = {
          label: getLabelActionArg(a),
          idOrigine: id,
          idDestination: getIdDestActionArg(a),
        };

        switch (action_type) {
          case "SIMPLE":
            if (a.includes("(")) {
              //Est une option conditionnelle
              actionRow.condition = getCondition(a);
              conditionTab.push(actionRow);
            } else {
              simpleTab.push(actionRow);
            }
            break;
          case "ENIGME":
            actionRow = {
              label: getLabelActionArg(actionArgsArr[1]),
              idOrigine: id,
              idDestination: getIdDestActionArg(actionArgsArr[1]),
            };
            actionRow.reponse = actionArgsArr.shift();
            enigmesTab.push(actionRow);
            break;
        }
      });
    }

    let s = {
      numero: id,
      texte: text,
      titre: title,
    };
    parsed.push(s);
  });

  /*
    Insertion livre
  */

  const livre = await prisma.livre.create({
    data: {
      description:
        "Plongeons dans l’univers fantastique d’Alice aux pays des merveilles, où les lapins blancs parlent, les chapeaux flottent et les tasses de thé organisent des révolutions. Vous, cher aventurier, êtes tombé dans un terrier de lapin et vous vous retrouvez au cœur de ce monde étrange. Votre quête commence ici, avec des choix qui façonneront votre destin. Prêt à jouer ? 🎩🐇",
      couverture: "main_image_alice.png",
      nom: "Alice au pays des Merveilles",
      slug: "alice-au-pays-des-merveilles",
    },
  });

  /*
    Insertion Variable Habileté
  */

  const habilete = await prisma.variable.create({
    data: {
      valeurInitale: 3,
      nom: "HABILETE",
      type: "Statistique",
      idLivre: livre.id,
    },
  });

  /*
    Insertion Variable Force
  */

  const force = await prisma.variable.create({
    data: {
      valeurInitale: 3,
      nom: "FORCE",
      type: "Statistique",
      idLivre: livre.id,
    },
  });

  /*
    Insertion Variable Intelligence
  */

  const intelligence = await prisma.variable.create({
    data: {
      valeurInitale: 3,
      nom: "INTELLIGENCE",
      type: "Statistique",
      idLivre: livre.id,
    },
  });

  /*
    Insertion Variable Corde
  */

  const corde = await prisma.variable.create({
    data: {
      valeurInitale: 0,
      nom: "CORDE",
      type: "Inventaire",
      idLivre: livre.id,
    },
  });

  /*
    Insertion sections
  */

  const createManySections = await prisma.section.createMany({
    data: parsed.map((p) => {
      return {
        numero: parseInt(p.numero),
        titre: p.titre,
        texte: p.texte,
        idLivre: parseInt(livre.id),
      };
    }),
    skipDuplicates: true,
  });

  /*
    Insertion maj variables
  */

  const majvar = await Promise.all(
    variableMaj.map((v) => {
      switch (v.type) {
        case "HABILETE":
          v.idVariable = habilete.id;
          break;
        case "INTELLIGENCE":
          v.idVariable = intelligence.id;
          break;
        case "FORCE":
          v.idVariable = force.id;
          break;
        case "CORDE":
          v.idVariable = corde.id;
          break;
      }

      return prisma.miseAJourVar.create({
        data: {
          quantite: v.quantite,
          section: {
            connect: {
              uniqNumero: {
                idLivre: livre.id,
                numero: parseInt(v.numeroSection),
              },
            },
          },
          variable: {
            connect: {
              id: v.idVariable,
            },
          },
        },
      });
    })
  );

  /*
    Insertion Action Simples
  */
  const actionsSimpleInserted = await Promise.all(
    simpleTab.map((a) => {
      return prisma.actionSimple
        .create({
          data: {
            action: {
              create: {
                label: a.label,
                origine: {
                  connect: {
                    uniqNumero: {
                      idLivre: livre.id,
                      numero: parseInt(a.idOrigine),
                    },
                  },
                },
                destination: {
                  connect: {
                    uniqNumero: {
                      idLivre: livre.id,
                      numero: parseInt(a.idDestination),
                    },
                  },
                },
              },
            },
          },
        })
        .catch((err) => {
          // console.error(err)
          console.log(a);
        });
    })
  );

  /*
    Insertion Action Enigme
  */
  const actionsEnigmeInserted = await Promise.all(
    enigmesTab.map((a) => {
      return prisma.actionEnigme
        .create({
          data: {
            reponse: a.reponse,
            action: {
              create: {
                label: a.label,
                origine: {
                  connect: {
                    uniqNumero: {
                      idLivre: livre.id,
                      numero: parseInt(a.idOrigine),
                    },
                  },
                },
                destination: {
                  connect: {
                    uniqNumero: {
                      idLivre: livre.id,
                      numero: parseInt(a.idDestination),
                    },
                  },
                },
              },
            },
          },
        })
        .catch((err) => {
          // console.error(err)
          console.log(a);
        });
    })
  );

  /*
    Insertion Action Condition
  */

  const actionsCondInserted = await Promise.all(
    conditionTab.map((a) => {
      return prisma.actionCondition
        .create({
          data: {
            condition: a.condition,
            action: {
              create: {
                label: a.label,
                origine: {
                  connect: {
                    uniqNumero: {
                      idLivre: livre.id,
                      numero: parseInt(a.idOrigine),
                    },
                  },
                },
                destination: {
                  connect: {
                    uniqNumero: {
                      idLivre: livre.id,
                      numero: parseInt(a.idDestination),
                    },
                  },
                },
              },
            },
          },
        })
        .catch((err) => {
          // console.error(err)
          console.log(a);
        });
    })
  );
  /*
    Insertion Action Combat
  */
  const actionsCombatInserted = await Promise.all(
    combatTab.map((a) => {
      return prisma.actionCombat
        .create({
          data: {
            nom_ennemi: a.nom_ennemi,
            destinationEchec: {
              connect: {
                uniqNumero: {
                  idLivre: livre.id,
                  numero: parseInt(a.idDestinationEchec),
                },
              },
            },
            action: {
              create: {
                label: a.label,
                origine: {
                  connect: {
                    uniqNumero: {
                      idLivre: livre.id,
                      numero: parseInt(a.idOrigine),
                    },
                  },
                },
                destination: {
                  connect: {
                    uniqNumero: {
                      idLivre: livre.id,
                      numero: parseInt(a.idDestination),
                    },
                  },
                },
              },
            },
          },
        })
        .catch((err) => {
          // console.error(err)
          console.log(err);
        });
    })
  );

  /*
    Insertion Action Dé
  */

  const actionsDeInserted = await Promise.all(
    deTab.map((a) => {
      return prisma.actionDe
        .create({
          data: {
            seuil: a.seuil,
            destinationEchec: {
              connect: {
                uniqNumero: {
                  idLivre: livre.id,
                  numero: parseInt(a.idDestinationEchec),
                },
              },
            },
            action: {
              create: {
                label: a.label,
                origine: {
                  connect: {
                    uniqNumero: {
                      idLivre: livre.id,
                      numero: parseInt(a.idOrigine),
                    },
                  },
                },
                destination: {
                  connect: {
                    uniqNumero: {
                      idLivre: livre.id,
                      numero: parseInt(a.idDestination),
                    },
                  },
                },
              },
            },
          },
        })
        .catch((err) => {
          // console.error(err)
          console.log(err);
        });
    })
  );

  // Définition de l'intro du livre
  await prisma.livre.update({
    where: {
      id: livre.id,
    },
    data: {
      intro: {
        connect: {
          uniqNumero: {
            idLivre: livre.id,
            numero: 1,
          },
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
