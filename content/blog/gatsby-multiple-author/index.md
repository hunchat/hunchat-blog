---
title: Gatsby blog with multiple authors
author: ernesto
date: "2021-03-07T21:00:00.000Z"
description: "Adding `gatsby-starter-blog` support for multiple authors."
---

We've been talking about starting a blog for Hunchat for a while. The first solution that came to mind was to start a [Medium](https://medium.com) publication, but we wanted to host it at (https://blog.hunchat.com) and Medium only supports custom domain for member, costing 5$ a month. Since we are just starting we don't want to accumulate unnecessary costs, so we kept looking for a free alternative. I immediately thought of [Gatsby](https://www.gatsbyjs.com) and fortunately they [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog), which is a great blog starter.

Now, `gatsby-starter-blog` comes with support for a single author, and since we want a blog for the whole company we need to add support for multiple authors. In this blog I'll explain how I did this. I'll be following [How to support multiple authors in Gatsby.js](https://nosleepjavascript.com/gatsby-multi-author/), with minor differences.

Start by using the Gatsby CLI to create a new site, specifying the blog starter.
```shell
# create a new Gatsby site using the blog starter
gatsby new my-blog-starter https://github.com/gatsbyjs/gatsby-starter-blog
```

Navigate into your new site’s directory and start it up.
```shell
cd my-blog-starter/
gatsby develop
```

Your site is now running at `http://localhost:8000`!

This starter comes with 3 example blogs, located at `content/blog`. Let's add an author to the Hello World blog. We will specify an author id
```content/blog/hello-world/index.md
---
title: Hello World
author: ernesto
date: "2015-05-01T22:12:03.284Z"
description: "Hello World"
---
```
Now we have to setup Gatsby so that frontmatter is able to use this author entry and create a relation to an `author` node with id `ernesto`. We'll accomplish this by doing:
- use the filesystem as a valid source of data. In this case we used `src/data` but it can be anything you like.
- use the filesystem as a valid source of assets. We'll use `content/assets` to store author images.
- use a yaml transformer because we will store our authors data inside a yaml.
- map frontmatter’s author attribute to `src/data/author.yaml`.
```gatsby-config.js
---
module.exports = {
  plugins: [
    ...
    // 1. use src/data as a data source
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data`,
        name: `data`,
      },
    },
    // 2. use content/assets as an assets source
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    // 3. enable yaml support
    `gatsby-transformer-yaml`,
  ],
  mapping: {
    // 4. map author to author.yaml
    "MarkdownRemark.frontmatter.author": `AuthorYaml`,
  },
};
---
```
You will need to install `gatsby-transformer-yaml`.
```shell
npm install gatsby-transformer-yaml
```

This starter comes with support for a single author. We won't be using it so let's remove it from the `siteMetadata`. We'll have to edit the configs and schema.
```gatsby-config.js
...
siteMetadata: {
  title: `Hunchat Blog`,
  description: `News, stories and updates on Hunchat.`,
  siteUrl: `https://blog.hunchat.com/`,
},
...
```
```gatsby-node.js
...
createTypes(`
  type SiteSiteMetadata {
    siteUrl: String
  }

  type MarkdownRemark implements Node {
    frontmatter: Frontmatter
    fields: Fields
  }

  type Frontmatter {
    title: String
    description: String
    date: Date @dateformat
  }

  type Fields {
    slug: String
  }
`)
...
```
We also removed social, but you can keep it if you want.

Next create the author data. Create a `src/data/author.yaml` file and add you author entries
```src/data/author.yaml
- id: ernesto
  name: Ernesto González
  bio: Cofounder
  image: ../../content/assets/ernesto-image.jpg
```
and don't forget to create the add the image file at `content/assets/ernesto-image.jpg`.

Now all we have to edit is the `pageQuery` and send the `author` as a props to `Bio`.
```src/templates/blog-post.js
import * as React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
          <Bio author={post.frontmatter.author}/>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        author {
          name
          bio
          image {
            childImageSharp {
              gatsbyImageData(width: 70)
            }
          }
        }
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
```
```src/components/bio.js
import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Bio = ({ author = {} }) => {
  const { name, bio } = author
  const image = getImage(author.image)

  return (
    <div className="bio">
      <GatsbyImage
        className="bio-avatar"
        style={{
          width: 50,
          height: 50,
        }}
        image={image}
        quality={95}
        alt="Author image."
        backgroundColor={true}
      />
      {name && (
        <p>
          <strong>{name}</strong>, {bio}
        </p>
      )}
    </div>
  )
}

export default Bio
```
