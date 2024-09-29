import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

// Define the Sentiment interface
interface Sentiment {
  textID: string;
  text: string;
  selected_text: string;
  sentiment: "positive" | "neutral" | "negative";
}

// Naïve Bayes Classifier Implementation
class NaiveBayes {
  private wordFrequency: Record<string, Record<string, number>> = {};
  private classCount: Record<string, number> = {};
  private vocabulary: Set<string> = new Set();

  public train(data: Sentiment[]) {
    data.forEach(({ text, sentiment }) => {
      const words = this.preprocess(text);
      this.classCount[sentiment] = (this.classCount[sentiment] || 0) + 1;

      words.forEach((word) => {
        this.vocabulary.add(word);
        if (!this.wordFrequency[sentiment]) {
          this.wordFrequency[sentiment] = {};
        }
        this.wordFrequency[sentiment][word] = (this.wordFrequency[sentiment][word] || 0) + 1;
      });
    });
  }

  public predict(input: string): string {
    const words = this.preprocess(input);
    const classScores: Record<string, number> = {};

    Object.keys(this.classCount).forEach((sentiment) => {
      const priorProbability = this.classCount[sentiment] / Object.values(this.classCount).reduce((a, b) => a + b);
      let score = Math.log(priorProbability);

      words.forEach((word) => {
        const wordCount = this.wordFrequency[sentiment]?.[word] || 0;
        const wordProbability = (wordCount + 1) / (Object.values(this.wordFrequency[sentiment] || {}).reduce((a, b) => a + b, 0) + this.vocabulary.size);
        score += Math.log(wordProbability);
      });

      classScores[sentiment] = score;
    });

    return Object.keys(classScores).reduce((a, b) => (classScores[a] > classScores[b] ? a : b));
  }

  // Preprocess text by converting to lowercase, removing punctuation, and splitting into words
  private preprocess(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '') // Remove punctuation
      .split(/\s+/)
      .filter(word => word.length > 0); // Filter out empty strings
  }
}

// File paths
const csvFilePath = path.join(__dirname,'/src/data/review.csv'); 
const jsonFilePath = path.join(__dirname, 'data.json'); // Output JSON file path

const sentiments: Sentiment[] = [];

// Parse CSV and convert to JSON
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {


    const sentiment: Sentiment = {
      textID: row.textID,
      text: row.text,
      selected_text: row.selected_text,
      sentiment: row.sentiment as "positive" | "neutral" | "negative",
    };
    sentiments.push(sentiment);
  })
  .on('end', () => {
    fs.writeFileSync(jsonFilePath, JSON.stringify(sentiments, null, 2));
    console.log('CSV file successfully converted to JSON.');

    // Train Naive Bayes model
    const classifier = new NaiveBayes();
    classifier.train(sentiments);
    console.log('Model training completed.');

    // Example prediction
    // const testText = "this book is awesome i usually ready it..";
    // const testText ="Not worth it";
    // const testText="This book is not worth it";
    const testText = "its fine to me "
    const predictedSentiment = classifier.predict(testText);
    console.log(`The sentiment of "${testText}" is predicted as: ${predictedSentiment}`);
  });
