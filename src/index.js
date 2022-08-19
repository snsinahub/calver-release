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
    console.log("TODAY: " + today)
    console.log("Date Format: " + dateFormat)
    let totalTags = 0
    let apiPage = 1
    let output = []
    let outputArray = []
    do {
        console.log("outputarray before: " + JSON.stringify(outputArray))
        outputArray = await octokit.request('GET /repos/{owner}/{repo}/tags', {
            owner: owner,
            repo: repo,
            per_page: 100,
            page: apiPage
            })
        apiPage++
        console.log("apiPage: " + apiPage)
        console.log("outputarray after: " + JSON.stringify(outputArray))
        console.log("outputarray data: " + JSON.stringify(outputArray['data']))
        _.concat(output, outputArray['data'])
    } while (outputArray['data'].length > 0)

    
    
    let matches = _.filter(output, function(obj){
        
        let tagName = obj.name
        let searched = tagName.search(today)
        console.log("OBJ NAME: " + obj.name)
        console.log("SEARCHed: " + searched)
        return obj.name.includes(`'${today}'`)
    })
    console.log("output: " + JSON.stringify(output))
    console.log("matches: " + matches)
    let allTags = _.map(matches, 'name')

    console.log("all tags: " + allTags)
    let arrLen = allTags.length            
    let iteration = 0
    let itr = []
    for (let i = 0; i < arrLen; i++) {
        console.log("TAG: " + allTags[i])
        let temp = allTags[i].split('.')
        console.log("TEMP: " + temp)
        itr[i] = temp[(temp.length-1)]
        console.log("ITR I: " + temp[(temp.length-1)])
        console.log("TEMP INDEX: " + (temp.length-1))
    }
    itr.sort(function(a, b) {
        return a - b;
      });
    let lastItr = parseInt(itr[(itr.length-1)])

    iteration = (lastItr + 1)
    console.log(lastItr)

    if(isNaN(iteration)) {
        iteration = 1
    }
    let newTag = today + "." + iteration
    console.log("NEW TAG: " + newTag)
    core.setOutput("newTag", newTag)
        
    
}

run();