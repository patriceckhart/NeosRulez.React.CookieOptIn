# Neos CMS Cookie Opt-In Plugin

A package to handle Cookie Opt-In for Neos CMS. Build with React.

## Installation

The NeosRulez.React.CookieOptIn package is listed on packagist (https://packagist.org/packages/neosrulez/react-cookieoptin) - therefore you don't have to include the package in your "repositories" entry any more.

Just add the following line to your require section:

```
"neosrulez/react-cookieoptin": "*"
```

And the run this command to fetch the plugin:

```
composer update
```


## Neos Fusion

Simply add the data attribute `data-cookieoptin` to your own tags. 
If scripts should not be executed, the attribute `type="text/plain"` must also be added. These attributes are removed by the user when defining the cookie.

```
prototype(Acme.Package:CustomScript) < prototype(Neos.Neos:ContentComponent) {
    renderer = afx`
        <script type="text/plain" data-cookieoptin="analysis">foo = 'bar';</script>
    `
}
```

## Settings.yaml

You can expand and manage your own cookie groups and cookies (in different languages) in an .yml file:

```
NeosRulez:
  React:
    CookieOptIn:
      metadata: 'resource://NeosRulez.React.CookieOptIn/Private/Metadata/'
```

## Author

* E-Mail: mail@patriceckhart.com 
* URL: http://www.patriceckhart.com 
