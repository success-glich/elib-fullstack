// import fs from 'fs';
// import path from 'path';
// import { NaiveBayes } from './index';

// interface ReviewData {
//   textID: string;
//   text: string;
//   selected_text: string;
//   sentiment: string;
// }

// export function parseCSV(filePath: string): ReviewData[] {
//   const absolutePath = path.resolve( filePath);
//   const data = fs.readFileSync(absolutePath, 'utf8');
//   const rows = data.trim().split('\n').slice(1);

//   return rows.map((row) => {
//     const [textID, text, selected_text, sentiment] = row.split(',').map((item) => item.trim().replace(/^"|"$/g, ''));
//     return { textID, text, selected_text, sentiment };
//   });
// }

// export function trainClassifier(filePath: string): NaiveBayes {
//   const classifier = new NaiveBayes();
//   const trainingData = parseCSV(filePath);

//   trainingData.forEach(({ selected_text, sentiment }) => {
//     classifier.train(selected_text, sentiment);
//   });

//   return classifier;
// }
