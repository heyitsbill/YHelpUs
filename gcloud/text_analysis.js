// YHack 2022 - YHelpUs
// Last edited: 4/9/2022
// Most code stolen from GCP tutorial

// Imports the Google Cloud client library
const language = require('@google-cloud/language');

/* takes in text from a post and determines if it should be flagged
   for inappropriate content using GCP NLP */
async function sentimenter(text) {
   // Instantiates a client
   const client = new language.LanguageServiceClient();
 
   const document = {
     content: text,
     type: 'PLAIN_TEXT',
   };
 
   // Detects the sentiment of the text
   const [result] = await client.analyzeSentiment({document: document});
   const sentiment = result.documentSentiment;
   const sentences = result.sentences;
   return [sentiment, sentences];
}

/* takes in text from a post and determines if it should be flagged
   for inappropriate content using GCP NLP
   TRUE output means it's possibly inappropriate */
async function flagger(text) {
   let [sentiment, sentences] = await sentimenter(text);
   if (sentiment < -0.6) {
      console.log('true');
      return true;
   }
   for (var i = 0; i < sentences.length; i++) {
      if (sentences[i].sentiment.score < -0.6) {
         console.log('true');
         return true
      }
   }
   console.log('false');
   return false
}

async function classifier(text) {
   // Creates a client
   const client = new language.LanguageServiceClient();

   // Prepares a document, representing the provided text
   const document = {
      content: text,
      type: 'PLAIN_TEXT',
   };

   // Classifies text in the document
   const [classification] = await client.classifyText({document});
   console.log('Categories:');
   classification.categories.forEach(category => {
   console.log(`Name: ${category.name}, Confidence: ${category.confidence}`);
   });
};

function test(sentence) {
   const f = (async () => await flagger(sentence))();
   console.log(`Sentence: ${sentence}`);
   console.log(`  flag: ${f}`);
}

// tests that increasing flaggable
const array = ['Hey this might be a kinda odd request but does anyone wanna help me move luggage? It would be from TD to Saybrook because I\'m moving into the septet there :(?', 'boooobies. lick my balls! bitch ass; ur kinda a shitter! duh duh duh. hello! is this twenty words yet fuck you ur ass im better than u yeah haha suck it loser!!!!!', 'boobies', 'I HATE PEOPLE', 'i hate everyone', 'suck my balls?', 'suck my balls bitchass'];
// array.forEach(flagger);
array.forEach(test);
// array.forEach(classifier);
