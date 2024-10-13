// services/sentimentService.ts
import { AutoTokenizer, AutoModelForSequenceClassification } from 'transformers';
import * as torch from 'torch';

export const SentimentAnalyzer = (data: any) => {
    const tokenizer = AutoTokenizer.from_pretrained("ProsusAI/finbert");
    const model = AutoModelForSequenceClassification.from_pretrained("ProsusAI/finbert");

    // Example sentiment analysis logic
    const tokens = tokenizer(data.news, { return_tensors: 'pt' });
    const result = model(tokens.input_ids);
    const scores = torch.softmax(result.logits, -1);
    const sentimentIndex = scores.argmax(-1).item();
    
    const sentiment = sentimentIndex === 0 ? 'Positive' : sentimentIndex === 1 ? 'Negative' : 'Neutral';
    return sentiment;
};
