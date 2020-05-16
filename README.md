# WS admin panel

###Библиотека для автоматической генерации административных панелей в web.

Пример конфигурации:
```yaml
---
roles:
- admin
- guest
- user
- content-manager
permissions:
  allow:
  - "*"
  deny:
  - guest
pages:
- pageUrl: admin/
  title: Тестирование административной панели WS
  blocks:
  - type: SideMenu
    options:
      dataSource:
        type: list
        options:
          data:
          - title: Пользователи
            code: users
            permissions:
              allow:
              - "*"
              deny:
              - guest
          - title: Проекты
            code: projects
            permissions:
              allow:
              - "*"
              deny:
              - guest
          - title: Настройки проекта
            code: settings
            permissions:
              allow:
              - admin
              deny:
              - "*"
      config: {}
  - type: List
    permissions:
      allow:
      - "*"
      deny:
      - guest
    options:
      dataSource:
        type: api
        options:
          url: "/api/admin/users"
    config:
      pagination:
        countOnPage: 20
      actions:
        view:
          actionHandler:
            type: redirect
            options:
              url: "/user/{{login}}"
        delete:
          permissions:
            allow:
            - admin
            deny:
            - "*"
          actionHandler:
            type: api:request
            options:
              url: "/api/admin/user/delete"
              method: get
              params:
                id: "{{id}}"
        create:
          permissions:
            allow:
            - "*"
            deny:
            - guest
          actionHandler:
            type: redirect
            options:
              url: admin/user/create
        update:
          permissions:
            allow:
            - "*"
            deny:
            - guest
          actionHandler:
            type: redirect
            options:
              url: admin/user/update/{{id}}
- pageUrl: "/user/{{id}}"
  title: Детальная страница пользователя
  blocks:
  - type: DetailView
    options:
      dataSource:
        type: api
        options:
          url: "/api/admin/user/{{id}}"
    config:
      actions:
        delete:
          permissions:
            allow:
            - admin
            deny:
            - "*"
          actionHandler:
            type: api:request
            options:
              url: "/api/admin/user/delete"
              method: get
              params:
                id: "{{id}}"
        update:
          permissions:
            allow:
            - "*"
            deny:
            - guest
          actionHandler:
            type: api:request
            options:
              url: "/api/admin/user/update"
              method: post
              params:
                id: "{{id}}"
      fields:
      - title: 'ФИО:'
        type: Input
        config:
          validations:
          - text
          - length > 3
        value: "{{name}}"
      - title: 'Изображение профиля:'
        type: ImageViewer
        config:
          multiFiles: false
          validations:
          - type:jpg,png
          - sizeLessThen:10mb
        value: "{{userAvatar}}"
      - title: 'Приглашен пользователем:'
        type: Dropdown
        options:
          dataSource:
            alias: dpAllUsers
            type: api
            options:
              url: "/api/admin/users"
        config:
          suggests:
            dataSource:
              type: list
              options:
                data: "{{dpAllUsers}}"
        value: "{{isInvitedBy}}"

```
