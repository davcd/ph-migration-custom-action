const core = require('@actions/core')

const semver = require('semver')
const fs = require('fs')

try {
  const file_content = fs.readFileSync('./gradle.properties', {encoding:'utf8'})
  const prefix = 'version='
  const old_version = semver.clean(file_content.slice(file_content.indexOf(prefix)+prefix.length))
  const type = core.getInput('type')
  let new_version = semver.inc(old_version, type)
  fs.writeFileSync('./gradle.properties', prefix+new_version, {encoding:'utf8', flag:'w'})
  core.setOutput('old_version', old_version)
  core.setOutput('new_version', new_version)
} catch (error) {
  core.setFailed(error.message);
}