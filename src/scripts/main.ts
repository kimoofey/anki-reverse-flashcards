const delimiter = ";";

const inputTextarea = document.getElementById<HTMLTextAreaElement>("input");
const outputTextarea = document.getElementById<HTMLTextAreaElement>("output");

const previewButton = document.getElementById("previewBtn");
const downloadButton = document.getElementById("downloadBtn");

if (previewButton) {
  previewButton.addEventListener("click", processDictionaryEntries);
}

if (downloadButton) {
  downloadButton.addEventListener("click", downloadResultFile);
}

function processDictionaryEntries() {
  if (!inputTextarea || !outputTextarea) {
    return;
  }

  const lines = inputTextarea.value.split("\n");

  const resultLines = new Array(lines.length);
  const regex = /\s*\([^)]*\)$/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim() === "") {
      resultLines[i] = line;
      continue;
    }

    const semicolonIndex = line.indexOf(delimiter);
    if (semicolonIndex === -1) {
      resultLines[i] = line;
      continue;
    }

    const leftPart = line.substring(0, semicolonIndex);
    const rightPart = line.substring(semicolonIndex + 1);

    const match = regex.exec(rightPart);
    let additionalInfo = "";
    let cleanRightPart = rightPart;

    if (match) {
      additionalInfo = match[0];
      cleanRightPart = rightPart
        .substring(0, rightPart.length - additionalInfo.length)
        .trim();
    }

    resultLines[
      i
    ] = `${cleanRightPart}${delimiter}${leftPart}${additionalInfo}`;
  }

  outputTextarea.value = resultLines.join("\n");
}

function downloadResultFile() {
  if (!inputTextarea || !outputTextarea) {
    return;
  }

  const blob = new Blob([inputTextarea.value, "\n", outputTextarea.value], {
    type: "text/plain",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "result.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}
