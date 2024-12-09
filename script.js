//your JS code here. If required.
// Function to get a cookie by name
function getCookie(name) {
  let cookieArr = document.cookie.split(';');
  for (let i = 0; i < cookieArr.length; i++) {
    let cookie = cookieArr[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

// Function to set a cookie
function setCookie(name, value, days) {
  let d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); // Expiry in days
  let expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Apply saved preferences from cookies
function applyPreferences() {
  let savedFontSize = getCookie('fontsize');
  let savedFontColor = getCookie('fontcolor');

  if (savedFontSize) {
    document.documentElement.style.setProperty('--fontsize', savedFontSize + 'px');
    document.getElementById('fontsize').value = savedFontSize;
  }

  if (savedFontColor) {
    document.documentElement.style.setProperty('--fontcolor', savedFontColor);
    document.getElementById('fontcolor').value = savedFontColor;
  }
}

// Event listener for form submission
document.getElementById('preferences-form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Get the values from the form inputs
  let fontSize = document.getElementById('fontsize').value;
  let fontColor = document.getElementById('fontcolor').value;

  // Save them in cookies
  setCookie('fontsize', fontSize, 365); // Save for 1 year
  setCookie('fontcolor', fontColor, 365);

  // Apply the preferences
  applyPreferences();
});

// Apply preferences when the page loads
window.onload = applyPreferences;
