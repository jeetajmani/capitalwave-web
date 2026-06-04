import {defineField, defineType} from 'sanity'
import {ImageFieldWithSize} from '../components/ImageFieldWithSize'

export const talentType = defineType({
  name: 'talent',
  title: 'Talent',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: ['Artist', 'Engineer', 'Videographer', 'Management'],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'genre',
      title: 'Genre',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram Link',
      type: 'url',
    }),
    defineField({
      name: 'spotify',
      title: 'Spotify Link',
      type: 'url',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      components: {field: ImageFieldWithSize},
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'genre',
      media: 'photo',
    },
  },
})
