import * as React from "react"
import { graphql } from 'gatsby'
import { categorizeWords } from '../utils/wordUtils'
import './index.scss'

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

const IndexPage = ({ data }) => {
  const wordsMap = React.useMemo(() => categorizeWords(data.allWordsYaml.nodes.map(n => n.word)), [data.allWordsYaml.nodes]);
  const alphabet = Object.keys(wordsMap).sort();

  return (
    <div className="app-wrapper">
      <div className="content-container">
        <header>
          <h1>
            A List Of<br />
            Extraordinary<br />
            Words
          </h1>
          <div className="byline">
            BY DAN GRAHN<br />
            & COMPANY
          </div>
        </header>

        <main>
          <div className="word-columns">
            {alphabet.map((letter, index) => {
              const isEven = index % 2 === 0;
              const words = wordsMap[letter];
              return (
                <div
                  key={letter}
                  className={`letter-block ${isEven ? 'align-left' : 'align-right'}`}
                >
                  <span className="bg-letter">{letter.toUpperCase()}</span>
                  <ul className={isEven ? 'align-left' : 'align-right'}>
                    {words.map((word) => (
                      <li key={word}>
                        {word}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </main>

        <footer>
          <div>© DAN GRAHN</div>
          <div>{data.site.buildTime}</div>
        </footer>
      </div>
    </div>
  )
}

export function Head() {
  return (
    <>
      <title>A List of Extraordinary Words</title>
      <meta name="theme-color" content="#8B9E88" />
    </>
  )
}

export default IndexPage
