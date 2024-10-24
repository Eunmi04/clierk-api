import Link from 'next/link'
import React from 'react'
import { FaStar, FaCodeBranch, FaEye } from 'react-icons/fa'

//const username = 'bradtraversy'
const username = 'tjwls11'

interface Repo {
  id: number
  name: string
  description: string | null
  stargazers_count: number
  forks_count: number
  watchers_count: number
}

export default async function ReposPage() {
  // 3.ISR
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`,
    { next: { revalidate: 60 } }
  )

  await new Promise((resolve) => setTimeout(resolve, 1000))
  const repos: Repo[] = await response.json()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Github Repositories of {username}
      </h2>

      <ul>
        {repos.map((repo: Repo) => (
          <li key={repo.id} className="bg-gray-100 m-4 p-4 rounded-md">
            <Link href={`/repos/${repo.name}`}>
              <h3 className="text-xl font-bold"> {repo.name}</h3>
              <p>{repo.description}</p>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <FaStar /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <FaCodeBranch /> {repo.forks_count}
                </span>
                <span className="flex items-center gap-1">
                  <FaEye /> {repo.watchers_count}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
