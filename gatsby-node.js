const stripHtml = (html) => {
  return html.replace(/<[^>]*>?/gm, '');
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

exports.onCreateNode = async ({ node, actions, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;

  if (node.internal.type === `WordsYaml`) {
    const word = node.word;
    let retries = 5;
    while (retries > 0) {
      try {
        const response = await fetch(`https://en.wiktionary.org/api/rest_v1/page/definition/${word}`);
        if (response.status === 429) {
          const waitTime = (6 - retries) * 2000;
          console.warn(`Rate limited for ${word}, retrying in ${waitTime}ms...`);
          await delay(waitTime);
          retries--;
          continue;
        }
        if (!response.ok) {
          console.error(`Failed to fetch definition for ${word}: ${response.status} ${response.statusText}`);
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
        const waitTime = (6 - retries) * 1000;
        console.error(`Error fetching definition for ${word} (retries left: ${retries - 1}):`, error);
        await delay(waitTime);
        retries--;
      }
    }
  }
};
