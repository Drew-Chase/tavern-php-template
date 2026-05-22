#!/usr/bin/env just --justfile

set windows-shell := ["powershell.exe", "-NoLogo", "-NoProfile", "-Command"]
set shell := ["bash", "-c"]

install:
    composer install
    pnpm i

dev: install
    pnpm run dev

[windows]
build: install
    pnpm run build
    Copy-Item ./api ./dist -Recurse

[linux]
[macos]
build: install
    pnpm run build
    Copy-Item ./api ./dist -Recurse
