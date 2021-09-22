import * as React from "react"
import { graphql } from 'gatsby'
import divider from '../images/divider.svg'
import './index.scss'
import { Helmet } from "react-helmet"

export const query = graphql`
  query Words {
    allWordsYaml {
      nodes {
        word
      }
    }
    site {
      buildTime
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
        <meta name="theme-color" content="#5c1f5d" />
      </Helmet>
      <title>A List of Extraordinary Words</title>
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
          <React.Fragment key={letter}>
            <div className="divider">{letter.toUpperCase()}</div>
            <ul className="grid">
              {words.map(word => (
                <li key={word}>
                  <a href={`http://en.wiktionary.org/wiki/${word}`}>{word}</a>
                </li>
              ))}
            </ul>
          </React.Fragment>
        ))}

        <footer>
          &copy; Dan Grahn | {data.site.buildTime}
        </footer>
      </section>
    </main>
  )
}

export default IndexPage
