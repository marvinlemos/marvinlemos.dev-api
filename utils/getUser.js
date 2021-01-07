const getUser = async(username) => {
    const resUser = await fetch(`https://api.github.com/users/${username}`)
    const user = await resUser.json()

    const resRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
    const originalRepos = await resRepos.json()

    const dontShowRepos = ['marvinlemos/idswsn', 'marvinlemos/kaggle-google-revenue', 'marvinlemos/supervisely']

    const dontShowFilter = repo => dontShowRepos.indexOf(repo.full_name) === -1
    const isNotForkFilter = repo => !repo.fork

    const extractData = repo => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        description: repo.description
    })

    const repos = originalRepos
        .filter(isNotForkFilter)
        .filter(dontShowFilter)
        .map(extractData)
    
    return {
        repos,
        user
    }
}

export default getUser