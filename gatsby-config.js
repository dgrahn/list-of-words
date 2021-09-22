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
    }
  ],
  pathPrefix: '/list-of-words',
};
