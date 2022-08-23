# Releasing

The `latest` image on Dockerhub will be updated with each commit to `main`.

To release a new tagged image to DockerHub and a new version to NPM:

* Update version in `package.json`.
    * Run `npm i` to update `package-lock.json`.
* Update `CHANGELOG.md` following existing convention.
* Commit
* Merge to main if necessary
* Tag the main branch: `git tag vX.Y.Z`
* Push the tag to GitHub to trigger automated releases of Docker Images and NPM bundle:
  `git push origin vX.Y.Z`
