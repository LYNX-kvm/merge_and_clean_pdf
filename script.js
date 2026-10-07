pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

// A page with a pixel variation (standard deviation) below this number counts as blank
var BLANK_LIMIT = 3;

// Lists where we keep our data
var selectedFiles = []; // the PDF files the user picked
var pageEntries = []; // every scanned page

// Get the elements from the HTML
var fileInput = document.getElementById("fileInput");
var fileList = document.getElementById("fileList");
var loadBtn = document.getElementById("loadBtn");
var progress = document.getElementById("progress");
var resultsCard = document.getElementById("resultsCard");
var grid = document.getElementById("grid");
var summary = document.getElementById("summary");
var mergeBtn = document.getElementById("mergeBtn");
var mergeStatus = document.getElementById("mergeStatus");
var filenameInput = document.getElementById("filenameInput");

// ---------- Step 1: choosing files ----------

fileInput.addEventListener("change", function () {
  selectedFiles = [];

  for (var i = 0; i < fileInput.files.length; i++) {
    selectedFiles.push({ file: fileInput.files[i], bytes: null });
  }

  showFileList();
});

function showFileList() {
  fileList.innerHTML = "";

  for (var i = 0; i < selectedFiles.length; i++) {
    var li = document.createElement("li");

    var name = document.createElement("span");
    name.className = "name";
    name.textContent = i + 1 + ". " + selectedFiles[i].file.name;
    li.appendChild(name);

    li.appendChild(makeSmallButton("↑", i, "up"));
    li.appendChild(makeSmallButton("↓", i, "down"));
    li.appendChild(makeSmallButton("✕", i, "remove"));

    fileList.appendChild(li);
  }

  loadBtn.disabled = selectedFiles.length === 0;
}

function makeSmallButton(text, index, action) {
  var button = document.createElement("button");
  button.className = "small";
  button.textContent = text;

  button.addEventListener("click", function () {
    if (action === "up") {
      moveFile(index, -1);
    } else if (action === "down") {
      moveFile(index, 1);
    } else {
      selectedFiles.splice(index, 1);
      showFileList();
    }
  });

  return button;
}

function moveFile(index, direction) {
  var newIndex = index + direction;

  // Do nothing if we would move outside the list
  if (newIndex < 0 || newIndex >= selectedFiles.length) {
    return;
  }

  // Swap the two files
  var temp = selectedFiles[index];
  selectedFiles[index] = selectedFiles[newIndex];
  selectedFiles[newIndex] = temp;

  showFileList();
}

// ---------- Blank page detection ----------

// Returns how much the pixels differ from each other.
// A completely white page gives a number close to 0.
function getPixelVariation(canvas) {
  var ctx = canvas.getContext("2d");
  var data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  var count = 0;
  var total = 0;

  // Each pixel has 4 values (red, green, blue, alpha).
  // We only check every 4th pixel to keep it fast.
  for (var i = 0; i < data.length; i += 16) {
    var grey = (data[i] + data[i + 1] + data[i + 2]) / 3;
    total = total + grey;
    count = count + 1;
  }

  var average = total / count;

  var sumOfSquares = 0;
  for (var j = 0; j < data.length; j += 16) {
    var grey2 = (data[j] + data[j + 1] + data[j + 2]) / 3;
    sumOfSquares = sumOfSquares + (grey2 - average) * (grey2 - average);
  }

  return Math.sqrt(sumOfSquares / count);
}

// ---------- Scanning the PDFs ----------

loadBtn.addEventListener("click", async function () {
  pageEntries = [];
  grid.innerHTML = "";
  resultsCard.style.display = "block";
  loadBtn.disabled = true;

  for (var f = 0; f < selectedFiles.length; f++) {
    var file = selectedFiles[f].file;

    progress.textContent =
      "Laden " + (f + 1) + "/" + selectedFiles.length + ": " + file.name;

    var buffer = await file.arrayBuffer();

    // Keep a copy for merging later
    selectedFiles[f].bytes = buffer.slice(0);

    var pdf = await pdfjsLib.getDocument({ data: buffer.slice(0) }).promise;

    for (var p = 1; p <= pdf.numPages; p++) {
      progress.textContent =
        "Scannen: " + file.name + " — pagina " + p + "/" + pdf.numPages;

      var page = await pdf.getPage(p);
      var viewport = page.getViewport({ scale: 0.3 });

      // Draw the page on a small canvas (this is also our thumbnail)
      var canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvasContext: canvas.getContext("2d"),
        viewport: viewport,
      }).promise;

      var isBlank = getPixelVariation(canvas) < BLANK_LIMIT;

      pageEntries.push({
        fileIndex: f,
        fileName: file.name,
        pageNumber: p - 1, // starts at 0
        keep: !isBlank, // blank pages are not kept by default
        canvas: canvas,
      });
    }
  }

  progress.textContent =
    "Klaar. " +
    pageEntries.length +
    " pagina's gescand in " +
    selectedFiles.length +
    " bestand(en).";

  showGrid();
  loadBtn.disabled = false;
});

// ---------- Step 2: showing the pages ----------

function showGrid() {
  grid.innerHTML = "";

  for (var i = 0; i < pageEntries.length; i++) {
    grid.appendChild(makeThumb(pageEntries[i]));
  }

  updateSummary();
}

function makeThumb(entry) {
  var box = document.createElement("div");

  var label = document.createElement("div");
  label.className = "label";

  var source = document.createElement("div");
  source.className = "src";
  source.textContent = entry.fileName + " · p." + (entry.pageNumber + 1);

  box.appendChild(entry.canvas);
  box.appendChild(label);
  box.appendChild(source);

  // Sets the colour and text depending on keep / don't keep
  function refresh() {
    if (entry.keep) {
      box.className = "thumb kept";
      label.textContent = "behouden";
    } else {
      box.className = "thumb blank";
      label.textContent = "uitgesloten";
    }
  }

  refresh();

  // Clicking switches between keep and exclude
  box.addEventListener("click", function () {
    entry.keep = !entry.keep;
    refresh();
    updateSummary();
  });

  return box;
}

function updateSummary() {
  var kept = 0;

  for (var i = 0; i < pageEntries.length; i++) {
    if (pageEntries[i].keep) {
      kept = kept + 1;
    }
  }

  summary.innerHTML =
    "<b>" +
    kept +
    "</b> van de <b>" +
    pageEntries.length +
    "</b> pagina's worden opgenomen in het samengevoegde bestand.";
}

// ---------- Step 3: merging ----------

function getFilename() {
  var name = filenameInput.value.trim();

  // Remove ".pdf" if the user typed it, and characters not allowed in file names
  name = name.replace(/\.pdf$/i, "");
  name = name.replace(/[\\/:*?"<>|]/g, "");

  if (name === "") {
    name = "samengevoegd_opgeschoond";
  }

  return name + ".pdf";
}

mergeBtn.addEventListener("click", async function () {
  mergeStatus.textContent = "Samengevoegde PDF wordt gemaakt...";
  mergeBtn.disabled = true;

  try {
    var newPdf = await PDFLib.PDFDocument.create();

    // Load every source file once
    var sourcePdfs = [];
    for (var i = 0; i < selectedFiles.length; i++) {
      var loaded = await PDFLib.PDFDocument.load(
        selectedFiles[i].bytes.slice(0),
      );
      sourcePdfs.push(loaded);
    }

    // Only the pages we want to keep
    var pagesToKeep = [];
    for (var j = 0; j < pageEntries.length; j++) {
      if (pageEntries[j].keep) {
        pagesToKeep.push(pageEntries[j]);
      }
    }

    // Copy them one by one into the new PDF
    for (var k = 0; k < pagesToKeep.length; k++) {
      var entry = pagesToKeep[k];

      mergeStatus.textContent =
        "Pagina " + (k + 1) + "/" + pagesToKeep.length + " wordt toegevoegd...";

      var copied = await newPdf.copyPages(sourcePdfs[entry.fileIndex], [
        entry.pageNumber,
      ]);
      newPdf.addPage(copied[0]);
    }

    // Save and download
    var pdfBytes = await newPdf.save();
    var blob = new Blob([pdfBytes], { type: "application/pdf" });

    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = getFilename();
    link.click();

    mergeStatus.textContent =
      "Klaar — " +
      getFilename() +
      " gedownload (" +
      pagesToKeep.length +
      " pagina's).";
  } catch (error) {
    mergeStatus.textContent = "Fout: " + error.message;
  }

  mergeBtn.disabled = false;
});
