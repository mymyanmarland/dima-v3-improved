# TODO — DIMA v3 Improved

## Phase 1 — Bootstrap ✅
- [x] Analyze source repo structure (`followthuya00-png/dima-v2-Copy`)
- [x] Clone source into local workspace as `dima-v3-improved`
- [x] Install dependencies
- [x] Run baseline build/test

## Phase 2 — Reliability
- [x] Add provider fallback policy config (Gemini -> OpenRouter Auto -> Qwen)
- [x] Normalize API error handling (region block, quota, auth)
- [x] Add retry/backoff utility for transient errors

## Phase 3 — UX/UI
- [x] Improve onboarding (How to use + API key setup helper)
- [x] Clarify action labels (Generate vs Generate+Execute)
- [ ] Improve mobile spacing + sticky action area

## Phase 4 — Security/Config
- [ ] Add API key format validation hints (Gemini/OpenRouter)
- [ ] Add environment readiness checks
- [ ] Update documentation for deployment & troubleshooting

## Phase 5 — QA & Ship
- [ ] Lint/build/test pass
- [ ] Create release notes
