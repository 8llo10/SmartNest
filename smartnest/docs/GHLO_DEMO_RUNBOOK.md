# GHLO Demo Runbook (SmartNest + Jenkins)

This runbook covers GHLO responsibilities:
- validate SmartNest after changes
- run the pipeline multiple times
- document outputs
- prepare the live demo flow

## 1) Pre-demo checklist

- Jenkins service is running.
- Docker engine is running.
- Jenkins job points to repository root and uses `Jenkinsfile`.
- Node.js LTS and npm are available on Jenkins agent.
- Port `3000` is free on the deployment machine.

## 2) Live demo script (7-10 minutes)

1. Show project in GitHub and latest commit.
2. Open Jenkins job and click **Build Now**.
3. Open build console and explain each stage:
   - Install
   - Build
   - Test
   - Package
   - Deploy
4. After success, open `http://<jenkins-host>:3000` and show SmartNest running.
5. Show archived artifacts:
   - `dist/**`
   - `*.tar`
6. Trigger one more build to prove repeatability.

## 3) Failure/recovery mini-scenario (recommended)

Use this once before presentation day:
1. Introduce a temporary lint error in `src/App.jsx`.
2. Run pipeline; it should fail in **Test**.
3. Revert the lint error.
4. Run pipeline again; it should pass and deploy.

This proves CI catches issues early and CD resumes after fix.

## 4) Quick repeat test commands (local)

Linux/macOS:
```bash
cd smartnest
sh scripts/pipeline-smoke.sh
```

Windows:
```bat
cd smartnest
scripts\pipeline-smoke.cmd
```

## 5) Demo speaking cues

- "Any push triggers a deterministic pipeline."
- "Build validates production bundle generation."
- "Test blocks unsafe changes (lint gate)."
- "Package creates a Docker image and an artifact tar."
- "Deploy runs the latest validated image on port 3000."
