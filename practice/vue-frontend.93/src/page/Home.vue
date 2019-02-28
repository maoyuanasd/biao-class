<template>
  <div>
      <RegularNav/>
    <div class="container carousel">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="container">
      <h2>新品</h2>
      <el-row :gutter="5" class="vertical-gutter">
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <img src="http://dummyimage.com/500x500" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <img src="http://dummyimage.com/500x500" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <img src="http://dummyimage.com/500x500" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <img src="http://dummyimage.com/500x500" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <img src="http://dummyimage.com/500x500" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <img src="http://dummyimage.com/500x500" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <img src="http://dummyimage.com/500x500" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <img src="http://dummyimage.com/500x500" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <h2>促销</h2>
      <el-row :gutter="5" class="vertical-gutter">
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <img src="http://dummyimage.com/500x500" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <img src="http://dummyimage.com/500x500" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <img src="http://dummyimage.com/500x500" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <img src="http://dummyimage.com/500x500" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      
      </el-row>
    </div>
  </div>
</template>
<script>
import RegularNav from '../component/RegularNav'
export default {
    components:{RegularNav}
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
