// Extended mock AI with A/B and evaluation helpers (same behavior as other repos)
function mockResponse(prompt, friendly, variant) {
  const base = friendly
    ? `Hey team — quick update: we're on track with the current sprint; blockers have been identified and assigned. I'll share a brief remediation plan by EOD.`
    : `Status update: current sprint progressing. Blockers identified and assigned. A remediation plan will be circulated by end of day.`;

  if (variant === 'A') return `Tone: ${friendly ? 'Friendly' : 'Professional'}\n----\nPrompt preview: ${prompt}\n\nMock AI Response:\n${base}`;
  if (variant === 'B') return `Tone: ${friendly ? 'Friendly' : 'Professional'}\n----\nPrompt preview: ${prompt}\n\nMock AI Response:\n${friendly ? `Quick update: on track. Blockers assigned; remediation plan by EOD.` : `Update: on track. Blockers assigned; remediation plan by EOD.`}`;
}

function evaluateOutputs(a, b) {
  const score = (s) => {
    const len = s.length;
    const hasQuestion = /\?/g.test(s) ? 1 : 0;
    return Math.max(0, 100 - Math.min(80, len)) + hasQuestion * 10;
  };
  const aScore = score(a);
  const bScore = score(b);
  return {aScore, bScore, winner: aScore >= bScore ? 'A' : 'B'};
}

document.getElementById('runA').addEventListener('click', () => {
  const prompt = document.getElementById('prompt').value.trim();
  const friendly = document.getElementById('styleFriendly').checked;
  const out = document.getElementById('aiOutputA');
  if (!prompt) { out.textContent = 'Please type a prompt.'; return; }
  out.textContent = mockResponse(prompt, friendly, 'A');
});

document.getElementById('runB').addEventListener('click', () => {
  const prompt = document.getElementById('prompt').value.trim();
  const friendly = document.getElementById('styleFriendly').checked;
  const out = document.getElementById('aiOutputB');
  if (!prompt) { out.textContent = 'Please type a prompt.'; return; }
  out.textContent = mockResponse(prompt, friendly, 'B');
});

document.getElementById('compare').addEventListener('click', () => {
  const a = document.getElementById('aiOutputA').textContent || '';
  const b = document.getElementById('aiOutputB').textContent || '';
  const evalOut = document.getElementById('evalOutput');
  if (!a || !b) { evalOut.textContent = 'Run both A and B before comparing.'; return; }
  const res = evaluateOutputs(a, b);
  evalOut.textContent = `A score: ${res.aScore}\nB score: ${res.bScore}\nWinner: ${res.winner}`;
});
