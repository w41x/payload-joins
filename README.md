# payload-joins

some experiments with the new join field in PayloadCMS


## mysterious array auth prev value bug

Currently, if you have an auth enabled collection (e.g. `users`) with an array field and a join field 
and the array field has a AfterChange field hook, then the `previousValue` argument in this hook will sometimes be overridden with the join value.

So this collection:

```typescript
import {CollectionConfig} from 'payload'

export const Users: CollectionConfig = {
    slug: 'users',
    labels: {
        singular: 'User',
        plural: 'Users'
    },
    auth: true,
    fields: [
        {
            name: 'someArray',
            type: 'array',
            hooks: {
                afterChange: [({previousValue, value}) => {
                    console.log('someArrayAfterChangeFieldHookPrevValue: ', previousValue)
                    console.log('someArrayAfterChangeFieldHookValue: ', value)
                }]
            },
            fields: [
                {
                    name: 'someField',
                    type: 'text'
                }
            ]
        },
        {
            name: 'projects',
            type: 'join',
            collection: 'projects',
            on: 'user'
        }
    ]
}
```

will log 

```
someArrayAfterChangeFieldHookPrevValue:  {
    projects: { docs: [ '66f039149f5df29751d2ab3d' ], hasNextPage: false }
}

someArrayAfterChangeFieldHookValue:  [ { someField: 'uiae', id: '66f039188ab03b0022db5051' } ]
```

But `someArrayAfterChangeFieldHookPrevValue` should NEVER be an object. It is always an array or undefined. 
This bug makes using the join field in this matter impossible.

# how to reproduce

1. have `docker` and `make` installed on your system
2. `git clone` this repository 
3. run `make start`
4. navigate to `http://localhost`
5. log in with the default account (already prefilled)
6. go to collection `Projects` and create a Project (e.g. name it 'Test') with the default user selected in the `user` field
7. go to collection `Users` and edit the default user. 
8. Now if you add some entry to the array field `someArray`, save the changes and reload the document, the changes are gone!!! Also the console will log the above error. 