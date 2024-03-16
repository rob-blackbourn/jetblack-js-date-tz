module.exports = {
  entryPoints: ['src/index.ts'],
  out: 'docs',
  includes: 'manual',
  categorizeByGroup: true,
  readme: 'manual/README.md',
  pluginPages: {
    source: 'manual',
    pages: [
      {
        title: 'Guides',
        childrenDir: 'guide',
        children: [
          { title: 'Getting Started', source: 'getting-started.md' },
          { title: 'General Usage', source: 'general-usage.md' },
          { title: 'Design Choices', source: 'design-choices.md' },
          { title: 'Calculations', source: 'calculations.md' },
          { title: 'Date Arithmetic', source: 'date-arithmetic.md' },
          { title: 'Timezones', source: 'timezones.md' },
          { title: 'Calendars', source: 'calendars.md' }
        ]
      }
    ]
  }
}
