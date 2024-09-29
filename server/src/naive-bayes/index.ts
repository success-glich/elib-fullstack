interface TrainingData {
    text: string;
    sentiment: "positive" | "neutral" | "negative";
  }
  
  interface WordFrequency {
    [word: string]: number;
  }
  
  interface ClassData {
    totalDocuments: number;
    wordFrequency: WordFrequency;
    totalWords: number;
  }
  
  class NaiveBayes {
    private classData: { [key in "positive" | "neutral" | "negative"]: ClassData };
    private vocabulary: Set<string>;
    private totalDocuments: number;
  
    constructor() {
      this.classData = {
        positive: { totalDocuments: 0, wordFrequency: {}, totalWords: 0 },
        neutral: { totalDocuments: 0, wordFrequency: {}, totalWords: 0 },
        negative: { totalDocuments: 0, wordFrequency: {}, totalWords: 0 },
      };
      this.vocabulary = new Set<string>();
      this.totalDocuments = 0;
    }
  
    private tokenize(text: string): string[] {
      return text.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/);
    }
  
    public train(trainingData: TrainingData[]) {
      trainingData.forEach(({ text, sentiment }) => {
        const tokens = this.tokenize(text);
        this.classData[sentiment].totalDocuments++;
        this.totalDocuments++;
  
        tokens.forEach((token) => {
          this.vocabulary.add(token);
          this.classData[sentiment].wordFrequency[token] =
            (this.classData[sentiment].wordFrequency[token] || 0) + 1;
          this.classData[sentiment].totalWords++;
        });
      });
    }
  
    private calculateClassProbability(sentiment: "positive" | "neutral" | "negative"): number {
      return this.classData[sentiment].totalDocuments / this.totalDocuments;
    }
  
    private calculateWordProbability(
      word: string,
      sentiment: "positive" | "neutral" | "negative"
    ): number {
      const wordFrequency = this.classData[sentiment].wordFrequency[word] || 0;
      return (wordFrequency + 1) / (this.classData[sentiment].totalWords + this.vocabulary.size);
    }
  
    public predict(text: string): "positive" | "neutral" | "negative" {
      const tokens = this.tokenize(text);
      const classProbabilities = {
        positive: Math.log(this.calculateClassProbability("positive")),
        neutral: Math.log(this.calculateClassProbability("neutral")),
        negative: Math.log(this.calculateClassProbability("negative")),
      };
  
      tokens.forEach((token) => {
        classProbabilities.positive += Math.log(this.calculateWordProbability(token, "positive"));
        classProbabilities.neutral += Math.log(this.calculateWordProbability(token, "neutral"));
        classProbabilities.negative += Math.log(this.calculateWordProbability(token, "negative"));
      });
  
      // Find the class with the highest probability
      return Object.keys(classProbabilities).reduce((a, b) =>
        classProbabilities[a as "positive" | "neutral" | "negative"] >
        classProbabilities[b as "positive" | "neutral" | "negative"]
          ? a
          : b
      ) as "positive" | "neutral" | "negative";
    }
  }
  
  export default NaiveBayes;
  