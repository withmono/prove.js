
# Mono Connect.js

Mono Prove.js is a quick and secure way to verify identity from within your app. Mono Prove is a drop-in framework that handles identity verification of costumers using your app (personal information, documents, and bank accounts, etc). It works with all major javascript frameworks.

For verifying customer identity and interacting with Mono's API use the documentation [Mono API](https://docs.mono.co/docs/).

## Documentation

For complete information about Mono Project, head to the [docs](https://docs.mono.co/).

## Requirements
Node 10 or higher.


## Getting Started

1. Register on the [Mono](https://app.withmono.com/dashboard) website and get your public and secret keys.
2. Setup a server to [exchange tokens](https://docs.mono.co/) to access user identity information with your Mono secret key.


## Installation

You can install the package using NPM or Yarn;

```bash
npm install @mono.co/prove.js
```
or
```bash
yarn add @mono.co/prove.js
```

## Usage
Click the links below for detailed examples on how to use prove.js with your favourite framework;
- [vanilla](examples/index.html)

> NOTE  
> The list above is not exhaustive, you can use this package in other frontend javascript frameworks.
## Parameters
- [`onSuccess`](#onSuccess)
- [`onClose`](#onClose)
- [`onLoad`](#onLoad)
- [`onEvent`](#onEvent)
- [`requestId`](#requestId)


### <a name="requestId"></a> `requestId`
The requestId is the param ID attached at the end of the link generated after initiating a request using the mono prove initiation API.

```js
new Connect({
  requestId: 'prove_request_id',
});
```

### <a name="onSuccess"></a> `onSuccess`      
**Required**
This function is called when a user has successfully verified their identity.
```js
new Prove({
  requestId: 'prove_request_id',
  onSuccess: () => {
    // fetch user identity information from server
  }
});
```

### <a name="onClose"></a> `onClose`
The optional closure is called when a user has specifically exited the Mono Prove flow (i.e. the widget is not visible to the user). It does not take any arguments.
```js
new Connect({
  requestId: 'prove_request_id'
  onClose: () => console.log("widget has been closed")
});
```

### <a name="onLoad"></a> `onLoad`
This function is invoked the widget has been mounted unto the DOM. You can handle toggling your trigger button within this callback.
```js
new Connect({
  requestId: 'prove_request_id',
  onLoad: () => console.log("widget loaded successfully")
});
```

### <a name="onEvent"></a> `onEvent`
This optional function is called when certain events in the Mono Prove flow

See the [data](#dataObject) object below for details.

```js
new Connect({
  requestId: 'prove_request_id',
  onEvent: (eventName, data) => {
    console.log(eventName);
    console.log(data);
  }
});
```


## API Reference

### `setup()`
This method is used to load the widget unto the DOM, the widget remains hidden after invoking this function until the `open()` method is called.
```js
const connect = new Connect({
  requestId: 'prove_request_id',
  onSuccess: () => console.log("Identity verified successfully"),
  onLoad: () => console.log("widget loaded successfully"),
  onClose: () => console.log("widget has been closed"),
  onEvent: (eventName, data) => {
    console.log(eventName);
    console.log(data);
  },
});

connect.setup();
```

### `open()`
This method makes the widget visible to the user.
```js
const connect = new Connect({
  requestId: 'prove_request_id',
  onSuccess: () => console.log("Identity verified successfully"),
});

connect.setup();
connect.open();
```

### `close()`
This method programatically hides the widget after it's been opened.
```js
const connect = new Connect({
  requestId: 'prove_request_id',
  onSuccess: () => console.log("Identity verified successfully"),
});

connect.setup();
connect.open();

// this closes the widget 5seconds after it has been opened
setTimeout(() => connect.close(), 5000)
```

### <a name="onEventCallback"></a> onEvent Callback

The onEvent callback returns two paramters, [eventName](#eventName) a string containing the event name and [data](#dataObject) an object that contains event metadata.

```js
const connect = new Connect({
  requestId: 'prove_request_id'
  onSuccess: ({code}) => console.log("code", code),
  onEvent: (eventName, data) => {
   // handle event
  }
});

```

#### <a name="eventName"></a> `eventName`

Event names corespond to the `type` key returned by the raw event data. Possible options are in the table below.

| Event Name | Description |
| ----------- | ----------- |



#### <a name="dataObject"></a> `data`
The data object returned from the onEvent callback.

```js
{

}
```


## Support
If you're having general trouble with Mono Prove.js or your Mono integration, please reach out to us at <hi@mono.co> or come chat with us on Slack. We're proud of our level of service, and we're more than happy to help you out with your integration to Mono.

## Contributing

If you find any issue using this package please let us know by filing an issue right [here](https://github.com/withmono/prove.js/issues).

If you would like to contribute to the Mono Connect.js, please make sure to read our [contributor guidelines](https://github.com/withmono/prove.js/tree/develop/CONTRIBUTING.md).


## License

[MIT](https://github.com/withmono/connect.js/tree/develop/LICENSE) for more information.
