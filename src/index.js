const _ = require('lodash')
const github = require('@actions/github');
const core = require('@actions/core');
const moment = require('moment-timezone');



async function run() {
    const myToken = core.getInput('token');
    const dateFormat = core.getInput('date_format')
    const repoFull = core.getInput('repo').split('/');    
    const allowedUsers = core.getInput('allowed_users');
    const timeZone = core.getInput('time_zone');
    const prepend = core.getInput('tag_prepend');
    const append = core.getInput('tag_append');
    const append_prepend_separator = core.getInput('append_prepend_separator');
    const repo = repoFull[1]
    const owner = repoFull[0]
    
    const octokit = github.getOctokit(myToken)
    let today=moment(new Date()).tz(timeZone).format(dateFormat);  
    let totalTags = 0
    let apiPage = 1
    let output = []
    let outputArray = []
    do {        
        outputArray = await octokit.request('GET /repos/{owner}/{repo}/tags', {
            owner: owner,
            repo: repo,
            per_page: 100,
            page: apiPage
            })
        apiPage++
        output.push(...outputArray['data'])        
    } while (outputArray['data'].length > 0)

    
    let tagName = today
    if( prepend || prepend.length > 0 ) {
        tagName = prepend + append_prepend_separator + tagName
    }

    if( append || append.length > 0 ) {
        tagName = tagName + append_prepend_separator + append
    }

    if( !append && !prepend) {
        tagName = today
    }   

    let matches = _.filter(output, function(obj) {          
        return obj.name.startsWith(tagName)
    })
    let allTags = _.map(matches, 'name')

    let arrLen = allTags.length            
    let iteration = 0
    let itr = []
    for (let i = 0; i < arrLen; i++) {        
        let temp = allTags[i].split('.')
        itr[i] = temp[(temp.length-1)]        
    }
    itr.sort(function(a, b) {
        return a - b;
      });
    let lastItr = parseInt(itr[(itr.length-1)])

    iteration = (lastItr + 1)    

    if(isNaN(iteration)) {
        iteration = 1
    }
    let newTag = tagName + "." + iteration
    console.log("NEW TAG: " + newTag)
    core.setOutput("newTag", newTag)           
}

run();