import * as React from "react"
import { graphql } from 'gatsby'
import divider from '../images/divider.svg'
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

const IndexPage = ({data}) => {

  const wordsMap = React.useMemo(() => {
    return data.allWordsYaml.nodes.reduce((acc, node) => {
      const word = node.word
      const letter = word[0]

      if (acc[letter]) {
        acc[letter].push(word)
      } else {
        acc[letter] = [word]
      }

      return acc
    }, {})
  }, [data.allWordsYaml.nodes])

  return (
    <main>
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

export function Head() {
  return (
    <>
      <title>A List of Extraordinary Words</title>
      <meta name="theme-color" content="#5c1f5d" />
    </>
  )
}

export default IndexPage
