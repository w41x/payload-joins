import {CollectionConfig} from 'payload'

export const Project: CollectionConfig = {
    slug: 'projects',
    labels: {
        singular: 'Project',
        plural: 'Projects'
    },
    admin: {
        useAsTitle: 'name'
    },
    fields: [
        {
            name: 'name',
            type: 'text'
        },
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users'
        }
    ]
}