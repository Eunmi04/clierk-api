import Link from 'next/link'
import React from 'react'
import { FaStar, FaCodeBranch, FaEye } from 'react-icons/fa'

const username = 'bradtraversy'
//const username = 'tjwls11'

export default async function ReposPage() {
  //1. SSG
  //const response = await fetch(`https://api.github.com/users/${username}/repos`) //역따옴표쓴다

  // 2.SSR
  //const response = await fetch(`https://api.github.com/users/${username}/repos`,{cache:'no-store'})

  // 3.ISR
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`,
    { next: { revalidate: 60 } }
  )

  await new Promise((resolve) => setTimeout(resolve, 1000))
  const repos = await response.json()
  //console/log(repos)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Github Repositories of {username}
      </h2>

      <ul>
        {repos.map((repo: any) => (
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
                  <FaEye /> {repo.stargazers_count}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
