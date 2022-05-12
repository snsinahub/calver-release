const _ = require('lodash')
const github = require('@actions/github');
const core = require('@actions/core');
const moment = require('moment-timezone');



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
    let today=moment(new Date()).tz("America/New_York").format('YYYYMD'); 
    
    console.log("FORMAT: ", today)
    
    const output = await octokit.request('GET /repos/{owner}/{repo}/tags', {
        owner: owner,
        repo: repo
        })
    let matches = _.filter(output['data'], function(obj){
        return obj.name.includes(today + '.')
    })
    
            
    let allTags = _.map(matches, 'name')
    let arrLen = allTags.length            
    let iteration = 0
    if(arrLen > 0) {
        let sorted = _.sortBy(allTags)
        let iterationArr = sorted[(arrLen-1)].split('.')
        iteration = parseInt(iterationArr[1])
    }

    iteration = iteration + 1
    let newTag = today + "." + iteration
    console.log("NEW TAG: " + newTag)
    core.setOutput("newTag", newTag)
        
    
}

run();