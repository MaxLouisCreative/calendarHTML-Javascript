$(".dark-mode-button").on("click", function(e) {
  toggleDarkMode();
});

const darkModeStorageKey = 'darkModeEnabled';

function toggleDarkMode() {
  setDarkModeEnabled(!isDarkModeEnabled());
  updateDarkModeVisuals();
}

function updateDarkModeVisuals() {
  const enabled = isDarkModeEnabled();
  if (enabled) {
    $("body").addClass("dark-mode");
  } else {
    $("body").removeClass("dark-mode");
  }
  $("#dark-mode-toggle").prop('checked', enabled);
}

function setDarkModeEnabled(isEnabled) {
  localStorage.setItem(darkModeStorageKey, isEnabled ? "1" : "0");
}

function isDarkModeEnabled() {
  if (localStorage.getItem(darkModeStorageKey) === undefined)
    setDarkModeEnabled(false);
  return localStorage.getItem(darkModeStorageKey) === "1";
}
