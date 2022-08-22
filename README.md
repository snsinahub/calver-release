# calver-release

## Introduction

Calver release is an action that dynamically generates github `release tags` based on calnder versioning. The generated tag is a combination of `today's date` based on date format passed to the action and an `incremental digit` which indicates release number for the specified day.

For instance if date format is `YYYYMMD` and today is 08/22/2022, then the first and second releases of the day will be 
- 2022082.1
- 2022082.2

## Formating Date
This action uses moment.js and JS date format, here is few examples of supported date formats tokens

- YYYY: 4-digit year '2022'
- YY: 2-digit year '22'
- MMMM: Full-length month 'August'
- MMM: 3 character month 'Aug'
- MM: Month of the year, zero-padded '08'
- M: Month of the year '22'
- DD: Day of the month, zero-padded '22'
- D: Day of the month '22'
- Do: Day of the month with numeric ordinal contraction '22nd'
- HH: hour


### Date formats Examples
you can separate year, month and day by `.`, `-` and more 
- YYYYMMD: `20220822`
- YYYY-MM-D: `2022-08-22`
- YYYY.MM.D: `2022.08.22`

## Inputs
```YAML
  - uses: snsinahub/calver-release@v1.0.0
    with: 
      # Repository name 
      # default: ${{ github.repository }}
      # required: false
      repo: ''
    
      # Token to access to the repository
      # GITHUB_TOKEN can be used to access to the same repository
      # If you'd like to access to another repository you can use either PAT(Personal Access Token) Or use a service account
      # Using Service Account with least permissions is recommended 
      # default: ${{ github.token }}
      # required: false
      token:
    
      # Release tag date format 
      # default: YYYYMMD
      # required: false
      date_format:

      # Local timezone 
      # default: America/New_York
      # required: false
      time_zone:   


```

## Output
 | Name | Description |
 | -- | -- |
 | newTag | Get latest release tag and increment the iteration by 1 |


## Examples


### Use default values

```YAML
- name: checkout
  uses: actions/checkout@v2
- name: get a new tag
  id: tag-generator
  uses: snsinahub/calver-release@v1.0.0  
- name: print new tag
  run: |
    echo ${{ steps.tag-generator.outputs.newTag }}
```

## Passing Date format

```YAML
- name: checkout
  uses: actions/checkout@v2
- name: get a new tag
  id: tag-generator
  uses: snsinahub/calver-release@v1.0.0
  with: 
    repo: "${{ github.repository }}"
    token: "${{ secrets.GITHUB_TOKEN }}"
    date_format: "YYYYMMD"
- name: print new tag
  run: |
    echo ${{ steps.tag-generator.outputs.newTag }}
```

## Passing Date format and timezone

```YAML
- name: checkout
  uses: actions/checkout@v2
- name: get a new tag
  id: tag-generator
  uses: snsinahub/calver-release@v1.0.0
  with: 
    repo: "${{ github.repository }}"
    token: "${{ secrets.GITHUB_TOKEN }}"
    date_format: "YYYY-MM-D"
    time_zone: "America/New_York"
- name: print new tag
  run: |
    echo ${{ steps.tag-generator.outputs.newTag }}
```
 

## External References
- [Formatting JavaScript Dates with Moment.js](https://thecodebarbarian.com/formatting-javascript-dates-with-moment-js.html)
- [Moment.js](https://momentjs.com/)