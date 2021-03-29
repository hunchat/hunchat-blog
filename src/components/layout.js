import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, description, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <header className="global-header">
        <h1 className="main-heading">
          <Link to="/">{title}</Link>
        </h1>
        <h2 className="secondary-heading">
          {description}
        </h2>
        <div className="link-heading">
          <Link to="https://hunchat.com/?utm_source=blog.hunchat&utm_medium=blog&utm_campaign=landing_page">Main website</Link>
          |
          <Link to="https://twitter.com/gethunchat">Twitter</Link>
        </div>
      </header>
    )
  } else {
    let utmCampaign = location.pathname.replaceAll('/', '').replaceAll('-', '_')
    let linkToMainWebsite = `https://hunchat.com/?utm_source=blog.hunchat&utm_medium=blog&utm_campaign=${utmCampaign}`
    header = (
      <header className="global-header">
        <h2 className="main-heading">
          <Link to="/">{title}</Link>
        </h2>
        <h2 className="secondary-heading">
          {description}
        </h2>
        <div className="link-heading">
          <Link to={linkToMainWebsite}>Main website</Link>
          |
          <Link to="https://twitter.com/gethunchat">Twitter</Link>
        </div>
      </header>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      {header}
      <main>{children}</main>
      <footer>
        © Hunchat {new Date().getFullYear()}. Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
