const stripHtml = (html) => {
  return html.replace(/<[^>]*>?/gm, '');
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchWordDefinition(word) {
  let retries = 5;
  while (retries > 0) {
    try {
      const response = await fetch(`https://en.wiktionary.org/api/rest_v1/page/definition/${word}`, {
        headers: {
          'User-Agent': 'ExtraordinaryWordsBot/1.0 (https://words.grahn.us; action@github.com) AstroBuild/1.0'
        }
      });
      if (response.status === 429) {
        const waitTime = (6 - retries) * 2000;
        console.warn(`Rate limited for ${word}, retrying in ${waitTime}ms...`);
        await delay(waitTime);
        retries--;
        continue;
      }
      if (!response.ok) {
        console.error(`Failed to fetch definition for ${word}: ${response.status} ${response.statusText}`);
        return null;
      }
      const data = await response.json();

      if (data.en && data.en.length > 0) {
        const firstEntry = data.en[0];
        const partOfSpeech = firstEntry.partOfSpeech.toLowerCase();
        const definition = stripHtml(firstEntry.definitions[0].definition);

        return {
          word,
          partOfSpeech,
          definition
        };
      }
      return null;
    } catch (error) {
      const waitTime = (6 - retries) * 1000;
      console.error(`Error fetching definition for ${word} (retries left: ${retries - 1}):`, error);
      await delay(waitTime);
      retries--;
    }
  }
  return null;
}
