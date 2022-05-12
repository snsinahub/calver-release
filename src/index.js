const _ = require('lodash')
const github = require('@actions/github');
const core = require('@actions/core');



async function run() {
    const myToken = core.getInput('token');
    const repoFull = core.getInput('repo').split('/');
    const tag = core.getInput('tag');
    const allowedUsers = core.getInput('allowed_users');
    const repo = repoFull[1]
    const owner = repoFull[0]


    
    const octokit = github.getOctokit(myToken)
    console.log("Owner: " + owner)
    console.log("Repo: " + repo)
    // try{
        const output = await octokit.request('GET /repos/{owner}/{repo}/tags', {
            owner: owner,
            repo: repo
          })
        let matches = _.filter(output['data'], function(obj){
            let matched = obj.name.includes('20220511.')
            return _.map(matched, 'name')
        })
        console.log("MATCHES: " + JSON.stringify(matches, null, 2))
                
        
        

    // } catch(e) {
    //     console.log("error: " + JSON.stringify(e, null, 2))
    // }
    
}

run();