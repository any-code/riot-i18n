# riot-translate

[![Build Status](https://travis-ci.org/any-code/riot-translate.svg?branch=master)](https://travis-ci.org/any-code/riot-translate)

> Riot JS internationalization tag and mixin

## Getting Started

### 1. Installation

``` bash
npm install riot-translate
```

### 2. Examples

include with module loader
``` javascript
    var translate = require('riot-translate');  

    translate.dictionary({
        "zh": {
            "Hello": "您好",
            "I love you": "我爱你"
        },
        "jp": {
            "Hello": "こんにちは",
            "I love you": "わたしは、あなたを愛しています"
        }
    })  
```

or via script tag
``` html
    <script src="/path/to/riot-translate/riot-translate.min.js"></script><!-- exposes global var 'translate' -->

```

The library register's the 'translate' tag with riot.
``` html
    <section>
        <translate>Hello</translate><br>
        <translate>I love you</translate>
    </section>
```        

and provides an 'apply' method for translating outside of a tag
``` javascript
   translate.setLanguage('zh')
   translate.apply('Hello') // -> 您好
```

setting language can be achieved using translate.setLanguage('lang') or triggered using a riot observable
``` html
<riot-tag>
    <ul>
        <li><a onclick="{ onClick }">en</a></li>
        <li><a onclick="{ onClick }">zh</a></li>
        <li><a onclick="{ onClick }">jp</a></li>
    </ul>    

   riot.mixin('translate')

   this.translate.setLanguage('fr')
   this.translate.apply('Hello') // -> Hello

   this.onClick = function(e) {
        this.translate.trigger('lang',  e.target.innerHTML)
   }

   this.translate.trigger('lang',  'jp')
   this.translate.apply('Hello') // -> こんにちは
</riot-tag>   
```

If no dictionary language substitute is available the default will always be used

translate method substitution object
```javascript

    this.translate.apply("Hello {user.name}!", {
        user: {
            name: "Goodman"
        }
    }) // --> Hello Goodman!

```

nested properties
```javascript
    translate.dictionary({
        "en": {
            "user": {
                "name": "User Name"
            }
    })

    this.translate.apply("user.name") // --> User Name
```



## Copyright and license
Copyright (c) 2015-2017 [Anycode](https://anycode.io/ "Anycode") <lee@anycode.io>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
