# Valurank Report

## Content

- [Content](#content)
- [Overview](#overview)
- [Changelog](#changelog)
- [Architecture](#architecture)
- [Version](#version)
- [Development](#development)
  - [Requirements](#requirements)
  - [Wrangler](#wrangler)
  - [Installation](#installation)
  - [Scripts](#scripts)
- [Version naming](#version-naming)

## Overview

It is a web app which provides detailed report about specific Valurank score. To get data it interacts with Valurank API.

## Changelog

See [Releases](https://github.com/Valurank/report/releases).

## Architecture

This app is intended to be deployed with [Cloudflare Pages](https://pages.cloudflare.com/). App is built with [Next.js](https://nextjs.org/). It is intended to be static web app, i.e. it uses [static HTML export](https://nextjs.org/docs/advanced-features/static-html-export). The reason is Cloudflare Pages. It uses [Cloudflare Workers Functions](https://developers.cloudflare.com/pages/platform/functions) to implement needed logic on backend side.

Also see the [docs](docs/) folder which might give you some overview.

## Version

`version` from `package.json` will not give you any valuable information. This project uses commit hash as pointer to specific version, and tags to mark release. See [version naming](#version-naming) for tags.

## Development

### Requirements

- [Node.js 16.13.1+](https://nodejs.org)
- [npm 8.3.0+](https://www.npmjs.com/package/npm)
- [git](https://git-scm.com/)

### Wrangler

Note that you don't need to install [Wrangler](https://developers.cloudflare.com/workers/cli-wrangler) by yourself. The reason is that at the moment Cloudflare Pages requires Wrangler 2.0 which is still in beta. Most likely that you just want to have one official Wrangler 1.x on your machine, not to mess with several Wrangler apps. So the project comes with Wrangler 2.0 as NPM package.

### Installation

1. Clone this repository.
2. Install NPM packages.

### Scripts

See the [package.json](package.json). Script purpose should be clear from the script title.

## Version naming

This project uses following structure for version naming: `<MAJOR RELEASE>.<CHANGES OF ANY KIND>`.

Because of frequent releases this project refused of [semantic versioning](https://semver.org/).
