# SmartNest App

SmartNest is a React + Vite smart-home dashboard used as the DevOps target app for Jenkins CI/CD practice.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm test
```

> `npm test` runs lint checks as the quality gate.

## Docker

Build and run:
```bash
docker build -t smartnest:local .
docker run -d -p 3000:80 --name smartnest-container smartnest:local
```

Open: `http://localhost:3000`

## Jenkins pipeline

Pipeline file: `smartnest/Jenkinsfile` (repository root script path)

Stages:
1. Install
2. Build
3. Test
4. Package
5. Deploy

Parameter:
- `RUN_DEPLOY` (boolean): allow skipping deploy for dry runs.

Artifacts:
- `smartnest/dist/**`
- `smartnest/*.tar`

## Demo/testing docs

- `docs/GHLO_DEMO_RUNBOOK.md`
- `docs/GHLO_PIPELINE_RESULTS.md`

## Smoke pipeline scripts

- Linux/macOS: `scripts/pipeline-smoke.sh`
- Windows: `scripts/pipeline-smoke.cmd`
