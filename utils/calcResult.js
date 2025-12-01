// calcResult.js
// inputs:
// - answers: [{questionId, optionIndex}...]
// - questions: array of Question docs
// returns: { top: [job...], counts: {...}, percentages: {...} }

function calcResult(answers, questions) {
  const counts = {}; // job -> count
  let total = 0;

  answers.forEach(ans => {
    const q = questions.find(x => x.questionId === ans.questionId);
    if (!q) return;
    const idx = ans.optionIndex;
    if (idx == null || idx < 0 || idx >= q.mapping.length) return;
    const job = q.mapping[idx];
    counts[job] = (counts[job] || 0) + 1;
    total++;
  });

  // if no answers matched, return empty
  if (total === 0) {
    return { top: [], counts: {}, percentages: {} };
  }

  // compute percentages
  const percentages = {};
  for (const j in counts) {
    percentages[j] = +(counts[j] / total * 100).toFixed(1);
  }

  // find max count
  const maxCount = Math.max(...Object.values(counts));
  // top jobs (handle tie)
  const top = Object.entries(counts)
    .filter(([k, v]) => v === maxCount)
    .map(([k]) => k);

  return { top, counts, percentages };
}

module.exports = calcResult;
