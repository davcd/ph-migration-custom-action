const core = require('@actions/core')

const semver = require('semver')
const fs = require('fs')

try {
  const current_version = fs.readFileSync('./gradle.properties', {encoding:'utf8', flag:'r'})
  const type = core.getInput('type')
  let new_version = semver.inc(current_version, type)
  fs.writeFileSync('./gradle.properties', new_version, {encoding:'utf8', flag:'w'})
  
  console.log("current_version"+current_version)
  console.log("new_version"+new_version)

} catch (error) {
  core.setFailed(error.message);
}