module.exports = {
  siteMetadata: {
    siteUrl: "https://words.grahn.us",
    title: "A List of Extraordinary Words",
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'words',
        path: `${__dirname}/content/`
      }
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [
          'UA-133277904-1'
        ]
      }
    }
  ],
  pathPrefix: process.env.PATH_PREFIX || '',
};