/**
 * @description application router file.
 * @author pkeros
 * @data 16/6/1
 * @email pkeros@vip.qq.com
 */

export default (router) => {

  // 路由映射
  router.map({

    /* 主页 */
    '/': {
      name: 'index',
      cnName: '主页',
      component: resolve => {
        require(['./views/index.vue'], res => {
          resolve(res)
        })
      },

      subRoutes: {

        /* 欢迎页面 */
        '/': {
          name: 'welcome',
          cnName: '欢迎页面',
          component: (resolve) => {
            require(['./views/other/welcome.vue'], resolve)
          }
        },
        '/home': {
          name: 'welcome',
          cnName: '欢迎页面',
          component: (resolve) => {
            require(['./views/other/welcome.vue'], resolve)
          }
        },

        /* 引导 */
        '/guide': {
          name: 'guide',
          cnName: '介绍',
          component: (resolve) => {
            require(['./views/guide/index.vue'], resolve)
          },
          subRoutes: {
            '/intro': {
              name: 'intro',
              cnName: '介绍',
              component: (resolve) => {
                require(['./views/guide/intro.md'], resolve)
              }
            },
            '/dir': {
              name: 'dir',
              cnName: '目录结构',
              component: (resolve) => {
                require(['./views/guide/dir.md'], resolve)
              }
            }
          }
        },

        /* 基础组件 */
        '/base': {
          name: 'base',
          cnName: '基础组件',
          component: (resolve) => {
            require(['./views/base/index.vue'], resolve)
          },

          subRoutes: {

            /* 基础组件-图标 */
            '/icons': {
              name: 'icons',
              cnName: '图标',
              component: (resolve) => {
                require(['./views/base/icons.md'], resolve)
              }
            },

            /* 基础组件-图标 */
            '/icons-list': {
              name: 'icons-list',
              cnName: '卡说图标库',
              component: (resolve) => {
                require(['./views/base/icons-list.vue'], resolve)
              }
            },

            /* 基础组件-布局 */
            '/layout': {
              name: 'layout',
              cnName: '布局',
              component: (resolve) => {
                require(['./views/base/layout.md'], resolve)
              }
            },

            /* 基础组件-按钮 */
            '/button': {
              name: 'button',
              cnName: '按钮',
              component: (resolve) => {
                require(['./views/base/button.md'], resolve)
              }
            }
          }
        },

        /* form */
        '/form': {
          name: 'form',
          cnName: '表单',
          component: (resolve) => {
            require(['./views/form/index.vue'], resolve)
          },

          subRoutes: {

            /* 基础组件-布局 */
            '/date-picker': {
              name: 'date-picker',
              cnName: '时间选择器',
              component: (resolve) => {
                require(['./views/form/date-picker.md'], resolve)
              }
            },

            /* 基础组件-单选框 */
            '/radio': {
              name: 'radio',
              cnName: '单选框',
              component: (resolve) => {
                require(['./views/form/radio.md'], resolve)
              }
            },

            /* 基础组件-复选框 */
            '/checkbox': {
              name: 'checkbox',
              cnName: '复选框',
              component: (resolve) => {
                require(['./views/form/checkbox.md'], resolve)
              }
            },

            /* 基础组件-IOS 风格开关 */
            '/switch': {
              name: 'switch',
              cnName: 'IOS 风格开关',
              component: (resolve) => {
                require(['./views/form/switch.md'], resolve)
              }
            },
          }
        },

        /* data */
        '/data': {
          name: 'data',
          cnName: '数据展示',
          component: (resolve) => {
            require(['./views/data/index.vue'], resolve)
          },

          subRoutes: {

            /* 基础组件-布局 */
            '/page': {
              name: 'page',
              cnName: '分页',
              component: (resolve) => {
                require(['./views/data/page.md'], resolve)
              }
            },

            /* 数据展示-树形组件 */
            '/tree': {
              name: 'tree',
              cnName: '树形组件',
              component: (resolve) => {
                require(['./views/data/tree.md'], resolve)
              }
            },

            '/dropchoose': {
              name: 'dropchoose',
              cnName: '下拉选择',
              component: (resolve) => {
                require(['./views/data/dropchoose.md'], resolve)
              }
            },

            '/search': {
                name: 'search',
                cnName: '模糊搜索',
                component: (resolve) => {
                    require(['./views/data/search.md'], resolve)
                }
            },

            '/dialogchoose': {
              name: 'dialogchoose',
              cnName: '弹出层选择',
              component: (resolve) => {
                require(['./views/data/dialogchoose.md'], resolve)
              }
            },

            '/floorchoose': {
              name: 'floorchoose',
              cnName: '楼层选择',
              component: (resolve) => {
                require(['./views/data/floorchoose.md'], resolve)
              }
            },


            /* 基础组件-图片 */
            '/image': {
              name: 'image',
              cnName: '图片',
              component: (resolve) => {
                require(['./views/data/image.md'], resolve)
              }
            },
            '/ksimg': {
              name: 'ksimg',
              cnName: '图片',
              component: (resolve) => {
                require(['./views/data/ksimg.md'], resolve)
              }
            },            

            '/addtable': {
              name: 'addtable',
              cnName: '表格添加',
              component: (resolve) => {
                require(['./views/data/addtable.md'], resolve)

                }
            },

            /* 多标题表格 */
            '/multiple-table': {
              name: 'multiple-table',
              cnName: '图片',
              component: (resolve) => {
                require(['./views/table/multiple-table.md'], resolve)

              }
            },

            /* 定项表格 */
            '/setitem-table': {
              name: 'setitem-table',
              cnName: '定项表格',
              component: (resolve) => {
                require(['./views/table/setitem-table.md'], resolve)

              }
            },


          }
        },

        /* 通知组件 */
        '/notice': {
          name: 'notice',
          cnName: '通知组件',
          component: (resolve) => {
            require(['./views/notice/index.vue'], resolve)
          },

          subRoutes: {

            /* 通知组件-通知中心 */
            '/notice-center': {
              name: 'notice-center',
              cnName: '对话框',
              component: (resolve) => {
                require(['./views/notice/notice-center.md'], resolve)
              }
            },

            /* 通知组件-对话框 */
            '/dialog': {
              name: 'dialog',
              cnName: '对话框',
              component: (resolve) => {
                require(['./views/notice/dialog.md'], resolve)
              }
            },

            /* 通知组件-模态框 */
            '/modal': {
              name: 'modal',
              cnName: '模态框',
              component: (resolve) => {
                require(['./views/notice/modal.md'], resolve)
              }
            }
          }
        },

        /* validate */
        '/validate': {
          name: 'validate',
          cnName: '验证',
          component: (resolve) => {
            require(['./views/validate/index.vue'], resolve)
          },

          subRoutes: {
            /* 说明 */
            '/remark': {
              name: 'remark',
              cnName: '说明',
              component: (resolve) => {
                require(['./views/validate/validate.md'], resolve)
              }
            },
            /* 说明 */
            '/rules': {
              name: 'rules',
              cnName: '默认校验规则',
              component: (resolve) => {
                require(['./views/validate/rules.md'], resolve)
              }
            }
          }
        },

        /* other */
        '/other': {
          name: 'other',
          cnName: '其他',
          component: (resolve) => {
            require(['./views/other/index.vue'], resolve)
          },
          subRoutes: {
            /* 更新日志 */
            '/tooltips': {
              name: 'tooltips',
              cnName: '弹出提示',
              component: (resolve) => {
                require(['./views/other/tooltips.md'], resolve)
              }
            }
          }
        },

        /* log */
        '/log': {
          name: 'log',
          cnName: '更新日志',
          component: (resolve) => {
            require(['../../CHANGELOG.md'], resolve)
          }
        }

      }
    }
  })
}
