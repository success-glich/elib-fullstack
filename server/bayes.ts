import { SentimentAnalyzer, PorterStemmer, WordTokenizer } from 'natural';
import { removeStopwords } from "stopword";

export function getSentiment(text: string) {

    /** 
     * Removing non alphabetical and special characters
     * Converting to lowercase
     */
    const alphaOnlyReview = text.replace(/[^a-zA-Z\s]+/g, '');

    /**
     * Tokenization
     */
    const tokenizer = new WordTokenizer();
    const tokenizedText= tokenizer.tokenize(alphaOnlyReview);

    /** Remove stop words */
    const filteredText = removeStopwords(tokenizedText);

    const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
    return analyzer.getSentiment(filteredText);
}

// const sentimentScore = getSentiment("this is okay");




export function analyzeSentiment(score:number) {
    // scoreEl.innerText = score.toFixed(2);
    let sentiment;


    if (score > 0.5) {
        sentiment = 'Very positive';
          } 
    else if (score > 0) {
      
        sentiment = 'Positive';
        } 
    else if (score < -0.5) {
        sentiment = 'Very negative';
        // cardEl.classList.remove('positive');
        // cardEl.classList.remove('neutral');
        // cardEl.classList.remove('negative');
        // cardEl.classList.remove('very-positive');
        // cardEl.classList.contains('very-negative') ? '' : cardEl.classList.add('very-negative');
        // displayVeryNegativeEmote();
    } 
    else if (score < 0) {
        sentiment = 'Negative';
    //     cardEl.classList.remove('positive');
    //     cardEl.classList.remove('neutral');
    //     cardEl.classList.remove('very-positive');
    //     cardEl.classList.remove('very-negative');
    //     cardEl.classList.contains('negative') ? '' : cardEl.classList.add('negative');
    //     displayNegativeEmote();
    } 
    else {
        sentiment = 'Neutral';
        // cardEl.classList.remove('positive');
        // cardEl.classList.remove('very-positive');
        // cardEl.classList.remove('negative');
        // cardEl.classList.remove('very-negative');
        // cardEl.classList.contains('neutral') ? '' : cardEl.classList.add('neutral');
        // displayNeutralEmote();
    }

    return sentiment;
}