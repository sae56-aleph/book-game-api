import("node-fetch")
  .then(({ default: fetch }) => {
    const fs = require("fs");
    const path = require("path");

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

    function saveAudioToFile(audioData, filename) {
      fs.writeFileSync(filename, Buffer.from(audioData));
      console.log(`Audio saved to ${filename}`);
    }

    const inputDir = path.join(__dirname, "..", "in");
    const outputDir = path.join(__dirname, "..", "out");

    fs.readdir(inputDir, (err, files) => {
      if (err) {
        console.error("Error reading input directory:", err);
        return;
      }

      files.forEach((file) => {
        const inputFilePath = path.join(inputDir, file);

        fs.readFile(inputFilePath, "utf8", (err, data) => {
          if (err) {
            console.error(`Error reading file ${inputFilePath}:`, err);
            return;
          }

          const text = data.trim();

          const locale = "fr";
          const outputType = "AUDIO";
          const outputFormat = "WAVE_FILE";

          const outputFileName =
            path.basename(file, path.extname(file)) + ".wav";
          const outputFilePath = path.join(outputDir, outputFileName);

          synthesizeText(text, locale, outputType, outputFormat)
            .then((audioData) => saveAudioToFile(audioData, outputFilePath))
            .catch((error) => console.error("Error:", error));
        });
      });
    });
  })
  .catch((error) => console.error("Error:", error));
