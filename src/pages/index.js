import * as React from "react"
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import divider from '../images/divider.svg'
import './index.scss'

export const query = graphql`
  query Words {
    allWordsYaml {
      nodes {
        word
      }
    }
  }
`

function categorizeWords(words) {
  const wordsMap = {}
  words.forEach(word => {
    const letter = word[0]

    if (wordsMap[letter]) {
      wordsMap[letter].push(word)
    } else {
      wordsMap[letter] = [ word ]
    }
  })

  return wordsMap;
}

const IndexPage = ({data}) => {

  const words = data.allWordsYaml.nodes.map(w => w.word)
  const wordsMap = categorizeWords(words)

  return (
    <main>
      <Helmet>
        {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/components/site.min.css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/components/grid.min.css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/components/header.min.css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/components/container.min.css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/components/divider.min.css"/> */}
      </Helmet>

      <section>
        <header>
          <h1>
            A List of
            <span className="extra">Extraordinary</span>
            <span className="words">Words</span>
            <span className="header">by Dan Grahn &amp; Co.</span>
          </h1>

          <img src={divider} alt=""/>
        </header>

        {Object.entries(wordsMap).map(([letter, words]) => (
          <>
            <div className="divider">{letter.toUpperCase()}</div>
            <ul className="grid">
              {words.map(word => (
                <li key={word}>
                  <a href={`http://en.wiktionary.org/wiki/${word}`}>{word}</a>
                </li>
              ))}
            </ul>
          </>
        ))}

        <footer>
          &copy; Dan Grahn
        </footer>
      </section>
    </main>
  )
}

export default IndexPage
