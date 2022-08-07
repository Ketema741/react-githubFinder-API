import React from 'react'
import Proptypes from 'prop-types'
import RepoItem from './RepoItem'

const Repos = ({ repos }) => {
    return repos.map(repo => <RepoItem repo={repo} key={repo.id} />)
}

Repos.proptypes = {
    repos:Proptypes.array.isRequired
}
export default Repos
