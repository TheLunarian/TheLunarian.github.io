document.getElementById('haikuForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const theme = document.getElementById('theme').value;
  const voice = document.getElementById('voice').value;
  const weird = document.getElementById('weirdToggle').checked;

  // For now, simulate GPT output
  const haiku = generateFakeHaiku(theme, voice, weird);

  document.getElementById('haikuOutput').innerText = haiku;
  document.getElementById('haikuVoice').innerText = `— in the voice of ${voice}`;
  document.getElementById('result').classList.remove('hidden');
  document.getElementById('haikuForm').classList.add('hidden');
});

function resetForm() {
  document.getElementById('result').classList.add('hidden');
  document.getElementById('haikuForm').classList.remove('hidden');
  document.getElementById('theme').value = '';
  document.getElementById('voice').value = '';
  document.getElementById('weirdToggle').checked = false;
}

function generateFakeHaiku(theme, voice, weird) {
  if (weird) {
    return `Clouds eat the teacup\nGhost of Elvis sings to trees\nBananas whisper`;
  } else {
    return `Soft rain on the roof\nA quiet voice in the dark\nPeace finds the lost heart`;
  }
}
