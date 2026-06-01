# GHLO Pipeline Validation Log

Date: June 1, 2026  
Project: SmartNest

## Environment used for this validation

- Node.js: `v25.3.0`
- npm: `11.7.0`
- Docker CLI: not available in this environment
- Jenkins CLI/Service: not available in this environment
- Network to npm registry: blocked (`ENOTFOUND registry.npmjs.org`)

## Runs executed

1. `npm ci`
   - Result: failed
   - Reason: lock mismatch + no access to registry packages (`@emnapi/core`, `@emnapi/runtime`)

2. `npm install`
   - Result: failed
   - Reason: no internet access to npm registry (`ENOTFOUND`) and npm exited with error

3. `npm run lint`
   - Result: failed
   - Reason: `eslint` binary missing because dependencies were not installable

4. `npm run build`
   - Result: failed
   - Reason: `vite` binary missing because dependencies were not installable

5. `docker --version`
   - Result: failed
   - Reason: docker command not installed in this environment

## What was completed despite environment limits

- Jenkins pipeline upgraded to clear multi-stage flow:
  - Install -> Build -> Test -> Package -> Deploy
- Pipeline made cross-platform for Jenkins agents (Linux/Windows).
- Added deploy toggle parameter: `RUN_DEPLOY`.
- Added artifact archiving (`dist` and image tar).
- Added smoke pipeline scripts:
  - `scripts/pipeline-smoke.sh`
  - `scripts/pipeline-smoke.cmd`
- Added runbook for live demo and repeatability tests:
  - `docs/GHLO_DEMO_RUNBOOK.md`

## Final verification to run on your machine (with Docker + Jenkins + internet)

1. Run local smoke script once.
2. Run Jenkins pipeline 3 times:
   - success run
   - intentional fail (lint) run
   - recovery success run
3. Capture screenshots of:
   - stage view
   - console output
   - deployed SmartNest on `:3000`
