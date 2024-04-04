import("node-fetch")
  .then(({ default: fetch }) => {
    const fs = require("fs");

    // Fonction pour envoyer une requête POST à l'API MARY TTS
    async function synthesizeText(text, locale, outputType, outputFormat) {
      const url = "http://localhost:59125/process";
      const params = new URLSearchParams({
        INPUT_TEXT: text,
        INPUT_TYPE: "TEXT",
        OUTPUT_TYPE: outputType,
        LOCALE: locale,
        AUDIO: outputFormat,
      });

      const response = await fetch(url, {
        method: "POST",
        body: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.arrayBuffer();
    }

    // Fonction pour enregistrer les données audio dans un fichier WAV
    function saveAudioToFile(audioData, filename) {
      fs.writeFileSync(filename, Buffer.from(audioData));
      console.log(`Audio saved to ${filename}`);
    }

    // Exemple d'utilisation
    const text = `Dans le lointain royaume d'Avaloria, les montagnes s'élevaient comme des sentinelles silencieuses, gardiennes des secrets ancestraux. Parmi les vallées verdoyantes et les rivières sinueuses, se cachait un mystère vieux de plusieurs siècles : la légende de la pierre de lune. On disait que cette pierre, éclatant d'une lueur argentée dans la nuit noire, détenait le pouvoir de réaliser les souhaits les plus profonds de ceux qui la possédaient.

Un soir de pleine lune, alors que les étoiles brillaient comme des diamants dans le ciel sombre, un jeune aventurier du nom de Rylan entreprit un voyage audacieux à la recherche de la légendaire pierre de lune. Armé de courage et de détermination, il traversa des forêts hantées par des esprits anciens, escalada des falaises abruptes et affronta des créatures mythiques.

Après des jours de périples épuisants, Rylan atteignit enfin l'antique temple où reposait la pierre de lune. Mais juste au moment où il allait la toucher, une ombre surgit des ténèbres, un sorcier maléfique nommé Zephyr, désireux de s'emparer du pouvoir de la pierre pour assouvir ses sombres desseins.

Dans un combat épique entre le bien et le mal, Rylan lutta contre Zephyr avec une bravoure sans pareille. Les éclairs zébraient le ciel, les éclats de magie illuminaient la nuit, et finalement, avec un dernier coup d'épée, Rylan parvint à vaincre le sorcier et à s'emparer de la pierre de lune.

Alors, debout au sommet du temple ancien, Rylan leva la pierre vers le ciel étoilé et fit son vœu le plus cher : que la paix et la prospérité règnent à jamais sur Avaloria. Et dans un éclat de lumière argentée, la pierre de lune exauça son souhait, répandant une aura de magie bienveillante sur le royaume enchanté.`;

    const locale = "fr";
    const outputType = "AUDIO";
    const outputFormat = "WAVE_FILE";
    const filename = "output.wav";

    synthesizeText(text, locale, outputType, outputFormat)
      .then((audioData) => saveAudioToFile(audioData, filename))
      .catch((error) => console.error("Error:", error));
  })
  .catch((error) => console.error("Error:", error));
