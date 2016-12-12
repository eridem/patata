# Binary Provider

Binary Providers are ways to fetch the binary files and guess the platform. E.g. `APK` or `IPA` files, for `Android` and `iOS` respectively.

They have the following interface:

```typescript
    getAsync(uri: string): Promise<{ platform:string, binary:string }>
```

And all of them need to have the following name convention:

```
binary-provider-{PROTOCOL}.js
```

## Binary Provider Factory

The `factory.js` file will automatically fetch all providers and choose one based on the URI protocol. E.g.

| Uri | Protocol | Provider |
|:-   |:-        |:-        |
| http://my/file/path.apk | HTTP | binary-provider-http.js |
| ftp://my/file/path.ipa | FTP | binary-provider-ftp.js |
| webdav://my/file/path.apk | WEBDAV | binary-provider-webdav.js |
