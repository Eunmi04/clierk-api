import Link from 'next/link'
import React from 'react'

interface RepoProps {
  name: string
}

interface Content {
  type: string
  path: string
}

const RepoDirs: React.FC<RepoProps> = async ({ name }) => {
  const username = 'tjwls11'

  await new Promise((resolve) => setTimeout(resolve, 2000))

  const response = await fetch(
    `https://api.github.com/repos/${username}/${name}/contents`
  )
  const contents: Content[] = await response.json()
  const dirs = contents.filter((content: Content) => content.type === 'dir')

  return (
    <div className="mt-2">
      <h3 className="text-xl font-bold">Directories</h3>

      <ul>
        {dirs.map((dir: Content) => (
          <li key={dir.path}>
            <Link
              className="underline"
              href={`https://github.com/${username}/${name}/tree/master/${dir.path}`}
            >
              {dir.path}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RepoDirs
