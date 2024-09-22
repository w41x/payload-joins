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