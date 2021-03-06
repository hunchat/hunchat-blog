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
