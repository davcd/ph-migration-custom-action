const core = require('@actions/core')

const semver = require('semver')
const fs = require('fs')

try {
  const gradle_properties_content = fs.readFileSync('./gradle.properties', {encoding:'utf8', flag:'r'})
  const old_version = semver.clean(gradle_properties_content)
  const type = core.getInput('type')
  let new_version = semver.inc(old_version, type)
  fs.writeFileSync('./gradle.properties', new_version, {encoding:'utf8', flag:'w'})
  core.setOutput('old_version', old_version)
  core.setOutput('new_version', new_version)
} catch (error) {
  core.setFailed(error.message);
}