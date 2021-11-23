
![logo-maia](https://user-images.githubusercontent.com/3780435/142850343-7d91488c-06cd-4fa4-bdab-35f50820af48.png)

# MAIA by Kibana

Kibana is your window into the [Elastic Stack](https://www.elastic.co/products). Specifically, it's a browser-based analytics and search dashboard for Elasticsearch.

- [Getting Started](#getting-started)
  - [Using a Kibana Release](#using-a-kibana-release)
  - [Building and Running Kibana, and/or Contributing Code](#building-and-running-kibana-andor-contributing-code)
- [Documentation](#documentation)
- [Version Compatibility with Elasticsearch](#version-compatibility-with-elasticsearch)
- [Questions? Problems? Suggestions?](#questions-problems-suggestions)

## Getting Started MAIA Dashboard
## 1 Step

## git clone https://github.com/[YOUR_USERNAME]/kibana.git kibana
cd kibana
-------
## 2 Step
Install dependenciesedit
Install the version of Node.js listed in the .node-version file. This can be automated with tools such as nvm, nvm-windows or avn. As we also include a .nvmrc file you can switch to the correct version when using nvm by running:

## nvm use
-------
## 3 Step
Bootstrap Kibana and install all the dependencies:

## yarn kbn bootstrap

( In any other circumstance where you want to force the node_modules install step you can use: yarn kbn bootstrap --force-install ) 


If you have failures during yarn kbn bootstrap you may have some corrupted packages in your yarn cache which you can clean with:

## yarn cache clean
-------
## 4 Step
## Configure environmental settingsedit
Increase node.js heap sizeedit
Kibana is a big project and for some commands it can happen that the process hits the default heap limit and crashes with an out-of-memory error. If you run into this problem, you can increase maximum heap size by setting the --max_old_space_size option on the command line. To set the limit for all commands, simply add the following line to your shell config: export NODE_OPTIONS="--max_old_space_size=2048".

## Run Elasticsearchedit
Run the latest Elasticsearch snapshot. Specify an optional license with the --license flag.

## yarn es snapshot --license trial

-------
## 5 Step
Run Kibanaedit
In another terminal window, start up Kibana. Include developer examples by adding an optional --run-examples flag.

## yarn start 

-----
For more information visit here
https://www.elastic.co/guide/en/kibana/master/development-getting-started.html#_configure_environmental_settings

If you just want to try Kibana out, check out the [Elastic Stack Getting Started Page](https://www.elastic.co/start) to give it a whirl.

If you're interested in diving a bit deeper and getting a taste of Kibana's capabilities, head over to the [Kibana Getting Started Page](https://www.elastic.co/guide/en/kibana/current/get-started.html).

### Using a Docker ElasticSearch 8
Installing Elasticsearch 
https://www.elastic.co/guide/en/elasticsearch/reference/master/docker.html

### Using a Kibana Release

If you want to use a Kibana release in production, give it a test run, or just play around:

- Download the latest version on the [Kibana Download Page](https://www.elastic.co/downloads/kibana).
- Learn more about Kibana's features and capabilities on the
[Kibana Product Page](https://www.elastic.co/products/kibana).
- We also offer a hosted version of Kibana on our
[Cloud Service](https://www.elastic.co/cloud/as-a-service).

### Building and Running Kibana, and/or Contributing Code

You might want to build Kibana locally to contribute some code, test out the latest features, or try
out an open PR:

- [CONTRIBUTING.md](CONTRIBUTING.md) will help you get Kibana up and running.
- If you would like to contribute code, please follow our [STYLEGUIDE.mdx](STYLEGUIDE.mdx).
- For all other questions, check out the [FAQ.md](FAQ.md) and
[wiki](https://github.com/elastic/kibana/wiki).

## Documentation

Visit [Elastic.co](http://www.elastic.co/guide/en/kibana/current/index.html) for the full Kibana documentation.

For information about building the documentation, see the README in [elastic/docs](https://github.com/elastic/docs).

## Version Compatibility with Elasticsearch

Ideally, you should be running Elasticsearch and Kibana with matching version numbers. If your Elasticsearch has an older version number or a newer _major_ number than Kibana, then Kibana will fail to run. If Elasticsearch has a newer minor or patch number than Kibana, then the Kibana Server will log a warning.

Installing Elasticsearch 
https://www.elastic.co/guide/en/elasticsearch/reference/master/docker.html

_Note: The version numbers below are only examples, meant to illustrate the relationships between different types of version numbers._

