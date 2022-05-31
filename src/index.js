const _ = require('lodash')
const github = require('@actions/github');
const core = require('@actions/core');
const moment = require('moment-timezone');



async function run() {
    const myToken = core.getInput('token');
    const dateFormat = core.getInput('date_format')
    const repoFull = core.getInput('repo').split('/');    
    const allowedUsers = core.getInput('allowed_users');
    const repo = repoFull[1]
    const owner = repoFull[0]


    
    const octokit = github.getOctokit(myToken)
    console.log("Owner: " + owner)
    console.log("Repo: " + repo)
    let today=moment(new Date()).tz("America/New_York").format(dateFormat); 
    
    console.log("FORMAT: ", today)
    
    const output = await octokit.request('GET /repos/{owner}/{repo}/tags', {
        owner: owner,
        repo: repo
        })
    console.log("OUTPUT: " + output['data'])
    let matches = _.filter(output['data'], function(obj){
        return obj.name.includes(today + '.')
    })
    
    console.log("MATCHES: " + matches)
    let allTags = _.map(matches, 'name')
    console.log("ALL TAGS: " + allTags)
    let arrLen = allTags.length            
    let iteration = 0
    console.log("arrLen " + arrLen)
    if(arrLen > 0) {
        let sorted = _.sortBy(allTags)

        let iterationArr = sorted[(arrLen-1)].split('.')
        iteration = parseInt(iterationArr[iterationArr.length])
        console.log("iterationArr " + iterationArr)
        console.log("iterationArr[1] " + iterationArr[iterationArr.length])
        console.log("iteration " + iteration)
    }

    iteration = iteration + 1
    let newTag = today + "." + iteration
    console.log("NEW TAG: " + newTag)
    core.setOutput("newTag", newTag)
        
    
}

run();