import { writeFileSync, readdir, readFile } from "fs";
import { join, basename, extname } from "path";

async function synthesizeText(text, locale, outputType, outputFormat) {
  const url = new URL("process", process.env.AUDIO_API);
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
  writeFileSync(filename, Buffer.from(audioData));
  console.log(`Audio saved to ${filename}`);
}

// const inputDir = join(process.cwd(), "in");
// const outputDir = join(process.cwd(), "out");
const inputDir = process.env.IN_FOLDER;
const outputDir = process.env.OUT_FOLDER;

readdir(inputDir, (err, files) => {
  if (err) {
    console.error("Error reading input directory:", err);
    return;
  }

  files.forEach((file) => {
    const inputFilePath = join(inputDir, file);

    readFile(inputFilePath, "utf8", (err, data) => {
      if (err) {
        console.error(`Error reading file ${inputFilePath}:`, err);
        return;
      }

      const text = data.trim();

      const locale = "fr";
      const outputType = "AUDIO";
      const outputFormat = "WAVE_FILE";

      const outputFileName = basename(file, extname(file)) + ".wav";
      const outputFilePath = join(outputDir, outputFileName);

      synthesizeText(text, locale, outputType, outputFormat)
        .then((audioData) => saveAudioToFile(audioData, outputFilePath))
        .catch((error) => console.error("Error:", error));
    });
  });
});
