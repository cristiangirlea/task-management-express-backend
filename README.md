# ⚠️ Deprecated

**This service is no longer part of the task management stack.**

It was a "backend for frontend" (BFF) written in Express/TypeScript that sat
between the Next.js frontend and the Laravel API. The architecture has been
collapsed: the Next.js app
([task-management-next-react](https://github.com/cristiangirlea/task-management-next-react))
now calls the Laravel API
([task-management-app](https://github.com/cristiangirlea/task-management-app))
directly with Sanctum bearer tokens. If real-time updates are added, they will
use [Laravel Reverb](https://laravel.com/docs/reverb) rather than this
service's Socket.IO layer.

## Why it was retired

1. **Its request signing never matched Laravel's.** This service signed
   `timestamp:nonce` with HMAC-SHA256 and sent the result in an `X-HASH` header
   (`src/utils/generateVerificationHeaders.ts`), while Laravel verified an HMAC
   of `timestamp.nonce` taken from an `X-SIGNATURE` header. Every signed request
   was rejected, so the BFF could never actually talk to the API.
2. **It added a hop with nothing on top.** Every request went through an extra
   process, a second Redis client and a duplicated service layer that mirrored
   Laravel's, without providing any feature the frontend could not get by
   calling Laravel directly.

## Status

This repository is kept for history only and will not receive updates. Use the
two repositories linked above, and
[task-management-docker](https://github.com/cristiangirlea/task-management-docker)
to run the current stack locally.
