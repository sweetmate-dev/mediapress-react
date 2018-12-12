const m = require('mithril')

import store from 'store'
import A from 'actions'

const ProjectListView = {
  view: function (node) {
    const s = store.getState()
    const projects = s.projects ? s.projects : []
    const noProjects = (<div>
      <p>You have not created any projects yet, you can get started by selecting a template from above</p>
    </div>)

    return m('.page.nopad', { class: node.attrs.active ? 'active' : '' }, [
      m('section.new-project', [
        m('h3', 'Create a blank project, or choose a template'),
        m('ul', ['Blank', 'Template 1', 'Template 2'].map(
          name => m('li', [
            m('img', { src: '//placehold.it/150x80', width: 150, height: 80 }),
            m('span', name)
          ])
        ))
      ]),
      m('section.recent-projects', [
        m('h3', 'Recent Projects'),
        projects.length === 0 ? noProjects :
          m('ul.project-list', s.projects.map(p => m('li', m('a', { onclick: () => store.dispatch(A.Project.open(p.id)) }, [
            m('img', { src: '//placehold.it/370x250', width: 370, height: 250 }),
            m('span.title', p.name)
          ]))))
      ]),
      m('section.recent-exports', [
        m('h3', 'Recent Exports'),
        m('ul', [
          m('li', [
            m('.img-wrap', [
              m('img', { src: '//placehold.it/210x110' }),
              m('span.time', '04:22')
            ]),
            m('h4', 'Export Title 1'),
            m('p.line', m('span', 'Filename:'), 'example.mp4'),
            m('p.line', m('span', 'Resolution:'), '1920x1080 (1080p)'),
            m('p.line', m('span', 'Duration:'), '1:24'),
            m('p.line', m('span', 'Size:'), '105mb'),
            m('p.line', m('span', 'Exported:'), '1 day ago')
          ])
        ])
      ])
    ])
  }
}

export default ProjectListView
