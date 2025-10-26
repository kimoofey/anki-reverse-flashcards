const dialog = document.getElementById<HTMLDialogElement>("settingsDialog");
const settingsButton = document.getElementById("settingsBtn");
const closeDialogButton = document.getElementById("closeDialogBtn");
const saveSettingsButton = document.getElementById("saveSettingsBtn");

if (dialog && settingsButton) {
  settingsButton.addEventListener("click", () => {
    dialog.showModal();
  });
}

if (dialog && closeDialogButton) {
  closeDialogButton.addEventListener("click", () => {
    dialog.close();
  });
}
