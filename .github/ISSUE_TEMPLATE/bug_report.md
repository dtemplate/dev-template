---
name: Bug report
about: Create a report to help us improve
title: ''
labels: ''
assignees: ''
---

**Describe the bug**

I tried to create a new template but it return a error

**Code that caused the error**

```bash
dt --template node-api
```

**Erro in console**

```
Error: example
    at REPL1:1:1
    at Script.runInThisContext (node:vm:129:12)
    at REPLServer.defaultEval (node:repl:564:29)
    at bound (node:domain:421:15)
    at REPLServer.runBound [as eval] (node:domain:432:12)
    at REPLServer.onLine (node:repl:891:10)
    at REPLServer.emit (node:events:532:35)
    at REPLServer.emit (node:domain:475:12)
    at REPLServer.Interface._onLine (node:readline:487:10)
    at REPLServer.Interface._line (node:readline:864:8)
```

**Additional context**

Add any other context about the problem here.
