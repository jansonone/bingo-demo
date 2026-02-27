# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Early-stage project scaffolded with environment configuration for Linear API integration. TypeScript types are auto-generated from the environment schema.

## Environment Management (Varlock)

This project uses [varlock](https://varlock.dev) for secure environment variable management.

### Security Rules

- **Never** read `.env` directly (`cat .env`, `Read .env`, etc.)
- **Never** echo or print secret values (`echo $SECRET`, `printenv | grep`)
- **Always** use varlock commands to interact with environment variables

### Commands

| Task | Command |
|------|---------|
| Validate all env vars | `varlock load` |
| Quiet validation (CI) | `varlock load --quiet` |
| Run command with env | `varlock run -- <command>` |
| View schema (safe) | `cat .env.schema` |
| Check specific var | `varlock load \| grep VAR_NAME` |
| Initialize schema from .env | `varlock init` |

### Files

- `.env.schema` — defines types, validation, and sensitivity annotations (safe to read, committed to git)
- `.env` — actual secret values (never read directly, in `.gitignore`)
- `env.d.ts` — auto-generated TypeScript types from schema (do not edit manually)

## Current Environment Variables

Defined in `.env.schema`:
- `LINEAR_API_KEY` — sensitive, used for Linear API integration
