<!-- Author: ferrinweb -->
<!-- Create Time: 2019/01/03 11:42 -->
<!-- Description: voice-input-button-demo -->
<template>
  <div id="app">
    <div class="header">
      <p>总计分：</p>
      <ul>
        <li v-for="item in prList">
          <p>{{item.name}}</p>
          <p :style="getStyle(item.value)">{{item.value}}</p>
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="content-header">
        <div v-for="item in [{}, ...pList]">
          {{item.name}}
        </div>
      </div>
      <ul>
        <li v-for="item in rList">
          <div>
            <p>第{{item.num}}圈</p>
            <p>{{item.time}}</p>
          </div>
          <p v-for="i in item.r" :style="getStyle(i)">
            {{i}}
          </p>
        </li>
      </ul>
    </div>
    <div class="luyin">
      <div class="result">{{result}}</div>
      <div class="voice-input-button-wrapper">
        <voice-input-button
            ref="recorderButton"
            v-model="result"
            color="white"
            @record="showResult"
            @record-start="recordStart"
            @record-stop="recordStop"
            @record-blank="recordNoResult"
            @record-failed="recordFailed"
            @record-ready="recordReady"
            @record-complete="recordComplete"
        >
          <template slot="no-speak">没听清您说的什么</template>
        </voice-input-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      result: '',
      show: true,

      pList: [{
        name: '杨烁',
        value: 0,
        key: 1
      }, {
        name: '熊瑶瑶',
        value: 0,
        key: 2
      }, {
        name: '李亭君',
        value: 0,
        key: 3
      }, {
        name: '何静',
        value: 0,
        key: 4
      }],

      rList: [{
        num: 1,
        time: '16:59:22',
        r: {
          '1': 4,
          '2': 4,
          '3': -4,
          '4': -4
        }
      }, {
        num: 2,
        time: '16:55:32',
        r: {
          '1': -12,
          '2': -12,
          '3': 20,
          '4': 4
        }
      }]
    }
  },
  computed: {
    prList() {
      return this.pList.map(item => {
        let value = this.rList.reduce((prev, result) => {
          prev += result.r[item.key]
          return prev
        }, 0);
        return {
          ...item,
          value: value || 0
        }
      })
    }
  },
  methods: {
    recordReady () {
      console.info('按钮就绪!')
    },
    recordStart () {
      console.info('录音开始')
    },
    showResult (text) {
      console.info('收到识别结果：')
    },
    recordStop () {
      console.info('录音结束')
    },
    recordNoResult () {
      console.info('没有录到什么，请重试')
    },
    recordComplete (text) {
      console.log(text);
    },
    recordFailed (error) {
      console.info('识别失败，错误栈：', error)
    },
    getStyle(value) {
      return {color: value >= 0 ? 'red' : 'green'}
    },
    getValue(text = '妹妹15胡息5番') {

    }
  }
}
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  #app {
    .header {
      padding: 20px;
      box-shadow: -7px -4px 5px 5px #dacdcd;
      ul {
        display: flex;
        width: 100%;
        justify-content: space-around;
        li {
          text-align: center;
          p:first-child {
            margin-bottom: 5px;
          }
        }
      }
    }
    .content {
      padding-top: 20px;
      .content-header {
        display: flex;
        justify-content: space-between;
        padding-right: 40px;
        div {
          width: 70px;
          text-align: center;
        }
      }
      ul {
        height: 60vh;
        overflow-y: auto;
        li {
          display: flex;
          align-content: center;
          justify-content: space-between;
          height: 70px;
          padding-right: 40px;
          > div {
            display: flex;
            flex-direction: column;
            align-content: center;
            justify-content: center;
            width: 70px;
            p:first-child {
              font-size: 16px;
              margin-bottom: 6px;
            }
            p:last-child {
              font-size: 12px;
              color: #8a8484;
            }
          }
          > p {
            line-height: 70px;
            width: 70px;
            text-align: center;
          }
          &:first-child {
            background: #f9928870;
          }
        }
      }
    }
    .luyin {
      display: flex;
      align-content: center;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 90vw;
      padding: 0 20px;
    }
    .voice-input-button-wrapper{
      width: 60px;
      height: 60px;
      margin-left: 20px;
      background-color: mediumpurple;
      border-radius: 50%;
      flex-grow: 0;
      flex-shrink: 0;
    }
    .result{
      width: 100%;
      padding: 25px;
      border: #e2e2e2 1px solid;
      border-radius: 5px;
      line-height: 2;
      font-size: 16px;
      color: #727272;
      min-height: 24px;
      margin-left: 15px;
      margin-bottom: 25px;
      flex-grow: 1;
    }
  }

</style>
