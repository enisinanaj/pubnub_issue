This project is a bootstrap app in React Native with an integration with PubNub through pubnub-react.

### Issue

> JSON Parse error: Unexpected identifier "Use"

the stack is the following:

```
<unknown>
   web-node.js:73:36
callback
   client.js:611:5
<unknown>
   client.js:438:20
emit
   index.js:133:25
onreadystatechange
   client.js:705:14
dispatchEvent
   event-target.js:172:43
setReadyState
   XMLHttpRequest.js:546:23
__didCompleteResponse
   XMLHttpRequest.js:387:25
emit
   EventEmitter.js:182:12
__callFunction
   MessageQueue.js:353:47
<unknown>
   MessageQueue.js:118:26
__guardSafe
   MessageQueue.js:316:6
callFunctionReturnFlushedQueue
   MessageQueue.js:117:17
```

## Cause

The cause of this exception comes from requesting a channel's history in PubNub with both of the following snippets:

```
this.pubnub.history(
    {
        channel: 'channel1',
        reverse: false, // false is the default
        count: 100, // 100 is the default
        stringifiedTimeToken: true // false is the default
    },
    (status, response) => {
        console.log(response);
    }
);
```

and this other snippet used to get the history with autoload:

```
this.pubnub.subscribe({
    channels: ['myChannel1'],
    triggerEvents: true,
    withPresence: true,
    autoload: 100
});
```