<template>
<div>
    <h2>列表</h2>
      <p>总共:{{total}}</p>
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="id" label="订单号" width="180"></el-table-column>
        <el-table-column  label="用户" width="180">
          <template slot-scope="scope">
            {{scope.row.$user.nickname || scope.row.$user.phone || scope.row.$user.mail}}
          </template>
        </el-table-column>
        <el-table-column prop="sum" label="总价" width="180"></el-table-column>
         <el-table-column label="订单状态" width="100">
        <template slot-scope="scope">{{scope.row._paid? '已支付':'未支付'}}</template>
      </el-table-column>
        
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <!-- <el-button @click="fill(scope.row)" type="text" size="small">更新</el-button> -->
            <el-button @click="remove(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="text-center">
        <el-pagination layout="prev, pager, next"  @current-change="flip" :current-page="readParam.page" :total="total" :page-size="readParam.limit"></el-pagination>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import admin from '../../mixin/admin.js'

export default {
  mixins: [admin],
  data() {
    return {
      model: 'order',
      rules: {
        name: {


          required: {
            msg: "此项为必填项"
          },
          unique: {
            params: ["cat", "exists", "name"],
            msg: "品牌名已存在"
          }
        }
      },
      readParam: {
        with: 
       [ "belongs_to:user"]
        
      }
    };
  },
  methods: {

  },

};
</script>

<style>

</style>
