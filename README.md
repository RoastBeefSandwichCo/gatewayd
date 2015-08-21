![Travis CI Build Status](https://api.travis-ci.org/ripple/gatewayd.svg?branch=master) 
[![Coverage Status](https://coveralls.io/repos/ripple/gatewayd/badge.png?branch=master)](https://coveralls.io/r/ripple/gatewayd?branch=develop)

# Gatewayd #

Gatewayd (pronounced "gateway-dee"), provides a framework you can extend to build a gateway on the Ripple Network. The system includes a core database that manages accounting for deposits and withdrawals of assets, linking the network with your holdings in the outside world. Gatewayd provides a standard interface for issuing any currency on the Ripple network and exchange, with the goal of completely abstracting interaction with Ripple.

Interact with the gatewayd by building custom integrations with banking and payment systems around the world, and by using the built-in APIs for designing beautiful gateway mobile apps and user interfaces. Gatewayd includes a REST API, Javascript library, and commandline interface; developers can also interact with Gatewayd by directly modifying the database records it monitors.

Gatewayd's features include:

  - deposits and withdrawals
  - issuing currency
  - robust Ripple payment sending
  - incoming Ripple payment monitoring
  - gateway administration
  - support for custom plugins

## Installation

- Comprehensive [installation script](https://github.com/ripple/gatewayd/blob/master/doc/install.md) for Ubuntu
- Comprehensive [installation script](https://github.com/ripple/gatewayd/blob/master/doc/installmac.md) for Mac

## Documentation

The [gatewayd.md](https://github.com/RoastBeefSandwichCo/gatewayd/blob/master/gatewayd.md) contains detailed information on Gatewayd and its APIs.

## Dependencies

1. [Node.js](http://nodejs.org/)
  - The express web module is used to serve HTTP/JSON endpoints
  - A Basic Auth strategy is used for authentication of users, admin.
  - Several NPM modules must be globally installed: db-migrate, pg, forever, and mocha

2. [Postgres](http://www.postgresql.org/)
  - The easiest way to get started with Postgres is by launching a [free database hosted by Heroku](https://postgres.heroku.com/databases)
  - For local development on Mac the simplest installation is via the [Postgres App](http://postgresapp.com/) by Heroku.
  - On Linux, you can generally install Postgres from your distro's package manager. See instructions for:
    - [Ubuntu](https://help.ubuntu.com/community/PostgreSQL)
    - [Debian](https://wiki.debian.org/PostgreSql)
    - [Red Hat, Fedora, CentOS](http://www.postgresql.org/download/linux/redhat/)
    - [SuSE](http://www.postgresql.org/download/linux/suse/)
    - [Arch Linux](https://wiki.archlinux.org/index.php/Postgres)

3. [Ripple REST API](https://github.com/ripple/ripple-rest.git)
  - The Ripple REST API provides a simplified HTTP/JSON interface to all the Ripple protocol network operations, such as payments and other transactions.

4. [git](http://git-scm.com/) is required for installation and updating. It is not used during general operation.

## Updating ##

The update process for gatewayd may change in the future, but for now, updating to a new version follows this process:

1. Use git to pull the `master` branch [from Github](https://github.com/ripple/gatewayd.git). (This assumes you created it by using `git clone` on the repository first.)<br/>
    `git pull`
2. Install any new npm modules needed by the new version<br/>
    `sudo npm install --global`
3. Disable the current gateway processes. (This starts downtime)<br/>
    `pm2 kill`
4. Apply schema changes to the database, if the new version includes any.<br/>
    `grunt migrate`
5. Restart the gatewayd processes. (This ends downtime)<br/>
    `bin/gateway start`

## Configuration ##

Before you can run gatewayd, you need to set up the appropriate accounts that will be used to store and send funds in the Ripple network. You also need to define which currencies your gateway issues. Beyond that, there are some options you can set if they fit your needs.

The defaults for all of gatewayd's settings are found in the file `config/environment.js`. You can override any of those settings with your own values by editing them in the file `config/config.json`, or by using the API methods for setting the configuration. (The API methods result in editing the `config/config.json` file anyway.) Don't edit the `config/environment.js` file, since that only contains the defaults, and gets overridden in a software update.

## Running gatewayd ##

After installation, start the gateway processes by running the command:

    bin/gateway start

If you want to debug the 5 processes, set `NODE_DEBUG` to true in config/environment.js; this will start node-debug sessions on port 5858, 6868, 7878, 8888 and 9898. Use node-inspector or any other debugger to attach.  

## Command Line Interface ##

In addition to the REST interface, many pieces of Gatewayd can be controlled directly through the commandline. This is done by running the `gateway` script (`bin/gateway` from the project's top level directory) with the relevant commands.

You can get usage information for the commandline as follows:

    bin/gateway -h

## Debugging ##

If you only want to debug the main gateway program and not the processes(see `NODE_DEBUG` above) then you can start a command like this:  
    
    node --debug=9090 --debug-brk bin/gateway command_args  
    
Then you can launch node-inspector and attach to port 9090 for debugging  

    node-inspector --debug-port=9090  
    
## Gateway Admin App ##

In order to be able to use the Gateway Admin WebApp please do a:

    cp config/example-config.json config/config.json
    
The config.json file overwrites the default values provided by the config/environment.js file. Of particular interest are the `USER_AUTH` and `KEY` values.
The `USER_AUTH = true` setting will let users login into the webapp and register new accounts.
The admin has a built-in account(hardcoded in the JS code) with the username: admin@DOMAIN (by default the `DOMAIN` is example.com in config.json) and the password is the `KEY` value found in config.json.

## Code Release Process ##

The following is an example flow for releasing changes to master:

- create a new release branch such as `release-3.35.1` with the patch
- bump the version patch number in the package.json: change 3.35.0 to 3.35.1
- cherry pick the patch commit into the release branch `git cherry-pick <commit>`
- summarize the release in doc/releases.md
- create a git tag with the version number:  `git tag -a v3.35.1`
- merge the release branch into the `master` branch
- push master to the origin remote: `git push origin master`
- push release tag to origin remote: `git push --tags`
- rebase the develop branch: `git checkout develop && git rebase master`

