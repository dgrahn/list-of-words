import * as React from "react"
import { graphql } from 'gatsby'
import './index.scss'

export const query = graphql`
  query Words {
    allWordDefinition {
      nodes {
        word
        partOfSpeech
        definition
      }
    }
    site {
      buildTime
    }
  }
`

const IndexPage = ({ data }) => {
  const dictionaryContainerRef = React.useRef(null);

  const wordsMap = React.useMemo(() => {
    const map = {};
    data.allWordDefinition.nodes.forEach(node => {
      const firstLetter = node.word[0].toUpperCase();
      if (!map[firstLetter]) {
        map[firstLetter] = [];
      }
      map[firstLetter].push(node);
    });
    return Object.keys(map).sort().reduce((acc, key) => {
      acc[key] = map[key];
      return acc;
    }, {});
  }, [data.allWordDefinition.nodes]);

  React.useEffect(() => {
    const fadeElements = dictionaryContainerRef.current?.querySelectorAll('li, h2');
    if (!fadeElements) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      fadeElements.forEach(el => el.style.opacity = '1');
      return;
    }

    let ticking = false;

    const updateOpacities = () => {
      const center = window.innerHeight / 2;
      fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + (rect.height / 2);
        const distFromCenter = Math.abs(elementCenter - center);
        el.style.opacity = Math.max(0.05, 1 - (distFromCenter / center));
      });
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateOpacities();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', updateOpacities);
    updateOpacities();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateOpacities);
    };
  }, [wordsMap]);

  return (
    <>
      <header>
        <div className="header-content">
          <h1>
            <span className="title-small">A list of</span>
            <span className="title-large">Extraordinary</span>
            <span className="title-medium">Words</span>
          </h1>
          <p>By Dan Grahn &amp; Company</p>
        </div>
        <div className="scroll-arrow" aria-hidden="true"></div>
      </header>

      <main id="dictionary-container" ref={dictionaryContainerRef}>
        {Object.entries(wordsMap).map(([letter, words]) => (
          <section key={letter}>
            <h2>{letter}</h2>
            <ul>
              {words.map(({ word, partOfSpeech, definition }) => (
                <li key={word}>
                  <div className="word-header">
                    <span className="word-title">{word}</span>
                    <span className="word-pos">{partOfSpeech}</span>
                  </div>
                  <div className="word-definition">{definition}</div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>

      <footer>
        <p>&copy; Dan Grahn</p>
        <time dateTime={data.site.buildTime}>{data.site.buildTime}</time>
      </footer>
    </>
  )
}

export function Head() {
  return (
    <>
      <title>A List of Extraordinary Words</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  )
}

export default IndexPage
