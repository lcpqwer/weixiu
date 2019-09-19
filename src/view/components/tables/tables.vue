<template>
  <div>
    <Card>
      <Button type="primary" shape="circle" icon="ios-search"></Button>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getTableData } from '@/api/data'
import postFn from '@/store/postFn'
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        {title: 'Name', key: 'name', sortable: true},
        {title: 'Email', key: 'email', editable: true},
        {title: 'Create-Time', key: 'createTime'},
        {
          title: 'Handle',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.View(params.row)
                  }
                }
              }, 'View'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                },
                on: {
                  click: () => {
                    this.Delete(params.row)
                  }
                }
              }, 'Delete')
            ]);
          }
        },
        // {
        //   title: 'Handle',
        //   key: 'handle',
        //   options: ['delete'],
        //   button: [
        //     (h, params, vm) => {
        //       return h('Poptip', {
        //         props: {
        //           confirm: true,
        //           title: '你确定要删除吗?？？'
        //         },
        //         on: {
        //           'on-ok': () => {
        //             vm.$emit('on-delete', params)
        //             vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
        //           }
        //         }
        //       }, [
        //         h('Button', '自定义删除')
        //       ])
        //     }
        //   ]
        // }
      ],
      tableData: []
    }
  },
  methods: {
    View (index) {
      console.log(index)
      console.log(row)
    },
    Delete (index) {
      console.log(index)
    },
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    console.log(123)
    getTableData().then(res => {
      console.log(res.data)
      // this.tableData = res.data
    })
    postFn(this,'customer/show', {
      type: '0'
    }, (_this, res) => {
      console.log(res.data.table)
      this.tableData = res.data.table
    })
    // postFn(this, 'http://192.168.8.100/jinda/public/index/index/aaa', {
    // }, (_this, res) => {
    //   console.log(res)
    // })
  }
}
</script>

<style>

</style>
