module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
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
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-133277904-1'
      }
    }
  ],
  pathPrefix: '/list-of-words',
};