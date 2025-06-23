const textarea = document.getElementById('notepad');
const status = document.getElementById('status');
const fileNameInput = document.getElementById('fileName');

// Load saved data on startup
window.onload = () => {
  const savedNote = localStorage.getItem('notepad_note');
  const savedFileName = localStorage.getItem('notepad_filename');

  if (savedNote !== null) textarea.value = savedNote;
  if (savedFileName !== null) fileNameInput.value = savedFileName;
};

// Auto-save on typing
textarea.addEventListener('input', () => {
  localStorage.setItem('notepad_note', textarea.value);
});

fileNameInput.addEventListener('input', () => {
  localStorage.setItem('notepad_filename', fileNameInput.value);
});

// Manual Save button
function saveNote() {
  localStorage.setItem('notepad_note', textarea.value);
  localStorage.setItem('notepad_filename', fileNameInput.value);

  status.innerText = '✅ Note and filename saved to LocalStorage!';
  setTimeout(() => status.innerText = '', 2000);
}

// Clear all
function clearNote() {
  if (confirm('Are you sure you want to clear the note?')) {
    textarea.value = '';
    fileNameInput.value = '';
    localStorage.removeItem('notepad_note');
    localStorage.removeItem('notepad_filename');
    status.innerText = '🗑 Note cleared and removed from LocalStorage.';
    setTimeout(() => status.innerText = '', 2000);
  }
}

// Download .txt file
function downloadNote() {
  const content = textarea.value;
  const filename = fileNameInput.value.trim() || 'MyNote';

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename + '.txt';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);

  status.innerText = `⬇️ Downloaded as "${filename}.txt"`;
  setTimeout(() => status.innerText = '', 2000);
}
