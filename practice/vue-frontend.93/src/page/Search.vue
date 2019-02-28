<template>
  <div>
    <RegularNav/>
    <div class="container">
      <div class="filter">
        <div class="table">
          <el-row>
            <el-col :span="3" class="type">品牌</el-col>
            <el-col :span="21">
              <div class="option">三只松鼠</div>
              <div class="option">百草味</div>
              <div class="option">良品铺子</div>
              <div class="option">奥利奥</div>
              <div class="option">徐福记</div>
              <div class="option">乐事</div>
              <div class="option">周黑鸭</div>
              <div class="option">稻香村</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" class="type">分类</el-col>
            <el-col :span="21">
              <div class="option">糕点/点心</div>
              <div class="option">膨化食品</div>
              <div class="option">肉类即食</div>
              <div class="option">饼干</div>
              <div class="option">坚果炒货</div>
              <div class="option">豆干零食</div>
              <div class="option">糖果</div>
              <div class="option">海味即食</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" class="type">包装方式</el-col>
            <el-col :span="21">
              <div class="option">包装</div>
              <div class="option">散装</div>
            </el-col>
          </el-row>
        </div>
        <div class="bar">
          <div class="group">
            <el-button-group>
              <el-button size="mini">综合</el-button>
              <el-button size="mini">新品</el-button>
              <el-button size="mini">价格</el-button>
              <el-button size="mini">销量</el-button>
            </el-button-group>
          </div>
          <div class="group">
                <el-col :span="12">
              <el-input
                      size="mini"
                      placeholder="最底价格"
              >
              </el-input>
            </el-col>
            <el-col :span="12">
            <el-input
                    size="mini"
                    placeholder="最高价格"
            >
            </el-input>
            </el-col>
          </div>
            <div class="group">
            <el-checkbox-group size="mini">
              <el-checkbox label="包邮"></el-checkbox>
              <el-checkbox label="折扣"></el-checkbox>
              <el-checkbox label="货到付款"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="result">
        <el-row :gutter="5" class="card-list vertical-gutter">
          <el-col :span="6">
            <el-card>
              <img src="http://dummyimage.com/500x500" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <!--<time class="time">{{ currentDate }}</time>-->
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
              <img src="http://dummyimage.com/500x500" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <!--<time class="time">{{ currentDate }}</time>-->
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
              <img src="http://dummyimage.com/500x500" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <!--<time class="time">{{ currentDate }}</time>-->
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
              <img src="http://dummyimage.com/500x500" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <!--<time class="time">{{ currentDate }}</time>-->
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
              <img src="http://dummyimage.com/500x500" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <!--<time class="time">{{ currentDate }}</time>-->
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
              <img src="http://dummyimage.com/500x500" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <!--<time class="time">{{ currentDate }}</time>-->
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
              <img src="http://dummyimage.com/500x500" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <!--<time class="time">{{ currentDate }}</time>-->
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
              <img src="http://dummyimage.com/500x500" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <!--<time class="time">{{ currentDate }}</time>-->
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
              <img src="http://dummyimage.com/500x500" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <!--<time class="time">{{ currentDate }}</time>-->
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
              <img src="http://dummyimage.com/500x500" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <!--<time class="time">{{ currentDate }}</time>-->
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
              <img src="http://dummyimage.com/500x500" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <!--<time class="time">{{ currentDate }}</time>-->
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
              <img src="http://dummyimage.com/500x500" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <!--<time class="time">{{ currentDate }}</time>-->
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-pagination
                class="text-center"
                layout="prev, pager, next"
                :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import RegularNav from "../component/RegularNav";
export default {
  components: { RegularNav }
};
</script>

<style>
.search {
  margin-top: 1em;
  margin-bottom: 1em;
}

.filter {
  color: #666;
}

.filter > * {
  margin-bottom: 0.5em;
}

.filter .table > * {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom-width: 0;
}

.filter .table > *:last-child {
  border-bottom-width: 1px;
}

.filter .type {
  font-size: 90%;
  opacity: 0.8;
}

.filter .type,
.filter .option {
  display: inline-block;
  cursor: pointer;
  padding: 1em;
}

.bar > * {
  display: inline-block;
  vertical-align: middle;
}

.bar .group {
  margin-right: 0.5em;
}

#price-filter {
  max-width: 14em;
}

.el-checkbox {
  margin-right: 0.5em;
}
</style>
