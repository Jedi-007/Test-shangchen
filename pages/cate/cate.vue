<template>
	<view>
		<view class="srcoll-view-container">
			<!-- zuo ce de hua dong quyu -->
			<scroll-view  class="left-srcoll"scroll-y="true" :style="{weight: wh + 'px'}">
				<block v-for="(item,i) in cateList" :key="i">
					<view :class="['left-srcoll-view-item', i ===active ? 'active' : ' ']"
					@click="activeChange(i)">{{item.cat_name}}</view>
				</block>	
			</scroll-view>
			<!-- you ce de hua dong quyu -->
			<scroll-view class="right-srcoll-view-item" scroll-y="true" :style="{height: wh + 'px'}"
			:scroll-top="srcollTop">
				<view class="cate-lv2" v-for="(item2,i2) in catelevel2"
				:key="i2">
				<!-- 二级分类的标题 -->
				<view class="cate-lv2-title">/{{item2.cat_name}}/</view>
				<!-- 三级的图片 加上标题-->
				<view class="cate-lv3-list" >
					<view class="cate-lv3-item" v-for="(item3, i3) in item2.children"
				:key="i3" @click="gotoGoodsList(item3)">
					<image :src="item3.cat_icon.replace('dev','web')"></image>
					<text>{{item3.cat_name}}</text>
					</view>
				</view>
				
				</view>
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
				wh:0,
				//二级分类的列表
				catelevel2: [],
				srcollTop: 0
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
			//二级分类的数据
			this.catelevel2 = res.message.children
			},
			activeChange(i){
				this.active = i
				this.catelevel2 = this.cateList[i].children
				this.srcollTop = this.srcollTop === 0 ? 1:0
			},
			//跳转到商品列表的页面
			gotoGoodsList(item3){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid' + item3.cat_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.srcoll-view-container{
		display: flex;
		.left-srcoll{
			width: 120px;
		
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
	}
	.cate-lv2-title{
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;

	}
	.cate-lv3-list{
		display: flex;
		flex-wrap: wrap;
		.cate-lv3-item{
			width: 33.33%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 10px;
			image{
				width: 60px;
				height: 60px;
			}
			text{
				font-size: 12px;
				
			}
		}
		
		
	}

</style>
