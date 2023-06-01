<template>
	<view>
		<view class="srcoll-view-container">
			<!-- zuo ce de hua dong quyu -->
			<scroll-view  class="left-srcoll"scroll-y="true" :style="{weight: wh + 'px'}">
				<block v-for="(item,i) in cateList" :key="i">
					<view :class="['left-srcoll-view-item', i ===active ? 'active' : ' '] ">{{item.cat_name}}</view>
				</block>	
			</scroll-view>
			<!-- you ce de hua dong quyu -->
			<scroll-view scroll-y="true" style="{weight: wh + 'px'}">
				<view class="right-srcoll-view-item">11111111</view>
				<view class="right-srcoll-view-item">11111111</view>
				<view class="right-srcoll-view-item">11111111</view>
				<view class="right-srcoll-view-item">11111111</view>
				
				<view class="right-srcoll-view-item">11111111</view>
				<view class="right-srcoll-view-item">11111111</view>
				<view class="right-srcoll-view-item">11111111</view>
				<view class="right-srcoll-view-item">11111111</view><view class="right-srcoll-view-item">11111111</view>
				<view class="right-srcoll-view-item">11111111</view>
				<view class="right-srcoll-view-item">11111111</view>
				<view class="right-srcoll-view-item">11111111</view>
				
				<view class="right-srcoll-view-item">11111111</view>
				<view class="right-srcoll-view-item">11111111</view>
				<view class="right-srcoll-view-item">11111111</view>
				<view class="right-srcoll-view-item">11111111</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 cateList: [],
				 active: 0,
				//可用的手机宽度
				wh:0
			};
		},
		onLoad() {
			//动态获取当前屏幕的信息
		const sysInfo =	uni.getSystemInfoSync()
		this.wh = sysInfo.windowHeight
		this.getCatelist()
		},
		methods:{
			//获取分类列表的数据
			async getCatelist(){
			const {data: res}	=await uni.$http.get('/api/public/v1/categories')
			if(res.meta.status !== 200) return uni.$showMsg()
			this.cateList = res.message
			}
		}
	}
</script>

<style lang="scss">
	.srcoll-view-container{
		display: flex;
	.left-srcoll{
		width: 120px;
	}
	.left-srcoll-view-item{
	background-color: #f7f7f7;
	line-height: 60px;
	text-align: center;
	font-size: 12px;
	
	&.active{
		background-color: white;
		position: relative;
		&::before{
			content: '';
			display: block;
			width: 3px;
			height: 30px;
			background-color: #c00000;
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
		}
	}
	}
	}

</style>
