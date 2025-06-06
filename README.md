# 🐛 Regression: `next/dynamic` Client Chunk Loading in Next.js 15

This repository demonstrates a **regression in Next.js 15** related to `next/dynamic()` when conditionally importing client components. In **Next.js 14**, only the dynamically selected client component is included in the client bundle. In **Next.js 15**, **both client components are included**, even if only one is used at runtime, negatively impacting performance and metrics like Total Blocking Time (TBT).

## 🔍 What This Repository Shows

- Conditional loading of either `ClientA` or `ClientB` using `next/dynamic()` inside a client component `Wrapper`.
- **Expected behavior (Next.js 14)**: Only the selected client component is included and loaded.
- **Current behavior (Next.js 15)**: Both components are bundled and sent to the client, regardless of which one is used.

## 🗂️ Project Structure

```
next-dynamic-demo/
├── src/
│   ├── app/
│   │   └── page.tsx       # Renders the Wrapper
│   └── components/
│       ├── ClientA.tsx    # Client component with red background
│       ├── ClientB.tsx    # Client component with blue background
│       └── Wrapper.tsx    # Client component that dynamically imports ClientA or ClientB
```

## ✅ Reproduction Steps

1. Clone this repository:
```bash
git clone https://github.com/gonmpablo/NextDynamicIssue.git
cd NextDynamicIssue
```

2. Install dependencies and build for each branch:

🔹 For Next.js 14:
```bash
git checkout next14-repro
npm install
ANALYZE=true npm run build
npm start
```

🔸 For Next.js 15:
```bash
git checkout next15-repro
npm install
ANALYZE=true npm run build
npm start
```

3. Visit the page and inspect JS chunks via DevTools:
   - In Next.js 14, only one chunk (ClientA or ClientB) is loaded.
   - In Next.js 15, both client chunks are always included.

## 🌐 Live Demos

- 🔹 [Next.js 14 Deployment](https://next-dynamic-issue-git-ec7cb0-pablo-gonzalez-martinezs-projects.vercel.app/)
- 🔸 [Next.js 15 Deployment](https://next-dynamic-issue-git-09c334-pablo-gonzalez-martinezs-projects.vercel.app/)

To observe the difference:
1. Open the links
2. Open browser developer tools (F12)
3. Go to the "Network" tab and filter by "JS"
4. Observe how in Next.js 15 both chunks are loaded, while in Next.js 14 only the necessary one is loaded

## 📊 Bundle Analysis

Enable analysis with:
```bash
ANALYZE=true npm run build
```

Use the browser-based visual analyzer to see:
- Only ClientA or ClientB in Next.js 14
- Both in Next.js 15, even if one is never rendered

## ⚠️ Impact

- Increased TBT due to unnecessary JS being sent and evaluated
- Larger initial bundle size
- Worse Core Web Vitals metrics and slower user interactivity

## 📌 Regression Details

- The issue appears starting from version 15.0.0-canary.148
- Works correctly in 15.0.0-canary.147 and all prior versions
- Introduced in this PR: [#65486](https://github.com/vercel/next.js/pull/65486)

## 💡 Technical Summary

A client component conditionally imports other client components:

```tsx
// Wrapper.tsx
'use client'
import dynamic from 'next/dynamic';

const ClientA = dynamic(() => import(/* webpackChunkName: "ClientA" */'./ClientA'));
const ClientB = dynamic(() => import(/* webpackChunkName: "ClientB" */'./ClientB'));

export default function Wrapper() {
    const condition = Math.random() > 0.5;
    return condition ? <ClientB /> : <ClientA />;
}
```

In Next.js 15, both chunks are present in the final client JS bundle.

## 🧪 Environment Info

```
Operating System:
  Platform: darwin
  Arch: arm64

Binaries:
  Node: 20.17.0
  npm: 10.8.2

Relevant Packages:
  next: 15.0.0-canary.148
  react: 19.0.0-rc
  react-dom: 19.0.0-rc
  typescript: 5.6.2
```

## 📝 GitHub Issue Template

```markdown
### Title
Regression: next/dynamic conditionally importing client components includes all chunks in client bundle in Next.js 15

### Reproduction repo
https://github.com/gonmpablo/NextDynamicIssue

### Live Demos
- Next.js 14: https://next-dynamic-issue-git-ec7cb0-pablo-gonzalez-martinezs-projects.vercel.app/
- Next.js 15: https://next-dynamic-issue-git-09c334-pablo-gonzalez-martinezs-projects.vercel.app/

### To Reproduce
1. Clone the repo
2. Checkout both branches
3. Build with `ANALYZE=true npm run build`
4. Compare bundle contents or inspect in DevTools
5. Observe both chunks always included in Next.js 15

### Expected behavior
Only the selected client chunk should be included in the client bundle.

### Actual behavior
All client components are bundled and shipped, regardless of usage.

### Regression introduced in
next@15.0.0-canary.148
Likely caused by PR: https://github.com/vercel/next.js/pull/65486
```

## 🙏 Thanks

Thanks for reviewing this issue. Feel free to open a discussion or PR if you'd like to collaborate on narrowing the regression further.