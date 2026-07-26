// ===============================
// File Input
// ===============================

const fileInput = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");
const form = document.querySelector("form");
const uploadButton = document.querySelector("button");
const dropArea = document.querySelector(".drop-area");

// ===============================
// File Name Show
// ===============================

fileInput.addEventListener("change", function () {

    if (this.files.length > 0) {

        const file = this.files[0];

        document.querySelector(".upload-content").innerHTML = `
            <i class="bi bi-file-earmark-spreadsheet-fill"
               style="font-size:70px;color:#22c55e;"></i>

            <h3 style="font-size:18px;margin-top:15px;word-break:break-word;">
                ${file.name}
            </h3>
        `;

    }

});

// ===============================
// Drag Events
// ===============================

["dragenter", "dragover"].forEach(eventName => {

    dropArea.addEventListener(eventName, (e) => {

        e.preventDefault();

        dropArea.style.borderColor = "#38bdf8";
        dropArea.style.background = "rgba(56,189,248,.12)";

    });

});

["dragleave", "drop"].forEach(eventName => {

    dropArea.addEventListener(eventName, (e) => {

        e.preventDefault();

        dropArea.style.borderColor = "rgba(255,255,255,.25)";
        dropArea.style.background = "rgba(255,255,255,.04)";

    });

});

// ===============================
// Drop File
// ===============================

dropArea.addEventListener("drop", (e) => {

    e.preventDefault();

    const files = e.dataTransfer.files;

    if(files.length>0){

        fileInput.files = files;

        document.querySelector(".upload-content").innerHTML = `
            <i class="bi bi-file-earmark-spreadsheet-fill"
               style="font-size:70px;color:#22c55e;"></i>

            <h3 style="font-size:18px;margin-top:15px;word-break:break-word;">
                ${files[0].name}
            </h3>
        `;
    }

});

// ===============================
// CSV Validation
// ===============================

form.addEventListener("submit", function (e) {

    if (fileInput.files.length === 0) {

        e.preventDefault();

        alert("Please select a CSV file.");

        return;
    }

    const file = fileInput.files[0];

    if (!file.name.toLowerCase().endsWith(".csv")) {
        

        e.preventDefault();

        alert("Only CSV files are allowed.");

        return;
    }

    uploadButton.innerHTML = `
    <i class="bi bi-arrow-repeat"></i>
    Predicting...`;

    uploadButton.disabled = true;

    document.getElementById("loadingText").style.display = "block";

});
