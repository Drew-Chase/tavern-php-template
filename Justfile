#!/usr/bin/env just --justfile
set windows-shell := ["powershell.exe", "-NoLogo", "-NoProfile", "-Command"]
set shell := ["bash", "-c"]

default:
    @just --list

install:
    composer install
    pnpm i

dev: install
    pnpm run dev

[windows]
build: install
    pnpm run build
    Copy-Item ./api ./dist/ -Recurse -Force
    Copy-Item ./.env.production ./dist/.env -Force
    Copy-Item ./.htaccess ./dist/ -Force
    Copy-Item ./nginx.conf ./dist/ -Force

[linux]
[macos]
build: install
    pnpm run build
    cp ./api ./dist/
    cp ./.env ./dist/
    cp ./.htaccess ./dist/
    cp ./nginx.conf ./dist/
