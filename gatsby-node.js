const stripHtml = (html) => {
  return html.replace(/<[^>]*>?/gm, '');
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

exports.onCreateNode = async ({ node, actions, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;

  if (node.internal.type === `WordsYaml`) {
    const word = node.word;
    let retries = 3;
    while (retries > 0) {
      try {
        const response = await fetch(`https://en.wiktionary.org/api/rest_v1/page/definition/${word}`);
        if (response.status === 429) {
          console.warn(`Rate limited for ${word}, retrying...`);
          await delay(2000);
          retries--;
          continue;
        }
        if (!response.ok) {
          console.error(`Failed to fetch definition for ${word}: ${response.statusText}`);
          return;
        }
        const data = await response.json();

        if (data.en && data.en.length > 0) {
          const firstEntry = data.en[0];
          const partOfSpeech = firstEntry.partOfSpeech.toLowerCase();
          const definition = stripHtml(firstEntry.definitions[0].definition);

          const definitionNode = {
            word,
            partOfSpeech,
            definition,
            id: createNodeId(`${node.id} >>> WordDefinition`),
            parent: node.id,
            children: [],
            internal: {
              type: `WordDefinition`,
              contentDigest: createContentDigest({ word, partOfSpeech, definition }),
            },
          };

          createNode(definitionNode);
          createParentChildLink({ parent: node, child: definitionNode });
        }
        break; // Success or no data
      } catch (error) {
        console.error(`Error fetching definition for ${word}:`, error);
        await delay(1000);
        retries--;
      }
    }
  }
};
