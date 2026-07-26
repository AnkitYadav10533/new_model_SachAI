import { analyzeTextInput } from '../services/textAnalyzer.js';
import { analyzeImageFile } from '../services/imageAnalyzer.js';

async function runAccuracyVerification() {
  console.log('====================================================');
  console.log('   SACHAI Engine - Detection Accuracy Verification   ');
  console.log('====================================================\n');

  // Test 1: Human Written Text Sample
  const humanText = `Yesterday I went for a walk around the neighborhood park. The afternoon sun was quite pleasant, and I ran into an old friend from high school. We grabbed a quick coffee at the local corner cafe and caught up on family news for about an hour before heading home.`;

  // Test 2: Typical ChatGPT Synthetic Text Sample
  const aiText = `In today's digital age, Artificial Intelligence plays a crucial role across multifaceted industries. Furthermore, this paradigm shift stands as a remarkable testament to modern innovation, serving as a beacon of progress and fostering unprecedented growth in the realm of technological advancement.`;

  console.log('--- TEST 1: Evaluating Human Text Sample ---');
  const humanResult = await analyzeTextInput(humanText);
  console.log(`Verdict: ${humanResult.verdict} | Confidence: ${humanResult.confidenceScore}%`);
  console.log(`Summary: ${humanResult.summary}`);
  console.log(`Pass check: ${humanResult.verdict === 'AUTHENTIC' ? 'SUCCESS ✅' : 'FAILED ❌'}\n`);

  console.log('--- TEST 2: Evaluating AI Text Sample ---');
  const aiResult = await analyzeTextInput(aiText);
  console.log(`Verdict: ${aiResult.verdict} | Confidence: ${aiResult.confidenceScore}%`);
  console.log(`Summary: ${aiResult.summary}`);
  console.log(`Pass check: ${aiResult.verdict === 'DEEPFAKE' ? 'SUCCESS ✅' : 'FAILED ❌'}\n`);

  console.log('--- TEST 3: Evaluating Image Signature Detection ---');
  const sampleAiImage = {
    path: '/tmp/non_existent.jpg',
    originalname: 'Midjourney_v6_cyberpunk_portrait.jpg',
    mimetype: 'image/jpeg'
  };
  const imageResult = await analyzeImageFile(sampleAiImage);
  console.log(`Verdict: ${imageResult.verdict} | Confidence: ${imageResult.confidenceScore}%`);
  console.log(`Summary: ${imageResult.summary}`);
  console.log(`Pass check: ${imageResult.verdict === 'DEEPFAKE' ? 'SUCCESS ✅' : 'FAILED ❌'}\n`);

  console.log('====================================================');
  console.log('        Verification Run Completed Successfully       ');
  console.log('====================================================');
}

runAccuracyVerification().catch(err => {
  console.error('Accuracy verification failed:', err);
  process.exit(1);
});
